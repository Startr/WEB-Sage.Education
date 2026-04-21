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

### Live Classes

- [ ] **ICS Delivery With Location**: Provide downloadable calendar invites for live classes with location included
  - [ ] Define event data needed (title, start/end, location, description)
  - [ ] Generate ICS files/links per class and ensure location populates
  - [ ] Integrate ICS download access into live class cards or detail views
  - [ ] Document ICS generation flow and dependencies (startr.space vs local)
- [ ] **Event Detail Page Exploration**: Evaluate richer event detail pages linking to Startr.Space resources
  - [ ] Compare options: inline ICS vs dedicated event page
  - [ ] Prototype or outline event page structure including links + ICS access
  - [ ] Review implications of hosting on startr.space vs Sage.Education
  - [ ] Capture decision and next steps in documentation

### Posts & Content Styling

- [ ] **Remove GitHub Posts Section**: Eliminate /posts/ GitHub feed to restore rendering stability
  - [ ] Locate inclusion logic for GitHub posts block
  - [ ] Remove or feature-flag the block to prevent build/render failures
  - [ ] Smoke test affected pages to confirm proper rendering
  - [ ] Update documentation on supported post sources
- [ ] **Unify Post & Tag Styling**: Align typography/layout across posts, tag pages, and articles
  - [ ] Audit current fonts, widths, and spacing for posts vs tag pages vs articles
  - [ ] Consolidate styles so sections share consistent typography and responsive widths
  - [ ] Test sample pages for consistency and readability
  - [ ] Document styling standards for posts and sub-sections

## TODO

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

### TodoScope Alignment

- [ ] **TodoScope Convention Sync**: Finish aligning this repo to TodoScope conventions
  - [ ] Migrate any existing inline comment TODOs in source to `TODO:` / `FIXME:` / `BUG:` tags
  - [ ] Review `.todoscope-exclude.csv` — confirm excluded paths are accurate for this 11ty site
  - [ ] Run TodoScope scanner and verify kanban board columns match expectations
  - [ ] Adjust this file's section headers if any cards land in unexpected columns

## Backlog

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
