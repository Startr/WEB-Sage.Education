const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const config = require("./glossary.config.js");

const FOOTNOTE_DEFINITION =
  /^\[\^([^\]]+)\]:\s+\*\*([^*]+)\*\*\s*[—:,.]*\s*(.+)$/gm;

const LEADING_PARENTHETICAL = /^\s*(\([^)]*\))\s*/;
const LEADING_CONNECTOR =
  /^(is|are|was|were|refers to|means|describes)\b[\s,]+/i;

function refineDefinition(term, raw) {
  let def = raw.trim();
  let displayTerm = term;

  const parenMatch = def.match(LEADING_PARENTHETICAL);
  if (parenMatch) {
    displayTerm = `${term} ${parenMatch[1]}`;
    def = def.slice(parenMatch[0].length);
  }

  def = def.replace(LEADING_CONNECTOR, "");

  if (def.length > 0) {
    def = def.charAt(0).toUpperCase() + def.slice(1);
  }

  return { displayTerm, definition: def };
}

function sortKey(term) {
  return term
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .trim()
    .toLowerCase();
}

function slugForTerm(term) {
  return sortKey(term)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function firstLetter(term) {
  const k = sortKey(term);
  const ch = k.charAt(0);
  return /[a-z]/.test(ch) ? ch : "#";
}

module.exports = function () {
  const cwd = process.cwd();
  const files = fs.globSync(config.glob, { cwd });
  const entries = new Map();

  for (const rel of files) {
    const filePath = path.join(cwd, rel);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const body = parsed.content;
    const title = parsed.data.title || rel;
    const url = config.urlFromPath(rel);
    if (!url) continue;

    FOOTNOTE_DEFINITION.lastIndex = 0;
    let match;
    while ((match = FOOTNOTE_DEFINITION.exec(body)) !== null) {
      const footnoteId = `fn${match[1]}`;
      const term = match[2].trim();
      const slug = slugForTerm(term);
      if (!slug) continue;

      const { displayTerm, definition } = refineDefinition(term, match[3]);

      if (!entries.has(slug)) {
        entries.set(slug, {
          term,
          displayTerm,
          slug,
          definition,
          letter: firstLetter(term),
          sources: [],
        });
      }
      const entry = entries.get(slug);
      entry.sources.push({ url, title, footnoteId });
    }
  }

  return Array.from(entries.values()).sort((a, b) =>
    sortKey(a.term).localeCompare(sortKey(b.term))
  );
};
