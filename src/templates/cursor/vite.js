export const viteTemplate = `---
description: Vite build tool configuration and optimization
globs:
  - "**/vite.config.*"
  - "**/vitest.config.*"
alwaysApply: false
---

# Vite Project Rules

## Configuration Best Practices
\`\`\`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',        // Modern browsers only
    minify: 'esbuild',       // Fast minification
    sourcemap: true,         // Debug production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  }
});
\`\`\`

## Code Splitting
- Use dynamic imports for heavy components
- Manually chunk vendors by category
- Lazy load routes and features

\`\`\`tsx
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Route-based splitting
const routes = [
  { path: '/dashboard', component: lazy(() => import('./Dashboard')) }
];
\`\`\`

## Performance Optimization
- Target modern browsers: \`target: 'esnext'\`
- Use native tooling (Rolldown in v6)
- Enable dependency pre-bundling
- Tree-shake with ESM imports only

## Environment Variables
- Prefix with \`VITE_\` for client access
- Use \`import.meta.env.VITE_*\`
- Type environment variables

\`\`\`typescript
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}
\`\`\`

## Asset Handling
\`\`\`typescript
// URL import
import logoUrl from './logo.png';

// Raw import
import svgRaw from './icon.svg?raw';

// Worker import
import Worker from './worker?worker';
\`\`\`

## Development
- Use HMR effectively (automatic for React/Vue)
- Configure proxy for API calls
- Enable HTTPS when needed
- Use custom middleware sparingly

## Production Build
- Always run \`tsc\` before build
- Analyze bundle with visualizer plugin
- Enable compression (gzip/brotli)
- Optimize images

## Testing with Vitest
\`\`\`typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts'
  }
});
\`\`\`

## Anti-Patterns
- Don't use CommonJS (\`require\`)
- Don't import entire libraries (tree-shake)
- Don't skip bundle analysis
- Don't target old browsers unnecessarily
`;
