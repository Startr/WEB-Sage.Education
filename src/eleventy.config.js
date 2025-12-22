const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const yaml = require("js-yaml");

// Core 11ty plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const wikilinksPlugin = require("./_plugins/eleventy-plugin-wikilinks");
const devShortcodesMdPlugin = require("./_plugins/eleventy-plugin-devshortcodes-md");
const { computeBacklinks } = require("./_data/wikilinks");

// Custom plugins
const sectionizePlugin = require("./_plugins/eleventy-plugin-sectionize");
const highlightPlugin = require("./_plugins/eleventy-plugin-highlight");

module.exports = function(eleventyConfig) {
  // Environment setup
  const isDev = process.env.NODE_ENV !== 'production';
  // DRY helpers
  const SKIP_TAGS = new Set(["all", "nav", "post", "posts"]);
  const normalizeTags = (tags) => {
    if (!tags) return [];
    const arr = Array.isArray(tags) ? tags : [tags];
    return arr
      .map(t => t && t.toString().toLowerCase())
      .filter(t => t && !SKIP_TAGS.has(t));
  };
  const isChapterItem = (item) => {
    const slug = (item.fileSlug || "").toString().toLowerCase();
    const path = (item.inputPath || "").toString().toLowerCase();
    if (slug === "index") return false;
    if (/\/index\.md$/.test(path)) return false;
    return true;
  };
  const sortByOrder = (a, b) => (a.data.order || 999) - (b.data.order || 999);

  eleventyConfig.addGlobalData("isDev", isDev);
  eleventyConfig.addGlobalData("env", process.env.NODE_ENV || "development");

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

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").sort((a, b) => b.date - a.date);
  });

  const books = [
    { name: "handbook", glob: "books/handbook/*.md" },
    { name: "startr-here", glob: "books/startr-here/*.md" },
    { name: "gettingreal", glob: "books/gettingreal/*.md" },
    { name: "make-something", glob: "books/make-something/*.md" },
    { name: "workspace", glob: "features/workspace/*.md" },
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

  eleventyConfig.addFilter("slugify", (tag) => {
    return tag
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  });

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

  eleventyConfig.addTransform("lazy-load-images", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let out = content.replace(/<img(?!.*loading=)/g, '<img loading="lazy"');
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
      .getFilteredByGlob("books/**/*.md")
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