const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// OpenGraph image configurations - extracted from existing PNG files
const ogPages = [
  { filename: 'about', title: 'About Sage', subtitle: 'Our story and mission' },
  { filename: 'accessibility', title: 'Accessibility', subtitle: 'Inclusive design for everyone' },
  { filename: 'apps', title: 'Our Apps', subtitle: 'Tools that make work better' },
  { filename: 'sage', title: 'sage', subtitle: 'Project management that works' },
  { filename: 'before-and-after', title: 'Before & After', subtitle: 'Real customer transformations' },
  { filename: 'books', title: 'Our Books', subtitle: 'Insights on business and life' },
  { filename: 'classes', title: 'Classes', subtitle: 'Learn from our experience' },
  { filename: 'cloud-exit', title: 'Cloud Exit', subtitle: 'Own your infrastructure' },
  { filename: 'community', title: 'Community', subtitle: 'Join the conversation' },
  { filename: 'customers', title: 'Customers', subtitle: 'Stories from our users' },
  { filename: 'discounts', title: 'Discounts', subtitle: 'Special offers for you' },
  { filename: 'group-chat-problems', title: 'Group Chat Problems', subtitle: 'Why chat doesn\'t work' },
  { filename: 'how-we-communicate', title: 'How We Communicate', subtitle: 'Our communication principles' },
  { filename: 'how-we-make-decisions', title: 'How We Make Decisions', subtitle: 'Our decision-making process' },
  { filename: 'overkill', title: 'Overkill', subtitle: 'When simple is better' },
  { filename: 'paths', title: 'Paths', subtitle: 'Different ways to work' },
  { filename: 'ship-only-what-is-good', title: 'Ship Only What Is Good', subtitle: 'How we ship software' },
  { filename: 'small', title: 'Small', subtitle: 'The power of staying small' },
  { filename: 'support', title: 'Support', subtitle: 'We\'re here to help' },
  { filename: 'underdogs', title: 'Underdogs', subtitle: 'For the independent makers' },
  { filename: 'why-we-choose-profit', title: 'Why We Choose Profit', subtitle: 'Sustainable business principles' }
];

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .og-card {
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: white;
            position: relative;
            overflow: hidden;
        }
        .content {
            text-align: center;
            max-width: 900px;
            padding: 60px;
            z-index: 2;
        }
        .title {
            font-size: 72px;
            font-weight: 700;
            margin-bottom: 24px;
            line-height: 1.1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .subtitle {
            font-size: 36px;
            opacity: 0.9;
            font-weight: 400;
            line-height: 1.3;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .logo {
            position: absolute;
            bottom: 40px;
            right: 40px;
            font-size: 28px;
            opacity: 0.8;
            font-weight: 600;
            z-index: 3;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .decoration {
            position: absolute;
            top: -100px;
            right: -100px;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: rgba(255,255,255,0.05);
            z-index: 1;
        }
        .decoration:before {
            content: '';
            position: absolute;
            top: 150px;
            left: 150px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: rgba(255,255,255,0.03);
        }
    </style>
</head>
<body>
    <div class="og-card">
        <div class="decoration"></div>
        <div class="content">
            <h1 class="title">{{title}}</h1>
            <p class="subtitle">{{subtitle}}</p>
        </div>
        <div class="logo">sage.is</div>
    </div>
</body>
</html>`;

async function generateOGImages() {
  console.log('🖼️  Generating OpenGraph images...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    
    // Save to source directory so they get copied by Eleventy
    const ogDir = path.join(__dirname, '..', 'assets', 'images', 'opengraph');
    await fs.mkdir(ogDir, { recursive: true });
    
    // Generate images sequentially to avoid race conditions
    for (const ogPage of ogPages) {
      const html = htmlTemplate
        .replace('{{title}}', ogPage.title)
        .replace('{{subtitle}}', ogPage.subtitle);
      
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const outputPath = path.join(ogDir, `${ogPage.filename}.png`);
      await page.screenshot({ 
        path: outputPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1200, height: 630 }
      });
      
      console.log(`   ✓ Generated ${ogPage.filename}.png`);
    }
    
    console.log(`🎉 Generated ${ogPages.length} OpenGraph images in src/assets/images/opengraph`);
  } catch (error) {
    console.error('Error generating OpenGraph images:', error);
    throw error; // Re-throw to stop the build if image generation fails
  } finally {
    await browser.close();
  }
}

module.exports = function(eleventyConfig) {
  // Add event listener to generate images BEFORE build starts
  eleventyConfig.on('eleventy.before', async ({ dir, outputMode, runMode }) => {
    // Generate images in these cases:
    // 1. Production builds (NODE_ENV=production)
    // 2. Explicitly requested (GENERATE_OG=true)  
    // 3. When running build commands (not serve/watch)
    const isProduction = process.env.NODE_ENV === 'production';
    const explicitlyRequested = process.env.GENERATE_OG === 'true';
    const isServing = runMode === 'serve' || runMode === 'watch';
    
    const shouldGenerate = isProduction || explicitlyRequested || !isServing;
    
    if (shouldGenerate) {
      await generateOGImages();
    } else {
      console.log('🖼️  Skipping OpenGraph generation during development server');
      console.log('     Use build commands or set GENERATE_OG=true to generate images');
    }
  });

  // Add a global data function to provide OG image paths
  eleventyConfig.addGlobalData('ogImages', () => {
    const ogImageMap = {};
    ogPages.forEach(page => {
      ogImageMap[page.filename] = `/assets/images/opengraph/${page.filename}.png`;
    });
    return ogImageMap;
  });

  // Add a filter to get OG image for a page
  eleventyConfig.addFilter('getOgImage', function(pageName) {
    const ogImageMap = {};
    ogPages.forEach(page => {
      ogImageMap[page.filename] = `/assets/images/opengraph/${page.filename}.png`;
    });
    return ogImageMap[pageName] || '/assets/images/opengraph/about.png'; // fallback
  });
};
