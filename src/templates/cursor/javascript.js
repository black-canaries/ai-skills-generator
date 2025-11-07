export const javascriptTemplate = `---
description: Modern JavaScript (ES2024+) coding standards and best practices
globs:
  - "**/*.js"
  - "**/*.mjs"
alwaysApply: false
---

# JavaScript Project Rules

## Core Standards
- Use ES modules (import/export) exclusively
- Prefer \`const\` and \`let\`, never use \`var\`
- Use arrow functions for callbacks and functional operations
- Leverage template literals for string composition
- Use destructuring for cleaner code assignment
- Prefer async/await over promise chains
- Use optional chaining (\`?.\`) and nullish coalescing (\`??\`)

## Code Style
- Use descriptive, intention-revealing variable and function names
- Keep functions small (< 20 lines) and focused on single responsibility
- Avoid deeply nested code (max 3 levels)
- Use early returns to reduce complexity
- Add JSDoc comments for all public APIs
- Handle errors with try/catch, never swallow exceptions

## Modern Patterns
\`\`\`javascript
// Preferred patterns
const filtered = array.filter(item => item.active);
const mapped = array.map(item => ({ id: item.id, name: item.name }));
const found = array.find(item => item.id === targetId);

// Destructuring
const { name, age, ...rest } = user;
const updated = { ...original, newField: value };

// Error handling
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
}
\`\`\`

## Performance
- Minimize DOM manipulation
- Use appropriate data structures (Map, Set for lookups)
- Debounce/throttle expensive operations
- Avoid unnecessary array iterations

## Testing
- Write unit tests for business logic
- Test edge cases and error conditions
- Use meaningful test descriptions
- Mock external dependencies
`;
