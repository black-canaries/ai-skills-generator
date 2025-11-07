export const turborepoTemplate = `---
description: TurboRepo monorepo structure and task configuration
globs:
  - "**/turbo.json"
  - "**/package.json"
alwaysApply: false
---

# TurboRepo Monorepo Rules

## Repository Structure
\`\`\`
monorepo/
├── apps/           # Applications
├── packages/       # Shared packages
├── turbo.json      # Turbo configuration
└── package.json    # Root package.json
\`\`\`

## Package Naming
- Use namespace prefix: \`@acme/package-name\`
- Prevents npm conflicts
- Clear ownership

## Task Pipeline Configuration
\`\`\`json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {
      "dependsOn": ["^lint"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
\`\`\`

## Dependency Management
- Use workspace protocol: \`"@acme/ui": "workspace:*"\`
- Consistent package manager (pnpm recommended)
- Lock file committed to repo

## Task Dependencies
- \`^build\` means "dependencies must build first"
- Chain tasks in same package: \`dependsOn: ["type-check", "lint"]\`
- Never cache dev/watch tasks

## Cache Configuration
- Specify all \`outputs\` for proper caching
- Define \`inputs\` to invalidate cache correctly
- Use \`--force\` to bypass cache when debugging

## Shared Configuration Packages
- Create packages for ESLint, TypeScript configs
- Extend from shared configs in apps
- Version configs as packages

\`\`\`json
// apps/web/package.json
{
  "devDependencies": {
    "@acme/eslint-config": "workspace:*",
    "@acme/typescript-config": "workspace:*"
  }
}
\`\`\`

## Running Tasks
\`\`\`bash
# All packages
turbo run build

# Specific package
turbo run build --filter=web

# Package and dependencies
turbo run build --filter=web...

# Changed packages only
turbo run test --filter=[HEAD^1]
\`\`\`

## CI/CD Best Practices
- Enable remote caching with TURBO_TOKEN
- Use --filter=[HEAD^1] to build only changed
- Cache node_modules and .turbo
- Parallelize independent tasks

## Performance Tips
1. Define accurate outputs for caching
2. Use proper task dependencies
3. Enable remote caching
4. Filter tasks in CI
5. Avoid unnecessary task runs

## Anti-Patterns
- Don't cache dev tasks
- Don't miss outputs in cache config
- Don't ignore task dependencies
- Don't build everything in CI
`;
