export const reactTemplate = `---
description: React best practices with hooks, composition, and performance patterns
globs:
  - "**/*.jsx"
  - "**/*.tsx"
  - "**/components/**"
alwaysApply: false
---

# React Project Rules

## Component Design
- Use functional components with hooks exclusively
- Keep components small and focused (< 150 lines)
- Prefer composition over prop drilling
- Extract reusable logic into custom hooks
- Separate presentation from business logic

## Hooks Rules
- Only call hooks at the top level (never in loops/conditions)
- Use \`useCallback\` for functions passed to children
- Use \`useMemo\` for expensive calculations only
- Use \`useEffect\` dependency arrays correctly
- Clean up effects with return functions

## Performance Optimization
\`\`\`tsx
// Memoize components to prevent unnecessary re-renders
const Item = React.memo(({ item, onClick }) => (
  <div onClick={() => onClick(item.id)}>{item.name}</div>
));

// Memoize callbacks
const handleClick = useCallback((id: string) => {
  navigate(\`/item/\${id}\`);
}, [navigate]);

// Memoize expensive calculations
const sortedItems = useMemo(() =>
  items.sort((a, b) => a.date - b.date),
  [items]
);
\`\`\`

## Best Practices
- Use semantic HTML elements
- Add proper ARIA labels for accessibility
- Handle loading and error states
- Use Suspense for code splitting
- Implement error boundaries for resilience
- Use keys properly in lists (stable, unique identifiers)

## State Management
- Use local state when possible
- Lift state only when necessary
- Use Context for truly global state
- Consider Zustand/Jotai for complex state
- Avoid prop drilling beyond 2-3 levels

## Custom Hooks Pattern
\`\`\`tsx
// Extract reusable logic
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then(res => res.json())
      .then(data => !cancelled && setData(data))
      .catch(err => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Anti-Patterns to Avoid
- Inline function definitions in JSX (causes re-renders)
- Mutating state directly
- Using index as key in dynamic lists
- Too many useEffect hooks in one component
- Overusing Context (causes unnecessary re-renders)
`;
