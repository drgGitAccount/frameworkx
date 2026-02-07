const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

console.log('Watching CSS files for changes...');

// Function to watch a directory recursively
function watchDirectory(dir, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        watchDirectory(fullPath, callback);
      } else if (file.endsWith('.css')) {
        fs.watchFile(fullPath, { interval: 1000 }, callback);
      }
    });
  });
}

// Watch the src directory for CSS changes
const srcDir = path.join(__dirname, '../src');
watchDirectory(srcDir, (curr, prev) => {
  console.log('CSS file changed, rebuilding...');
  exec('node build/build-css.js', (error, stdout, stderr) => {
    if (error) {
      console.error('Build error:', error);
      return;
    }
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
  });
});

console.log('CSS watcher started. Press Ctrl+C to stop.');
