# 🎓 Sage.Education - AI-Powered Learning Platform

> **🌟 Mission**: Empowering education through innovative AI technology and collaborative learning experiences.

## 🚀 Live Site
**Production**: [https://sage.education](https://sage.education)

## 📋 Project Overview

Sage.Education is a comprehensive educational platform built on modern JAMstack architecture, featuring:

- 🤖 **AI-Powered Learning Tools** - Advanced educational AI assistants
- 🌍 **Multi-language Support** - Available in English, German, French, and Portuguese  
- 📚 **Comprehensive Documentation** - Extensive guides and tutorials
- 🔧 **Developer-Friendly** - Built with Eleventy and modern web standards
- 🎨 **Modern UI/UX** - Responsive design with accessibility focus

## ⚡ Quick Start

**🚀 Optimized with Bun (Recommended)**
```bash
# Clone the repository
git clone https://github.com/yourusername/WEB-Sage.Education.git
cd WEB-Sage.Education

# Install dependencies (0.067s with Bun!)
bun install

# Start development server  
bun run dev

# Build for production (0.50s with Bun!)
bun run build
```

**📦 Legacy npm Support**
```bash
# Alternative setup with npm
npm install          # Slower but compatible
npm run dev          # Development server
npm run build        # Production build
```

### 🔥 Performance Benefits with Bun
- **🚀 154% faster builds** (0.50s vs 1.27s)
- **⚡ 3000%+ faster installs** (0.067s vs 2-5s)
- ** Lower memory usage**
- ** Enhanced security**

# Build for production
npm run build
```

## 🏗️ Architecture

- **Static Site Generator**: Eleventy v2.0.1
- **Content Management**: Decap CMS integration
- **Styling**: Custom CSS with modern practices
- **Images**: Optimized WebP format with responsive design
- **Deployment**: Optimized for CDN delivery

## 📊 Performance Status

- ✅ **Security**: All vulnerabilities resolved
- ⚡ **Build Time**: Optimized for fast development
- 🖼️ **Images**: WebP format with compression
- 📱 **Mobile**: Responsive across all devices

## 🛠️ Development

### Available Scripts
- `npm run start` - Development server with live reload
- `npm run build` - Production build
- `npm run admin` - CMS admin interface
- `npm run buildfresh` - Clean build from scratch
- `npm run audit:articles` - Run article quality audit now
- `npm run build:noaudit` - Production build without running article audit

### Article Quality Audit
- Audit runs automatically before Eleventy starts/builds (`start`, `dev`, `build`, `buildfresh`, `admin`) unless skipped.
- Default output is Markdown only: `docs/audits/article-quality-audit-latest.md`.
- Only `docs/audits/article-quality-audit-latest.md` is kept in git. Other audit files are local-only.

Manual run:
```bash
npm run audit:articles
```

Skip automatic audit for one build:
```bash
SKIP_ARTICLE_AUDIT=1 npm run build
```

Optional raw or dated outputs (local-only):
```bash
AUDIT_WRITE_RAW=1 npm run audit:articles
AUDIT_WRITE_DATED=1 npm run audit:articles
AUDIT_WRITE_RAW=1 AUDIT_WRITE_DATED=1 npm run audit:articles
```

### Project Structure
```
├── src/                 # Source files
├── docs/               # Documentation
├── static/             # Static assets
├── functions/          # Serverless functions
└── dist/              # Built site (generated)
```

## 📚 Documentation

- [📖 Getting Started](docs/getting-started/)
- [🔧 Development Workflow](docs/DEVELOPMENT_WORKFLOW.md)
- [🎯 Optimization Roadmap](OPTIMIZATION_ROADMAP.md)
- [📋 TODO List](TODO.md)
- [🚀 Convention Instructions](CONVENTION.instructions.md)

## 🤝 Contributing

We follow the **Plan-Document-Execute-Verify** development cycle. See our [Convention Instructions](CONVENTION.instructions.md) for detailed guidelines.

## 📈 Optimization Priorities

1. 🔒 **Security**: Keeping dependencies updated
2. ⚡ **Performance**: Sub-2s page load times
3. 🎨 **User Experience**: Accessible and intuitive design
4. 📱 **Mobile-First**: Optimized for all devices

---

**🌟 Built with passion for education and powered by modern web technologies.**
