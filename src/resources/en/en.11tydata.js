module.exports = {
  // page.fileSlug strips the YYYY-MM-DD- date prefix, so the URL stays clean.
  // Layout/tags/description cascade down from src/resources/resources.11tydata.js.
  permalink: "/resources/{{ page.fileSlug }}/",
};
