const path = require("path");

// Resolve the signup-gate cascade for an article (see _data/signup_gate.yaml):
//   1. front-matter `gateAfterDays:` per-article override
//   2. `thresholdsBySection` (URL-prefix match, longest match wins) —
//      Sage.Education uses locale-prefixed URLs (/en/, /pt/, ...) so this
//      doubles as the per-locale gating switch
//   3. `thresholdsByContentType` (frontmatter `contentType:`, default "blog")
//   4. `defaultThresholdDays`
function resolveThreshold(data, gate) {
  if (data.gateAfterDays !== undefined && data.gateAfterDays !== null) {
    return data.gateAfterDays;
  }
  const url = (data.page && data.page.url) || "";
  const bySection = gate && gate.thresholdsBySection;
  if (bySection && url) {
    let match = null;
    let matchLen = -1;
    for (const prefix in bySection) {
      if (url.indexOf(prefix) === 0 && prefix.length > matchLen) {
        match = bySection[prefix];
        matchLen = prefix.length;
      }
    }
    if (match !== null) return match;
  }
  const byType = gate && gate.thresholdsByContentType;
  const ct = data.contentType || "blog";
  if (byType && Object.prototype.hasOwnProperty.call(byType, ct)) {
    return byType[ct];
  }
  return (gate && gate.defaultThresholdDays) || 60;
}

function isGateEligible(threshold, articleDate, buildDateIso) {
  if (threshold === "never" || threshold === false || threshold === null || threshold === undefined) {
    return false;
  }
  if (threshold === 0) return true;
  const days = Number(threshold);
  if (!Number.isFinite(days) || days < 0) return false;
  if (!articleDate) return false;
  const build = buildDateIso ? new Date(buildDateIso) : new Date();
  const age = (build - new Date(articleDate)) / (1000 * 60 * 60 * 24);
  return age >= days;
}

module.exports = {
  layout: "resource",
  tags: ["resources"],
  eleventyComputed: {
    description: (data) =>
      data.description || data.summary || data.subheadline || "",
    og: (data) => ({
      type: "article",
      image: data.social_image || data.hero || undefined,
    }),
    twitter: (data) => ({
      image: data.social_image || data.hero || undefined,
      image_alt: data.hero_alt || data.title,
    }),
    legacyEnPath: (data) =>
      `/posts/blog/en/${path.basename(data.page.inputPath, ".md")}/`,
    contentType: (data) => data.contentType || "blog",
    gateEligible: (data) => {
      const threshold = resolveThreshold(data, data.signup_gate);
      return isGateEligible(threshold, data.date, data.buildDate);
    },
  },
};
