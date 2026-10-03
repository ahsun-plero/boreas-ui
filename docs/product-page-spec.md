# Product Pitch Page (POWR) Specification

## Overview
Complete specification for the ETF product pitch page (using POWR as the example ETF). This document provides component specifications for the `frontend-engineer` agent and a layout specification for the `layout-builder` agent.

---

## Part 1: Component Specifications

### Component 1: product-hero.ejs

**Purpose:** Hero section for the product page with breadcrumb navigation, ETF information, statistics, download buttons, and price card.

**Props:**
- `breadcrumbs` (array): [{label, href}] - Breadcrumb navigation (e.g., "Home > Our ETFs > POWR")
- `ticker` (string): ETF ticker symbol (e.g., "POWR")
- `title` (string): Full ETF name (e.g., "Power to the People ETF")
- `subtitle` (string): One-line ETF description
- `stats` (array): [{label, value}] - Three stats: "Expense Ratio", "Holdings", "Inception"
- `downloadButtons` (array): [{label, icon, href}] - Five buttons: Factsheet, KIID, 2-Pager, Index Document, Holdings
- `priceCard` (object): {nav, change, changePercent, aum, ytdReturn, asOfDate}
- `ctaText` (string): CTA button text (e.g., "Speak To Our Team")
- `ctaHref` (string): CTA button link

**Styling:**
- Use existing `bg-hero` component class (from tailwind.config.js) for background
- Breadcrumb: `text-body-sm` gray on dark
- Title: `text-h1` white
- Subtitle: `text-body` white/80
- Stats blocks: white cards, `text-h6` labels, `text-body` values, `border-l-4 border-mint`
- Download buttons: white outline pills, `text-body` text, hover: `bg-white/10`
- Price card: white background, `text-h4` for NAV value (green/red based on change), `text-body` labels, gold CTA button (h-12)

**Responsive Behavior:**
- SM: Text left-aligned, price card stacks below, stats in single column (or 2 col with wrapping)
- MD: Text/card side-by-side, stats 3-column
- LG: Same as MD, wider stats blocks

**States/Variants:**
- Positive change: green text/icon
- Negative change: red text/icon
- Download button hover: opacity change

**Interactive Elements:**
- Download buttons: Click opens file in new tab or triggers download
- CTA button: Scrolls to contact form or modal (matches header CTA)

**Examples:**
```
<%- include('../components/product-hero', {
  breadcrumbs: [{label: 'Home', href: '#'}, {label: 'Our ETFs', href: '#etfs'}, {label: 'POWR', href: '#'}],
  ticker: 'POWR',
  title: 'Power to the People ETF',
  subtitle: 'Invest in energy transition and renewable energy leaders',
  stats: [{label: 'Expense Ratio', value: '0.49%'}, {label: 'Holdings', value: '25'}, {label: 'Inception', value: '2026'}],
  downloadButtons: [{label: 'Factsheet', icon: 'download', href: '#'}, ...],
  priceCard: {nav: '$162.84', change: '+2.35', changePercent: '+1.47%', aum: '$850M', ytdReturn: '+12.3%', asOfDate: 'Oct 2, 2026'},
  ctaText: 'Speak To Our Team',
  ctaHref: '#contact'
}) %>
```

---

### Component 2: sub-nav.ejs

**Purpose:** Sticky in-page navigation tabs for anchoring to major sections.

**Props:**
- `tabs` (array): [{label, href, id}] - Six tabs: ETF Overview, Holdings, Exposure, Performance, Exchange Listings, Literature

**Styling:**
- Sticky position below main header, `z-30`
- Background: white with border-bottom `border-gray-200`
- Tabs: `text-body` text, centered gap-8
- Active tab: `border-b-2 border-signature`, `text-signature` bold
- Inactive: `text-gray-600` hover `text-charcoal`

**Responsive Behavior:**
- SM: Horizontally scrollable (overflow-x auto), pill-style with `bg-gray-100` inactive
- MD/LG: Underline style, full width

**States/Variants:**
- Active: underline (LG) or filled pill (SM)
- Hover: text color change, cursor pointer

**Interactive Elements:**
- Click: Smooth scroll to section (via anchor href or JS scroll handler)
- Passive JS scroll detection: update active tab on page scroll

---

### Component 3: info-card.ejs

**Purpose:** Content card for Investment Strategy and Why Invest sections.

**Props:**
- `title` (string): Card heading
- `variant` (string): 'default' (white) or 'tint' (tint-signature background)
- `content` (string OR array): 'default' = bullet-list array `[{text}]`, 'tint' = paragraphs array `[{text}]`

**Styling:**
- Default: white background, `text-h5` title, bullet-point list `text-body` in `text-charcoal`
- Tint: `bg-tint-signature` (light purple), `text-h5` title in `text-signature`, paragraphs in `text-body` dark
- Padding: `p-6`, rounded `rounded-lg`
- Bullets: `list-disc ml-5` or custom bullet SVG

**Responsive Behavior:**
- SM/MD/LG: Same width, stacked on page

**States/Variants:**
- Hover: `shadow-lg` transition

**Examples:**
```
<%- include('../components/info-card', {
  title: 'Investment Strategy',
  variant: 'default',
  content: [
    {text: 'Research-driven stock selection focusing on energy transition leaders'},
    {text: 'Deliberately researched exposure, delivered through a rules-based index'},
    ...
  ]
}) %>

<%- include('../components/info-card', {
  title: 'Why Invest?',
  variant: 'tint',
  content: [
    {text: 'The global energy transition creates long-term growth opportunities...'},
    ...
  ]
}) %>
```

---

### Component 4: key-value-list.ejs

**Purpose:** Two-column layout for ETF metadata (Key Information, Investor Information sections).

**Props:**
- `title` (string): Section heading (e.g., "Key Information")
- `rows` (array): [{label, value}] - Pairs like "ISIN: IE000ABC123"
- `accentHeading` (boolean): true = mint-underlined title, false = standard

**Styling:**
- Title: `text-h5` bold, optional `border-b-2 border-mint` if `accentHeading: true`
- Rows: `text-body` for both label and value, `label` in `text-charcoal/80` semi-bold, `value` in `text-charcoal` regular
- Layout: two-column grid `grid-cols-2` on LG, `grid-cols-1` on SM/MD
- Row dividers: `border-b border-gray-200` between rows
- Padding: `p-4 md:p-6`

**Responsive Behavior:**
- LG: 2 columns
- MD/SM: 1 column, stacked

**Examples:**
```
<%- include('../components/key-value-list', {
  title: 'Key Information',
  accentHeading: true,
  rows: [
    {label: 'ISIN', value: 'IE000ABC123'},
    {label: 'Fund Size', value: '$850M'},
    {label: 'Inception Date', value: 'March 1, 2026'},
    ...
  ]
}) %>
```

---

### Component 5: data-table.ejs ⭐ (Priority)

**Purpose:** Reusable tabular data component for Holdings, Performance, Exchange Listings.

**Props:**
- `columns` (array): [{key, label, align}] - Column definitions ('left', 'center', 'right')
- `rows` (array): [{key: value, ...}] - Each row object keyed by column.key
- `headerStyle` (string): 'default' or 'tint' (tint-signature background with `text-table-header` styling)
- `maxVisibleRows` (number, optional): If set, show first N rows + "Show More" button (default: all)
- `footerAction` (object, optional): {label, onClickHandler} - e.g., "View Full Holdings List"

**Styling:**
- Header: `bg-tint-signature` if tint, `text-table-header` (small caps, gray/charcoal)
- Rows: `text-body` alternating white/`bg-gray-50` for readability
- Border: `border-b border-gray-200` on rows
- Padding: `px-4 py-3` per cell

**Responsive Behavior:**
- LG/MD: Standard table
- SM: Horizontal scroll wrapper (`overflow-x auto`) with `min-w-full`

**States/Variants:**
- Hover on row: `bg-gray-100` transition
- Even/odd rows: alternating subtle backgrounds

**Interactive Elements:**
- "Show More" button (if `maxVisibleRows` set): click expands table or links to full data page
- Optional sort indicators (chevron icons in headers)

**Examples:**
```
<%- include('../components/data-table', {
  columns: [
    {key: 'company', label: 'Company', align: 'left'},
    {key: 'weight', label: 'Weight', align: 'right'},
    {key: 'sector', label: 'Sector', align: 'left'}
  ],
  rows: [
    {company: 'Tesla Inc.', weight: '5.2%', sector: 'Technology'},
    {company: 'NextEra Energy', weight: '4.8%', sector: 'Utilities'},
    ...
  ],
  headerStyle: 'tint',
  maxVisibleRows: 10,
  footerAction: {label: 'View Full Holdings List', href: '#'}
}) %>
```

---

### Component 6: tabs.ejs ⭐ (Priority)

**Purpose:** Tab switcher for Performance section (Average Annual / Cumulative / Calendar Year returns).

**Props:**
- `tabs` (array): [{label, id, content}] - Tab definitions with associated content (HTML or text)
- `style` (string): 'pill' (filled/outlined) or 'underline' (border-bottom)

**Styling:**
- Style 'pill': `bg-gray-100` inactive, `bg-signature text-white` active, rounded-full, inline-block
- Style 'underline': `border-b-2 border-transparent` inactive, `border-signature text-signature` active
- All: `text-body` text, `cursor-pointer` on hover, `transition-all duration-200`

**Responsive Behavior:**
- SM/MD/LG: Flex layout with gap-4, wraps if needed

**Interactive Elements:**
- Click tab: show associated content (fade/slide transition optional)
- Active state: persist via data attribute or JS state

**JavaScript:**
- Small vanilla JS in `src/js/tabs.js`: handle click + toggle active classes

**Examples:**
```
<%- include('../components/tabs', {
  tabs: [
    {label: 'Average Annual', id: 'avg-annual', content: '...'},
    {label: 'Cumulative', id: 'cumulative', content: '...'},
    {label: 'Calendar Year', id: 'calendar', content: '...'}
  ],
  style: 'pill'
}) %>
```

---

### Component 7: performance-chart.ejs ⭐ (Priority)

**Purpose:** Interactive chart showing "Growth of a Hypothetical $10,000" with range selector.

**Props:**
- `title` (string): "Growth of a Hypothetical $10,000"
- `ranges` (array): [{label: '1M', value: '1m'}, {label: '1Y', value: '1y'}, ..., {label: 'Inception', value: 'inception'}]
- `data` (object): {labels: [], datasets: [{label, data, borderColor, backgroundColor}]}
- `legendItems` (array): [{label, color}] - For legend below chart

**Styling:**
- Card wrapper: white background, `p-6`, `rounded-lg`, `shadow-md`
- Title: `text-h5` bold
- Range selector: pill buttons, `text-body-sm`, similar to tabs but as filter
- Chart container: height `h-80` (LG), `h-60` (MD), `h-48` (SM)
- Legend: horizontal flex, `text-body-sm`, color swatches

**Responsive Behavior:**
- SM: Reduced height, smaller text
- MD/LG: Full size

**Library:**
- Use **Chart.js** from CDN (cdnjs.cloudflare.com/ajax/libs/Chart.js)
- Chart instance config in `src/js/performance-chart.js`

**Interactive Elements:**
- Click range pill: fetch/switch data set (or pre-load all ranges)
- Hover on chart: tooltip showing date + value

**Examples:**
```
<%- include('../components/performance-chart', {
  title: 'Growth of a Hypothetical $10,000',
  ranges: [{label: '1M', value: '1m'}, ...],
  data: {
    labels: ['Jan', 'Feb', ...],
    datasets: [{label: 'POWR', data: [10000, 10150, ...], borderColor: '#312454', fill: true, backgroundColor: 'rgba(49, 36, 84, 0.1)'}]
  },
  legendItems: [{label: 'POWR', color: '#312454'}]
}) %>
```

---

### Component 8: section-header.ejs

**Purpose:** Reusable section title with optional right-aligned action (avoids repeated inline markup).

**Props:**
- `title` (string): Section name (e.g., "ETF Overview")
- `action` (object, optional): {label, icon, href} - e.g., {label: 'Download Holdings Data', icon: 'download', href: '#'}

**Styling:**
- Title: `text-h4 lg:text-h3` responsive, `text-charcoal` bold
- Action: white button or link with icon, hover effects
- Layout: flex justify-between

**Examples:**
```
<%- include('../components/section-header', {
  title: 'Holdings',
  action: {label: 'Download Holdings Data', icon: 'download', href: '#download-holdings'}
}) %>
```

---

### Component 9: tag-chip.ejs

**Purpose:** Small outlined chips for listing values like "Available Countries".

**Props:**
- `label` (string): Chip text (e.g., "Germany")
- `variant` (string): 'outline' (border + transparent bg) or 'filled' (bg-tint-signature)

**Styling:**
- Outline: `border border-outline`, `text-charcoal`, `bg-transparent`, `rounded-full`, `px-3 py-1`, `text-body-sm`
- Filled: `bg-tint-signature`, `text-signature`, `rounded-full`, `px-3 py-1`

**Examples:**
```
<%- include('../components/tag-chip', {label: 'Germany', variant: 'outline'}) %>
<%- include('../components/tag-chip', {label: 'UK', variant: 'outline'}) %>
```

---

### Component 10: document-list.ejs

**Purpose:** Three-column card group for Literature section (Regulatory / Marketing / Data documents).

**Props:**
- `groups` (array): [{title, items: [{label, href}]}]
  - Example: `{title: 'Regulatory Documents', items: [{label: 'Prospectus', href: '#'}]}`

**Styling:**
- Group card: `bg-tint-signature`, `p-6`, `rounded-lg`
- Group title: `text-h6` bold, `text-signature`
- Items: `text-body` blue links with download icon, hover: underline
- Layout: 3-column grid on LG, 1 column on SM/MD

**Responsive Behavior:**
- LG: `grid-cols-3`
- MD/SM: `grid-cols-1`

**Examples:**
```
<%- include('../components/document-list', {
  groups: [
    {title: 'Regulatory Documents', items: [{label: 'Prospectus (PDF)', href: '#'}, ...]},
    {title: 'Marketing Documents', items: [{label: 'Factsheet (PDF)', href: '#'}, ...]},
    {title: 'Data & Reports', items: [{label: 'Holdings (CSV)', href: '#'}, ...]}
  ]
}) %>
```

---

### Component 11: disclaimer.ejs

**Purpose:** Important disclaimer block at page bottom.

**Props:**
- `title` (string): "Important Disclaimer"
- `content` (string): Long disclaimer text (multi-paragraph)

**Styling:**
- Wrapper: white background, centered `max-w-4xl mx-auto`, padding `p-6 md:p-8`
- Title: `text-h5` bold, `text-charcoal`, `mb-4`
- Content: `text-body-sm` light gray, `text-charcoal/70`, line-height relaxed

**Examples:**
```
<%- include('../components/disclaimer', {
  title: 'Important Disclaimer',
  content: 'Past performance is not indicative of future results. ...'
}) %>
```

---

### Component 12 (Optional): risk-note.ejs

**Purpose:** Callout card for "Main Risk Factors".

**Props:**
- `risks` (array): [{label, description}]

**Styling:**
- White card, `p-4`, `border-l-4 border-signature` (red variant available)
- Title: `text-h6` bold
- Items: `text-body` with bullet points

*(May be folded into `info-card.ejs` with a 'risks' variant)*

---

## Part 2: Layout Specification

### Layout: product.ejs

**File Path:** `src/pages/product.ejs`

**Purpose:** Complete product pitch page template for ETF details (parameterized by ETF data).

**Section Order:**
1. `top-header.ejs` (reused)
2. `header.ejs` (reused, "Our ETFs" item active)
3. `product-hero.ejs` (new)
4. `sub-nav.ejs` (new, sticky)
5. **Investment Strategy** section:
   - Background: `bg-bg-light`
   - Grid 2-col LG, 1-col SM/MD
   - Left: `info-card` (Investment Strategy)
   - Right: `info-card` (Why Invest?, variant='tint') + optional `risk-note`
6. **ETF Overview** section:
   - Background: white
   - `section-header` "ETF Overview"
   - Two `key-value-list` columns: Key Information + Investor Information
7. **Holdings** section:
   - Background: `bg-bg-light`
   - `section-header` with action: "Holdings" + "Download Holdings Data"
   - `data-table` with maxVisibleRows=10, headerStyle='tint'
8. **Performance** section:
   - Background: white
   - `section-header` "Performance"
   - `tabs` (Average Annual / Cumulative / Calendar Year)
   - `data-table` showing returns per period
   - `performance-chart`
9. **Exchange Listings** section:
   - Background: `bg-bg-light`
   - `section-header` "Exchange Listings"
   - `data-table` (exchange, ticker, status, ...)
   - `tag-chip` list of available countries
10. **Literature** section:
    - Background: white
    - `section-header` "Literature"
    - `document-list` (3 groups, 3-col LG, 1-col SM/MD)
11. `newsletter.ejs` (reused)
12. `footer.ejs` (reused)
13. `disclaimer.ejs` (new, at very bottom)

**Padding Convention (all sections):**
- `py-12 lg:py-20 px-4 md:px-8 lg:px-15`
- Container: `max-w-7xl mx-auto`

**Questions for layout-builder:**
- Sub-nav sticky offset: positioned below top header (28px) + main header height (~64px) = approximately `top-24` or `top-28`? Confirm with user.
- Section background alternation: Investment Strategy (`bg-bg-light`) → ETF Overview (white) → Holdings (`bg-bg-light`) → Performance (white) → Exchange (bg-bg-light) → Literature (white) — OK?
- Key-value-list column breakpoint: 2-col on LG, 1-col on MD/SM — confirm.
- Chart height: 80 (LG), 60 (MD), 48 (SM) — in Tailwind units (×4px). OK?
- Data-table max rows: 10 for Holdings, full for others — confirm.

---

## Part 3: How to Run

### Step 1: Frontend-Engineer Agent (Build Components)
Invoke the `frontend-engineer` agent **once per component**, starting with the complex ones:

**Priority Order:**
1. `data-table.ejs` (used 3 times)
2. `tabs.ejs` (interactive state)
3. `performance-chart.ejs` (Chart.js integration)
4. `product-hero.ejs`
5. `sub-nav.ejs`
6. `info-card.ejs`, `key-value-list.ejs`, `section-header.ejs`, `tag-chip.ejs`, `document-list.ejs`, `disclaimer.ejs`, `risk-note.ejs` (in parallel batches if desired)

**Example call:**
```
frontend-engineer: "Build data-table.ejs per the specification in docs/product-page-spec.md. 
Props: columns, rows, headerStyle, maxVisibleRows, footerAction.
Styling: use theme tokens (text-table-header, text-body, bg-tint-signature, etc.).
Responsive: horizontal scroll on SM, full table on MD+.
Horizontal scroll wrapper needs overflow-x-auto."
```

### Step 2: Layout-Builder Agent (Compose Page)
Invoke the `layout-builder` agent once all components are ready:

```
layout-builder: "Build product.ejs per the specification in docs/product-page-spec.md.
Layout name: product.ejs
Sections: (list all 13 in order from spec Part 2)
Confirm with user: sub-nav sticky offset, section bg alternation, key-value breakpoint, chart heights, table row limits.
After questions, compose the layout using the built components."
```

### Step 3: Compliance Check (Optional)
After `npm run build`, run the `compliance-checker` agent on `dist/product.html`:

```
compliance-checker: "Audit dist/product.html for WCAG 2.2 AA accessibility and Google PageSpeed/Core Web Vitals compliance. 
Report any issues."
```

---

## Assets & Icons Needed

Request from user (to be added to `src/images/`):
- `download.svg` — Download button icon
- `check.svg` or `bullet.svg` — Bullet list marker
- (chevron-down.svg already exists)

---

## Verification Checklist

- [ ] Spec covers all sections visible in the screenshot
- [ ] Each component uses only theme tokens (no hardcoded px or hex)
- [ ] All theme tokens reference existing entries in `tailwind.config.js`
- [ ] Section padding follows convention (`py-12 lg:py-20 px-4 md:px-8 lg:px-15`)
- [ ] All CTAs are 48px high (`h-12`)
- [ ] Responsive breakpoints are SM/MD/LG (640/768/1024px)
- [ ] Components marked ⭐ (data-table, tabs, performance-chart) have full JS/interactivity specs
- [ ] Layout diagram shows all 13 sections in order
- [ ] No orphan sections from screenshot

---

**End of Specification**
