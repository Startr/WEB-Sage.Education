# 🚀 Sage.Education Project Optimization TODO

## 🔴 Critical Infrastructure & Security TODOs
- [ ] **Security Vulnerability Fix**: Update tar-fs dependency to fix high severity vulnerability
  - [ ] Run `npm audit fix` to address GHSA-8cj5-5rvv-wf4v
  - [ ] Test build process after security updates
  - [ ] Document updated dependency versions

## 🟠 High Priority Performance Optimization TODOs

### 📦 Build & Dependencies Optimization
- [ ] **Package.json Optimization**: Review and optimize dependencies
   - [ ] Audit unused dependencies
   - [ ] Update outdated packages (check for compatibility)
   - [ ] Consider switching to pnpm for better performance
   - [ ] Add bundle analyzer to track build size

### ⚡ Static Site Generation Optimization
- [ ] **Eleventy Performance Tuning**: Optimize 11ty build process
   - [ ] Enable incremental builds
   - [ ] Optimize image processing pipeline
   - [ ] Review markdown processing performance
   - [ ] Implement build caching strategies

### 🖼️ Asset Optimization
- [ ] **Image Optimization Pipeline**: Enhance image handling
   - [ ] Implement WebP conversion for all images
   - [ ] Add responsive image generation
   - [ ] Optimize existing images in /src/images/
   - [ ] Consider lazy loading implementation

### 📱 Mobile Responsiveness Fixes (QA Issues)
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

### 🧭 Landing Flow Content Updates
- [ ] **Izzy Signature Photo Placement**: Add Izzy photo to the right of her signature under messages
   - [ ] Confirm photo asset, sizing, and alt text requirements
   - [ ] Update layout/styling so the image aligns with the signature on desktop and mobile
   - [ ] Use https://sage.is/assets/images/general/ip-avatar.jpg with inline Startr utilities (`--h:3rem; --w:3rem; --d:inline-flex; --br:100%`)
   - [ ] Verify responsiveness and spacing with adjacent copy
   - [ ] Document asset usage and placement guidelines
- [ ] **Access Button Link Fix**: Correct post-checkbox Access Sage.Education button to point to sign-up
   - [ ] Identify the component/template controlling the CTA link
   - [ ] Update destination to the sign-up flow at https://sage.startr.cloud/ instead of resources
   - [ ] Test navigation (mobile/desktop + keyboard) to confirm correct target
   - [ ] Note CTA destinations in documentation or component notes

### 🔗 CTA Destination Consistency
- [ ] **Signup vs Access CTA URLs**: Standardize CTA links across the site
   - [ ] Audit all Signup buttons and ensure they point to https://sage.startr.cloud/
   - [ ] Audit all Access Sage.Education buttons and ensure they point to https://sage.education/Sign-up-Now
   - [ ] Verify analytics/tracking requirements for each CTA
   - [ ] Document canonical URLs for future reference

### 📅 Live Classes Enhancements
- [ ] **ICS Delivery With Location**: Provide downloadable calendar invites for live classes with location included
   - [ ] Define event data needed (title, start/end, location, description)
   - [ ] Generate ICS files/links per class and ensure location populates
   - [ ] Integrate ICS download accessinto live class cards or detail views
   - [ ] Document ICS generation flow and dependencies (startr.space vs local)
- [ ] **Event Detail Page Exploration**: Evaluate richer event detail pages linking to Startr.Space resources
   - [ ] Compare options: inline ICS vs dedicated event page
   - [ ] Prototype or outline event page structure including links + ICS access
   - [ ] Review implications of hosting on startr.space vs Sage.Education
   - [ ] Capture decision and next steps in documentation

### 📰 Posts & Content Styling
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

## 🟡 Medium Priority Enhancement TODOs

### 📝 Content Management Optimization
- [ ] **README Enhancement**: Improve project documentation
  - [ ] Add comprehensive project overview
  - [ ] Include setup instructions
  - [ ] Add performance benchmarks
  - [ ] Document optimization features

### 🎨 UI/UX Improvements
- [ ] **CSS Performance**: Optimize stylesheets
  - [ ] Audit unused CSS
  - [ ] Implement CSS minification
  - [ ] Consider CSS-in-JS for critical path
  - [ ] Add CSS bundling optimization

### 🔧 Development Workflow
- [ ] **Development Tools**: Enhance developer experience
  - [ ] Add ESLint configuration
  - [ ] Implement Prettier for code formatting
  - [ ] Add pre-commit hooks
  - [ ] Create development docker setup

## 🟢 Low Priority Nice-to-Have TODOs

### 📊 Analytics & Monitoring
- [ ] **Performance Monitoring**: Add performance tracking
  - [ ] Implement Core Web Vitals monitoring
  - [ ] Add build time tracking
  - [ ] Create performance dashboard
  - [ ] Set up automated performance reports

### 🚀 Advanced Features
- [ ] **Progressive Web App**: Add PWA features
  - [ ] Implement service worker
  - [ ] Add offline functionality
  - [ ] Create app manifest
  - [ ] Add push notifications support

## 📋 Documentation & Process TODOs
- [ ] **Convention Instructions Colorization**: ✅ COMPLETED
- [ ] **Development Workflow Documentation**: Update process docs
  - [ ] Add optimization guidelines
  - [ ] Document performance best practices
  - [ ] Create troubleshooting guide
  - [ ] Add contributor guidelines

## 🔄 Continuous Optimization TODOs
- [ ] **Automated Optimization**: Set up automated optimization
  - [ ] Configure GitHub Actions for optimization
  - [ ] Add automated dependency updates
  - [ ] Implement automated testing
  - [ ] Set up performance regression testing

---

## ✅ Completed TODOs
- ✅ **Project Scan**: Completed comprehensive project analysis
- ✅ **Optimization Plan**: Created detailed optimization roadmap
- ✅ **Convention Instructions Colorization**: Enhanced visual appearance

---

*Last Updated: June 8, 2025*
*Next Review: Weekly*
