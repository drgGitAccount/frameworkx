const fs = require('fs-extra');
const Terser = require('terser');

async function minifyJS() {
  console.log('Minifying JavaScript...');
  
  // Read the built JS file
  const jsPath = 'dist/frameworkx.js';
  
  try {
    const jsContent = await fs.readFile(jsPath, 'utf8');
    
    // Configure Terser
    const result = await Terser.minify(jsContent, {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: true,
      format: {
        comments: /^!/
      }
    });
    
    if (result.error) {
      console.error('JavaScript minification error:', result.error);
      return;
    }
    
    // Write the minified JS
    await fs.writeFile('dist/frameworkx.min.js', result.code);
    
    const originalSize = Buffer.byteLength(jsContent, 'utf8');
    const minifiedSize = Buffer.byteLength(result.code, 'utf8');
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    console.log(`JavaScript minified successfully! Size: ${minifiedSize} bytes (saved ${savings}%)`);
    
  } catch (error) {
    console.error('Error minifying JavaScript:', error.message);
  }
}

minifyJS().catch(console.error);
