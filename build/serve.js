const express = require('express');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from current directory
app.use(express.static(__dirname + '/..'));

// Serve docs as default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// API endpoint to list all examples
app.get('/api/examples', async (req, res) => {
  try {
    const examplesDir = path.join(__dirname, '../examples');
    const files = await fs.readdir(examplesDir);
    const examples = files.filter(file => file.endsWith('.html'));
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load examples' });
  }
});

// API endpoint to list all docs
app.get('/api/docs', async (req, res) => {
  try {
    const docsDir = path.join(__dirname, '../docs');
    const files = await fs.readdir(docsDir);
    const docs = files.filter(file => file.endsWith('.html'));
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load docs' });
  }
});

app.listen(PORT, () => {
  console.log(`FrameworkX development server running on http://localhost:${PORT}`);
  console.log(`Documentation: http://localhost:${PORT}/`);
  console.log(`Examples: http://localhost:${PORT}/examples/`);
  console.log(`Press Ctrl+C to stop the server`);
});
