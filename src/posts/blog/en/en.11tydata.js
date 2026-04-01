module.exports = {
  layout: "layouts/blog.njk",
  tags: ["post"],
  eleventyComputed: {
    description: (data) => data.description || data.summary || data.subheadline || "",
  }
};
