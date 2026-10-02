const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const cssnano = require('cssnano');

const distDir = path.join(__dirname, '../dist');
const srcDir = path.join(__dirname, '../src');
const componentDir = path.join(srcDir, 'components');
const pagesDir = path.join(srcDir, 'pages');
const imagesDir = path.join(srcDir, 'images');
const cssIn = path.join(srcDir, 'css/input.css');
const cssOut = path.join(distDir, 'styles.css');
const tailwindConfig = require(path.join(__dirname, '../tailwind.config.js'));

async function buildCSS() {
  console.log('Building CSS...');
  try {
    const input = fs.readFileSync(cssIn, 'utf8');

    const result = await postcss([
      tailwind(tailwindConfig),
      cssnano({ preset: 'default' })
    ]).process(input, {
      from: cssIn,
      to: cssOut
    });

    fs.writeFileSync(cssOut, result.css);
    console.log('✓ CSS built successfully\n');
  } catch (error) {
    console.error('CSS build failed:', error);
    throw error;
  }
}

function renderTemplate(filePath, data = {}) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      filePath,
      {
        ...data,
        include: (componentName, componentData = {}) => {
          const componentPath = path.join(componentDir, `${componentName}.ejs`);
          const componentContent = fs.readFileSync(componentPath, 'utf8');
          // Render the component with its data
          return ejs.render(componentContent, { locals: componentData });
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

async function buildHTML() {
  console.log('Building HTML...');
  try {
    const files = fs.readdirSync(pagesDir);

    for (const file of files) {
      if (file.endsWith('.ejs')) {
        const sourcePath = path.join(pagesDir, file);
        const outputName = file.replace('.ejs', '.html');
        const outputPath = path.join(distDir, outputName);

        const html = await renderTemplate(sourcePath);
        fs.writeFileSync(outputPath, html);
        console.log(`✓ Created ${outputName}`);
      }
    }
    console.log('');
  } catch (error) {
    console.error('HTML build failed:', error);
    throw error;
  }
}

function copyAssets() {
  console.log('Copying assets...');
  try {
    if (fs.existsSync(imagesDir)) {
      const distImagesDir = path.join(distDir, 'images');
      if (!fs.existsSync(distImagesDir)) {
        fs.mkdirSync(distImagesDir, { recursive: true });
      }

      const files = fs.readdirSync(imagesDir);
      for (const file of files) {
        const srcFile = path.join(imagesDir, file);
        const distFile = path.join(distImagesDir, file);
        fs.copyFileSync(srcFile, distFile);
      }
      console.log('✓ Assets copied successfully\n');
    }
  } catch (error) {
    console.error('Asset copy failed:', error);
    throw error;
  }
}

async function build() {
  try {
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
    }
    fs.mkdirSync(distDir, { recursive: true });

    await buildCSS();
    await buildHTML();
    copyAssets();

    console.log('✅ Build complete!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
