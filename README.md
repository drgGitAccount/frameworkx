# VisualUI

A production-ready CSS framework that combines the best of Bootstrap and Tailwind CSS, offering a hybrid approach with both component-based and utility-first classes.

## 🚀 Features

- **Hybrid Approach**: Component-based classes like Bootstrap + utility-first classes like Tailwind
- **Modern & Responsive**: Mobile-first design with responsive breakpoints
- **Lightweight**: Optimized for performance with minimal footprint
- **Customizable**: Extensive theming with CSS variables
- **Accessible**: Built with accessibility in mind
- **Production Ready**: Battle-tested for production applications

## 📦 Installation

### CDN
```html
<!-- CSS -->
<link href="https://unpkg.com/VisualUI@1.0.0/dist/VisualUI.min.css" rel="stylesheet">

<!-- JavaScript -->
<script src="https://unpkg.com/VisualUI@1.0.0/dist/VisualUI.min.js"></script>
```

### NPM
```bash
npm install VisualUI
```

### Download
Download the latest release from [GitHub](https://github.com/VisualUI/VisualUI/releases).

## 🎯 Quick Start

### Basic HTML Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisualUI Example</title>
    <link href="dist/VisualUI.min.css" rel="stylesheet">
</head>
<body>
    <div class="fw-container">
        <h1 class="fw-font-weight-bold">Hello VisualUI!</h1>
        <button class="fw-btn fw-btn-primary">Primary Button</button>
    </div>
    <script src="dist/VisualUI.min.js"></script>
</body>
</html>
```

## 🎨 Components

### Buttons
```html
<button class="fw-btn fw-btn-primary">Primary</button>
<button class="fw-btn fw-btn-secondary">Secondary</button>
<button class="fw-btn fw-btn-success">Success</button>
<button class="fw-btn fw-btn-outline-primary">Outline Primary</button>
```

### Cards
```html
<div class="fw-card">
    <div class="fw-card-body">
        <h5 class="fw-card-title">Card Title</h5>
        <p class="fw-card-text">Some quick example text.</p>
        <button class="fw-btn fw-btn-primary">Go somewhere</button>
    </div>
</div>
```

### Forms
```html
<div class="fw-form-group">
    <label for="email">Email address</label>
    <input type="email" class="fw-form-control" id="email" placeholder="Enter email">
</div>
```

### Alerts
```html
<div class="fw-alert fw-alert-success" role="alert">
    This is a success alert!
</div>
```

## 🔧 Utilities

### Spacing
```html
<div class="m-3 p-2">Margin and padding utilities</div>
<div class="mt-4 mb-2">Margin top and bottom</div>
```

### Flexbox
```html
<div class="d-flex justify-content-center align-items-center">
    Centered content
</div>
```

### Grid
```html
<div class="fw-row">
    <div class="fw-col-md-4">Column 1</div>
    <div class="fw-col-md-4">Column 2</div>
    <div class="fw-col-md-4">Column 3</div>
</div>
```

## 🎯 Breakpoints

| Breakpoint | Min Width | CSS Class |
|------------|-----------|-----------|
| sm         | 576px     | `fw-col-sm-*` |
| md         | 768px     | `fw-col-md-*` |
| lg         | 992px     | `fw-col-lg-*` |
| xl         | 1200px    | `fw-col-xl-*` |

## 🛠️ Development

### Setup
```bash
# Clone the repository
git clone https://github.com/VisualUI/VisualUI.git
cd VisualUI

# Install dependencies
npm install

# Start development server
npm run serve
```

### Build
```bash
# Build CSS and JavaScript
npm run build

# Minify files
npm run minify

# Watch for changes
npm run watch
```

### Project Structure
```
VisualUI/
├── src/
│   ├── core/           # Core CSS files
│   ├── components/     # Component CSS
│   ├── layout/         # Layout CSS
│   ├── responsive/     # Responsive CSS
│   ├── utilities/      # Utility CSS
│   ├── js/            # JavaScript files
│   └── VisualUI.css # Main entry point
├── dist/              # Built files
├── docs/              # Documentation
├── examples/          # Example pages
├── build/             # Build scripts
└── package.json
```

## 🎨 Customization

### CSS Variables
VisualUI uses CSS variables for easy theming:

```css
:root {
    --fw-primary-color: #007bff;
    --fw-secondary-color: #6c757d;
    --fw-success-color: #28a745;
    --fw-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    --fw-border-radius: 0.375rem;
}
```

### Custom Build
Create a custom build by modifying the import order in `src/VisualUI.css`:

```css
@import url("core/_reset.css");
@import url("core/_variables.css");
@import url("core/_typography.css");
/* Add your custom imports here */
```

## 📚 Documentation

- [Getting Started](docs/getting-started.html)
- [Components](docs/components.html)
- [Utilities](docs/utilities.html)
- [Examples](examples/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Bootstrap and Tailwind CSS
- Built with modern web standards
- Community-driven development

## 📞 Support

- [GitHub Issues](https://github.com/VisualUI/VisualUI/issues)
- [Documentation](https://VisualUI.dev)
- [Discord Community](https://discord.gg/VisualUI)

---

**VisualUI** - Build beautiful websites faster. 🚀

