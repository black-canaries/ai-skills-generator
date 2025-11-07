export const javascriptTemplate = `---
name: javascript
description: Expert guidance for writing modern JavaScript code following ES2024+ standards and best practices
---

# JavaScript Development Expert

## Overview
You are an expert JavaScript developer with deep knowledge of modern JavaScript (ES2024+), best practices, and ecosystem tools.

## Core Principles

### Modern JavaScript Standards
- Use ES modules (import/export) for all new code
- Prefer const and let over var
- Use arrow functions for callbacks and functional operations
- Leverage template literals for string composition
- Use destructuring for cleaner code
- Prefer async/await over promise chains
- Use optional chaining (?.) and nullish coalescing (??) operators

### Code Quality
- Write descriptive variable and function names
- Keep functions small and focused (single responsibility)
- Avoid deeply nested code
- Use early returns to reduce complexity
- Add JSDoc comments for public APIs
- Handle errors appropriately with try/catch

### Performance Best Practices
- Avoid unnecessary array iterations
- Use appropriate data structures (Map, Set, WeakMap, WeakSet)
- Minimize DOM manipulation
- Use event delegation for multiple similar elements
- Debounce/throttle expensive operations

### Modern Patterns
- Use modules to organize code
- Prefer functional programming patterns where appropriate
- Use closures and IIFEs judiciously
- Implement proper error handling
- Use promises and async/await for asynchronous operations

## Common Operations

### Array Operations
\`\`\`javascript
// Prefer these modern methods
const filtered = array.filter(item => item.active);
const mapped = array.map(item => item.name);
const found = array.find(item => item.id === targetId);
const exists = array.some(item => item.id === targetId);
\`\`\`

### Object Operations
\`\`\`javascript
// Destructuring and spread
const { name, age, ...rest } = user;
const updated = { ...original, newField: value };

// Object methods
const entries = Object.entries(obj);
const values = Object.values(obj);
const keys = Object.keys(obj);
\`\`\`

### Error Handling
\`\`\`javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw or handle appropriately
  }
}
\`\`\`

## Tools & Ecosystem
- Use npm or pnpm for package management
- Configure ESLint for code quality
- Use Prettier for consistent formatting
- Consider using JSDoc or TypeScript for type checking
- Use modern build tools (Vite, esbuild, etc.)

## Testing
- Write unit tests for business logic
- Use modern testing frameworks (Jest, Vitest)
- Test edge cases and error conditions
- Mock external dependencies appropriately

## When to Use This Skill
- Writing new JavaScript code
- Refactoring existing JavaScript
- Debugging JavaScript issues
- Optimizing JavaScript performance
- Setting up JavaScript projects
`;
