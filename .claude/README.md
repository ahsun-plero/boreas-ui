# Cloud Agents Directory

This directory contains agent configurations for automating component and layout creation in the boreas-ui project.

## 📁 Structure

```
.cloud/
├── agents/
│   ├── frontend-engineer.md    # Component creation agent
│   └── layout-builder.md       # Layout composition agent
└── README.md                   # This file
```

## 🤖 Available Agents

### [Frontend Engineer Agent](./agents/frontend-engineer.md)

**Creates responsive HTML/EJS components**

Takes design specifications and builds complete components:
- EJS templates with prop support
- Tailwind CSS styling
- Mobile/tablet/desktop responsiveness
- Dark mode variants
- Component variations

**When to use:**
- Need to build a new component (card, button, hero, etc.)
- Want responsive design across all screen sizes
- Need reusable UI elements

**Input Example:**
```
Component Name: Testimonial Card
Purpose: Display customer testimonial with image and text
Props: image, name, role, testimonial, rating
Responsive: yes (stack mobile, flex desktop)
```

**Output:** `src/components/testimonial-card.ejs` ready to use

---

### [Layout Builder Agent](./agents/layout-builder.md)

**Creates complete page layouts by composing components**

Asks detailed questions about layout structure and generates pages:
- Asks grid/flex specifications per breakpoint
- Determines column counts for mobile, tablet, desktop
- Configures spacing, alignment, padding
- Combines components into complete pages

**When to use:**
- Building a complete page layout
- Need responsive grid configuration
- Want to combine multiple components
- Need to specify breakpoint behavior

**Input Example:**
```
Layout Name: Homepage
Sections: hero, features-grid, testimonials, cta, footer
Components: hero.ejs, card.ejs, testimonial.ejs, footer.ejs
```

**Agent asks:**
```
Features Section:
- Grid or flex?
- Columns on mobile? (1 or 2)
- Columns on tablet? (2 or 3)
- Columns on desktop? (3 or 4)
- Gap between items? (16px, 24px, 32px)
- Padding around section? (48px or 80px)
```

**Output:** `src/pages/homepage.ejs` with all responsive specs implemented

---

## 🔄 Workflow

### Step 1: Create Components (Frontend Engineer)

```bash
# Tell the agent what component you need
claude-code agent frontend-engineer \
  --spec "
    Component Name: Price Card
    Purpose: Display pricing tier
    Props: title, price, features, cta-text
    Responsive: yes
  "
```

✅ Output: `src/components/price-card.ejs`

### Step 2: Compose Layout (Layout Builder)

```bash
# Describe your page layout
claude-code agent layout-builder \
  --page "pricing-page" \
  --sections "header, pricing-cards-grid, faq, cta, footer"
```

The agent asks questions about:
- Grid columns per breakpoint
- Spacing and padding
- Component positioning
- Responsive behavior

✅ Output: `src/pages/pricing-page.ejs`

### Step 3: Build & Deploy

```bash
npm run build
# dist/pricing-page.html ready!
```

---

## 📋 Communication Patterns

### Frontend Engineer Agent

**Spec Format:**
```
Component Name: <name>
Purpose: <brief description>

Props:
- <name> (<type>): <description>

Styling:
- <styling details>

Responsive Behavior:
- Mobile: <behavior>
- Tablet: <behavior>
- Desktop: <behavior>

Examples:
- <usage example>
```

### Layout Builder Agent

**Request Format:**
```
Layout Name: <page-name>
Purpose: <page purpose>

Sections:
1. <name> - <description> (component: component-name)
2. <name> - <description> (component: component-name)

Components to Use:
- src/components/<name>.ejs
```

The agent will ask for:
- Grid configuration (columns per breakpoint)
- Flex configuration (direction, alignment)
- Spacing and padding
- Component sizing
- Responsive behavior

---

## 💡 Best Practices

### When Creating Components

1. **Be Specific**: Describe visual requirements clearly
2. **List Props**: Tell the agent what data the component needs
3. **Define Responsive**: Specify mobile/tablet/desktop behavior
4. **Provide Examples**: Show how the component should be used
5. **Mention Variants**: If you need multiple variations

### When Building Layouts

1. **Start with Sections**: List main sections first
2. **Reference Components**: Tell agent which components to use
3. **Ask for Specs**: Let agent ask detailed grid/flex questions
4. **Be Responsive**: Think about mobile → desktop progression
5. **Specify Content**: Describe what goes in each section

### Component Reuse

- Build components ONCE, use everywhere
- Create variants rather than new components
- Ask for flexible props instead of hard-coding content
- Build generic components, customize with props

### Layout Best Practices

- Mobile-first design (base classes for mobile)
- Use responsive prefixes (sm:, md:, lg:)
- Consistent padding/spacing
- Proper container widths
- Touch-friendly sizing (44px minimum)

---

## 🎯 Example Scenarios

### Scenario 1: Build a Card Component

**You say:**
```
I need a product card component. It should show:
- Product image (responsive)
- Product name (title)
- Price and rating
- Add to cart button
- Should be responsive: full width on mobile, grid items on desktop
```

**Agent creates:** `src/components/product-card.ejs`

**You use it:**
```ejs
<%- include('../components/product-card', {
  image: '/products/item.jpg',
  name: 'Product Name',
  price: '$99',
  rating: 4.5
}) %>
```

---

### Scenario 2: Build a Product Listing Page

**You say:**
```
Build a products page with:
- Hero section
- Product cards grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Filter sidebar
- Footer

Use components: hero.ejs, product-card.ejs, sidebar.ejs, footer.ejs
```

**Agent asks:**
```
For the product grid:
- How many products per page?
- Gap between cards? (16px, 24px, 32px)
- Columns on mobile? (1)
- Columns on tablet? (2)
- Columns on desktop? (3 or 4)
- Padding around grid? (24px or 32px)

For the layout:
- Main content full width or with sidebar?
- If sidebar, how wide? (1/4 or 1/3)
- Sidebar on left or right?
```

**Agent creates:** `src/pages/products.ejs`

---

## 🔧 Configuration

Agents are configured with:
- **Purpose**: What they're designed to do
- **Capabilities**: What they can build
- **Input Format**: How to provide specifications
- **Output Format**: What they generate
- **Standards**: Code conventions they follow

See individual agent files for complete configuration.

---

## 📚 File Reference

- **[.cloud.md](../.cloud.md)** - Overview of the cloud agent system
- **[frontend-engineer.md](./agents/frontend-engineer.md)** - Complete component agent documentation
- **[layout-builder.md](./agents/layout-builder.md)** - Complete layout agent documentation

---

## ✨ Next Steps

1. **Read the agent documentation** to understand capabilities
2. **Start with components** - build reusable UI elements
3. **Then build layouts** - compose components into pages
4. **Build and deploy** - `npm run build` and use in WordPress

For detailed information about each agent, see their individual documentation files.

---

**Last Updated:** 2026-10-02  
**Project:** boreas-ui v1.0.0
