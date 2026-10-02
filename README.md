# Boreas UI - WordPress Theme Components

A modern component-based WordPress theme built with Tailwind CSS, featuring reusable EJS templates that compile to static HTML pages.

## Project Structure

```
boreas-ui/
├── src/
│   ├── components/        # Reusable EJS component templates
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   ├── hero.ejs
│   │   ├── button.ejs
│   │   └── ...
│   ├── pages/            # Page templates that use components
│   │   ├── index.ejs
│   │   └── ...
│   └── css/
│       └── input.css     # Tailwind CSS configuration and custom styles
├── dist/                 # Compiled HTML files (generated)
├── scripts/
│   ├── build.js          # Build script to compile EJS to HTML
│   └── watch.js          # File watcher for development
├── tailwind.config.js
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start development with live reload:
```bash
npm run dev
```

## Available Scripts

- **`npm run build`** - Clean build: minify CSS and compile all EJS templates to HTML
- **`npm run build:css`** - Compile and minify Tailwind CSS
- **`npm run build:html`** - Compile EJS templates to HTML
- **`npm run watch`** - Watch for changes and rebuild (CSS + HTML)
- **`npm run dev`** - Start development mode with file watching
- **`npm run clean`** - Remove dist directory
- **`npm run preview`** - Open the built site in browser

## Creating Components

Create new components in `src/components/`. Components are EJS templates:

```ejs
<!-- src/components/button.ejs -->
<%
  const variant = locals.variant || 'primary';
  const text = locals.text || 'Button';
  const href = locals.href || '#';
%>

<a href="<%= href %>" class="btn btn-<%= variant %>">
  <%= text %>
</a>
```

Use in pages with the `include()` function:

```ejs
<%- include('../components/button', {
  variant: 'primary',
  text: 'Click Me',
  href: '/page'
}) %>
```

## Creating Pages

Create new pages in `src/pages/`. Each `.ejs` file will be compiled to `.html`:

```ejs
<!-- src/pages/about.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <%- include('../components/header') %>
  <!-- Page content -->
  <%- include('../components/footer') %>
</body>
</html>
```

## Tailwind CSS

- Configuration: `tailwind.config.js`
- Custom styles: `src/css/input.css`
- Component styles automatically scanned from `src/**/*.{html,ejs,js}`

### Custom Component Classes

Pre-built component classes available in `input.css`:

- `.btn` - Base button styling
- `.btn-primary` - Primary button variant
- `.btn-secondary` - Secondary button variant
- `.card` - Card component
- `.section-title` - Section heading

## Distribution

All compiled HTML files go to the `dist/` directory:

```bash
npm run build
# dist/
# ├── index.html
# ├── about.html
# └── styles.css
```

These files are ready to:
- Use as static pages
- Import into WordPress
- Deploy to any web server

## Development Workflow

1. Start development server:
   ```bash
   npm run dev
   ```

2. Create/edit components in `src/components/`

3. Create/edit pages in `src/pages/`

4. Changes auto-compile to `dist/`

5. Open dist files in browser to preview

## Technologies

- **EJS** - Templating engine for component composition
- **Tailwind CSS** - Utility-first CSS framework
- **Node.js** - Build automation and development scripts
- **Chokidar** - File watching for development

## Next Steps

1. Replace example components with designs from your Figma file
2. Add more components as needed in `src/components/`
3. Create additional pages in `src/pages/`
4. Customize colors in `tailwind.config.js` to match brand
5. Build and test in WordPress

---

Built with Claude Code | boreas-ui v1.0.0
