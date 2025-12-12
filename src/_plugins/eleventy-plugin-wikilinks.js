// Markdown-it plugin for [[Wiki Links]] that integrates with a global link map cache.
// Usage: eleventyConfig.addPlugin(wikilinksPlugin);

const { linkMapCache, slugify } = require("../_data/wikilinks");

module.exports = function(eleventyConfig) {
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
            const src = hasLeadingSlash ? rawPath : `/${rawPath}`;
            const ext = rawPath.split('.').pop().toLowerCase();

            if (imageExtensions.has(ext)) {
              const alt = altRaw || rawPath
                .split('/')
                .pop()
                .replace(/\.[^.]+$/, '')
                .replace(/[._-]+/g, ' ')
                .trim();
              const html = `<img src="${src}" alt="${alt}">`;
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
