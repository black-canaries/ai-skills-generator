export const typescriptTemplate = `---
name: typescript
description: Expert TypeScript development following strict mode, type safety, and modern best practices for 2025
---

# TypeScript Development Expert

## Overview
You are an expert TypeScript developer with deep knowledge of advanced type systems, strict mode configuration, and modern TypeScript patterns in 2025.

## Core Configuration

### tsconfig.json Strict Mode
Always enable strict mode and recommended settings:
\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false
  }
}
\`\`\`

## Type Safety Best Practices

### Avoid 'any' Type
\`\`\`typescript
// Bad
function process(data: any) { }

// Good - use unknown and type guards
function process(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
}

// Good - use generics
function process<T>(data: T): T {
  return data;
}
\`\`\`

### Use Utility Types
\`\`\`typescript
// Partial - make all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserName = Pick<User, 'name' | 'email'>;

// Omit - exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Record - create object type with specific keys
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// Required - make all properties required
type RequiredConfig = Required<Config>;

// Readonly - make all properties readonly
type ImmutableUser = Readonly<User>;
\`\`\`

### Template Literal Types
\`\`\`typescript
// Create type-safe string patterns
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = \`/api/\${string}\`;
type Route = \`\${HTTPMethod} \${Endpoint}\`;

// Usage
const route: Route = 'GET /api/users'; // Valid
\`\`\`

### Advanced Generics
\`\`\`typescript
// Generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic with multiple constraints
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Conditional types
type IsString<T> = T extends string ? true : false;
\`\`\`

## Modern TypeScript Patterns (2025)

### Type-Safe Error Handling
\`\`\`typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}
\`\`\`

### Branded Types
\`\`\`typescript
// Prevent mixing similar primitive types
type UserId = string & { __brand: 'UserId' };
type ProductId = string & { __brand: 'ProductId' };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId) { /* ... */ }

const userId = createUserId('123');
getUser(userId); // OK
// getUser('123'); // Error - type mismatch
\`\`\`

### Discriminated Unions
\`\`\`typescript
type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: User };
type ErrorState = { status: 'error'; error: Error };

type State = LoadingState | SuccessState | ErrorState;

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return state.data.name; // TypeScript knows data exists
    case 'error':
      return state.error.message; // TypeScript knows error exists
  }
}
\`\`\`

## Framework Integration

### React with TypeScript
\`\`\`typescript
// Functional component with props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return <button onClick={onClick}>{label}</button>;
};

// Hooks with types
const [user, setUser] = useState<User | null>(null);
const ref = useRef<HTMLDivElement>(null);
\`\`\`

### Node.js with TypeScript
\`\`\`typescript
// Express route handlers
import { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
  user?: User;
}

const getUser = async (req: UserRequest, res: Response) => {
  const userId = req.params.id;
  // Implementation
};
\`\`\`

## Code Quality Tools

### ESLint Configuration
Use @typescript-eslint with strict rules:
\`\`\`json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ]
}
\`\`\`

### Testing
\`\`\`typescript
// Type-safe tests with Jest/Vitest
describe('UserService', () => {
  it('should fetch user by id', async () => {
    const user = await userService.getById('123');
    expect(user).toMatchObject<Partial<User>>({
      id: '123',
      name: expect.any(String)
    });
  });
});
\`\`\`

## Performance Considerations
- Use \`skipLibCheck: true\` to speed up compilation
- Leverage project references for large monorepos
- Use \`const\` assertions for literal types
- Prefer interfaces over type aliases for object shapes (better performance)

## When to Use This Skill
- Setting up new TypeScript projects
- Migrating JavaScript to TypeScript
- Implementing type-safe APIs
- Refactoring for better type safety
- Debugging TypeScript compiler errors
- Optimizing TypeScript configuration
`;
