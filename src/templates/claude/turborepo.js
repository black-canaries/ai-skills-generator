export const turborepoTemplate = `---
name: turborepo
description: TurboRepo monorepo development with optimal caching, task orchestration, and best practices for 2025
---

# TurboRepo Development Expert

## Overview
You are an expert in TurboRepo, the high-performance build system for JavaScript and TypeScript monorepos with intelligent caching and task orchestration.

## Repository Structure

### Recommended Layout
\`\`\`
my-monorepo/
├── apps/
│   ├── web/                 # Next.js app
│   ├── docs/                # Documentation site
│   └── mobile/              # React Native app
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── config/              # Shared configs (ESLint, TS)
│   ├── utils/               # Shared utilities
│   └── types/               # Shared TypeScript types
├── turbo.json               # Turbo configuration
├── package.json             # Root package.json
└── pnpm-workspace.yaml      # Workspace config
\`\`\`

## Initial Setup

### Installation
\`\`\`bash
# Create new monorepo
npx create-turbo@latest

# Or add to existing monorepo
npm install turbo --save-dev
\`\`\`

### Package Manager Configuration

#### Using pnpm (Recommended)
\`\`\`yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
\`\`\`

#### Using npm
\`\`\`json
// package.json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
\`\`\`

## TurboRepo Configuration

### turbo.json
\`\`\`json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [
    ".env",
    "tsconfig.json"
  ],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"],
      "env": ["NODE_ENV"]
    },
    "lint": {
      "dependsOn": ["^lint"],
      "outputs": [],
      "cache": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^type-check"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
\`\`\`

### Pipeline Task Configuration

#### Task Dependencies
\`\`\`json
{
  "build": {
    // ^build means "dependencies must build first"
    "dependsOn": ["^build"],
    // This task depends on other tasks in same package
    "dependsOn": ["type-check", "lint"]
  }
}
\`\`\`

#### Cache Configuration
\`\`\`json
{
  "build": {
    "outputs": ["dist/**", ".next/**"],
    "inputs": ["src/**", "package.json"],
    "cache": true
  },
  "dev": {
    // Never cache dev tasks
    "cache": false,
    "persistent": true
  }
}
\`\`\`

## Package Configuration

### Internal Package Naming
Use namespace prefixes to avoid npm conflicts:
\`\`\`json
// packages/ui/package.json
{
  "name": "@acme/ui",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./button": {
      "import": "./dist/button.js",
      "types": "./dist/button.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  }
}
\`\`\`

### Consuming Internal Packages
\`\`\`json
// apps/web/package.json
{
  "name": "web",
  "dependencies": {
    "@acme/ui": "workspace:*",
    "@acme/utils": "workspace:*"
  }
}
\`\`\`

## Root Package.json

### Task Scripts
\`\`\`json
{
  "name": "monorepo",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean",
    "format": "prettier --write \\"**/*.{ts,tsx,md}\\"",
    // Scoped commands
    "dev:web": "turbo run dev --filter=web",
    "build:ui": "turbo run build --filter=@acme/ui"
  },
  "devDependencies": {
    "turbo": "latest",
    "prettier": "latest",
    "@turbo/gen": "latest"
  }
}
\`\`\`

## Running Tasks

### Basic Commands
\`\`\`bash
# Run task across all packages
turbo run build

# Run multiple tasks
turbo run lint test build

# Run task in specific package
turbo run build --filter=web

# Run task in package and dependencies
turbo run build --filter=web...

# Run task in package and dependents
turbo run test --filter=...ui

# Force execution (skip cache)
turbo run build --force

# Enable remote caching
turbo run build --token=your-token
\`\`\`

### Filtering Examples
\`\`\`bash
# Single package
turbo run build --filter=web

# Multiple packages
turbo run build --filter=web --filter=docs

# Package and its dependencies
turbo run build --filter=web...

# Package and its dependents
turbo run build --filter=...ui

# Since last git commit
turbo run test --filter=[HEAD^1]

# Changed packages
turbo run build --filter=...[origin/main]
\`\`\`

## Shared Configuration Packages

### ESLint Config Package
\`\`\`javascript
// packages/config/eslint/index.js
module.exports = {
  extends: [
    'next',
    'turbo',
    'prettier'
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off'
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')]
    }
  }
};
\`\`\`

### TypeScript Config Package
\`\`\`json
// packages/config/typescript/base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ES2022",
    "lib": ["ES2022"]
  },
  "exclude": ["node_modules"]
}
\`\`\`

### Usage in Apps
\`\`\`json
// apps/web/tsconfig.json
{
  "extends": "@acme/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
\`\`\`

## Remote Caching

### Setup with Vercel
\`\`\`bash
# Login to Vercel
npx turbo login

# Link repository
npx turbo link

# Run with remote cache
turbo run build
\`\`\`

### Self-Hosted Remote Cache
\`\`\`bash
# Using custom remote cache server
turbo run build --api=https://my-cache-server.com --token=my-token
\`\`\`

### Environment Variables
\`\`\`bash
# .env
TURBO_TOKEN=your-token
TURBO_TEAM=your-team
TURBO_REMOTE_CACHE_SIGNATURE_KEY=your-signature-key
\`\`\`

## Code Generation

### Create New Package
\`\`\`bash
# Using turbo gen
npx turbo gen workspace

# Name: my-package
# Type: Package
\`\`\`

### Custom Generators
\`\`\`typescript
// turbo/generators/config.ts
import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/ui/src/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.hbs'
      }
    ]
  });
}
\`\`\`

## Performance Optimization

### Build Performance Tips
1. Use proper task dependencies (\`dependsOn\`)
2. Define accurate \`outputs\` for caching
3. Specify \`inputs\` to invalidate cache appropriately
4. Use \`--filter\` to build only what changed
5. Enable remote caching for CI/CD
6. Use \`--concurrency\` to control parallel tasks

### Cache Configuration
\`\`\`json
{
  "build": {
    "outputs": ["dist/**"],
    "inputs": [
      "src/**",
      "package.json",
      "tsconfig.json"
    ],
    "outputMode": "hash-only"
  }
}
\`\`\`

## CI/CD Integration

### GitHub Actions
\`\`\`yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm turbo run build --filter=[HEAD^1]
        env:
          TURBO_TOKEN: \${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: \${{ secrets.TURBO_TEAM }}

      - name: Test
        run: pnpm turbo run test --filter=[HEAD^1]
\`\`\`

## Best Practices

1. **Consistent Naming**: Use @org-name prefix for all internal packages
2. **Workspace Protocol**: Use \`workspace:*\` for internal dependencies
3. **Task Dependencies**: Define proper \`dependsOn\` relationships
4. **Cache Outputs**: Accurately specify all build outputs
5. **Shared Configs**: Create config packages for ESLint, TypeScript, etc.
6. **Remote Caching**: Enable for CI/CD to maximize efficiency
7. **Filtering**: Use filters in CI to only build affected packages
8. **Environment Variables**: Properly configure in pipeline
9. **Documentation**: Document package purposes and dependencies
10. **Versioning**: Use changesets for version management

## Common Issues & Solutions

### Issue: Cache not working
- Check \`outputs\` includes all generated files
- Verify \`inputs\` doesn't include unnecessary files
- Use \`--force\` to test without cache

### Issue: Build order incorrect
- Review \`dependsOn\` configuration
- Ensure \`^task\` syntax for dependency tasks

### Issue: Slow CI builds
- Enable remote caching
- Use \`--filter=[HEAD^1]\` to only build changed packages
- Parallelize independent tasks

## When to Use This Skill
- Setting up new monorepos
- Optimizing monorepo build performance
- Configuring task pipelines
- Implementing remote caching
- Migrating to monorepo architecture
- Debugging build issues in monorepos
`;
