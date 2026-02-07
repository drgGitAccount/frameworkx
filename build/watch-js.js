const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

console.log('Watching JavaScript files for changes...');

// Function to watch the JS directory
function watchJSDirectory(dir, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (file.endsWith('.js')) {
        fs.watchFile(fullPath, { interval: 1000 }, callback);
      }
    });
  });
}

// Watch the src/js directory for changes
const jsDir = path.join(__dirname, '../src/js');
watchJSDirectory(jsDir, (curr, prev) => {
  console.log('JavaScript file changed, rebuilding...');
  exec('node build/build-js.js', (error, stdout, stderr) => {
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

console.log('JavaScript watcher started. Press Ctrl+C to stop.');
