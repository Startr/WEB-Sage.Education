const markdownIt = require("markdown-it");

/**
 * An Eleventy plugin that adds support for highlighting text with the == syntax
 * This transforms ==highlighted text== into <span class="highlight">highlighted text</span>
 */
module.exports = function(eleventyConfig) {
  // Instead of creating a new markdown instance, get the existing one
  // This allows other plugins (like sectionize) to set up the library first
  eleventyConfig.amendLibrary('md', (md) => {
    // Add a plugin to handle the == syntax for highlighting
    md.use((md) => {
      // This regex finds text between == markers, but not across line breaks
      const highlightRegex = /==(.*?)==/g;
      
      // We'll use an inline rule to handle the highlighting
      const highlightRule = (state) => {
        for (let i = 0; i < state.tokens.length; i++) {
          // We only care about inline tokens
          if (state.tokens[i].type !== 'inline') {
            continue;
          }
          
          // Get the children of the inline token
          const children = state.tokens[i].children;
          if (!children || !children.length) {
            continue;
          }
          
          // Process each child token
          let j = 0;
          while (j < children.length) {
            const token = children[j];
            
            // Only process text tokens
            if (token.type !== 'text' || !token.content.includes('==')) {
              j++;
              continue;
            }
            
            // Find all highlight matches in this token
            const matches = Array.from(token.content.matchAll(highlightRegex));
            if (!matches.length) {
              j++;
              continue;
            }
            
            // We'll replace this token with multiple tokens
            let lastIndex = 0;
            const newTokens = [];
            
            for (const match of matches) {
              // Add text before the highlight if there is any
              if (match.index > lastIndex) {
                const beforeText = new state.Token('text', '', 0);
                beforeText.content = token.content.substring(lastIndex, match.index);
                newTokens.push(beforeText);
              }
              
              // Add the highlight open tag
              const openTag = new state.Token('highlight_open', 'span', 1);
              openTag.attrSet('class', 'highlight');
              newTokens.push(openTag);
              
              // Add the highlighted text
              const highlightText = new state.Token('text', '', 0);
              highlightText.content = match[1]; // The text between == markers
              newTokens.push(highlightText);
              
              // Add the highlight close tag
              const closeTag = new state.Token('highlight_close', 'span', -1);
              newTokens.push(closeTag);
              
              // Update our position
              lastIndex = match.index + match[0].length;
            }
            
            // Add any remaining text after the last highlight
            if (lastIndex < token.content.length) {
              const afterText = new state.Token('text', '', 0);
              afterText.content = token.content.substring(lastIndex);
              newTokens.push(afterText);
            }
            
            // Replace the current token with our new tokens
            children.splice(j, 1, ...newTokens);
            
            // Update j to skip over our newly added tokens
            j += newTokens.length;
          }
        }
      };
      
      // Add our rule after the inline rules have run
      md.core.ruler.after('inline', 'highlight', highlightRule);
      
      // Add renderer rules for our custom tokens
      md.renderer.rules.highlight_open = () => '<span class="highlight">';
      md.renderer.rules.highlight_close = () => '</span>';
    });
  });
};