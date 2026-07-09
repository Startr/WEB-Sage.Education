// Markdown-it plugin for [[Wiki Links]] that integrates with a global link map cache.
// Usage: eleventyConfig.addPlugin(wikilinksPlugin);

const { linkMapCache, slugify } = require("../_data/wikilinks");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Global image index: filename → absolute URL path. Built once per build (and
// each dev rebuild) via the `eleventy.before` hook below. Lets ![[image.jpg]]
// resolve against any image anywhere under src/, not just sibling attachments/.
const IMAGE_EXTS = new Set(["png","jpg","jpeg","gif","svg","webp","avif"]);

// Paths whose "did you mean" alternates are suppressed from the rendered alt-link.
// Build-time collision logs still surface them — visual suppression only. Use
// this for intentional mirror folders (e.g., OG-image duplicates of attachments).
const IGNORE_ALTERNATE_PREFIXES = ['/assets/images/heroes/'];

let imageIndex = new Map();   // lowercaseFilename → urlPath[]
let imageHashes = new Map();  // urlPath → short sha1 (only populated for files in collision groups)

// Persistent across builds within the same Node process — keyed by url and
// invalidated when (size, mtime) drift. Skips re-hashing unchanged images on
// dev-server rebuilds. Self-correcting: stale entries get overwritten on miss.
const hashCache = new Map();  // urlPath → { size, mtime, hash }

function buildImageIndex(srcRoot) {
  // Returns { index, hashes }:
  //   index : Map<lowercaseFilename, urlPath[]> (case-insensitive lookup; values keep on-disk casing)
  //   hashes: Map<urlPath, shortSha1> (populated only for files in collision groups)
  const index = new Map();
  const hashes = new Map();
  const stack = [srcRoot];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch (_) { continue; }
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '_site') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { stack.push(full); continue; }
      if (!entry.isFile()) continue;
      const ext = entry.name.split('.').pop().toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;
      const rel = path.relative(srcRoot, full).split(path.sep).join('/');
      const url = `/${rel}`;
      const key = entry.name.toLowerCase();
      const arr = index.get(key);
      if (arr) arr.push(url);
      else index.set(key, [url]);
    }
  }
  // For collision groups: sort for deterministic chosen candidate, hash each
  // file so render-time can suppress byte-identical mirrors, and log a single
  // line per group distinguishing identical-content from genuinely different.
  for (const [key, urls] of index) {
    urls.sort();
    if (urls.length <= 1) continue;
    const hashByUrl = new Map();
    for (const url of urls) {
      const fsPath = path.join(srcRoot, url.slice(1));
      try {
        const st = fs.statSync(fsPath);
        const cached = hashCache.get(url);
        let h;
        if (cached && cached.size === st.size && cached.mtime === st.mtimeMs) {
          h = cached.hash;
        } else {
          h = crypto.createHash('sha1').update(fs.readFileSync(fsPath)).digest('hex').slice(0, 12);
          hashCache.set(url, { size: st.size, mtime: st.mtimeMs, hash: h });
        }
        hashByUrl.set(url, h);
        hashes.set(url, h);
      } catch (_) {}
    }
    const uniqueHashes = new Set(hashByUrl.values());
    try {
      const lines = urls.map(u => `  ${u}${hashByUrl.has(u) ? `  (${hashByUrl.get(u)})` : ''}`).join('\n');
      const note = uniqueHashes.size <= 1
        ? `${urls.length} mirrors, identical content — alt-link suppressed`
        : `${urls.length} paths, ${uniqueHashes.size} unique contents — alt-link will fire`;
      console.warn(`[wikilinks] image collision: "${key}" — ${note}\n${lines}`);
    } catch (_) {}
  }
  return { index, hashes };
}

module.exports = function(eleventyConfig) {
  // Build the global image index once per (re)build — pure O(1) lookups thereafter.
  eleventyConfig.on('eleventy.before', () => {
    const built = buildImageIndex(path.resolve(__dirname, '..'));
    imageIndex = built.index;
    imageHashes = built.hashes;
  });

  // Amend existing markdown-it instance so it composes with other plugins.
  eleventyConfig.amendLibrary('md', (md) => {
  // --- Page wikilinks [[Page Title]] ---
  md.linkify.add("[[", {
      // Recognize Mediawiki-style links ([[text]] or [[text|Title]])
      validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
      normalize: match => {
        const parts = match.raw.slice(2, -2).split("|");
        const slug = slugify(parts[0]);
        const found = linkMapCache.get(slug);

        if (!found) {
          // Always degrade to an in-page TODO anchor for missing targets
          // Build the anchor from the intended target text using underscores
          const rawTarget = parts[0].replace(/\.(md|markdown)\s?$/i, '').trim();
          const todoId = 'todo_' + rawTarget
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '_')
            .replace(/_+/g, '_');

          try { console.warn(`[wikilinks] Missing page for: ${rawTarget} → #${todoId} (from ${match.raw})`); } catch (_) {}
          match.text = parts.length === 2 ? parts[1] : rawTarget;
          match.url = `#${todoId}`;
          return;
        }

        match.text = parts.length === 2
          ? parts[1]
          : found.title;

        match.url = found.permalink && found.permalink.substring(0,1) === '/'
          ? found.permalink
          : `/${found.permalink || ''}`;
      }
    });

    // --- Media embeds ![[path|Alt]] ---
    // We implement this as a core rule to transform inline text tokens containing ![[...]]
    const embedRegex = /!\[\[([^\]|]+?)(\|([^\]]+))?\]\]/g; // ![[path|Alt Text]]
    const imageExtensions = new Set(["png","jpg","jpeg","gif","svg","webp","avif"]);

    const embedRule = (state) => {
      for (let i = 0; i < state.tokens.length; i++) {
        const token = state.tokens[i];
        if (token.type !== 'inline' || !token.children || token.children.length === 0) continue;

        let j = 0;
        while (j < token.children.length) {
          const child = token.children[j];
          if (child.type !== 'text' || !child.content.includes('![[')) { j++; continue; }

          const srcText = child.content;
          const matches = Array.from(srcText.matchAll(embedRegex));
          if (!matches.length) { j++; continue; }

          let lastIndex = 0;
          const newTokens = [];

          for (const m of matches) {
            // Text before match
            if (m.index > lastIndex) {
              const before = new state.Token('text', '', 0);
              before.content = srcText.slice(lastIndex, m.index);
              newTokens.push(before);
            }

            const rawPath = (m[1] || '').trim();
            const altRaw = (m[3] || '').trim();
            const hasLeadingSlash = rawPath.startsWith('/');
            const hasSlash = rawPath.includes('/');
            let src;
            let alternates = [];
            if (hasLeadingSlash) {
              src = rawPath;
            } else if (hasSlash) {
              // Path-qualified but not absolute; prepend slash (legacy behavior).
              src = `/${rawPath}`;
            } else {
              // Bare filename — case-insensitive index lookup, prefer sibling attachments/.
              const allPaths = imageIndex.get(rawPath.toLowerCase()) || [];
              let localPrefix = null;
              if (state.env && state.env.page && state.env.page.inputPath) {
                const srcDir = path.dirname(state.env.page.inputPath).replace(/^\.?\/?/, '');
                if (srcDir && srcDir !== '.') localPrefix = `/${srcDir}/attachments/`.toLowerCase();
              }
              const localMatch = localPrefix
                ? allPaths.find(p => p.toLowerCase().startsWith(localPrefix))
                : null;
              src = localMatch || allPaths[0] || `/${rawPath}`;
              const chosenHash = imageHashes.get(src);
              alternates = allPaths.filter(p => {
                if (p === src) return false;
                if (IGNORE_ALTERNATE_PREFIXES.some(prefix => p.startsWith(prefix))) return false;
                const altHash = imageHashes.get(p);
                if (chosenHash && altHash && chosenHash === altHash) return false;
                return true;
              });
              if (allPaths.length === 0) {
                try {
                  const from = state.env && state.env.page && state.env.page.inputPath ? ` (from ${state.env.page.inputPath})` : '';
                  console.warn(`[wikilinks] Missing image for: ${rawPath}${from}`);
                } catch (_) {}
              }
            }
            const ext = rawPath.split('.').pop().toLowerCase();

            if (imageExtensions.has(ext)) {
              const alt = altRaw || rawPath
                .split('/')
                .pop()
                .replace(/\.[^.]+$/, '')
                .replace(/[._-]+/g, ' ')
                .trim();
              let html = `<img src="${src}" alt="${alt}" style="--br: 1rem; --shadow: 8;">`;
              if (alternates.length > 0) {
                const links = alternates.map(p => `<a href="${p}">${p}</a>`);
                const text = links.length === 1
                  ? `↗ did you mean ${links[0]}?`
                  : `↗ did you mean ${links.slice(0, -1).join(', ')} or ${links[links.length - 1]}?`;
                html += `<small class="wikilink-alt" style="display:block;opacity:.45;font-size:.7em;margin-top:-.25em;font-style:italic">${text}</small>`;
              }
              const htmlToken = new state.Token('html_inline', '', 0);
              htmlToken.content = html;
              newTokens.push(htmlToken);
            } else {
              // Fallback to a link for non-image files
              const text = altRaw || rawPath.split('/').pop();
              const html = `<a href="${src}">${text}</a>`;
              const htmlToken = new state.Token('html_inline', '', 0);
              htmlToken.content = html;
              newTokens.push(htmlToken);
            }

            lastIndex = m.index + m[0].length;
          }

          // Trailing text after last match
          if (lastIndex < srcText.length) {
            const after = new state.Token('text', '', 0);
            after.content = srcText.slice(lastIndex);
            newTokens.push(after);
          }

          // Replace the current child token with new tokens
          token.children.splice(j, 1, ...newTokens);
          j += newTokens.length; // advance past inserted tokens
        }
      }
    };

    md.core.ruler.after('inline', 'wikilink_embeds', embedRule);
  });
};
