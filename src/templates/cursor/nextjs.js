export const nextjsTemplate = `---
description: Next.js 15 App Router conventions and best practices
globs:
  - "**/app/**"
  - "**/next.config.*"
alwaysApply: false
---

# Next.js Project Rules

## App Router Structure
- Use \`app/\` directory for all routes
- Server Components by default (no 'use client' unless needed)
- Group routes with \`(group)\` syntax for organization
- Use \`layout.tsx\` for shared layouts
- Implement \`loading.tsx\` for loading states
- Add \`error.tsx\` for error boundaries

## Server vs Client Components
\`\`\`tsx
// Server Component (default) - NO 'use client'
async function ServerComponent() {
  const data = await db.query(); // Direct DB access OK
  return <div>{data}</div>;
}

// Client Component - add 'use client' at top
'use client';
import { useState } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

## When to Use Client Components
- Using React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser APIs (window, localStorage, etc.)
- Third-party libraries that use hooks
- React Context

## Data Fetching
- Fetch data in Server Components, not API routes
- Use \`fetch\` with \`next: { revalidate }\` for ISR
- Set \`export const dynamic\` for rendering strategy
- Parallelize independent data fetches with Promise.all
- Use React Suspense for streaming

\`\`\`tsx
// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Revalidate every hour
export const revalidate = 3600;

// Fetch with caching
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});
\`\`\`

## Server Actions
- Create in separate files with 'use server'
- Use for mutations, not queries
- Call \`revalidatePath()\` or \`revalidateTag()\` after mutations
- Handle errors appropriately
- Return serializable data only

\`\`\`tsx
'use server';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;

  try {
    await db.user.create({ data: { name } });
    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create user' };
  }
}
\`\`\`

## Metadata & SEO
- Export \`metadata\` object for static metadata
- Use \`generateMetadata\` for dynamic metadata
- Include Open Graph and Twitter Card tags
- Set proper canonical URLs

## Image Optimization
- Always use \`next/image\` component
- Set \`priority\` for LCP images
- Use \`fill\` for responsive images
- Specify \`sizes\` for responsive images

## Performance
- Keep Server Components as default
- Use dynamic imports for heavy components
- Implement proper loading states
- Optimize images and fonts
- Use \`loading.tsx\` for Suspense boundaries

## File Organization
\`\`\`
app/
  (marketing)/         # Route group
    layout.tsx
    page.tsx
  (dashboard)/
    layout.tsx
    page.tsx
components/
  ui/                  # Reusable UI
  features/            # Feature components
lib/                   # Utilities
actions/               # Server Actions
\`\`\`

## Anti-Patterns to Avoid
- Don't use API routes for data fetching (fetch in Server Components)
- Don't make everything a Client Component
- Don't forget to handle loading and error states
- Don't use 'use client' in parent when child needs it
- Don't fetch data in Client Components
`;
