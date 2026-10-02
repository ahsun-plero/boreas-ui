const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/pages');
const distDir = path.join(__dirname, '../dist');
const componentDir = path.join(__dirname, '../src/components');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Helper function to render templates
function renderTemplate(filePath) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      filePath,
      {
        // Make components available as global functions
        include: (componentName) => {
          const componentPath = path.join(componentDir, `${componentName}.ejs`);
          return fs.readFileSync(componentPath, 'utf8');
        }
      },
      {},
      (err, str) => {
        if (err) reject(err);
        else resolve(str);
      }
    );
  });
}

// Recursively process all EJS files
async function buildPages() {
  try {
    const files = fs.readdirSync(srcDir);

    for (const file of files) {
      if (file.endsWith('.ejs')) {
        const sourcePath = path.join(srcDir, file);
        const outputName = file.replace('.ejs', '.html');
        const outputPath = path.join(distDir, outputName);

        console.log(`Building ${file}...`);
        const html = await renderTemplate(sourcePath);
        fs.writeFileSync(outputPath, html);
        console.log(`✓ Created ${outputName}`);
      }
    }

    console.log('\n✓ Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildPages();
