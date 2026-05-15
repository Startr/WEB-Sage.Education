const path = require("path");

module.exports = {
  layout: "layouts/blog.njk",
  tags: ["resources"],
  eleventyComputed: {
    description: (data) =>
      data.description || data.summary || data.subheadline || "",
    // Used only by /_redirects to emit one 301 per English post.
    // Preserves the full filename (including the YYYY-MM-DD- date prefix)
    // so we can reach the exact pre-migration URL.
    legacyEnPath: (data) =>
      `/posts/blog/en/${path.basename(data.page.inputPath, ".md")}/`,
  },
};
