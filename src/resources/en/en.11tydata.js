module.exports = {
  layout: "layouts/blog.njk",
  eleventyComputed: {
    description: (data) => data.description || data.summary || data.subheadline || "",
  }
};
