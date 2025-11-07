export const typescriptTemplate = `---
description: TypeScript strict mode standards with modern type patterns
globs:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/tsconfig.json"
alwaysApply: false
---

# TypeScript Project Rules

## Configuration Requirements
- Enable strict mode in tsconfig.json
- Set \`noUncheckedIndexedAccess: true\`
- Set \`noImplicitOverride: true\`
- Use \`moduleResolution: "bundler"\` for modern projects
- Target ES2022 or higher

## Type Safety
- **Never use \`any\`** - use \`unknown\` with type guards instead
- Prefer explicit types over implicit where it aids clarity
- Use utility types (Partial, Pick, Omit, Record, Required, Readonly)
- Leverage template literal types for string patterns
- Use branded types to prevent primitive type mixing

## Best Practices
\`\`\`typescript
// Avoid any - use unknown with type guards
function process(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  throw new Error('Invalid data type');
}

// Use generics for reusable code
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Discriminated unions for type-safe state
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };

// Result type for error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
\`\`\`

## Framework Integration
- Use proper types for React props and state
- Type event handlers explicitly
- Use \`React.FC\` or explicit return types for components
- Type all hooks properly

## Code Organization
- Group related types in dedicated files
- Export types from index files
- Use \`interface\` for object shapes (better performance)
- Use \`type\` for unions, intersections, and mapped types

## Testing
- Use type assertions sparingly in tests
- Prefer proper typing over \`as\` casts
- Type test fixtures and mocks
`;
