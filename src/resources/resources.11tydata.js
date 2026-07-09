const path = require("path");

// Resolve the signup-gate cascade for an article (see _data/signup_gate.yaml):
//   0. front-matter `gated: true|false` (boolean veto — beats everything;
//      handled directly in the eleventyComputed `gateEligible` below)
//   1. front-matter `gateAfterDays:` per-article numeric override
//   2. `thresholdsBySection` (URL-prefix match, longest match wins) —
//      Sage.Education uses locale-prefixed URLs (/en/, /pt/, ...) so this
//      doubles as the per-locale gating switch
//   3. `thresholdsByContentType` (frontmatter `contentType:`, default "blog")
//   4. `defaultThresholdDays`
//
// `gated:` is a boolean (not a threshold), kept out of resolveThreshold to
// avoid forcing callers to interpret "true → 0 days" / "false → never".
// Use it to retroactively ungate older articles or to force-gate a piece
// regardless of age.
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
      // Per-article boolean veto wins over the entire threshold cascade.
      // `gated: false` → never gate this article (use to retroactively
      // ungate older pieces). `gated: true` → gate from day one (use for
      // a specific piece you want behind the gate regardless of age).
      if (data.gated === false) return false;
      if (data.gated === true) return true;
      const threshold = resolveThreshold(data, data.signup_gate);
      return isGateEligible(threshold, data.date, data.buildDate);
    },
  },
};
