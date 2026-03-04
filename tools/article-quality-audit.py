#!/usr/bin/env python3
"""
article-quality-audit.py
========================
Mechanical prose-quality heuristics for investigative articles.

Strips HTML/markdown to plain text, then scores on dimensions that separate
award-winning investigative journalism from competent-but-generic editorial.

Calibrated against The Markup's 2022 Vista Equity investigation and
NYT's children-and-AI coverage (2024-25). Thresholds are opinionated.

Usage:
    python3 article-quality-audit.py <file>            # single file
    python3 article-quality-audit.py *.html             # batch mode
    python3 article-quality-audit.py --json <file>      # JSON output
"""

import html
import json
import re
import sys
import textwrap
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path

# ── ANSI helpers ─────────────────────────────────────────────────────────────

GREEN = "\033[32m"
YELLOW = "\033[33m"
RED = "\033[31m"
DIM = "\033[2m"
RESET = "\033[0m"

SEV_ICON = {"pass": f"{GREEN}✓{RESET}", "info": f"{YELLOW}~{RESET}", "warn": f"{RED}✗{RESET}"}
SEV_POINTS = {"pass": 10, "info": 6, "warn": 2}

# Grade thresholds — (min_score, label) sorted descending
GRADE_TABLE = [
    (95, "A+"), (90, "A"), (85, "A-"), (80, "B+"), (75, "B"),
    (70, "B-"), (65, "C+"), (60, "C"), (55, "C-"), (50, "D"), (0, "F"),
]

# ── Data classes ─────────────────────────────────────────────────────────────

@dataclass
class Finding:
    """Single heuristic result."""
    category: str
    severity: str  # "warn" | "info" | "pass"
    message: str
    detail: str = ""


@dataclass
class AuditResult:
    """Aggregated audit output for one article."""
    filename: str
    word_count: int = 0
    sentence_count: int = 0
    paragraph_count: int = 0
    findings: list = field(default_factory=list)
    scores: dict = field(default_factory=dict)


# ── Text extraction ──────────────────────────────────────────────────────────

def extract_text(raw: str, suffix: str) -> str:
    """Convert HTML or markdown to plain text suitable for analysis."""
    if suffix in (".html", ".htm"):
        return _strip_html(raw)
    return _strip_markdown(raw)


def _strip_html(raw: str) -> str:
    """Remove tags, decode entities, preserve paragraph boundaries."""
    text = raw
    # Remove non-content blocks
    for tag in ("script", "style", "head"):
        text = re.sub(rf"<{tag}[^>]*>.*?</{tag}>", "", text, flags=re.DOTALL | re.I)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
    # Block-level closers → paragraph breaks
    text = re.sub(r"</(p|div|h[1-6]|blockquote|figcaption|li)>", "\n\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)  # strip remaining tags
    text = html.unescape(text)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def _strip_markdown(raw: str) -> str:
    """Remove YAML frontmatter and markdown syntax."""
    # Strip frontmatter
    text = re.sub(r"^---\s*\n.*?\n---\s*\n", "", raw, count=1, flags=re.DOTALL)
    # Strip images and image captions
    text = re.sub(r"!\[\[.*?\]\]", "", text)           # Obsidian image embeds
    text = re.sub(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]", r"\1", text)  # Obsidian wiki links
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text)        # Standard markdown images
    text = re.sub(r"^\*Photo:.*?\*\s*$", "", text, flags=re.MULTILINE)  # Image captions
    text = re.sub(r"^\*Image:.*?\*\s*$", "", text, flags=re.MULTILINE)  # Image captions
    # Strip links (keep link text), headers, emphasis, fenced code blocks
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)  # Standard markdown links
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)  # Fenced code blocks
    text = re.sub(r"[*_]{1,3}([^*_]+)[*_]{1,3}", r"\1", text)
    # Strip blockquote markers (> at line start)
    text = re.sub(r"^>\s?", "", text, flags=re.MULTILINE)
    return text.strip()


# ── Tokenizers ───────────────────────────────────────────────────────────────

def sentences(text: str) -> list:
    """Split on sentence-ending punctuation followed by uppercase / quote."""
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z\"\u201c])", text)
    return [s.strip() for s in parts if len(s.strip()) > 5]


def paragraphs(text: str) -> list:
    """Split on blank lines, discard trivial fragments."""
    return [p.strip() for p in text.split("\n\n") if len(p.strip()) > 10]


def word_count(text: str) -> int:
    return len(text.split())


# ── Threshold helper (DRY) ───────────────────────────────────────────────────

def threshold(category: str, value: float, warn_below=None, warn_above=None,
              info_below=None, info_above=None, msg_fn=None, detail=""):
    """
    Generic threshold evaluator. Returns a Finding.

    Checks warn conditions first, then info, then passes.
    Exactly one of warn_below/warn_above and info_below/info_above should be set
    per direction (low-is-bad vs high-is-bad).

    msg_fn: callable(value) -> str for the message line.
    """
    msg = msg_fn(value) if msg_fn else f"{value}"

    if warn_below is not None and value < warn_below:
        return Finding(category, "warn", msg, detail)
    if warn_above is not None and value > warn_above:
        return Finding(category, "warn", msg, detail)
    if info_below is not None and value < info_below:
        return Finding(category, "info", msg, detail)
    if info_above is not None and value > info_above:
        return Finding(category, "info", msg, detail)
    return Finding(category, "pass", msg, detail)


# ── Heuristic checks ────────────────────────────────────────────────────────
# Each returns a Finding. Ordered by editorial importance.

def check_sources(text: str) -> Finding:
    """
    Named human sources with quotes — the single biggest quality signal.

    Looks for attribution patterns ("said Name", "Name told") and
    role-identified sources ("Name, a Maryland parent").
    """
    # "said/told/wrote Name Surname" or "said/told/wrote Surname" patterns
    # [A-Z][a-zA-Z] handles mixed-case names like McIlroy, MacFarlane
    # Use [ ]+ (not \s+) to avoid crossing line boundaries
    attributions = re.findall(
        r"(?:said|told|wrote|explained|concluded|according to)\s+"
        r"([A-Z][a-zA-Z]{2,}(?:[ ]+[A-Z][a-zA-Z]+)*)", text
    )
    # Filter out common non-name words that start sentences after quotes
    _NON_NAMES = {"The", "This", "That", "They", "These", "Those", "There",
                  "Their", "Some", "Most", "Many", "Such", "Each", "Every",
                  "Both", "One", "All", "His", "Her", "Its", "Our",
                  "Not", "And", "But", "Yet", "For", "Nor"}
    attributions = [a for a in attributions if a.split()[0] not in _NON_NAMES]
    # "Name Surname, a/an/the [... role]" patterns (up to 3 words between article and role)
    # [a-zA-Z] handles mixed-case names; [\w-]+ handles hyphenated words like "Finnish-American"
    # Use [ ]+ in name capture to avoid crossing line boundaries
    role_ids = re.findall(
        r"([A-Z][a-zA-Z]+(?:[ ]+[A-Z][a-zA-Z]+)+),\s+(?:a|an|the)\s+"
        r"(?:[\w-]+\s+){0,3}"
        r"(?:co-)?(?:parent|researcher|professor|director|officer|coordinator|"
        r"advocate|attorney|lawyer|spokesperson|executive|engineer|"
        r"analyst|scholar|fellow|editor|expert|representative|founder|"
        r"architect|developer|member|commentator|critic|journalist)", text
    )
    # Direct quotes (curly or straight, 10+ chars)
    quotes = re.findall(r'[\u201c"][^\u201d"]{10,}[\u201d"]', text)

    sources = sorted(set(attributions + role_ids))
    n_sources, n_quotes = len(sources), len(quotes)
    source_list = f"Sources: {', '.join(sources)}." if sources else ""

    if n_sources == 0 and n_quotes == 0:
        return Finding("Named Sources", "warn",
                       "Zero named sources. Zero direct quotes.",
                       "Target: 3-8 named humans. Add parents, researchers, officials.")
    if n_sources == 0:
        return Finding("Named Sources", "warn",
                       f"{n_quotes} quotes but no attributed sources",
                       "Quotes need names. Who said it? Why do they matter?")
    return threshold("Named Sources", n_sources,
                     warn_below=2, info_below=3,
                     msg_fn=lambda n: f"{n} named source(s), {n_quotes} direct quote(s)",
                     detail=source_list + " Target: 3+ for investigative work.")


def check_specificity(text: str) -> Finding:
    """
    Specific numbers, dates, places, dollar amounts.
    Reported journalism is concrete; op-ed is abstract.
    """
    wc = word_count(text)
    counts = {
        "numbers": len(re.findall(r"\b\d[\d,]*(?:\.\d+)?\b", text)),
        "dollar amounts": len(re.findall(r"\$[\d,]+(?:\.\d+)?(?:\s*(?:million|billion))?", text)),
        "dates": len(re.findall(
            r"(?:January|February|March|April|May|June|July|August|"
            r"September|October|November|December)\s+\d{4}", text)),
        "named places": len(set(re.findall(
            r"(?:in|outside|from)\s+([A-Z][a-z]+(?:,?\s+[A-Z][a-z]+)*)", text))),
    }
    total = sum(counts.values())
    per_100 = total / (wc / 100) if wc else 0
    detail = ". ".join(f"{k.title()}: {v}" for k, v in counts.items()) + "."

    return threshold("Specificity", per_100,
                     warn_below=1.0, info_below=1.95,
                     msg_fn=lambda r: f"{total} data points ({r:.1f} per 100 words)",
                     detail=detail + " Target: 2+ per 100 words.")


def check_em_dashes(text: str) -> Finding:
    """Em dashes per word count. Overuse signals blog voice."""
    dashes = len(re.findall(r"[\u2014—]", text))
    wc = word_count(text)
    if dashes == 0:
        return Finding("Em-Dash Density", "pass", "No em dashes", "Clean.")
    ratio = wc / dashes
    return threshold("Em-Dash Density", ratio,
                     warn_below=100, info_below=150,
                     msg_fn=lambda r: f"{dashes} em dashes (1 per {r:.0f} words)",
                     detail="Target: <1 per 150 words. Replace with periods or commas.")


def check_sentence_variation(sents: list) -> Finding:
    """
    Coefficient of variation in sentence length.
    Award-winning prose has high variance — punchy fragments mixed with complex
    sentences. CoV > 0.45 is strong; < 0.35 is monotone.
    """
    if len(sents) < 10:
        return Finding("Sentence Variation", "info", "Too few sentences to measure", "")

    lengths = [len(s.split()) for s in sents]
    avg = sum(lengths) / len(lengths)
    std = (sum((l - avg) ** 2 for l in lengths) / len(lengths)) ** 0.5
    cov = std / avg if avg else 0

    pct_short = sum(1 for l in lengths if l <= 8) / len(lengths) * 100
    pct_long = sum(1 for l in lengths if l >= 30) / len(lengths) * 100
    detail = (f"Avg: {avg:.1f}w. Std: {std:.1f}. "
              f"Short (≤8w): {pct_short:.0f}%. Long (≥30w): {pct_long:.0f}%.")

    return threshold("Sentence Variation", cov,
                     warn_below=0.35, info_below=0.45,
                     msg_fn=lambda c: f"CoV: {c:.2f}",
                     detail=detail + " Target: CoV > 0.45.")


def check_paragraph_variation(paras: list) -> Finding:
    """
    Short paragraphs (≤15 words) as percentage of total.
    10-20% = good rhythm. <5% = wall of text. >30% = choppy.
    """
    if len(paras) < 5:
        return Finding("Paragraph Variation", "info", "Too few paragraphs to measure", "")

    pct = sum(1 for p in paras if len(p.split()) <= 15) / len(paras) * 100

    if pct > 30:
        return Finding("Paragraph Variation", "warn",
                       f"{pct:.0f}% of paragraphs ≤15 words — too choppy",
                       "Target: 10-20%. Merge some one-liners into adjacent paragraphs.")
    return threshold("Paragraph Variation", pct,
                     warn_below=5, info_below=10,
                     msg_fn=lambda p: f"{p:.0f}% of paragraphs ≤15 words",
                     detail="Target: 10-20% for good rhythm.")


def check_passive_voice(sents: list) -> Finding:
    """
    Percentage of sentences with passive constructions.
    Single combined regex: be-verb + past participle.
    """
    # Matches: "is designed", "was not told", "were being monitored", "has been removed"
    passive_re = re.compile(
        r"\b(?:is|are|was|were|been|being|be)\s+(?:not\s+)?(?:being\s+)?\w+(?:ed|en)\b",
        re.I
    )
    n_passive = sum(1 for s in sents if passive_re.search(s))
    pct = n_passive / len(sents) * 100 if sents else 0

    return threshold("Passive Voice", pct,
                     warn_above=30, info_above=20,
                     msg_fn=lambda p: f"{p:.0f}% passive",
                     detail="NYT investigative runs 10-20%. Target: <20%.")


def check_rhetorical_excess(text: str) -> Finding:
    """
    Detect blog-voice tics: reader commands, excessive rhetorical questions,
    overused reframe patterns, exclamation marks.
    """
    issues = []

    commands = re.findall(r"(?:Read that|Let that|Consider this|Think about|Ask yourself)", text)
    if commands:
        issues.append(f"{len(commands)} reader command(s)")

    questions = re.findall(r"[^.!?]+\?\s", text)
    if len(questions) > 3:
        issues.append(f"{len(questions)} rhetorical questions (max 3)")

    reframes = re.findall(r"It is not [^.]+\.\s+It is [^.]+\.", text)
    if len(reframes) > 2:
        issues.append(f"{len(reframes)} 'not X / is Y' reframes (max 2)")

    bangs = text.count("!")
    if bangs:
        issues.append(f"{bangs} exclamation mark(s)")

    if not issues:
        return Finding("Rhetorical Restraint", "pass", "No excess detected", "")
    sev = "warn" if len(issues) >= 2 else "info"
    return Finding("Rhetorical Restraint", sev,
                   f"{len(issues)} issue(s)",
                   "; ".join(issues) + ". Trust the facts.")


def check_opener_variety(paras: list) -> Finding:
    """
    Flag paragraph-opening words repeated 3+ times.
    Mechanical 'The X... The Y... The Z...' patterns bore the reader.
    """
    # "the" is too common to flag; everything else is fair game
    openers = [p.split()[0].lower() for p in paras if p.split()]
    repeated = {w: n for w, n in Counter(openers).items() if n >= 3 and w != "the"}

    if not repeated:
        return Finding("Opener Variety", "pass", "Good variety", "")
    detail = ", ".join(f'"{w}" ({n}x)' for w, n in repeated.items())
    return Finding("Opener Variety", "warn",
                   f"Repetitive openers: {detail}",
                   "Restructure sentences so first words vary.")


def check_show_vs_tell(text: str) -> Finding:
    """
    Editorializing phrases that tell the reader what to think.
    Award-winning journalism lets evidence speak.
    """
    tell_phrases = [
        r"the truth is", r"the reality is", r"the honest answer",
        r"the genius of", r"the irony is", r"the problem is",
        r"elegant in its", r"dishonest in its",
        r"should concern", r"should alarm", r"should worry",
        r"nobody can deny", r"everyone knows", r"of course",
        r"the fact is", r"the simple truth", r"the bottom line",
    ]
    # Single pass with alternation
    combined = "|".join(tell_phrases)
    hits = re.findall(combined, text, re.I)

    if not hits:
        return Finding("Show vs. Tell", "pass", "No editorializing detected", "")
    return threshold("Show vs. Tell", len(hits),
                     warn_above=2, info_above=0,
                     msg_fn=lambda n: f"{n} editorializing phrase(s): {', '.join(hits[:4])}",
                     detail="Replace with evidence or quotes.")


def check_product_pitch(text: str) -> Finding:
    """
    Detect product/brand mentions that read as advertising.
    Looks for stacked positive claims without trade-offs.
    """
    signals = [
        r"was built (?:on the principle|from)",
        r"was designed (?:from its first|so that)",
        r"is open-source.*self-hostable",
        r"eliminates the (?:extraction|pipeline|mechanism)",
        r"there is no.*there is no.*there is no",
    ]
    hits = sum(1 for s in signals if re.search(s, text, re.I | re.DOTALL))

    return threshold("Product Pitch", hits,
                     warn_above=2, info_above=0,
                     msg_fn=lambda n: f"{n} pitch-pattern signal(s)",
                     detail="Add limitations or critical context to product mentions.")


def check_images(meta: dict) -> Finding:
    """
    Verify that every wiki-link image embed (![[file]]) resolves to an actual
    file in the sibling attachments/ directory.

    Articles should use Obsidian wiki links for images (SOP). This check
    catches missing assets before publish.
    """
    raw, filepath = meta["raw"], meta["path"]

    # Extract all wiki-link image embeds: ![[filename.ext]] or ![[filename.ext|alt]]
    wiki_images = [f.split("|")[0] for f in re.findall(r"!\[\[([^\]]+)\]\]", raw)]
    # Also extract standard markdown images for completeness: ![alt](path)
    std_images = re.findall(r"!\[.*?\]\(([^)]+)\)", raw)

    if not wiki_images and not std_images:
        return Finding("Image Assets", "pass",
                       "No embedded images",
                       "Consider adding images for visual storytelling.")

    # Resolve attachments directory (sibling to the markdown file)
    attachments_dir = filepath.parent / "attachments"

    missing = []
    found = []
    for img in wiki_images:
        # Wiki links resolve to attachments/ by convention
        img_path = attachments_dir / img
        if img_path.exists():
            found.append(img)
        else:
            missing.append(img)

    for img_src in std_images:
        # Skip absolute URLs (http/https) — can't verify remote images
        if img_src.startswith(("http://", "https://", "/")):
            found.append(img_src.split("/")[-1])
            continue
        img_path = filepath.parent / img_src
        if img_path.exists():
            found.append(img_src)
        else:
            missing.append(img_src)

    total = len(found) + len(missing)

    if not missing:
        return Finding("Image Assets", "pass",
                       f"{total} image(s), all present",
                       f"Found: {', '.join(found)}.")

    missing_list = ", ".join(missing)
    if len(missing) == total:
        return Finding("Image Assets", "warn",
                       f"{len(missing)} image(s) missing — none found",
                       f"Missing: {missing_list}. Add to {attachments_dir.name}/.")

    return Finding("Image Assets", "info",
                   f"{len(missing)} of {total} image(s) missing",
                   f"Missing: {missing_list}. Add to {attachments_dir.name}/.")


# ── Registry ─────────────────────────────────────────────────────────────────
# All checks, in display order.  Key = data slice passed to the check function.
# Valid keys: "text", "sents", "paras", "meta".
# Adding a check = adding one function + one entry here.

CHECKS = [
    ("text",  check_sources),
    ("text",  check_specificity),
    ("text",  check_em_dashes),
    ("sents", check_sentence_variation),
    ("paras", check_paragraph_variation),
    ("sents", check_passive_voice),
    ("text",  check_rhetorical_excess),
    ("paras", check_opener_variety),
    ("text",  check_show_vs_tell),
    ("text",  check_product_pitch),
    ("meta",  check_images),
]


# ── Audit runner ─────────────────────────────────────────────────────────────

def audit(filepath: str) -> AuditResult:
    """Run all checks against a single file. Returns an AuditResult."""
    path = Path(filepath)
    raw = path.read_text(encoding="utf-8")
    text = extract_text(raw, path.suffix)
    sents = sentences(text)
    paras = paragraphs(text)

    # Dispatch each check to the data it needs
    data = {"text": text, "sents": sents, "paras": paras,
            "meta": {"raw": raw, "path": path}}
    findings = [fn(data[key]) for key, fn in CHECKS]

    # Score: each category 0-10, overall 0-100
    scores = {f.category: SEV_POINTS[f.severity] for f in findings}
    max_possible = len(findings) * 10
    scores["OVERALL"] = round(sum(scores.values()) / max_possible * 100) if max_possible else 0

    return AuditResult(
        filename=path.name,
        word_count=word_count(text),
        sentence_count=len(sents),
        paragraph_count=len(paras),
        findings=findings,
        scores=scores,
    )


def grade(score: int) -> str:
    """Map 0-100 score to letter grade."""
    return next(label for minimum, label in GRADE_TABLE if score >= minimum)


# ── Output formatters ────────────────────────────────────────────────────────

def print_report(r: AuditResult):
    """Pretty-print a color-coded terminal report."""
    print(f"\n{'═' * 70}")
    print(f"  ARTICLE QUALITY AUDIT: {r.filename}")
    print(f"  {r.word_count} words · {r.sentence_count} sentences · {r.paragraph_count} paragraphs")
    print(f"{'═' * 70}\n")

    # Findings
    for f in r.findings:
        print(f"  {SEV_ICON[f.severity]} {f.category}")
        print(f"    {f.message}")
        if f.detail:
            for line in textwrap.wrap(f.detail, width=68):
                print(f"    {DIM}{line}{RESET}")
        print()

    # Score bars
    print(f"{'─' * 70}")
    print("  SCORES (each category 0-10, overall 0-100)")
    print(f"{'─' * 70}")
    for cat, score in sorted(r.scores.items()):
        if cat == "OVERALL":
            continue
        bar = "█" * score + "░" * (10 - score)
        color = GREEN if score >= 8 else YELLOW if score >= 6 else RED
        print(f"  {color}{bar}{RESET}  {score:>2}/10  {cat}")

    # Overall
    overall = r.scores["OVERALL"]
    color = GREEN if overall >= 80 else YELLOW if overall >= 60 else RED
    print(f"\n  {color}OVERALL: {overall}/100 ({grade(overall)}){RESET}")
    print("  Target for publication: 80+ (B+)\n")


def json_report(r: AuditResult) -> str:
    """Serialize audit result as JSON for automation."""
    return json.dumps({
        "file": r.filename,
        "words": r.word_count,
        "sentences": r.sentence_count,
        "paragraphs": r.paragraph_count,
        "overall_score": r.scores.get("OVERALL", 0),
        "grade": grade(r.scores.get("OVERALL", 0)),
        "findings": [
            {"category": f.category, "severity": f.severity,
             "message": f.message, "detail": f.detail}
            for f in r.findings
        ],
        "scores": {k: v for k, v in r.scores.items() if k != "OVERALL"},
    }, indent=2)


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    use_json = "--json" in flags

    if not args:
        print("Usage: python3 article-quality-audit.py [--json] <file> [file ...]")
        sys.exit(1)

    for filepath in args:
        result = audit(filepath)
        if use_json:
            print(json_report(result))
        else:
            print_report(result)


if __name__ == "__main__":
    main()
