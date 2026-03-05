#!/usr/bin/env python3
"""Run article quality audit for blog posts and emit Markdown by default.

Optional environment flags:
- AUDIT_WRITE_RAW=1 writes .json/.txt outputs in addition to markdown.
- AUDIT_WRITE_DATED=1 writes date-stamped report copies.
"""

from __future__ import annotations

import datetime as dt
import json
import os
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path


def parse_json_stream(text: str) -> list[dict]:
    decoder = json.JSONDecoder()
    idx = 0
    out: list[dict] = []
    while idx < len(text):
        while idx < len(text) and text[idx].isspace():
            idx += 1
        if idx >= len(text):
            break
        obj, next_idx = decoder.raw_decode(text, idx)
        out.append(obj)
        idx = next_idx
    return out


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, capture_output=True, text=True)


def grade_distribution(rows: list[dict]) -> str:
    counts = Counter(r.get("grade", "?") for r in rows)
    ordered = sorted(counts.items(), key=lambda kv: kv[0])
    return ", ".join(f"{k}: {v}" for k, v in ordered)


def build_markdown(rows: list[dict], generated_at: str) -> str:
    if not rows:
        return "# Article Quality Audit\n\nNo results were produced.\n"

    scores = [r.get("overall_score", 0) for r in rows]
    avg = sum(scores) / len(scores)

    category_counts: dict[str, Counter] = defaultdict(Counter)
    for row in rows:
        for finding in row.get("findings", []):
            category = finding.get("category", "Unknown")
            severity = finding.get("severity", "info")
            category_counts[category][severity] += 1

    lowest = sorted(rows, key=lambda r: r.get("overall_score", 0))[:5]
    highest = sorted(rows, key=lambda r: r.get("overall_score", 0), reverse=True)[:5]

    lines = []
    lines.append("# Article Quality Audit")
    lines.append("")
    lines.append(f"Generated: `{generated_at}`")
    lines.append("")
    lines.append("## Summary")
    lines.append("")
    lines.append(f"- Articles audited: **{len(rows)}**")
    lines.append(f"- Average score: **{avg:.1f}**")
    lines.append(f"- Range: **{min(scores)} - {max(scores)}**")
    lines.append(f"- Grade distribution: **{grade_distribution(rows)}**")
    lines.append("")
    lines.append("## Category Breakdown")
    lines.append("")
    lines.append("| Category | Pass | Info | Warn |")
    lines.append("|---|---:|---:|---:|")
    for category in sorted(category_counts.keys()):
        c = category_counts[category]
        lines.append(f"| {category} | {c.get('pass', 0)} | {c.get('info', 0)} | {c.get('warn', 0)} |")
    lines.append("")
    lines.append("## Lowest 5")
    lines.append("")
    for row in lowest:
        lines.append(f"- `{row.get('file', 'unknown')}`: **{row.get('overall_score', 0)}** ({row.get('grade', '?')})")
    lines.append("")
    lines.append("## Highest 5")
    lines.append("")
    for row in highest:
        lines.append(f"- `{row.get('file', 'unknown')}`: **{row.get('overall_score', 0)}** ({row.get('grade', '?')})")
    lines.append("")
    lines.append("## All Articles")
    lines.append("")
    lines.append("| File | Score | Grade | Words |")
    lines.append("|---|---:|---:|---:|")
    for row in sorted(rows, key=lambda r: (r.get("overall_score", 0), r.get("file", ""))):
        lines.append(
            f"| `{row.get('file', 'unknown')}` | {row.get('overall_score', 0)} | {row.get('grade', '?')} | {row.get('words', 0)} |"
        )
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    audit_script = repo_root / "tools" / "article-quality-audit.py"
    article_glob_root = repo_root / "src" / "posts" / "blog" / "en"

    if not audit_script.exists():
        print(f"[audit] Missing script: {audit_script}", file=sys.stderr)
        return 1

    articles = sorted(str(p) for p in article_glob_root.glob("*.md"))
    if not articles:
        print("[audit] No article files found in src/posts/blog/en")
        return 0

    out_dir = repo_root / "docs" / "audits"
    out_dir.mkdir(parents=True, exist_ok=True)

    date_tag = dt.date.today().isoformat()
    generated_at = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    write_raw = os.environ.get("AUDIT_WRITE_RAW", "0").strip() == "1"
    write_dated = os.environ.get("AUDIT_WRITE_DATED", "0").strip() == "1"

    json_proc = run([sys.executable, str(audit_script), "--json", *articles])
    json_output = (json_proc.stdout or "") + (json_proc.stderr or "")
    md_latest = out_dir / "article-quality-audit-latest.md"

    rows = []
    try:
        rows = parse_json_stream(json_output)
    except Exception as exc:
        fallback = f"# Article Quality Audit\n\nFailed to parse JSON output:\n\n```\n{exc}\n```\n"
        md_latest.write_text(fallback, encoding="utf-8")
        if write_dated:
            md_dated = out_dir / f"article-quality-audit-{date_tag}.md"
            md_dated.write_text(fallback, encoding="utf-8")
        print("[audit] JSON parse failed; wrote fallback markdown report")
        return 0

    markdown = build_markdown(rows, generated_at)
    md_latest.write_text(markdown, encoding="utf-8")
    if write_dated:
        md_dated = out_dir / f"article-quality-audit-{date_tag}.md"
        md_dated.write_text(markdown, encoding="utf-8")

    if write_raw:
        txt_proc = run([sys.executable, str(audit_script), *articles])
        txt_output = (txt_proc.stdout or "") + (txt_proc.stderr or "")
        txt_latest = out_dir / "article-quality-audit-latest.txt"
        json_latest = out_dir / "article-quality-audit-latest.json"
        txt_latest.write_text(txt_output, encoding="utf-8")
        json_latest.write_text(json_output, encoding="utf-8")

        if write_dated:
            txt_dated = out_dir / f"article-quality-audit-{date_tag}.txt"
            json_dated = out_dir / f"article-quality-audit-{date_tag}.json"
            txt_dated.write_text(txt_output, encoding="utf-8")
            json_dated.write_text(json_output, encoding="utf-8")

    print(f"[audit] Audited {len(rows)} articles")
    print(f"[audit] Markdown report updated:\n  - {md_latest}")
    if write_raw:
        print("[audit] Raw outputs updated (AUDIT_WRITE_RAW=1)")
    if write_dated:
        print("[audit] Dated snapshots updated (AUDIT_WRITE_DATED=1)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
