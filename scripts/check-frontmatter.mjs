#!/usr/bin/env node
// Pre-build front-matter sanity check.
//
// Every content file Eleventy renders has its YAML front matter parsed by
// gray-matter (the same library Eleventy uses internally). A single unquoted
// value with an internal colon, a stray tab, or a duplicate key makes
// gray-matter throw — and Eleventy aborts the ENTIRE build. One bad article
// silently takes down the whole deploy (Cloudflare keeps serving the last good
// build, so the break is invisible until someone checks the live site).
//
// This runs before the build and fails fast with a precise file:line pointer,
// parsing front matter exactly the way Eleventy does. It also verifies that any
// `layout:` named in front matter resolves to a real template under _includes
// (a missing layout is the other way a single article kills the build).
//
// Sibling of check-yaml.mjs (which covers src/_data/ YAML). Wired into the
// `prebuild` npm script so it runs in CI ahead of Eleventy.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import matter from 'gray-matter';

const SRC = 'src';
const INCLUDES = join(SRC, '_includes');
// Extensions Eleventy parses for front matter (mirrors templateFormats).
const CONTENT_EXTS = ['.md', '.njk', '.html'];
// Extensions tried when a `layout:` value has no extension of its own.
const LAYOUT_EXTS = ['.njk', '.html', '.md', '.11ty.js'];

// Recursively collect content files under src/, skipping vendored trees.
function collect(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      out.push(...collect(full));
    } else if (CONTENT_EXTS.includes(extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

// Does a front-matter `layout:` value resolve to a real template?
function layoutExists(layout) {
  const base = join(INCLUDES, layout);
  if (extname(layout)) return existsSync(base);
  return LAYOUT_EXTS.some(ext => existsSync(base + ext));
}

const files = collect(SRC).sort();
let errors = 0;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  // Only files that actually open with a front-matter fence can carry one.
  if (!text.startsWith('---')) continue;

  let data;
  try {
    ({ data } = matter(text));
  } catch (err) {
    errors++;
    const mark = err.mark || {};
    const line = mark.line !== undefined ? mark.line + 1 : '?';
    const col = mark.column !== undefined ? mark.column + 1 : '?';
    console.error(`[check-frontmatter] ${file}:${line}:${col}`);
    console.error(`  ${err.reason || err.message}`);
    if (mark.snippet) {
      console.error(mark.snippet.split('\n').map(l => '  ' + l).join('\n'));
    }
    continue; // can't check layout on front matter that didn't parse
  }

  if (typeof data.layout === 'string' && !layoutExists(data.layout)) {
    errors++;
    console.error(`[check-frontmatter] ${file}`);
    console.error(`  layout "${data.layout}" not found under ${INCLUDES}/`);
  }
}

if (errors > 0) {
  console.error(`[check-frontmatter] ${errors} problem(s) found across ${files.length} content file(s)`);
  process.exit(1);
}

console.log(`[check-frontmatter] ${files.length} content file(s) OK`);
