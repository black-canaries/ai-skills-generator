export const tailwindTemplate = `---
description: Tailwind CSS 4 utility-first styling conventions
globs:
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.css"
  - "**/tailwind.config.*"
alwaysApply: false
---

# Tailwind CSS Project Rules

## Configuration (v4)
- Use CSS-first configuration with \`@theme\`
- Define design tokens in CSS, not config file
- Import with \`@import "tailwindcss"\`
- No tailwind.config.js needed for basic setup

\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-sans: 'Inter', system-ui;
  --spacing-xs: 0.5rem;
  --radius-md: 0.5rem;
}
\`\`\`

## Component Patterns
- Use semantic class grouping (layout, spacing, colors, typography)
- Extract repeated patterns to components, not @apply
- Use arbitrary values sparingly: \`w-[247px]\`
- Prefer design tokens over arbitrary values

\`\`\`tsx
// Good - semantic grouping
<div className="flex items-center justify-between gap-4 px-6 py-4 bg-white rounded-lg shadow-sm">

// Avoid - random order
<div className="shadow-sm bg-white gap-4 rounded-lg px-6 flex items-center py-4 justify-between">
\`\`\`

## Responsive Design
- Mobile-first approach (base styles, then sm:, md:, lg:, xl:)
- Use consistent breakpoints
- Test all breakpoints

\`\`\`tsx
<div className="
  grid grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
">
\`\`\`

## New v4 Features
- Use \`size-*\` for equal width/height: \`size-10\`
- Container queries: \`@container\`, \`@sm:flex\`
- Dynamic colors: \`bg-[var(--color-primary)]\`
- Opacity modifiers: \`bg-primary/90\`

## Dark Mode
- Implement from the start
- Use \`dark:\` prefix consistently
- Test in both modes

\`\`\`tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
\`\`\`

## Performance
- Avoid using @apply for everything (defeats purpose)
- Let Tailwind purge unused styles
- Use JIT mode (default in v4)

## Accessibility
- Include focus states: \`focus:ring-2 focus:ring-primary\`
- Use sr-only for screen readers
- Proper color contrast

## Anti-Patterns
- Don't create overly specific arbitrary values
- Don't ignore responsive design
- Don't skip dark mode implementation
- Don't use inline styles instead of Tailwind
`;
