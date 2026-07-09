# Sage.Education — Roadmap

> **Convention** — Sections below map to kanban columns. Inline source-code
> tags use the same vocabulary so items stay cross-referenced between this
> file and the codebase. `KANBAN.canvas` auto-generates from this file and
> inline tags — do not hand-edit it.
>
> | Column      | Markdown section              | Inline tag |
> |-------------|-------------------------------|------------|
> | Backlog     | `## Backlog`                  |            |
> | TODO        | `## TODO`                     | `# TODO:`  |
> | In Progress | `## In Progress`              | `# FIXME:` |
> | Bugs        | `## Bugs`                     | `# BUG:`   |
> | Done        | `- [x]` items / `## Done`     | —          |
>
> `# DEPRECATED:` tags should be tracked as TODO items for removal at the
> stated version.

## In Progress

### Time-Delayed Membership Gate (MVP)

Free-membership signup gate that runs Medium-style after the article body. Content stays free; the gate is a soft registration wall, not a paywall. PocketBase backend (`pb_hooks/gate_unlock.pb.js`, `pb_migrations/003_subscribers.js` in WEB-DB-sage-pb) already shipped. This card tracks the Sage.Education consumer-side wiring (promoted from Phase 4 to MVP — ships parallel with Sage.is).

Plan: [`~/.claude/plans/are-you-able-to-twinkly-pike.md`](~/.claude/plans/are-you-able-to-twinkly-pike.md) (refined). Original: [`~/.claude/plans/a-growing-number-of-jiggly-cherny.md`](~/.claude/plans/a-growing-number-of-jiggly-cherny.md).

- [ ] **Framework component in Startr.Style** (shared precondition with Sage.is — only build once).
- [ ] **Per-site config**: create `src/_data/signup-gate.yaml` with `brand: "Sage.Education"`, `unlockEndpoint: https://pb.sage.education/api/sage/gate-unlock`, `thresholdsBySection` keyed by URL-prefix per locale (`"/en/resources/": 60`, `"/pt/resources/": never` while translation is in flight, etc.), real `audienceLabel` and `socialProof`.
- [ ] **Vendor the component**: copy `signup-gate.njk` from Startr.Style into `src/_includes/`.
- [ ] **Add `buildDate` global** in `src/eleventy.config.js`.
- [ ] **Extend `src/resources/resources.11tydata.js`** with `contentType` + `gateEligible` `eleventyComputed` fields — preserve the existing `legacyEnPath` computed field.
- [ ] **Wrap content** in `src/_includes/resource.njk`: add `gated-content` class; include `signup-gate.njk`.
- [ ] **JSON-LD upgrade** in `src/_includes/base.njk`: same paywall structured-data treatment.
- [ ] **Per-locale gate copy** deferred to Phase 2 — Phase 1 ships English component copy across all locales. Flag the constraint when translation contributors land on `/pt/`, `/de/`, `/fr/` pages.
- [ ] **Daily-rebuild cron + heartbeat** (cross-cutting; coordinated with sage.is and pb.sage.is).

### Critical Infrastructure & Security

- [ ] **Security Vulnerability Fix**: Update tar-fs dependency to fix high severity vulnerability #critical
  - [ ] Run `npm audit fix` to address GHSA-8cj5-5rvv-wf4v
  - [ ] Test build process after security updates
  - [ ] Document updated dependency versions

### Mobile Responsiveness (QA Issues)

- [ ] **Mobile Landing Page Logo Fix**: Fix squished Startr logo and ensure name visibility on mobile
  - [ ] Inspect mobile CSS for logo container sizing and positioning
  - [ ] Adjust logo dimensions and layout to prevent squishing
  - [ ] Ensure logo name is not covered by Sign in and Access Sage.Education buttons
  - [ ] Test logo display across different mobile screen sizes
  - [ ] Document responsive logo design updates
- [ ] **Mobile Button Text Fix**: Fix cut off Sage.Education button text under subheading
  - [ ] Check button CSS and text wrapping on mobile views
  - [ ] Adjust button styling to ensure full text visibility
  - [ ] Verify button functionality and accessibility on mobile
  - [ ] Update mobile UI guidelines for button text handling

### Landing Flow Content

- [ ] **Izzy Signature Photo Placement**: Add Izzy photo to the right of her signature under messages
  - [x] Confirm photo asset, sizing, and alt text requirements
  - [x] Update layout/styling so the image aligns with the signature on desktop and mobile
  - [x] Use https://sage.is/assets/images/general/ip-avatar.jpg with inline Startr utilities (`--h:3rem; --w:3rem; --d:inline-flex; --br:100%`)
  - [x] Verify responsiveness and spacing with adjacent copy
  - [ ] Document asset usage and placement guidelines
- [ ] **Access Button Link Fix**: Correct post-checkbox Access Sage.Education button to point to sign-up
  - [ ] Identify the component/template controlling the CTA link
  - [ ] Update destination to the sign-up flow at https://sage.startr.cloud/ instead of resources
  - [ ] Test navigation (mobile/desktop + keyboard) to confirm correct target
  - [ ] Note CTA destinations in documentation or component notes

### CTA Destination Consistency

- [ ] **Signup vs Access CTA URLs**: Standardize CTA links across the site
  - [ ] Audit all Signup buttons and ensure they point to https://sage.startr.cloud/
  - [ ] Audit all Access Sage.Education buttons and ensure they point to https://sage.education/Sign-up-Now
  - [ ] Verify analytics/tracking requirements for each CTA
  - [ ] Document canonical URLs for future reference

### Posts & Content Stability

- [ ] **Remove GitHub Posts Section**: Eliminate /posts/ GitHub feed to restore rendering stability
  - [ ] Locate inclusion logic for GitHub posts block
  - [ ] Remove or feature-flag the block to prevent build/render failures
  - [ ] Smoke test affected pages to confirm proper rendering
  - [ ] Update documentation on supported post sources

### Communication & Outreach

- [ ] **CAIO Dinner — Doorway Sentence Rehearsal**: Test "Schools own their own AIs with Sage.Education; we can't lock you out, the keys are yours, in the license, not the marketing." with 4 cold listeners by 2026-05-17. Bring surviving version + redacted conversation map to dinner. #communication
- [x] **Ship `/own-your-ai` One-Pager Before CAIO Dinner**: Review, tighten, and publish the draft landing page at [src/own-your-ai.md](src/own-your-ai.md) so `sage.education/own-your-ai` is live before 2026-05-17. Decisions locked in panel-push 2026-05-05: H1 "Own Your AI" / H2 "Keys to Empower" (for principal/CAIO) / sub "Freedom to Build" (for teachers + board reading over the shoulder). Procurement section names Flipgrid, Finale, Thinglink as anti-stories. Body cites AGPL-v3 plain-language clauses. Audit copy, confirm layout renders, link to the page from homepage CTA, then push. #critical #communication

## TODO

### Live Classes

- [ ] **ICS Delivery With Location**: Provide downloadable calendar invites for live classes with location included
  - [ ] Define event data needed (title, start/end, location, description)
  - [ ] Generate ICS files/links per class and ensure location populates
  - [ ] Integrate ICS download access into live class cards or detail views
  - [ ] Document ICS generation flow and dependencies (startr.space vs local)

### Posts & Content Styling

- [ ] **Unify Post & Tag Styling**: Align typography/layout across posts, tag pages, and articles
  - [ ] Audit current fonts, widths, and spacing for posts vs tag pages vs articles
  - [ ] Consolidate styles so sections share consistent typography and responsive widths
  - [ ] Test sample pages for consistency and readability
  - [ ] Document styling standards for posts and sub-sections

### Blog Template Parity with Sage.is

Plan: [yes-fix-both-and-fluffy-badger.md](https://claude.is/plans/yes-fix-both-and-fluffy-badger.md) (local: `~/.claude/plans/yes-fix-both-and-fluffy-badger.md`)

- [ ] **Tier A: Prev/Next + Stray-File Cleanup** — Bring blog post nav and `_data/` directory into a clean state #frontend
  - [ ] Replace `collections.all` → `collections.posts` in [src/_includes/layouts/blog.njk](src/_includes/layouts/blog.njk) (2 spots — hero branch + fallback)
  - [ ] Add empty-collection warning to `addCollection("posts", …)` in [src/eleventy.config.js:120](src/eleventy.config.js#L120)
  - [ ] Wrap prev/next nav in `{% if collections.posts.length %}` for empty-site safety
  - [ ] Emit HTML-comment poka-yoke: `<!-- prev/next from collections.posts (N items) -->`
  - [ ] `git rm` five `* copy.*` Finder duplicates in [src/_data/](src/_data/) and [src/_plugins/](src/_plugins/) (separate atomic commit, post-build verified)
  - [ ] Verify in `_site/` that prev/next stays inside the posts collection
- [ ] **Tier B: Related Articles + Featured Hero Card (startr.style inline)** — Port Sage.is's reader-discovery niceties via inline startr.style utilities; no `article.css` edits #frontend
  - [ ] Insert smart related-articles block (shared-tag pass + random fallback) into both branches of [src/_includes/layouts/blog.njk](src/_includes/layouts/blog.njk), styled inline
  - [ ] Universal-tag blocklist set to `["education", "ai", "technology"]`; revisit after seeing live output
  - [ ] HTML-comment poka-yoke: emit `<!-- related: matched-by-tag=N, fallback-used=… -->` for human View-Source forensics
  - [ ] Extract featured card from `postslist | first` in [src/posts/index.njk](src/posts/index.njk); iterate the rest with `slice(1)`; style inline (uses `--levitate`, `--br`, `--p`, etc.)
  - [ ] HTML-comment poka-yoke on featured card: `<!-- featured = X, list iterates from index 1 of N -->`
  - [ ] HTML-comment poka-yoke when newest post is missing `hero:` frontmatter
  - [ ] (Optional) Add `getImageIndex()` accessor to `eleventy-plugin-wikilinks.js` and validate `hero:` paths at build time, mirroring the wikilinks image-existence pattern
  - [ ] Visually QA at desktop and ≤50em mobile

### TodoScope Alignment

- [ ] **TodoScope Convention Sync**: Finish aligning this repo to TodoScope conventions
  - [ ] Migrate any existing inline comment TODOs in source to `TODO:` / `FIXME:` / `BUG:` tags
  - [ ] Review `.todoscope-exclude.csv` — confirm excluded paths are accurate for this 11ty site
  - [ ] Run TodoScope scanner and verify kanban board columns match expectations
  - [ ] Adjust this file's section headers if any cards land in unexpected columns

## Backlog

### Infrastructure & Sovereignty

- [ ] **In-house Updates Feed**: Branded `/updates/` page on each marketing site, sourced from the repo's own git tags (host-agnostic: GitHub, Gitea, or no remote at all)
  - [x] Decide URL convention: `https://sage.education/updates/` and `https://sage.is/updates/`
  - [x] Pick source-of-truth pattern: read local git tags at build time (host-agnostic; works whether the remote is GitHub, Gitea, or a tarball with no remote)
  - [x] Add Atom feed at `/updates.xml` so subscribers and the privacy material-change notice can point at a stable, RSS-readable URL
  - [x] Add `site.updatesUrl` and `site.updatesFeedUrl` to `_data/site.yaml` on sage.education; flip privacy §11 to use them
  - [x] Mirror everything to sage.is (`src/_data/updates.js`, `src/updates.njk`, `src/updates.xml.njk`, `site.yaml` keys, privacy §11 reference)
  - [ ] Once both sites are confirmed live (post-deploy), remove the deprecated `site.githubUpdatesUrl` keys from both `site.yaml` files
  - [ ] (Optional) Stand up Gitea later — no code change needed since the data source is local git
    <!-- inline: src/_data/updates.js src/updates.njk src/updates.xml.njk src/_data/site.yaml src/privacy.md -->

- [ ] **ffpf.org Parallel Project (privacy + anti-poverty)**: Use our control of `ffpf.org` to stand up a parallel initiative focused on privacy and fighting poverty through avoidance of coercive practices
  - [ ] Capture the core thesis (privacy as a poverty-fighting lever; anti-coercion principles)
  - [ ] Decide whether it sits alongside Sage.Education / Sage.is or stays an independent brand
  - [ ] Identify the first audience the project would serve

### Live Classes — Exploration

- [ ] **Event Detail Page Exploration**: Evaluate richer event detail pages linking to Startr.Space resources
  - [ ] Compare options: inline ICS vs dedicated event page
  - [ ] Prototype or outline event page structure including links + ICS access
  - [ ] Review implications of hosting on startr.space vs Sage.Education
  - [ ] Capture decision and next steps in documentation

### Build & Dependencies

- [ ] **Package.json Optimization**: Review and optimize dependencies
  - [ ] Audit unused dependencies
  - [ ] Update outdated packages (check for compatibility)
  - [ ] Consider switching to pnpm for better performance
  - [ ] Add bundle analyzer to track build size

### Static Site Generation

- [ ] **Eleventy Performance Tuning**: Optimize 11ty build process
  - [ ] Enable incremental builds
  - [ ] Optimize image processing pipeline
  - [ ] Review markdown processing performance
  - [ ] Implement build caching strategies

### Asset Optimization

- [ ] **Image Optimization Pipeline**: Enhance image handling
  - [ ] Implement WebP conversion for all images
  - [ ] Add responsive image generation
  - [ ] Optimize existing images in `/src/images/`
  - [ ] Consider lazy loading implementation

### Content Management

- [ ] **README Enhancement**: Improve project documentation
  - [ ] Add comprehensive project overview
  - [ ] Include setup instructions
  - [ ] Add performance benchmarks
  - [ ] Document optimization features

### How to Build an AI book

- [ ] **Markdown task-list checklists**: drop the verbose HTML checklist in favour of clean markdown `- [ ]`, rendered by a plugin. #book #cleanup
  - [ ] Add a markdown-it task-list plugin (or a small custom rule) in `src/eleventy.config.js` so `- [ ]` renders as real checkboxes
  - [ ] Confirm the `.checklist` CSS still applies (or adjust the selector)
  - [ ] Migrate `your-first-notebook.md`'s `<ul class="checklist"><li><input type="checkbox">` to markdown `- [ ]`
  - [ ] Land before the book chapters deploy — expanded chapters already emit markdown `- [ ]`
- [ ] **Reusable premiere-frame include**: the video block (coming-soon SVG card / live iframe) is copy-pasted into every chapter; make it one include that takes variables. #book #dry
  - [ ] Add a `premiere` shortcode in `src/eleventy.config.js` — coming-soon card when no embed id, live iframe when given one; args for week, airtime, embed id, publication date
  - [ ] Migrate the chapters + `index.njk` featured video to the shortcode
  - [ ] Update `scripts/expand-chapter.py`'s frame sentinel to target the shortcode call instead of the inline `<div>`

### UI/UX

- [ ] **CSS Performance**: Optimize stylesheets
  - [ ] Audit unused CSS
  - [ ] Implement CSS minification
  - [ ] Consider CSS-in-JS for critical path
  - [ ] Add CSS bundling optimization

### Development Workflow

- [ ] **Development Tools**: Enhance developer experience
  - [ ] Add ESLint configuration
  - [ ] Implement Prettier for code formatting
  - [ ] Add pre-commit hooks
  - [ ] Create development docker setup

### Documentation & Process

- [ ] **Development Workflow Documentation**: Update process docs
  - [ ] Add optimization guidelines
  - [ ] Document performance best practices
  - [ ] Create troubleshooting guide
  - [ ] Add contributor guidelines

### Analytics & Monitoring

- [ ] **Performance Monitoring**: Add performance tracking
  - [ ] Implement Core Web Vitals monitoring
  - [ ] Add build time tracking
  - [ ] Create performance dashboard
  - [ ] Set up automated performance reports

### Advanced Features

- [ ] **Progressive Web App**: Add PWA features
  - [ ] Implement service worker
  - [ ] Add offline functionality
  - [ ] Create app manifest
  - [ ] Add push notifications support

### Continuous Optimization

- [ ] **Automated Optimization**: Set up automated optimization
  - [ ] Configure GitHub Actions for optimization
  - [ ] Add automated dependency updates
  - [ ] Implement automated testing
  - [ ] Set up performance regression testing

## Bugs

_No known bugs tracked here. Use `# BUG:` inline tags in source to flag defects — they'll appear in this column automatically._

## Done

- [x] **Project Scan**: Completed comprehensive project analysis
- [x] **Optimization Plan**: Created detailed optimization roadmap
- [x] **Convention Instructions Colorization**: Enhanced visual appearance of CONVENTION.instructions.md
