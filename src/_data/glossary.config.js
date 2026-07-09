module.exports = {
  glob: "resources/en/*.md",
  urlFromPath(filePath) {
    const m = filePath.match(/(?:^|\/)resources\/en\/([^/]+)\.md$/);
    return m ? `/resources/en/${m[1]}/` : null;
  },
};
