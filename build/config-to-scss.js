const fs = require('fs');
const path = require('path');

function generateSCSSFromConfig(config) {
  let scss = '// Generated from fwx.config.js\n\n';

  // Colors
  if (config.theme.colors) {
    scss += '// Colors\n';
    Object.entries(config.theme.colors).forEach(([name, value]) => {
      scss += `$fw-color-${name}: ${value};\n`;
    });
    scss += '\n';
  }

  // Spacing
  if (config.theme.spacing) {
    scss += '// Spacing\n';
    Object.entries(config.theme.spacing).forEach(([name, value]) => {
      scss += `$fw-spacing-${name}: ${value};\n`;
    });
    scss += '\n';
  }

  // Border Radius
  if (config.theme.borderRadius) {
    scss += '// Border Radius\n';
    Object.entries(config.theme.borderRadius).forEach(([name, value]) => {
      scss += `$fw-border-radius-${name}: ${value};\n`;
    });
    scss += '\n';
  }

  // Breakpoints
  if (config.breakpoints) {
    scss += '// Breakpoints\n';
    Object.entries(config.breakpoints).forEach(([name, value]) => {
      scss += `$fw-breakpoint-${name}: ${value};\n`;
    });
    scss += '\n';
  }

  return scss;
}

function readConfig() {
  const configPath = path.join(__dirname, '..', 'fwx.config.js');
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);
  return config;
}

function generateSCSSFile() {
  const config = readConfig();
  const scss = generateSCSSFromConfig(config);
  return scss;
}

module.exports = {
  generateSCSSFile,
  generateSCSSFromConfig,
  readConfig
};
