module.exports = {
  // Site-wide defaults for social metadata
  og: {
    title: null, // default: use page title or metadata.title
    description: null, // default: use page description or metadata.description
    image: "/assets/images/opengraph/sage.png",
    type: "website"
  },
  twitter: {
    title: null, // default: follow og.title
    description: null, // default: follow og.description
    image: "/assets/images/opengraph/sage.png",
    card: "summary_large_image",
    creator: "@sage",
    site: "@sage",
    image_alt: "Sage"
  }
};
