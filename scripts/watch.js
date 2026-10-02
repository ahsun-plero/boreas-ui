const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

console.log('Watching for changes...\n');

const watcher = chokidar.watch([
  path.join(srcDir, 'pages/**/*.ejs'),
  path.join(srcDir, 'components/**/*.ejs')
], {
  ignored: /(^|[\/\\])\.|node_modules/,
  persistent: true
});

let buildTimeout;

function rebuild() {
  clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    console.log('\nRebuilding...');
    const build = spawn('node', [path.join(__dirname, 'build.js')], {
      stdio: 'inherit'
    });

    build.on('close', (code) => {
      if (code === 0) {
        console.log('Ready for changes...\n');
      }
    });
  }, 300);
}

watcher
  .on('add', (file) => {
    console.log(`File added: ${path.relative(srcDir, file)}`);
    rebuild();
  })
  .on('change', (file) => {
    console.log(`File changed: ${path.relative(srcDir, file)}`);
    rebuild();
  })
  .on('unlink', (file) => {
    console.log(`File removed: ${path.relative(srcDir, file)}`);
    rebuild();
  });
