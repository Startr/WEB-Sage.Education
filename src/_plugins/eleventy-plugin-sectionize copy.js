const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const fs = require('fs');
const matter = require('gray-matter');

function configureMarkdown(permalinksEnabled = false) {
  // Create a markdown-it instance with HTML enabled
  const md = markdownIt({ 
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs);

  // Add the anchor plugin if permalinks are enabled
  if (permalinksEnabled) {
    md.use(markdownItAnchor, {
      permalink: true,
      permalinkClass: 'header-anchor',
      permalinkSymbol: '🔗',
      permalinkBefore: true,
      slugify: s => s.toLowerCase().replace(/[^\w]+/g, '-')
    });
  }

  // Create a function to wrap sections
  function wrapSections(tokens) {
    let result = [];
    let stack = [];
    let lastLevel = 0;
    let sectionAttrs = '';
    let pendingSectionAttrs = '';
    let hasOpenedFirstSection = false;

    tokens.forEach((token, index) => {
      // Handle attribute blocks for sections
      if (token.type === 'inline' && token.content.startsWith('{') && token.content.endsWith('}')) {
        pendingSectionAttrs = token.content.slice(1, -1);
        return; // Skip this token
      }

      // When we encounter a heading, start a new section
      if (token.type === 'heading_open') {
        let level = parseInt(token.tag.slice(1));

        // Close any open sections that should be closed
        while (stack.length && lastLevel >= level) {
          result.push(stack.pop());
          lastLevel--;
        }

        // Use pending attributes if available
        sectionAttrs = pendingSectionAttrs || sectionAttrs;
        result.push({ type: 'html_block', content: `<section ${sectionAttrs}>` });
        stack.push({ type: 'html_block', content: '</section>' });
        lastLevel = level;
        hasOpenedFirstSection = true;
        sectionAttrs = ''; // Reset attributes
        pendingSectionAttrs = ''; // Reset pending attributes
      }

      // Skip empty paragraphs or paragraphs with just attribute blocks
      if (token.type === 'paragraph_open') {
        const nextToken = tokens[index + 1];
        const closingToken = tokens[index + 2];
        if (
          nextToken && nextToken.type === 'inline' &&
          (nextToken.content.trim() === '' || 
           (nextToken.content.startsWith('{') && nextToken.content.endsWith('}'))) &&
          closingToken && closingToken.type === 'paragraph_close'
        ) {
          return; // Skip these tokens
        }
      }

      // If we haven't opened a section yet and we have content, wrap it in a section
      if (!hasOpenedFirstSection && (token.type === 'paragraph_open' || token.type === 'list_item_open' || token.type === 'blockquote_open')) {
        result.push({ type: 'html_block', content: '<section>' });
        stack.push({ type: 'html_block', content: '</section>' });
        hasOpenedFirstSection = true;
      }

      // Add the current token to the result
      result.push(token);
    });

    // Close any open sections
    while (stack.length) {
      result.push(stack.pop());
    }

    return result;
  }

  // Add the section wrapper as a core rule
  md.core.ruler.push('wrap_sections', state => {
    state.tokens = wrapSections(state.tokens);
  });

  return md;
}

// The plugin's main export function
module.exports = function(eleventyConfig) {
  // Add a markdown filter for manual markdown processing with permalinks support
  eleventyConfig.addFilter("markdown", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    try {
      const inputPath = this.page.inputPath;
      const fileContent = fs.readFileSync(inputPath, 'utf8');
      const data = matter(fileContent).data;
      const permalinksEnabled = data.permalinks === true;

      const md = configureMarkdown(permalinksEnabled);
      return md.render(content);
    } catch (error) {
      console.error("Error in markdown filter:", error);
      return content;
    }
  });

  // Set the default Markdown library with sectionization enabled
  // This is what processes .md files directly
  const md = configureMarkdown(false);
  eleventyConfig.setLibrary("md", md);
};
