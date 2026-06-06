#!/usr/bin/env node
// Pre-build YAML sanity check.
// Parses every YAML file under src/_data/ with js-yaml. On first parse error,
// prints a clean diagnostic pointing at the actual broken line and exits 1.
// Faster (and clearer) than letting Eleventy crash with a deep stack.

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { load } from 'js-yaml';

const dataDir = 'src/_data';
const files = readdirSync(dataDir, { recursive: true })
  .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
  .map(f => join(dataDir, f))
  .sort();

if (files.length === 0) {
  console.log('[check-yaml] no YAML files under src/_data/, skipping');
  process.exit(0);
}

let errors = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  try {
    load(text, { filename: file });
  } catch (err) {
    errors++;
    const mark = err.mark || {};
    const line = mark.line !== undefined ? mark.line + 1 : '?';
    const col = mark.column !== undefined ? mark.column + 1 : '?';
    console.error(`[check-yaml] ${file}:${line}:${col}`);
    console.error(`  ${err.reason || err.message}`);
    if (mark.snippet) {
      console.error(mark.snippet.split('\n').map(l => '  ' + l).join('\n'));
    }
  }
}

if (errors > 0) {
  console.error(`[check-yaml] ${errors} file(s) failed to parse`);
  process.exit(1);
}

console.log(`[check-yaml] ${files.length} YAML file(s) parsed OK`);
