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

  // Add a collection for all unique tags - this is crucial for tag pages
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagSet = new Set();
    // Loop through all items
    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        const tags = Array.isArray(item.data.tags) 
          ? item.data.tags 
          : [item.data.tags];
          
        // Add each tag to the Set (automatically handles duplicates)
        for (const tag of tags) {
          // Skip certain tags that don't need pages
          if (!["all", "nav", "post", "posts"].includes(tag.toString().toLowerCase())) {
            // Normalize tag case to lowercase to prevent duplicates like "AI" and "ai"
            tagSet.add(tag.toString().toLowerCase());
          }
        }
      }
    });
    // Convert the Set back to an array and sort it
    return [...tagSet].sort();
  });

  // Create normalized tag collections to avoid duplicate output paths
  eleventyConfig.addCollection("normalizedTagCollections", function(collectionApi) {
    const tagMap = {};
    
    // First, gather all content with tags
    collectionApi.getAll().forEach(item => {
      if (!item.data.tags) return;
      
      const tags = Array.isArray(item.data.tags) 
        ? item.data.tags 
        : [item.data.tags];
      
      for (const tag of tags) {
        if (["all", "nav", "post", "posts"].includes(tag.toString().toLowerCase())) continue;
        
        // Use lowercase tag as the key
        const normalizedTag = tag.toString().toLowerCase();
        
        if (!tagMap[normalizedTag]) {
          tagMap[normalizedTag] = [];
        }
        
        tagMap[normalizedTag].push(item);
      }
    });
    
    // Add each normalized tag collection to the collections object
    return tagMap;
  });

  // Tag Handling
  // -----------
  eleventyConfig.addFilter("filterTagList", (tags) => {
    if (!tags) return [];
    return tags.filter(tag => !["all", "nav", "post", "posts"].includes(tag.toString().toLowerCase()));
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