export const nextjsTemplate = `---
name: nextjs
description: Next.js 15 development with App Router, Server Components, and modern best practices for 2025
---

# Next.js Development Expert

## Overview
You are an expert Next.js developer specializing in Next.js 15, App Router, Server Components, and modern full-stack patterns for building production-ready applications in 2025.

## Core Architecture

### App Router Structure
\`\`\`
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── loading.tsx             # Loading UI
├── error.tsx               # Error UI
├── not-found.tsx           # 404 UI
├── (auth)/                 # Route group (doesn't affect URL)
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx          # Nested layout
│   ├── page.tsx
│   └── [id]/               # Dynamic route
│       └── page.tsx
└── api/                    # API routes
    └── users/
        └── route.ts
\`\`\`

### Recommended Project Structure
\`\`\`
project/
├── app/                    # App Router pages
├── components/
│   ├── ui/                 # Reusable UI components
│   └── features/           # Feature-specific components
├── lib/
│   ├── db.ts              # Database client
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # Constants
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
├── actions/                # Server Actions
├── services/               # Business logic
└── public/                 # Static assets
\`\`\`

## Server Components (Default)

### Server Component Best Practices
\`\`\`tsx
// app/users/page.tsx
import { db } from '@/lib/db';

// Server Component - runs on server only
export default async function UsersPage() {
  // Direct database access - no API route needed
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

### When to Use Server Components
- Fetching data from databases or APIs
- Accessing backend resources directly
- Keeping sensitive information on server (tokens, API keys)
- Reducing client-side JavaScript
- Improving initial page load

## Client Components

### Client Component Declaration
\`\`\`tsx
'use client';

import { useState } from 'react';

// Client Component - runs in browser
export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

### When to Use Client Components
- Using React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser-only APIs (window, localStorage)
- Custom hooks
- React Context

### Composition Pattern
\`\`\`tsx
// app/page.tsx (Server Component)
import { ClientComponent } from '@/components/ClientComponent';

export default async function Page() {
  const data = await fetchData();

  return (
    <div>
      <h1>Server Content</h1>
      {/* Pass server data to client component */}
      <ClientComponent data={data} />
    </div>
  );
}
\`\`\`

## Data Fetching

### Server-Side Data Fetching
\`\`\`tsx
// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Force static rendering (SSG)
export const dynamic = 'force-static';

async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <main>{/* Use data */}</main>;
}
\`\`\`

### Parallel Data Fetching
\`\`\`tsx
async function Page() {
  // Fetch in parallel
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ]);

  return (
    <div>
      <Users data={users} />
      <Posts data={posts} />
    </div>
  );
}
\`\`\`

### Sequential Data Fetching
\`\`\`tsx
async function Page({ params }: { params: { id: string } }) {
  // Fetch user first
  const user = await fetchUser(params.id);

  // Then fetch user's posts
  const posts = await fetchUserPosts(user.id);

  return <UserProfile user={user} posts={posts} />;
}
\`\`\`

## Server Actions

### Basic Server Action
\`\`\`tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  try {
    await db.user.create({
      data: { name, email }
    });

    revalidatePath('/users');

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create user' };
  }
}
\`\`\`

### Using Server Actions in Forms
\`\`\`tsx
// app/users/new/page.tsx
import { createUser } from '@/app/actions';

export default function NewUserPage() {
  return (
    <form action={createUser}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <button type="submit">Create User</button>
    </form>
  );
}
\`\`\`

### Using Server Actions in Client Components
\`\`\`tsx
'use client';

import { useTransition } from 'react';
import { createUser } from '@/app/actions';

export function CreateUserForm() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createUser(formData);
      if (result.success) {
        // Handle success
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="name" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
\`\`\`

## API Routes

### REST API Route
\`\`\`tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const user = await db.user.create({
      data: body
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
\`\`\`

### Dynamic API Route
\`\`\`tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  });

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
\`\`\`

## Metadata & SEO

### Static Metadata
\`\`\`tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: ['/og-image.jpg'],
  },
};
\`\`\`

### Dynamic Metadata
\`\`\`tsx
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const user = await fetchUser(params.id);

  return {
    title: user.name,
    description: \`Profile of \${user.name}\`,
  };
}
\`\`\`

## Image Optimization

### Next.js Image Component
\`\`\`tsx
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile"
  width={500}
  height={500}
  priority // Load eagerly for LCP
/>

// Remote images
<Image
  src="https://example.com/image.jpg"
  alt="Remote"
  width={500}
  height={500}
  unoptimized={false} // Enable optimization
/>
\`\`\`

## Loading & Streaming

### Loading UI
\`\`\`tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
\`\`\`

### Suspense Boundaries
\`\`\`tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <Users />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Posts />
      </Suspense>
    </div>
  );
}
\`\`\`

## Performance Optimization

### Bundle Analysis
\`\`\`bash
npm install @next/bundle-analyzer
\`\`\`

### Route Segment Config
\`\`\`tsx
// Force static generation
export const dynamic = 'force-static';

// Revalidate every hour
export const revalidate = 3600;

// Set runtime to Edge
export const runtime = 'edge';
\`\`\`

## Deployment Best Practices

1. Deploy on Vercel for optimal performance
2. Use Edge Runtime for dynamic routes when possible
3. Implement proper error boundaries
4. Set up monitoring and analytics
5. Configure proper caching strategies
6. Use environment variables for secrets
7. Enable compression and minification

## When to Use This Skill
- Building Next.js applications with App Router
- Migrating from Pages Router to App Router
- Implementing Server Components and Server Actions
- Optimizing Next.js performance
- Setting up API routes and data fetching
- Configuring SEO and metadata
`;
