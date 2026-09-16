// Directory defaults for the "Designing Your School's Healthy AI Policy" module.
//
// Gating here is deliberate and narrow: `gateEligible` is the per-page
// `gated: true` veto ONLY, never the age cascade that governs articles. A
// coaching module does not get less public as it ages, so the two toolkit
// pages (Express Lane, Starter Kit) are gated from day one and every other
// page stays open forever.
//
// Unlisted the same way "How to Build an AI" is: robots noindex plus
// `sitemapExclude` (read by sitemap.njk). feed.xml only iterates
// collections.resources, so chapters can never appear there.
module.exports = {
  layout: "books/chapter.njk",
  book: "healthy-ai-policy",
  contentType: "curriculum",
  robots: "noindex, nofollow",
  sitemapExclude: true,
  eleventyComputed: {
    gateEligible: (data) => data.gated === true,
  },
};
