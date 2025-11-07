export const viteTemplate = `---
name: vite
description: Vite 6 development with optimized build configuration, native tooling, and performance best practices for 2025
---

# Vite Development Expert

## Overview
You are an expert in Vite 6, the next-generation frontend build tool that provides lightning-fast development experience with HMR and optimized production builds.

## Project Setup

### Create New Project
\`\`\`bash
# Create with template
npm create vite@latest my-app -- --template react-ts

# Available templates
react, react-ts, vue, vue-ts, preact, preact-ts,
lit, lit-ts, svelte, svelte-ts, solid, solid-ts,
qwik, qwik-ts, vanilla, vanilla-ts
\`\`\`

### Basic Configuration
\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
});
\`\`\`

## Core Features

### Hot Module Replacement (HMR)
\`\`\`typescript
// Vite automatically handles HMR for most frameworks
// Manual HMR API usage
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Handle module update
  });

  import.meta.hot.dispose(() => {
    // Cleanup before update
  });
}
\`\`\`

### Environment Variables
\`\`\`typescript
// .env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App

// Access in code (only VITE_ prefix exposed to client)
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// TypeScript types
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
\`\`\`

### Static Asset Handling
\`\`\`typescript
// Import as URL
import imgUrl from './assets/logo.png';

// Import as raw string
import rawSvg from './assets/icon.svg?raw';

// Import as URL (force)
import assetUrl from './data.json?url';

// Import as worker
import Worker from './worker?worker';
const worker = new Worker();
\`\`\`

## Build Optimization

### Code Splitting
\`\`\`typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-lib': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],

          // Or use function for more control
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  }
});
\`\`\`

### Dynamic Imports
\`\`\`typescript
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Route-based code splitting
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/Dashboard'))
  },
  {
    path: '/settings',
    component: lazy(() => import('./pages/Settings'))
  }
];

// Preload critical chunks
import('./CriticalComponent').then(module => {
  // Module loaded
});
\`\`\`

### Build Target Optimization
\`\`\`typescript
// vite.config.ts
export default defineConfig({
  build: {
    // Target modern browsers for smaller bundles
    target: 'esnext',

    // Or target specific browsers
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],

    // CSS target
    cssTarget: 'chrome90',

    // Minification
    minify: 'esbuild', // or 'terser' for better compression
  }
});
\`\`\`

## Performance Optimization

### Native Tooling (Vite 6 - Rolldown)
\`\`\`typescript
// Enable native tooling for faster builds
export default defineConfig({
  builder: {
    // Use Rolldown (Rust-based bundler)
    type: 'rolldown'
  }
});
\`\`\`

### Dependency Pre-bundling
\`\`\`typescript
export default defineConfig({
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: ['react', 'react-dom', 'lodash-es'],

    // Exclude dependencies from pre-bundling
    exclude: ['@vite/client'],

    // Force re-optimization
    force: false,

    // Disable dependency optimization for specific deps
    esbuildOptions: {
      target: 'esnext'
    }
  }
});
\`\`\`

### CSS Optimization
\`\`\`typescript
export default defineConfig({
  css: {
    // CSS modules configuration
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },

    // PostCSS configuration
    postcss: {
      plugins: [
        autoprefixer(),
        tailwindcss()
      ]
    },

    // Enable CSS preprocessing
    preprocessorOptions: {
      scss: {
        additionalData: \`@import "@/styles/variables.scss";\`
      }
    }
  }
});
\`\`\`

### Tree Shaking
\`\`\`typescript
// Vite automatically tree-shakes ESM code
// Ensure your imports are tree-shakeable

// Good - Named imports
import { useState, useEffect } from 'react';
import { map, filter } from 'lodash-es';

// Bad - Namespace imports (harder to tree-shake)
import * as React from 'react';
import _ from 'lodash';
\`\`\`

## Plugin Ecosystem

### Essential Plugins
\`\`\`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    react({
      // Fast Refresh options
      fastRefresh: true,
      // Babel plugins
      babel: {
        plugins: ['babel-plugin-styled-components']
      }
    }),

    // TypeScript path mapping
    tsconfigPaths(),

    // Bundle analysis
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    }),

    // Gzip/Brotli compression
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),

    // Image optimization
    imagetools()
  ]
});
\`\`\`

### Custom Plugin Example
\`\`\`typescript
function myPlugin() {
  return {
    name: 'my-plugin',

    // Modify config
    config(config, { command }) {
      if (command === 'build') {
        config.build.minify = true;
      }
    },

    // Transform code
    transform(code, id) {
      if (id.endsWith('.custom')) {
        return {
          code: transformCode(code),
          map: null
        };
      }
    },

    // Handle hot updates
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.custom')) {
        server.ws.send({
          type: 'custom',
          event: 'file-updated'
        });
      }
    }
  };
}
\`\`\`

## Development Features

### Proxy Configuration
\`\`\`typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  }
});
\`\`\`

### HTTPS in Development
\`\`\`typescript
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('path/to/key.pem'),
      cert: fs.readFileSync('path/to/cert.pem')
    }
  }
});
\`\`\`

### Custom Middleware
\`\`\`typescript
export default defineConfig({
  server: {
    middlewareMode: false
  },
  plugins: [
    {
      name: 'custom-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Custom middleware logic
          next();
        });
      }
    }
  ]
});
\`\`\`

## Production Build

### Build Commands
\`\`\`json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "build:analyze": "vite build --mode analyze"
  }
}
\`\`\`

### Multi-Page Applications
\`\`\`typescript
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin/index.html'),
        mobile: path.resolve(__dirname, 'mobile/index.html')
      }
    }
  }
});
\`\`\`

### Library Mode
\`\`\`typescript
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => \`my-lib.\${format}.js\`
    },
    rollupOptions: {
      // Externalize dependencies
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
\`\`\`

## Testing Integration

### Vitest Configuration
\`\`\`typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
\`\`\`

## Performance Monitoring

### Build Analysis
\`\`\`bash
# Analyze bundle size
vite build --mode analyze

# Check build performance
vite build --debug plugin-transform
\`\`\`

### Development Performance
\`\`\`typescript
// Check transform performance
export default defineConfig({
  plugins: [
    {
      name: 'timing',
      transform(code, id) {
        const start = Date.now();
        // Transform code
        console.log(\`\${id}: \${Date.now() - start}ms\`);
      }
    }
  ]
});
\`\`\`

## Best Practices

1. **Use ESM**: Always use ES modules for better tree-shaking
2. **Lazy Load**: Split code and lazy load non-critical components
3. **Optimize Assets**: Use appropriate image formats and compression
4. **Target Modern Browsers**: Set \`target: 'esnext'\` for smaller bundles
5. **Pre-bundle Dependencies**: Configure \`optimizeDeps\` properly
6. **Use Native Tools**: Enable Rolldown for faster builds (Vite 6)
7. **Monitor Bundle Size**: Use visualizer plugin regularly
8. **Enable Compression**: Use gzip/brotli for production
9. **Leverage Caching**: Configure proper cache headers
10. **Type Safety**: Use TypeScript with strict mode

## Common Issues & Solutions

### Slow HMR
- Check for circular dependencies
- Reduce number of dependencies
- Use \`optimizeDeps.include\` for problematic deps

### Large Bundle Size
- Enable code splitting
- Analyze with visualizer plugin
- Remove unused dependencies
- Use dynamic imports

### Build Failures
- Clear \`.vite\` cache directory
- Check for incompatible plugins
- Verify Node version (18+)

## When to Use This Skill
- Setting up new Vite projects
- Optimizing build performance
- Configuring plugins and build options
- Debugging Vite issues
- Migrating from Webpack/CRA to Vite
- Building libraries with Vite
`;
