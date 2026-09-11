// Minify the CSS that ends up in dist/.
//
// Brotli at the edge already does most of the work, so the gain here is modest
// (measured 2026-08-19: ~714 B on style.css, ~1 KB on article.css). It is kept
// because it compounds with caching and costs one build step.
//
// Two deliberate behaviours:
//   * A file is only replaced when minification makes it smaller on disk.
//     Note this compares RAW bytes, not compressed ones. animate.css shrinks
//     91 B raw but grows ~7 B after brotli, so it is still rewritten. That is
//     noise, and animate.css is loaded off the critical path anyway; comparing
//     compressed sizes would mean brotli-ing every file twice per build.
//   * A missing esbuild is a hard failure, not a silent skip. A minifier that
//     quietly does nothing is worse than no minifier: the build still passes
//     and nobody notices for months.
//
// Node 18 compatible on purpose — the Cloudflare Pages build image has shipped
// Node 18, and fs.globSync (Node 22+) has broken this build before.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CSS_DIR = "dist/assets/css";

let esbuild;
try {
  esbuild = await import("esbuild");
} catch {
  console.error("[minify-css] esbuild is not installed. It is a declared devDependency —");
  console.error("[minify-css] run `bun install`. Refusing to pass while doing nothing.");
  process.exit(1);
}

let files;
try {
  files = readdirSync(CSS_DIR).filter((f) => f.endsWith(".css"));
} catch {
  console.error(`[minify-css] ${CSS_DIR} not found — build before minifying.`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`[minify-css] no .css files in ${CSS_DIR} — that is not expected.`);
  process.exit(1);
}

let saved = 0;
for (const name of files) {
  const path = join(CSS_DIR, name);
  const before = statSync(path).size;
  const source = readFileSync(path, "utf8");

  const result = await esbuild.transform(source, { loader: "css", minify: true });
  const after = Buffer.byteLength(result.code);

  if (after < before) {
    writeFileSync(path, result.code);
    saved += before - after;
    console.log(`[minify-css] ${name}: ${before} -> ${after} B`);
  } else {
    console.log(`[minify-css] ${name}: already minimal, left as-is`);
  }
}

console.log(`[minify-css] done, ${saved} B removed before compression`);
