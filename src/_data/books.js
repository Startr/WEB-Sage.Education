const fs = require('fs');
const path = require('path');

module.exports = function() {
  const books = {};
  
  // Load book data files for metadata only
  const booksDataDir = path.join(__dirname, 'books');
  
  if (fs.existsSync(booksDataDir)) {
    const bookFiles = fs.readdirSync(booksDataDir);
    
    for (const file of bookFiles) {
      if (file.endsWith('.json')) {
        const bookSlug = path.basename(file, '.json');
        const bookDataPath = path.join(booksDataDir, file);
        try {
          const bookData = JSON.parse(fs.readFileSync(bookDataPath, 'utf8'));
          // Remove chapters from static data - will be provided by collections
          const { chapters, ...bookMetadata } = bookData;
          books[bookSlug] = bookMetadata;
        } catch (error) {
          console.error(`Error loading book data for ${bookSlug}:`, error);
        }
      }
    }
  }
  
  return books;
};
