const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const yaml = require("js-yaml");

// Core 11ty plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

// Custom plugins
const sectionizePlugin = require("./_plugins/eleventy-plugin-sectionize");

module.exports = function(eleventyConfig) {
  // Explicitly set Nunjucks as the engine for .njk files
  eleventyConfig.setTemplateFormats(["html", "njk", "md"]); // Ensure njk is listed
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true, // Optional: helps catch errors
    autoescape: false, // Optional: adjust based on needs
  });

  // File Processing
  // --------------
  
  // YAML Support
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));

  // Markdown Configuration
  eleventyConfig.addTemplateFormats("md");
  const markdownOptions = {
    html: true,      // Enable HTML inside Markdown
    breaks: true,    // Convert line breaks to <br>
    linkify: true,   // Auto-convert URLs to links
  };
  eleventyConfig.setLibrary("md", require("markdown-it")(markdownOptions));

  // Date Filters
  // -----------
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM dd, yyyy");
  });

  // Collections
  // ----------
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").sort((a, b) => {
      return b.date - a.date; // Sort in reverse chronological order
    });
  });

  // Tag Handling
  // -----------
  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!tags) return [];
    return tags.filter(tag => !["all", "nav", "post", "posts"].includes(tag));
  });

  eleventyConfig.addFilter("slugify", (tag) => {
    return tag.toString().toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '');
  });

  // Asset Handling
  // -------------
  const passthroughCopies = {
    // Directories
    "./Sign-up-Now_files/": "/Sign-up-Now_files/",
    "admin/index.html": "admin/index.html",
    
    // Files
    'robots.txt': '/robots.txt'
  };

  // Add each passthrough copy configuration
  Object.entries(passthroughCopies).forEach(([src, dest]) => {
    eleventyConfig.addPassthroughCopy({ [src]: dest });
  });

  // File type passthroughs using glob patterns
  const assetTypes = [
    "**/*{.css,.css.map,css2}",              // CSS files
    "**/*.{png,jpg,jpeg,gif,svg,webp}",      // Images
    "**/*.{mp4,webm}",                       // Videos
    "**/*.yml",                              // YAML files
    "admin/index.html"                       // Admin page
  ];

  assetTypes.forEach(pattern => {
    eleventyConfig.addPassthroughCopy(pattern);
  });

  // Exclusions
  eleventyConfig.ignores.add("admin/index.html");

  // Plugins
  // -------
  eleventyConfig.addPlugin(sectionizePlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Transforms
  // ---------
  eleventyConfig.addTransform("lazy-load-images", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return content.replace(/<img(?!.*loading=)/g, '<img loading="lazy"');
    }
    return content;
  });
};