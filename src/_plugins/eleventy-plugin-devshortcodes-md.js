// Markdown-it plugin to support Eleventy dev shortcodes syntax inside Markdown
// This allows paired tags like `{% todo "Note" %}...{% endtodo %}` to work even
// when Nunjucks is disabled for a page (e.g., when using `raw: true`).

module.exports = function(eleventyConfig) {
  const isDev = process.env.NODE_ENV !== 'production';

  eleventyConfig.amendLibrary('md', (md) => {
    // Helper: parse a quoted note argument
    function parseNote(arg) {
      if (!arg) return undefined;
      const m = arg.match(/"([\s\S]*?)"|\'([\s\S]*?)\'/);
      return m ? (m[1] || m[2]) : undefined;
    }

    // Render helpers matching the Nunjucks shortcodes output
    function renderTodoOpen(note) {
      const safeNote = note || 'TODO: This section is under development';
      return `<div class="dev-only-section" style="border: 2px dashed #ff6b6b; padding: 1rem; margin: 1rem 0; background: #fff3cd; border-radius: 4px;">
      <h4 style="color: #856404; margin: 0 0 0.5rem 0;">🚧 Development Only</h4>
      <p style="color: #856404; margin: 0 0 1rem 0; font-size: 0.9rem;">${safeNote}</p>`;
    }
    function renderTodoClose() { return `</div>`; }

    function renderWipOpen(note) {
      const safeNote = note || 'Work in progress';
      return `<div class="wip-section" style="border: 2px dashed #17a2b8; padding: 1rem; margin: 1rem 0; background: #d1ecf1; border-radius: 4px;">
        <h4 style="color: #0c5460; margin: 0 0 0.5rem 0;">⚠️ Work In Progress</h4>
        <p style="color: #0c5460; margin: 0 0 1rem 0; font-size: 0.9rem;">${safeNote}</p>`;
    }
    function renderWipClose() { return `</div>`; }

    function renderDevNote(note) {
      if (!note) return '';
      return `<div class="dev-note" style="background: #fff3cd; color: #856404; padding: 0.1rem 0.2rem; border-radius: 3px; font-size: 0.6rem; z-index:1000">${note}</div>`;
    }

    // Block rule to handle paired tags: todo/devonly/prodonly/wip
    md.block.ruler.before('paragraph', 'devshortcodes_block', function(state, startLine, endLine, silent) {
      const pos = state.bMarks[startLine] + state.tShift[startLine];
      const max = state.eMarks[startLine];
      if (pos >= max) return false;

      const line = state.src.slice(pos, max).trim();
      const openMatch = line.match(/^\{\%\s*(todo|devonly|prodonly|wip)(\s+[\s\S]*?)?\s*\%\}$/);
      if (!openMatch) return false;
      if (silent) return true;

      const tag = openMatch[1];
      const arg = (openMatch[2] || '').trim();
      const endTag = `{% end${tag} %}`;

      // Find the closing tag line
      let nextLine = startLine + 1;
      let found = false;
      while (nextLine < endLine) {
        const lpos = state.bMarks[nextLine] + state.tShift[nextLine];
        const lmax = state.eMarks[nextLine];
        const l = state.src.slice(lpos, lmax).trim();
        if (l === endTag) { found = true; break; }
        nextLine++;
      }

      if (!found) {
        // No matching close tag; treat as normal paragraph
        return false;
      }

      // Extract inner content between open and close
      const contentStart = state.bMarks[startLine + 1];
      const contentEnd = state.bMarks[nextLine];
      const inner = state.src.slice(contentStart, contentEnd);

      // Build output tokens
      // Behavior mirrors Nunjucks shortcodes:
      // - todo: render only in dev; otherwise remove
      // - devonly: render only in dev
      // - prodonly: render only in prod
      // - wip: render in both; dev gets wrapper with note
      if (tag === 'todo') {
        if (isDev) {
          const tOpen = state.push('html_block', '', 0);
          tOpen.content = renderTodoOpen(parseNote(arg));
          // Parse inner markdown
          state.md.block.parse(inner, state.md, state.env, state.tokens);
          const tClose = state.push('html_block', '', 0);
          tClose.content = renderTodoClose();
        }
        // In prod: omit entirely
      } else if (tag === 'devonly') {
        if (isDev) {
          // No wrapper, just parse inner content in dev
          state.md.block.parse(inner, state.md, state.env, state.tokens);
        }
      } else if (tag === 'prodonly') {
        if (!isDev) {
          state.md.block.parse(inner, state.md, state.env, state.tokens);
        }
      } else if (tag === 'wip') {
        if (isDev) {
          const tOpen = state.push('html_block', '', 0);
          tOpen.content = renderWipOpen(parseNote(arg));
          state.md.block.parse(inner, state.md, state.env, state.tokens);
          const tClose = state.push('html_block', '', 0);
          tClose.content = renderWipClose();
        } else {
          // In production, render content without wrapper
          state.md.block.parse(inner, state.md, state.env, state.tokens);
        }
      }

      state.line = nextLine + 1; // Move past the closing tag
      return true;
    });

    // Inline rule for {% devnote "text" %}
    md.inline.ruler.before('emphasis', 'devshortcodes_inline', function(state, silent) {
      const src = state.src;
      const pos = state.pos;
      if (src.charCodeAt(pos) !== 0x7B /* { */ || src.charCodeAt(pos + 1) !== 0x25 /* % */) {
        return false;
      }
      const m = src.slice(pos).match(/^\{\%\s*devnote(\s+[\s\S]*?)?\s*\%\}/);
      if (!m) return false;
      if (silent) return true;

      const arg = (m[1] || '').trim();
      const note = parseNote(arg);
      const token = state.push('html_inline', '', 0);
      token.content = isDev ? renderDevNote(note) : '';
      state.pos += m[0].length;
      return true;
    });
  });
};
