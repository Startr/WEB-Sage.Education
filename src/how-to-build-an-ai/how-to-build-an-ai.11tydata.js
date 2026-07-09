// Directory defaults for the "How to Build an AI" book.
//
// NOTE: chapters must NOT set `eleventyExcludeFromCollections` — the book
// templates find them via the per-book collection and booksBySlug. The book
// stays unlisted the same way the old single page was, but by different
// means: robots noindex (rendered by book-base.njk) + `sitemapExclude`
// (checked by sitemap.njk). feed.xml only iterates collections.resources,
// so chapters can never appear there.
module.exports = {
  layout: "books/chapter.njk",
  book: "how-to-build-an-ai",
  robots: "noindex, nofollow",
  sitemapExclude: true,
};
