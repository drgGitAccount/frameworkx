# FrameworkX Website Structure

## Overview
The FrameworkX documentation website is now fully consolidated with proper navigation, consistent styling, and professional appearance.

## Pages & Navigation

### Main Documentation Pages
All documentation pages are located in the `/docs` folder and are interconnected:

1. **index.html** (Home Page)
   - Entry point to the website
   - Features overview section with 3 key features
   - Quick start buttons linking to Getting Started
   - Responsive hero section with gradient background
   - Professional footer with links to all sections

2. **getting-started.html** (Installation Guide)
   - Comprehensive installation instructions
   - CDN, NPM, and PNPM setup guides
   - File structure overview
   - Browser support information
   - Customization guide with CSS variables
   - Left sidebar navigation for easy reference

3. **components.html** (Components Reference)
   - Full documentation of all FrameworkX components
   - Alerts, Badges, Buttons, Cards, Forms, Modals
   - Headers, Footers, and Sidebars examples
   - Live code examples for each component
   - Left sidebar navigation with jump-to sections

4. **utilities.html** (Utilities Reference)
   - Comprehensive utilities documentation
   - Spacing, colors, typography utilities
   - Shadow, flex, and grid utilities
   - Visual demonstrations for each utility class
   - Responsive utility variants
   - Left sidebar navigation

### Example Pages
Located in `/examples` folder:

1. **landing-page.html** (Modern Landing Page)
   - Demonstration of FrameworkX capabilities
   - Hero section with gradient background
   - Feature cards showcase
   - Stats section
   - Code showcase with tabbed interface
   - Pricing section (template)
   - Testimonials section
   - CTA buttons linking to documentation

## Navigation Structure

### Header Navigation (All Pages)
```
FrameworkX Logo → Home | Getting Started | Components | Utilities | GitHub
```

All pages have consistent header with:
- Logo linking to home
- Main navigation menu
- Active page indicator (purple underline)
- GitHub link

### Footer Navigation (All Pages)
Each page has a unified footer with:
- **FrameworkX** - Description
- **Product** - Links to Components, Utilities, Getting Started, Home
- **Resources** - Links to GitHub, NPM, Community, Support
- **Company** - Links to About, Blog, Twitter, Contact
- Copyright notice

## Styling System

### Centralized Styles (`docs/common-styles.css`)
- Header and footer styling
- Navigation styles with active states
- Grid system with responsive breakpoints
- Component styles (alerts, buttons, cards)
- Utility classes (spacing, colors, typography)
- Responsive design rules

### Color Scheme
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Primary Color**: `#667eea`
- **Secondary Color**: `#764ba2`
- **Dark Background**: `#0f172a`
- **Text Color**: `#333`

### Responsive Breakpoints
- **Large (lg)**: Full layout (>1024px)
- **Medium (md)**: 768px - 1024px
- **Small (sm)**: <768px (mobile)

## File Structure
```
frameworkx/
├── docs/
│   ├── index.html              (Home Page)
│   ├── getting-started.html    (Installation)
│   ├── components.html         (Components Reference)
│   ├── utilities.html          (Utilities Reference)
│   ├── common-styles.css       (Centralized Styles)
│   └── docs-theme.css          (Theme Variables)
├── examples/
│   └── landing-page.html       (Demo Landing Page)
├── src/
│   ├── frameworkx.css          (Main Framework)
│   ├── components/             (Component CSS)
│   ├── core/                   (Core CSS)
│   ├── js/                     (JavaScript Components)
│   ├── layout/                 (Layout CSS)
│   └── responsive/             (Responsive CSS)
└── build/                      (Build Tools)
```

## Key Features

✅ **Unified Navigation** - All pages connected with consistent header/footer
✅ **Professional Design** - Modern gradient colors and typography
✅ **Responsive Layout** - Mobile-first responsive design
✅ **Component Library** - Pre-built components with examples
✅ **Utilities** - Comprehensive utility classes for rapid development
✅ **Code Examples** - Live code examples in each component doc
✅ **Consistent Branding** - All references use "FrameworkX"
✅ **Accessible** - Semantic HTML and proper navigation

## Removed Pages
- ✗ `examples/dashboard.html` - Removed (unused)
- ✗ `examples/login.html` - Removed (unused)

## Navigation Path Examples

### From Home Page:
- Click "Get Started →" → Goes to Getting Started
- Click "View Components" → Goes to Components
- Footer links → Any page

### From Documentation Pages:
- Logo → Returns to Home
- "Getting Started" in header → Gets you to installation
- "Components" in header → Gets you to components
- "Utilities" in header → Gets you to utilities
- All footer links work

## How to Use

1. **Start at Home** (`docs/index.html`)
   - Overview of FrameworkX features
   - Quick navigation to all sections

2. **Get Started** (`docs/getting-started.html`)
   - Installation instructions
   - Setup guides for different tools

3. **Explore Components** (`docs/components.html`)
   - View all available components
   - Copy-paste ready code examples

4. **Learn Utilities** (`docs/utilities.html`)
   - Utility classes for rapid development
   - Visual demonstrations

5. **See Examples** (`examples/landing-page.html`)
   - Modern landing page built with FrameworkX
   - Showcase of framework capabilities

## Next Steps

To view the website in your browser:
1. Navigate to `docs/index.html` in your browser
2. Or use a local web server: `npm run serve`
3. Click navigation links to explore all sections

---

**Created**: February 9, 2026
**Framework**: FrameworkX - Modern CSS Framework
