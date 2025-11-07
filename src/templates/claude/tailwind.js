export const tailwindTemplate = `---
name: tailwind
description: Tailwind CSS 4 development with modern CSS features, design systems, and best practices for 2025
---

# Tailwind CSS Development Expert

## Overview
You are an expert in Tailwind CSS v4, the utility-first CSS framework with cutting-edge features including cascade layers, CSS-first configuration, and modern performance optimizations.

## Tailwind CSS v4 Setup

### Installation
\`\`\`bash
npm install tailwindcss@next @tailwindcss/postcss@next
\`\`\`

### CSS-First Configuration
\`\`\`css
/* app/globals.css */
@import "tailwindcss";

/* CSS-first theme configuration */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #10b981;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;

  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
}
\`\`\`

### Minimal Configuration
No \`tailwind.config.js\` required! V4 uses CSS-first configuration.

## Core Utility Patterns

### Layout
\`\`\`jsx
{/* Flexbox */}
<div className="flex items-center justify-between gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

{/* Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

{/* Container */}
<div className="container mx-auto px-4 max-w-7xl">
  Content
</div>
\`\`\`

### Sizing (New in v4!)
\`\`\`jsx
{/* Unified sizing with size-* */}
<div className="size-10">Square 40px</div>
<div className="size-full">Full size</div>

{/* Individual width/height still available */}
<div className="w-64 h-32">Rectangle</div>
\`\`\`

### Spacing
\`\`\`jsx
{/* Padding */}
<div className="p-4">All sides</div>
<div className="px-6 py-4">X and Y axis</div>
<div className="pt-2 pr-4 pb-2 pl-4">Individual sides</div>

{/* Margin */}
<div className="m-4">All sides</div>
<div className="mx-auto">Center horizontally</div>
<div className="-mt-4">Negative margin</div>
\`\`\`

### Typography
\`\`\`jsx
<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
  Heading
</h1>

<p className="text-base text-gray-600 leading-relaxed">
  Body text with good line height
</p>

<span className="text-sm font-medium uppercase tracking-wide">
  Label
</span>
\`\`\`

### Colors & Theming
\`\`\`jsx
{/* Background */}
<div className="bg-primary text-white">Primary background</div>
<div className="bg-gray-100 dark:bg-gray-900">Adaptive background</div>

{/* Text */}
<p className="text-primary">Primary text</p>
<p className="text-gray-600 dark:text-gray-300">Adaptive text</p>

{/* Borders */}
<div className="border border-gray-200 dark:border-gray-800">
  Content
</div>
\`\`\`

## Modern Features (v4)

### Container Queries
\`\`\`jsx
<div className="@container">
  <div className="@sm:flex @lg:grid @lg:grid-cols-2">
    Container-based responsive layout
  </div>
</div>
\`\`\`

### Dynamic Color Values
\`\`\`jsx
{/* Use CSS variables directly */}
<div className="bg-[var(--color-primary)]">
  Dynamic color from CSS variable
</div>

{/* Theme-aware colors */}
<div className="bg-primary hover:bg-primary/90">
  With opacity modifier
</div>
\`\`\`

### Arbitrary Values
\`\`\`jsx
<div className="w-[247px]">Specific width</div>
<div className="top-[117px]">Specific position</div>
<div className="bg-[#1da1f2]">Custom color</div>
<div className="grid-cols-[1fr_500px_2fr]">Custom grid</div>
\`\`\`

## Component Patterns

### Card Component
\`\`\`jsx
<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600">Card content goes here.</p>
  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
    Action
  </button>
</div>
\`\`\`

### Button Variants
\`\`\`jsx
{/* Primary Button */}
<button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
  Primary
</button>

{/* Secondary Button */}
<button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 active:scale-95 transition-all">
  Secondary
</button>

{/* Ghost Button */}
<button className="px-4 py-2 text-primary hover:bg-primary/10 rounded-md font-medium transition-colors">
  Ghost
</button>
\`\`\`

### Form Input
\`\`\`jsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email
  </label>
  <input
    type="email"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
    placeholder="you@example.com"
  />
</div>
\`\`\`

### Navigation Bar
\`\`\`jsx
<nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold">Logo</span>
        <div className="hidden md:flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      </div>
      <button className="md:hidden">
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</nav>
\`\`\`

## Responsive Design

### Mobile-First Approach
\`\`\`jsx
{/* Default mobile, then scale up */}
<div className="
  grid grid-cols-1          /* Mobile: 1 column */
  sm:grid-cols-2            /* Small: 2 columns */
  md:grid-cols-3            /* Medium: 3 columns */
  lg:grid-cols-4            /* Large: 4 columns */
  xl:grid-cols-6            /* XL: 6 columns */
  gap-4
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
\`\`\`

### Breakpoint Reference
- \`sm:\` - 640px
- \`md:\` - 768px
- \`lg:\` - 1024px
- \`xl:\` - 1280px
- \`2xl:\` - 1536px

## Dark Mode

### Class-Based Dark Mode
\`\`\`jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold">
    Adaptive Content
  </h1>
  <p className="text-gray-600 dark:text-gray-300">
    This changes based on theme
  </p>
</div>
\`\`\`

## Advanced Patterns

### Group Hover
\`\`\`jsx
<div className="group">
  <img className="group-hover:scale-110 transition-transform" />
  <h3 className="group-hover:text-primary transition-colors">Title</h3>
</div>
\`\`\`

### Peer Interaction
\`\`\`jsx
<label>
  <input type="checkbox" className="peer sr-only" />
  <div className="peer-checked:bg-primary peer-checked:text-white">
    Toggle me
  </div>
</label>
\`\`\`

### Custom Variants with has:
\`\`\`jsx
<div className="has-[button:hover]:bg-gray-100">
  <button>Hover me</button>
  <p>Parent changes when button is hovered</p>
</div>
\`\`\`

## Performance Best Practices

### 1. Use @apply Strategically
\`\`\`css
/* Only for frequently repeated patterns */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors;
  }
}
\`\`\`

### 2. Modular CSS Organization
\`\`\`css
@import "tailwindcss";
@import "./components/buttons.css";
@import "./components/forms.css";
@import "./components/cards.css";
\`\`\`

### 3. Content Configuration (if needed)
Only specify content paths if auto-detection fails.

### 4. Production Optimization
Tailwind v4 automatically purges unused styles in production builds.

## Accessibility

\`\`\`jsx
{/* Screen reader only text */}
<span className="sr-only">Hidden text for screen readers</span>

{/* Focus states */}
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible button
</button>

{/* Skip to content */}
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
\`\`\`

## Integration with Component Libraries

### Works great with:
- shadcn/ui
- Headless UI
- Radix UI
- React Aria

## Common Pitfalls to Avoid

1. Don't use arbitrary values for everything - use design tokens
2. Don't create overly specific utilities - compose existing ones
3. Don't forget responsive design - always think mobile-first
4. Don't skip hover/focus states for interactive elements
5. Don't ignore dark mode - implement it from the start

## When to Use This Skill
- Building UI with Tailwind CSS
- Creating design systems
- Implementing responsive layouts
- Setting up Tailwind v4 projects
- Optimizing Tailwind performance
- Migrating from v3 to v4
`;
