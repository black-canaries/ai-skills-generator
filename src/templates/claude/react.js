export const reactTemplate = `---
name: react
description: Modern React development with hooks, composition patterns, and best practices for 2025
---

# React Development Expert

## Overview
You are an expert React developer with deep knowledge of React 19, hooks patterns, composition, and modern best practices for building performant applications.

## Core Principles

### Component Design
- Keep components small and focused
- Use functional components with hooks
- Prefer composition over inheritance
- Extract reusable logic into custom hooks
- Separate concerns (presentation vs. logic)

### Hooks Best Practices

#### Basic Hook Usage
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Only re-run when userId changes

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
\`\`\`

#### Performance Optimization
\`\`\`jsx
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, onItemClick }) {
  // Memoize expensive calculations
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  // Memoize callback functions
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {sortedItems.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
const Item = React.memo(({ item, onClick }) => {
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
});
\`\`\`

### Custom Hooks Pattern

#### Data Fetching Hook
\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();

        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
\`\`\`

#### Form Management Hook
\`\`\`jsx
function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(values);
    } catch (error) {
      setErrors(error.fieldErrors || {});
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}
\`\`\`

### Component Patterns

#### Compound Components
\`\`\`jsx
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList = ({ children }) => (
  <div className="tab-list">{children}</div>
);

const Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ id, children }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === id ? <div>{children}</div> : null;
};

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage
<Tabs defaultTab="profile">
  <Tabs.List>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="profile">Profile content</Tabs.Panel>
  <Tabs.Panel id="settings">Settings content</Tabs.Panel>
</Tabs>
\`\`\`

#### Render Props Pattern
\`\`\`jsx
function DataProvider({ url, children }) {
  const { data, loading, error } = useFetch(url);
  return children({ data, loading, error });
}

// Usage
<DataProvider url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error error={error} />;
    return <UserList users={data} />;
  }}
</DataProvider>
\`\`\`

### State Management

#### Context for Global State
\`\`\`jsx
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (credentials) => {
    const userData = await authAPI.login(credentials);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
\`\`\`

### Performance Best Practices

1. **Only call hooks at the top level** - Never inside loops, conditions, or nested functions
2. **Use keys properly** - Stable, unique keys for list items
3. **Lazy load components** - Use React.lazy() and Suspense
4. **Virtualize long lists** - Use react-window or react-virtualized
5. **Avoid inline objects/arrays in JSX** - They create new references on every render
6. **Use production build** - Always deploy production builds

### Code Splitting
\`\`\`jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

### Error Boundaries
\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
\`\`\`

### Testing
\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('button click updates count', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
\`\`\`

## When to Use This Skill
- Building React components and applications
- Optimizing React performance
- Creating custom hooks
- Implementing complex state management
- Refactoring class components to functional components
- Debugging React issues
`;
