const fs = require('fs-extra');
const CleanCSS = require('clean-css');

async function minifyCSS() {
  console.log('Minifying CSS...');
  
  // Read the built CSS file
  const cssPath = 'dist/frameworkx.css';
  
  try {
    const cssContent = await fs.readFile(cssPath, 'utf8');
    
    // Configure CleanCSS
    const cleanCSS = new CleanCSS({
      level: 2,
      returnPromise: true
    });
    
    // Minify the CSS
    const minifiedResult = await cleanCSS.minify(cssContent);
    
    if (minifiedResult.errors.length > 0) {
      console.error('CSS minification errors:', minifiedResult.errors);
      return;
    }
    
    if (minifiedResult.warnings.length > 0) {
      console.warn('CSS minification warnings:', minifiedResult.warnings);
    }
    
    // Write the minified CSS
    await fs.writeFile('dist/frameworkx.min.css', minifiedResult.styles);
    
    const originalSize = Buffer.byteLength(cssContent, 'utf8');
    const minifiedSize = Buffer.byteLength(minifiedResult.styles, 'utf8');
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    console.log(`CSS minified successfully! Size: ${minifiedSize} bytes (saved ${savings}%)`);
    
  } catch (error) {
    console.error('Error minifying CSS:', error.message);
  }
}

minifyCSS().catch(console.error);
