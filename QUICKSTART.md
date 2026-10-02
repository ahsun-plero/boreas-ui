# Boreas UI - Quick Start Guide

Welcome to your new component-based WordPress theme project!

## 🚀 Getting Started

### 1. Start Development
```bash
npm run dev
```
This watches your files and auto-rebuilds when you make changes.

### 2. Create a Component

Create a new file in `src/components/yourcomponent.ejs`:

```ejs
<%
  const title = locals.title || 'Default Title';
  const description = locals.description || '';
%>

<div class="bg-white rounded-lg shadow p-6">
  <h3 class="text-xl font-bold mb-2"><%= title %></h3>
  <p class="text-gray-600"><%= description %></p>
</div>
```

### 3. Use Components in Pages

Edit `src/pages/index.ejs` or create a new page:

```ejs
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <%- include('../components/yourcomponent', {
    title: 'Welcome',
    description: 'This is my component!'
  }) %>
</body>
</html>
```

### 4. Build & Distribute

```bash
npm run build
```

Your compiled pages are ready in the `dist/` folder:
- `dist/index.html` - Ready to use
- `dist/styles.css` - All Tailwind styles included

## 📁 Project Structure

```
src/
├── components/          # Reusable component templates
│   ├── header.ejs      # Example: header component
│   ├── footer.ejs      # Example: footer component
│   ├── hero.ejs        # Example: hero section
│   └── button.ejs      # Example: button component
├── pages/              # Page templates
│   └── index.ejs       # Your homepage
└── css/
    └── input.css       # Tailwind CSS input

dist/                   # Generated files (don't edit)
├── index.html          # Compiled HTML
└── styles.css          # Compiled CSS
```

## 🎨 Using Tailwind CSS

All standard Tailwind classes are available:

```ejs
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h2 class="text-2xl font-bold text-blue-900">Section</h2>
    <p class="text-gray-600 mt-2">Description here</p>
  </div>
</div>
```

### Custom Colors

Edit `tailwind.config.js` to add brand colors:

```js
colors: {
  boreas: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    900: '#0c2d6b'
  }
}
```

Then use: `<div class="bg-boreas-600 text-white">`

## 📝 Component Example

Create `src/components/testimonial.ejs`:

```ejs
<%
  const name = locals.name || 'Client Name';
  const role = locals.role || 'Role';
  const text = locals.text || 'Great product!';
  const image = locals.image || '/images/default.jpg';
%>

<div class="bg-white rounded-lg shadow p-6">
  <p class="text-gray-600 text-lg italic mb-4">"<%= text %>"</p>
  <div class="flex items-center">
    <img src="<%= image %>" alt="<%= name %>" class="w-12 h-12 rounded-full mr-4">
    <div>
      <p class="font-bold text-gray-900"><%= name %></p>
      <p class="text-sm text-gray-500"><%= role %></p>
    </div>
  </div>
</div>
```

Use in your page:

```ejs
<%- include('../components/testimonial', {
  name: 'Jane Doe',
  role: 'CEO, Tech Co',
  text: 'This solution transformed our workflow!',
  image: '/images/jane.jpg'
}) %>
```

## 📦 Distribution

### Option 1: Static HTML
1. Run `npm run build`
2. Upload `dist/` files to any web server

### Option 2: Import to WordPress
1. Build your pages: `npm run build`
2. Copy HTML content into WordPress page editor
3. Copy CSS from `dist/styles.css` into your theme's stylesheet
4. Customize colors and content in WordPress

### Option 3: As Theme Template
1. Use `dist/` HTML as your theme's template files
2. Integrate with WordPress theme framework
3. Keep editing components here, rebuild, and deploy

## 🔄 Workflow

1. **Make changes**: Edit components or pages
2. **Watch auto-compile**: `npm run dev` watches and rebuilds
3. **Preview**: Open `dist/index.html` in browser
4. **Deploy**: Copy `dist/` files to production

## 🛠️ Available Commands

```bash
npm run build       # Clean build everything
npm run dev         # Watch mode with auto-rebuild
npm run clean       # Remove dist folder
npm run preview     # Open index.html in browser
npm run build:html  # Build HTML only (no CSS)
```

## 📚 Next Steps

1. **Add Figma Designs**: Create components based on your Figma file
2. **Create Pages**: Build all your WordPress pages as EJS templates
3. **Style with Tailwind**: Use utility classes for responsive design
4. **Test Locally**: Preview in browser before deploying
5. **Deploy**: Upload to WordPress or web server

## 🤝 Tips

- **Component Reuse**: Build components once, use everywhere
- **Parameters**: Pass data to components via locals object
- **Responsive**: Use Tailwind's responsive prefixes (sm:, md:, lg:, etc.)
- **Include partials**: Use `<%- include() %>` to nest components
- **No coupling**: Components are independent and reusable

## 💡 Example: Building a Homepage

Create `src/components/cta-button.ejs`:
```ejs
<a href="<%= locals.href %>" class="inline-block bg-boreas-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-boreas-700 transition">
  <%= locals.text || 'Learn More' %>
</a>
```

Create `src/pages/home.ejs`:
```ejs
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <%- include('../components/header') %>
  
  <%- include('../components/hero', {
    title: 'Welcome to Boreas',
    subtitle: 'Modern WordPress Components'
  }) %>

  <section class="py-20">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Why Choose Boreas?</h2>
      <p class="text-gray-600 mb-8">Beautiful, reusable components built with Tailwind CSS</p>
      <%- include('../components/cta-button', {
        text: 'Get Started',
        href: '/about'
      }) %>
    </div>
  </section>
  
  <%- include('../components/footer') %>
</body>
</html>
```

Build it: `npm run build`  
Result: `dist/home.html` is ready to use!

---

Happy building! 🚀
