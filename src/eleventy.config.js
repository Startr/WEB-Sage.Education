const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const sectionizePlugin = require("./_plugins/eleventy-plugin-sectionize");

const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
	// Add support for .yaml and .yml files in the _data directory
	eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
	eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));


	// Define htmlDateString filter
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
	});

	// Define readableDate filter
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM dd, yyyy");
	});

	// Define filterTagList filter
	eleventyConfig.addFilter("filterTagList", function (tags) {
		if (!tags) return [];
		return tags.filter(tag => !["all", "nav", "post", "posts"].includes(tag));
	});

	// Define slugify filter
	eleventyConfig.addFilter("slugify", function (tag) {
		return tag.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
	});

	eleventyConfig.addPassthroughCopy({
		"./Sign-up-Now_files/": "/Sign-up-Now_files/"
	});
	// CSS and CSS2 passthrough
	eleventyConfig.addPassthroughCopy("**/*{.css,.css.map,css2}");
	// image passthrough
	eleventyConfig.addPassthroughCopy("**/*.{png,jpg,jpeg,gif,svg,webp}");
	// Video passthrough
	eleventyConfig.addPassthroughCopy("**/*.{mp4,webm}");
	// yml passthrough
	eleventyConfig.addPassthroughCopy("**/*.yml");
	// Admin index.html passthrough
	eleventyConfig.addPassthroughCopy("admin/index.html");
	// Exclude the admin folder from processing
	eleventyConfig.ignores.add("admin/index.html");

	// Put robots.txt in root
	eleventyConfig.addPassthroughCopy({ 'robots.txt': '/robots.txt' });

	// Passthrough for admin/index.html to ensure it is copied
	eleventyConfig.addPassthroughCopy({
		"admin/index.html": "admin/index.html"
	});

	eleventyConfig.addPlugin(sectionizePlugin);
	eleventyConfig.addTemplateFormats("md");
	eleventyConfig.setLibrary("md", require("markdown-it")({
		html: true, // Enable HTML inside Markdown
		breaks: true,
		linkify: true,
	  }));

	// note at the moment Nunjucks (njk) file are being parsed as Liquid (liquid) files
	// this results in a number of errors when using Nunjucks specific syntax.
	// For now, I'm using Liquid syntax in the Nunjucks files to avoid these errors.

	eleventyConfig.addTransform("lazy-load-images", (content, outputPath) => {
		if (outputPath.endsWith(".html")) {
			return content.replace(/<img(?!.*loading=)/g, '<img loading="lazy"');
		}
		return content;
	});
};
