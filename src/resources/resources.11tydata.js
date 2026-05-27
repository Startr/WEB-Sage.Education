const path = require("path");

module.exports = {
  layout: "resource",
  tags: ["resources"],
  eleventyComputed: {
    description: (data) =>
      data.description || data.summary || data.subheadline || "",
    og: (data) => ({
      type: "article",
      image: data.social_image || data.hero || undefined,
    }),
    twitter: (data) => ({
      image: data.social_image || data.hero || undefined,
      image_alt: data.hero_alt || data.title,
    }),
    legacyEnPath: (data) =>
      `/posts/blog/en/${path.basename(data.page.inputPath, ".md")}/`,
  },
};
