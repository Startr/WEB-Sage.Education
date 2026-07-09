// Shared utilities and state for Wikilinks support
// This module is required by both the markdown-it plugin and computed data.

// Regex to find wiki links but not image embeds (ignore ![[...]]).
const wikilinkRegExp = /(?<!!)\[\[([^|]+?)(\|([\s\S]+?))?\]\]/g;

// Basic slugify: lower-case, trim, drop .md/.markdown, replace spaces with hyphens, strip non-word/dash
function slugify(input) {
  if (!input) return "";
  return String(input)
    .replace(/\.(md|markdown)\s?$/i, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// Parse [[Page Title|Override]] into objects
const parseWikilinks = (arr) => arr.map(link => {
  const parts = link.slice(2, -2).split("|");
  const slug = slugify(parts[0]);

  return {
    title: parts.length === 2 ? parts[1] : null,
    link,
    slug
  }
});

// Global cache: slug -> { permalink, title }
const linkMapCache = new Map();

// Compute backlinks for the current page and populate linkMapCache
function computeBacklinks(data) {
  try {
    if (!data || !data.collections || !Array.isArray(data.collections.all)) return [];

    const allPages = data.collections.all;
    // Derive current page slug from title, fallback to fileSlug or url
    const baseSlug = data.title || (data.page && data.page.fileSlug) || (data.page && data.page.url) || "";
    const currentSlug = slugify(baseSlug);
    const currentUrl = (data.page && data.page.url) || data.permalink || "";
    const currentTitle = data.title || currentSlug;

    let backlinks = [];
    let currentSlugs = [currentSlug];

    // Map current page
    if (currentSlug) {
      linkMapCache.set(currentSlug, {
        permalink: currentUrl,
        title: currentTitle
      });
    }

    // Map aliases if provided via front matter
    if (Array.isArray(data.aliases)) {
      for (const alias of data.aliases) {
        const aliasSlug = slugify(alias);
        if (!aliasSlug) continue;
        linkMapCache.set(aliasSlug, {
          permalink: currentUrl,
          title: alias
        });
        currentSlugs.push(aliasSlug)
      }
    }

    // Build outbound links for each page (cache on page.data)
    allPages.forEach(page => {
      try {
        if (!page.data.outboundLinks) {
          // Attempt to use original markdown content if available
          const pageContent = page.template && page.template.frontMatter
            ? page.template.frontMatter.content
            : (page.templateContent || "");
          const outboundLinks = (String(pageContent).match(wikilinkRegExp) || []);
          page.data.outboundLinks = parseWikilinks(outboundLinks);
        }

        // If the page links to our current page by any of our slugs, it's a backlink
        if (page.data.outboundLinks.some(link => currentSlugs.includes(link.slug))) {
          backlinks.push({
            url: page.url,
            title: page.data.title || page.url,
          });
        }
      } catch (_) {
        // Ignore issues on individual pages to avoid breaking the build
      }
    });

    return backlinks;
  } catch (_) {
    return [];
  }
}

module.exports = {
  wikilinkRegExp,
  parseWikilinks,
  linkMapCache,
  slugify,
  computeBacklinks,
};
