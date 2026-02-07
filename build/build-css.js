const fs = require('fs-extra');
const path = require('path');

async function buildCSS() {
  console.log('Building CSS...');
  
  // Ensure dist directory exists
  await fs.ensureDir('dist');
  
  // Read the main CSS file
  const cssPath = path.join(__dirname, '../src/frameworkx.css');
  let cssContent = await fs.readFile(cssPath, 'utf8');
  
  // Process @import statements
  const importRegex = /@import url\(['"]([^'"]+)['"]\);/g;
  let processedCSS = cssContent;
  let match;
  
  while ((match = importRegex.exec(cssContent)) !== null) {
    const importPath = match[1];
    const fullImportPath = path.join(__dirname, '../src', importPath);
    
    try {
      const importContent = await fs.readFile(fullImportPath, 'utf8');
      processedCSS = processedCSS.replace(match[0], `/* Import: ${importPath} */\n${importContent}\n`);
    } catch (error) {
      console.warn(`Warning: Could not import ${importPath}: ${error.message}`);
    }
  }
  
  // Write the processed CSS to dist
  await fs.writeFile('dist/frameworkx.css', processedCSS);
  console.log('CSS built successfully!');
}

buildCSS().catch(console.error);
