const { DateTime } = require("luxon");
const { spawnSync } = require("child_process");
const path = require("path");
const markdownItAnchor = require("markdown-it-anchor");
const yaml = require("js-yaml");

// Core 11ty plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const wikilinksPlugin = require("./_plugins/eleventy-plugin-wikilinks");
const devShortcodesMdPlugin = require("./_plugins/eleventy-plugin-devshortcodes-md");
const { computeBacklinks } = require("./_data/wikilinks");

// Custom plugins
const sectionizePlugin = require("./_plugins/eleventy-plugin-sectionize");
const highlightPlugin = require("./_plugins/eleventy-plugin-highlight");

module.exports = async function(eleventyConfig) {
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  eleventyConfig.on("eleventy.before", () => {
    if (process.env.SKIP_ARTICLE_AUDIT === "1") return;

    const repoRoot = path.resolve(__dirname, "..");
    const runner = path.join(repoRoot, "tools", "run-article-audit.py");
    const pythonBin = process.env.PYTHON_BIN || "python3";

    const result = spawnSync(pythonBin, [runner], {
      cwd: repoRoot,
      stdio: "inherit",
    });

    if (result.error) {
      console.warn(`[audit] Unable to run article audit: ${result.error.message}`);
      return;
    }

    if (result.status !== 0) {
      console.warn(`[audit] Article audit exited with status ${result.status}`);
    }
  });

  // POKA-YOKE: after each build, scan rendered HTML for the dead /posts/blog/
  // URL shape. Any hit means a new post body, partial, or data file leaked
  // an old-shape link past the migration — fix the source, don't rely on
  // the _redirects 301 hop. Skip _redirects itself (it intentionally maps
  // the old shape) and only scan .html files.
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const fs = require("fs");
    const distDir = path.resolve(__dirname, dir.output || "../dist");
    if (!fs.existsSync(distDir)) return;
    // Second check, same walk: a raw PLACEHOLDER token that reached a built page.
    // This is a lint, not a gate. Publishing a chapter before its film is shot is
    // normal and good, and the `filmFrame` shortcode makes it safe — it renders a
    // coming-soon card for any non-id. A raw token surviving to HTML therefore means
    // someone hand-wrote an iframe instead of using the shortcode, which is worth
    // saying out loud but must never block a build.
    const PLACEHOLDER_RE = /PLACEHOLDER[A-Z0-9_]*/;
    const walk = (d, hits, placeholders) => {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) walk(full, hits, placeholders);
        else if (entry.isFile() && entry.name.endsWith(".html")) {
          const text = fs.readFileSync(full, "utf8");
          if (text.includes('"/posts/blog/') || text.includes("'/posts/blog/")) {
            hits.push(full);
          }
          const m = text.match(PLACEHOLDER_RE);
          if (m) placeholders.push([full, m[0]]);
        }
      }
    };
    const hits = [];
    const placeholders = [];
    walk(distDir, hits, placeholders);
    if (hits.length) {
      console.warn(`[poka-yoke] /posts/blog/ URL shape found in ${hits.length} built HTML file(s) — likely a regression from the /resources/ migration. Files:`);
      for (const f of hits) console.warn(`  ${path.relative(distDir, f)}`);
      console.warn("[poka-yoke] Fix at source: rewrite the link to /resources/SLUG/. The _redirects file will still catch external traffic, but in-tree links should not need a 301 hop.");
    }
    if (placeholders.length) {
      // Informational only. Since filmFrame renders a coming-soon card for any
      // non-id, a placeholder no longer produces a dead embed — so this must not
      // block a build. It used to throw in production, which stopped us publishing
      // a finished chapter just because its film wasn't shot yet. Exactly backwards.
      console.warn(`[poka-yoke] ${placeholders.length} built page(s) still contain a raw PLACEHOLDER token:`);
      for (const [f, token] of placeholders) {
        console.warn(`  ${path.relative(distDir, f)} — ${token}`);
      }
      console.warn("[poka-yoke] Not a blocker. But prefer {% filmFrame \"\", \"Title\" %} over a hand-written iframe — it renders a coming-soon card instead of a raw token.");
    }
  });

  // Print the LAN URLs, not just localhost, when the dev server starts.
  //
  // The server already binds every interface — @11ty/eleventy-dev-server calls
  // `server.listen({ port })` with no host, which in Node means 0.0.0.0/::. So
  // sharing a dev build with the team has always worked; the banner just never
  // said what URL to send them, because `showAllHosts` defaults to false and the
  // startup line reads `http://localhost:8080/`. That reads exactly like
  // "localhost only" and sends you looking for a bind setting that doesn't exist.
  //
  // NOTE: if a teammate still can't connect after this, it is not Eleventy and
  // it is not the runtime. Measured on the dev Mac 2026-07-27: the socket binds
  // dual-stack (`netstat -an -p tcp | grep LISTEN` shows `tcp46 *.8080`), and
  // yet every IPv4 path fails while IPv6 loopback serves 200. It reproduces
  // identically under node, under `bunx --bun`, and under a plain
  // `python3 -m http.server --bind 0.0.0.0` — so it is machine-wide, not
  // per-app and not per-runtime.
  //
  // The cause is the macOS Application Firewall with **stealth mode on**:
  //   /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
  //   /usr/libexec/ApplicationFirewall/socketfilterfw --getstealthmode
  // Stealth mode *drops* inbound packets rather than refusing them, which is
  // why 127.0.0.1 times out instead of erroring instantly — that timeout-vs-
  // refused distinction is the fastest way to tell this apart from "nothing is
  // listening". Changing it needs the admin account.
  //
  // Don't try to fix this in Eleventy config. There is no host/bind option that
  // helps: eleventy-dev-server calls `server.listen({ port })` with no host, and
  // the bind is already correct.
  eleventyConfig.setServerOptions({
    showAllHosts: true,
  });

  // Environment setup
  const isDev = process.env.NODE_ENV !== 'production';
  // DRY helpers
  const SKIP_TAGS = new Set(["all", "nav", "post", "posts", "resource", "resources"]);
  // Single source of truth for tag slugs. Used by the `slugify` filter AND
  // by normalizeTags below, so the values feeding `collections.tagList`,
  // `collections.normalizedTagCollections`, the tag-chip links, and the
  // tag-page permalink all collapse to the same string. Pre-fix: chips used
  // slugify, the permalink didn't — so tags like "ai rules" or "growth
  // mindset" rendered chip links to /tags/ai-rules/ but the page lived at
  // /tags/ai rules/. 404.
  const slugifyTag = (tag) => tag
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
  const normalizeTags = (tags) => {
    if (!tags) return [];
    const arr = Array.isArray(tags) ? tags : [tags];
    const slugged = arr
      .map(t => t && slugifyTag(t))
      .filter(t => t && !SKIP_TAGS.has(t));
    // De-dupe: post.data.tags may contain casing variants ("AI" and "ai")
    // that collapse to the same slug; collapse them here too so the chip
    // doesn't repeat.
    return [...new Set(slugged)];
  };
  const isChapterItem = (item) => {
    const slug = (item.fileSlug || "").toString().toLowerCase();
    const path = (item.inputPath || "").toString().toLowerCase();
    if (slug === "index") return false;
    if (/\/index\.md$/.test(path)) return false;
    return true;
  };
  const sortByOrder = (a, b) => (a.data.order ?? 999) - (b.data.order ?? 999);

  eleventyConfig.addGlobalData("isDev", isDev);
  eleventyConfig.addGlobalData("env", process.env.NODE_ENV || "development");

  // buildDate — stable per-build timestamp consulted by the signup-gate
  // cascade in _data/signup_gate.yaml via resources/resources.11tydata.js's
  // `gateEligible` computed field. Daily rebuild cron picks up
  // threshold-crossing articles. Used by the gate, not directly by templates.
  eleventyConfig.addGlobalData("buildDate", () => new Date().toISOString());

  eleventyConfig.addPairedShortcode("devonly", function(content) {
    return isDev ? content : "";
  });

  eleventyConfig.addPairedShortcode("prodonly", function(content) {
    return !isDev ? content : "";
  });

  eleventyConfig.addPairedShortcode("todo", function(content, note = "TODO: This section is under development") {
    if (!isDev) return "";
    return `<div class="dev-only-section" style="border: 2px dashed #ff6b6b; padding: 1rem; margin: 1rem 0; background: #fff3cd; border-radius: 4px;">
      <h4 style="color: #856404; margin: 0 0 0.5rem 0;">Development Only</h4>
      <p style="color: #856404; margin: 0 0 1rem 0; font-size: 0.9rem;">${note}</p>
      ${content}
    </div>`;
  });

  eleventyConfig.addPairedShortcode("wip", function(content, note = "Work in progress") {
    const wrapper = isDev
      ? `<div class="wip-section" style="border: 2px dashed #17a2b8; padding: 1rem; margin: 1rem 0; background: #d1ecf1; border-radius: 4px;">
        <h4 style="color: #0c5460; margin: 0 0 0.5rem 0;">Work In Progress</h4>
        <p style="color: #0c5460; margin: 0 0 1rem 0; font-size: 0.9rem;">${note}</p>
        ${content}
      </div>`
      : content;
    return wrapper;
  });

  eleventyConfig.addShortcode("devnote", function(note) {
    return isDev
      ? `<div class="dev-note" style="background: #fff3cd; color: #856404; padding: 0.1rem 0.2rem; border-radius: 3px; font-size: 0.6rem; z-index:1000">${note}</div>`
      : "";
  });

  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false,
  });

  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  eleventyConfig.addTemplateFormats("md");

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM dd, yyyy");
  });

  // Author filter for the /authors/<slug>/ profile pages. Matches BOTH the
  // kebab-case slug (new pattern) and the full-name string (legacy pattern
  // used in older resources). Newest first.
  eleventyConfig.addFilter("byAuthor", (collection, slug, name) =>
    collection
      .filter(p => p.data.author === slug || p.data.author === name)
      .sort((a, b) => b.date - a.date)
  );

  // Resolve an `author` frontmatter value (slug OR full name) to a slug key
  // in authors.yaml so the byline macro can render a profile link for both.
  // Returns null if the value matches neither — caller renders the value as
  // a plain string in that case.
  eleventyConfig.addFilter("authorSlug", (author, authors) => {
    if (!author || !authors) return null;
    if (authors[author]) return author;
    for (const [slug, profile] of Object.entries(authors)) {
      if (profile && profile.name === author) return slug;
    }
    return null;
  });

  eleventyConfig.addCollection("resources", function(collectionApi) {
    // Only English builds (de/fr/pt set eleventyExcludeFromCollections), so
    // collisions on page.fileSlug aren't possible here today.
    const items = collectionApi.getFilteredByGlob("resources/**/*.md").sort((a, b) => b.date - a.date);
    if (items.length === 0) console.warn('[resources] collection is empty — check resources/**/*.md glob');
    return items;
  });

  const books = [
    { name: "handbook", glob: "books/handbook/*.md" },
    { name: "startr-here", glob: "books/startr-here/*.md" },
    { name: "gettingreal", glob: "books/gettingreal/*.md" },
    { name: "make-something", glob: "books/make-something/*.md" },
    { name: "workspace", glob: "features/workspace/*.md" },
    // "How to Build an AI" — the summer-program guide book, mounted at its
    // original URL (/how-to-build-an-ai/) rather than under /books/.
    { name: "how-to-build-an-ai", glob: "how-to-build-an-ai/*.md" },
  ];

  for (const book of books) {
    eleventyConfig.addCollection(book.name, function(collectionApi) {
      const items = collectionApi.getFilteredByGlob(book.glob).filter(isChapterItem);
      return items.sort(sortByOrder);
    });
  }

  eleventyConfig.addCollection("allBooks", function(collectionApi) {
    return collectionApi.getFilteredByGlob("books/**/*.md").sort((a, b) => {
      const aBook = a.data.book || "unknown";
      const bBook = b.data.book || "unknown";
      if (aBook !== bBook) {
        return aBook.localeCompare(bBook);
      }
      const aOrder = a.data.order || 999;
      const bOrder = b.data.order || 999;
      return aOrder - bOrder;
    });
  });

  eleventyConfig.addCollection("bookIndexes", function(collectionApi) {
    return collectionApi.getFilteredByGlob([
      "books/*/index.njk",
      "features/workspace/index.njk",
      "how-to-build-an-ai/index.njk",
    ]);
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      normalizeTags(item.data.tags).forEach((t) => tagSet.add(t));
    });
    return [...tagSet].sort();
  });

  eleventyConfig.addCollection("normalizedTagCollections", function(collectionApi) {
    const tagMap = {};
    collectionApi.getAll().forEach((item) => {
      normalizeTags(item.data.tags).forEach((tag) => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push(item);
      });
    });
    return tagMap;
  });

  eleventyConfig.addFilter("filterTagList", (tags) => normalizeTags(tags));

  eleventyConfig.addFilter("slugify", slugifyTag);

  const sharedMarkdown = require("markdown-it")({ html: true, breaks: true, linkify: true });
  eleventyConfig.addFilter("markdown", function(content) {
    if (!content) return "";
    return sharedMarkdown.render(content);
  });

  eleventyConfig.addFilter("md", function(content) {
    if (!content) return "";
    return sharedMarkdown.render(content);
  });

  eleventyConfig.addFilter("mdInline", function(content) {
    if (!content) return "";
    return sharedMarkdown.renderInline(content);
  });

  eleventyConfig.addFilter("slice", (array, start, end) => {
    if (!Array.isArray(array)) return array;
    return array.slice(start, end);
  });

  const passthroughCopies = {
    "./Sign-up-Now_files/": "/Sign-up-Now_files/",
    "/admin/": "/admin/",
    "/assets/": "/assets/",
    "/images/": "/images/",
    "/js/": "/js/",
    "/books/": "/books/",
    "robots.txt": "/robots.txt",
    "manifest.json": "/manifest.json",
  };

  Object.entries(passthroughCopies).forEach(([src, dest]) => {
    eleventyConfig.addPassthroughCopy({ [src]: dest });
  });

  const assetTypes = [
    "**/*{.css,.css.map,css2}",
    "**/*.{png,jpg,jpeg,gif,svg,webp}",
    "**/*.{mp4,webm}",
    "**/*.yml",
    "**/*.yaml",
    "**/*.ico",
    "admin/",
    "assets/",
  ];

  assetTypes.forEach((pattern) => {
    eleventyConfig.addPassthroughCopy(pattern);
  });

  eleventyConfig.ignores.add("admin/");

  eleventyConfig.addPlugin(sectionizePlugin);
  eleventyConfig.addPlugin(highlightPlugin);

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(devShortcodesMdPlugin);
  eleventyConfig.addPlugin(wikilinksPlugin);

    // Image shortcode: {% img "src" "alt" "--maxw:20ch; --br:8px" %}
  eleventyConfig.addShortcode("img", function(src, alt = "", style = "") {
    const baseStyle = "--maxw:40ch; --d:block; --m:auto;";
    const merged = style ? `${baseStyle} ${style}` : baseStyle;
    return `<img src="${src}" alt="${alt}" loading="lazy" style="${merged}">`;
  });

  // filmFrame — a chapter's video slot, which renders whether or not the film exists.
  //
  // POKA-YOKE by construction: a chapter is often written and published before its
  // film is shot. Hand-writing the iframe meant a not-yet-recorded chapter shipped a
  // dead embed (a blank grey box that looks broken), so the only safe options were
  // "hold the chapter back" or "ship something broken". Neither is good: the written
  // chapter is useful on its own.
  //
  // So the id is validated. A real YouTube id is 11 chars of [A-Za-z0-9_-]; anything
  // else — empty, TBD, PLACEHOLDER, or a typo — renders an on-brand "film coming
  // soon" card instead. There is no input that produces a dead iframe, which is why
  // this replaced a build-time gate: the invalid state is unrepresentable rather than
  // merely blocked.
  //
  // Usage in a chapter:
  //   {% filmFrame "MMQYKeIHjLs", "Catch bad advice" %}
  //   {% filmFrame "", "Name and build your agent" %}   → coming-soon card
  const YT_ID = /^[A-Za-z0-9_-]{11}$/;
  eleventyConfig.addShortcode("filmFrame", function(embedId = "", title = "") {
    const frameStyle =
      "--maxw:820px; --m:2rem auto; --br:14px; --of:hidden; --shadow:14; " +
      "--bg:linear-gradient(135deg, #2563EB, #5522FA); --p:4px;";
    const safeTitle = String(title).replace(/[<>&"]/g, (c) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c],
    );

    if (YT_ID.test(String(embedId).trim())) {
      return `<div class="premiere-frame" style="${frameStyle}">
  <iframe src="https://www.youtube.com/embed/${embedId.trim()}"
    title="How to Build an AI — ${safeTitle}" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>`;
    }

    // Coming-soon card. Inline SVG: no external request, nothing to 404, and it
    // inherits the 16:9 sizing that web-book.css already gives .premiere-frame svg.
    const label = safeTitle
      ? `Film coming soon: ${safeTitle}`
      : "Film coming soon";
    return `<div class="premiere-frame" style="${frameStyle}">
  <svg viewBox="0 0 1600 900" role="img" aria-label="${label}. The written chapter below covers everything in it.">
    <defs>
      <linearGradient id="ff-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2563EB"/>
        <stop offset="0.55" stop-color="#3b2fe8"/>
        <stop offset="1" stop-color="#5522FA"/>
      </linearGradient>
      <radialGradient id="ff-glow" cx="0.5" cy="0.38" r="0.55">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#ff-bg)"/>
    <rect width="1600" height="900" fill="url(#ff-glow)"/>
    <circle cx="1330" cy="180" r="240" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
    <circle cx="250" cy="780" r="300" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
    <circle cx="800" cy="392" r="86" fill="#ffffff" fill-opacity="0.14"/>
    <path d="M772 350 l58 42 -58 42 z" fill="#ffffff" fill-opacity="0.75"/>
    <text x="800" y="560" text-anchor="middle" font-family="Poppins, sans-serif" font-size="30" font-weight="600" letter-spacing="6" fill="#ffffff" fill-opacity="0.85">FILM COMING SOON</text>
    <text x="800" y="632" text-anchor="middle" font-family="Poppins, sans-serif" font-size="36" font-weight="400" fill="#ffffff" fill-opacity="0.9">Everything it covers is written below.</text>
  </svg>
</div>`;
  });


  eleventyConfig.addTransform("lazy-load-images", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      const isPostPage = /(^|\/)resources\//i.test(outputPath);
      const postDefaultStyle = "--br: 1rem; --shadow: 6;";
      let out = content.replace(/<img\b[^>]*>/gi, (imgTag) => {
        let next = imgTag;

        if (!/\sloading\s*=\s*["']/i.test(next)) {
          next = next.replace(/<img\b/i, '<img loading="lazy"');
        }

        if (!isPostPage) return next;

        if (/\sstyle\s*=\s*["']/i.test(next)) {
          next = next.replace(/style\s*=\s*(["'])(.*?)\1/i, (match, quote, styleValue) => {
            let mergedStyle = styleValue;
            if (!/--br\s*:/i.test(mergedStyle)) mergedStyle = `${mergedStyle} --br: 1rem;`;
            if (!/--shadow\s*:/i.test(mergedStyle)) mergedStyle = `${mergedStyle} --shadow: 6;`;
            return `style=${quote}${mergedStyle.trim()}${quote}`;
          });
        } else {
          next = next.replace(/<img\b/i, `<img style="${postDefaultStyle}"`);
        }

        return next;
      });
      const todoAnchorRegex = /href="#todo_([a-z0-9_]+)"/gi;
      const seen = new Set();
      let m;
      while ((m = todoAnchorRegex.exec(out)) !== null) {
        seen.add(m[1]);
      }
      if (seen.size) {
        const anchors = Array.from(seen)
          .map((slug) => `<div id="todo_${slug}" class="todo-missing-link" style="display:none"></div>`)
          .join("");
        if (out.includes("</body>")) {
          out = out.replace("</body>", `${anchors}\n</body>`);
        } else {
          out += anchors;
        }
      }
      return out;
    }
    return content;
  });

  eleventyConfig.addCollection("books", function(collectionApi) {
    return collectionApi.getFilteredByGlob("books/**/*.md");
  });

  eleventyConfig.addCollection("booksBySlug", function(collectionApi) {
    const grouped = {};
    const all = collectionApi
      .getFilteredByGlob(["books/**/*.md", "how-to-build-an-ai/*.md"])
      .filter(isChapterItem)
      .sort(sortByOrder);
    for (const item of all) {
      const slug = item.data.book || "unknown";
      if (!grouped[slug]) grouped[slug] = [];
      grouped[slug].push(item);
    }
    return grouped;
  });

  eleventyConfig.addCollection("newsletters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("newsletter/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("findBySlug", function(collection, slug) {
    return collection.find((item) => item.data.book === slug);
  });

  eleventyConfig.addFilter("findIndex", function(array, key, value) {
    return array.findIndex((item) => item[key] === value);
  });

  eleventyConfig.addGlobalData("eleventyComputed", (data) => {
    const out = {
      backlinks: computeBacklinks(data),
    };
    try {
      const inputPath = (data.page && data.page.inputPath) || "";
      const isMarkdown = typeof inputPath === "string" && inputPath.toLowerCase().endsWith(".md");
      const isBookArea = /(^|\/)books\//i.test(inputPath) || /(^|\/)features\/workspace\//i.test(inputPath);
      if (isMarkdown && isBookArea && data.raw === true) {
        out.templateEngineOverride = "md";
      }
    } catch (e) {
      /* no-op */
    }
    return out;
  });

  eleventyConfig.addShortcode("backlinksList", function(backlinks) {
    if (!Array.isArray(backlinks) || backlinks.length === 0) return "";
    const items = backlinks.map((l) => `<li><a href="${l.url}">${l.title}</a></li>`).join("");
    return `<nav class="backlinks"><h3>Linking here</h3><ul>${items}</ul></nav>`;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "../dist",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};