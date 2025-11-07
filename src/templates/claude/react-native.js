export const reactNativeTemplate = `---
name: react-native
description: React Native development with New Architecture, performance optimization, and modern best practices for 2025
---

# React Native Development Expert

## Overview
You are an expert React Native developer with deep knowledge of the New Architecture (Fabric + TurboModules), Hermes engine, and performance optimization patterns for building production-grade mobile applications in 2025.

## Project Setup

### Create New Project
\`\`\`bash
# Create with latest React Native
npx react-native@latest init MyApp

# With TypeScript
npx react-native@latest init MyApp --template react-native-template-typescript

# Check environment
npx react-native doctor
\`\`\`

### New Architecture (2025 Default)
The New Architecture is now enabled by default in React Native. It includes:
- **Fabric**: New rendering system
- **TurboModules**: New native modules system
- **Hermes**: Optimized JavaScript engine

## Core Components

### Basic Components
\`\`\`tsx
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView
} from 'react-native';

function MyComponent() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <Image
          source={{ uri: 'https://example.com/image.jpg' }}
          style={styles.image}
        />
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <Text>Press Me</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
\`\`\`

### List Rendering
\`\`\`tsx
// Use FlatList for large lists (virtualized)
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemComponent item={item} />}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  })}
/>

// Use SectionList for grouped data
<SectionList
  sections={sections}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemComponent item={item} />}
  renderSectionHeader={({ section }) => (
    <Text style={styles.header}>{section.title}</Text>
  )}
/>
\`\`\`

## Styling

### StyleSheet API
\`\`\`tsx
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  buttonPressed: {
    opacity: 0.7
  }
});

// Responsive sizing
const responsiveStyles = StyleSheet.create({
  container: {
    width: width * 0.9,
    maxWidth: 600
  }
});
\`\`\`

### Flexbox Layout
\`\`\`tsx
// Column layout (default)
<View style={{ flexDirection: 'column' }}>
  <View style={{ flex: 1 }} />
  <View style={{ flex: 2 }} />
</View>

// Row layout
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View />
  <View />
</View>

// Centering
<View style={{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <Text>Centered</Text>
</View>
\`\`\`

## Performance Optimization

### Component Optimization
\`\`\`tsx
import { memo, useCallback, useMemo } from 'react';

// Memoize components
const ItemComponent = memo(({ item, onPress }) => {
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

// Memoize callbacks
function ListScreen() {
  const handlePress = useCallback((id: string) => {
    navigation.navigate('Detail', { id });
  }, [navigation]);

  // Memoize expensive computations
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.date - b.date);
  }, [items]);

  return (
    <FlatList
      data={sortedItems}
      renderItem={({ item }) => (
        <ItemComponent item={item} onPress={handlePress} />
      )}
    />
  );
}
\`\`\`

### Image Optimization
\`\`\`tsx
import FastImage from 'react-native-fast-image';

// Use FastImage for better performance
<FastImage
  source={{
    uri: 'https://example.com/image.jpg',
    priority: FastImage.priority.high,
    cache: FastImage.cacheControl.immutable
  }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>

// Lazy load images
<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  loadingIndicatorSource={require('./placeholder.png')}
  resizeMode="cover"
/>
\`\`\`

### Animations (Reanimated 3.0)
\`\`\`tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat
} from 'react-native-reanimated';

function AnimatedComponent() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }]
    };
  });

  const handlePress = () => {
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withSpring(1.2);
  };

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <Pressable onPress={handlePress}>
        <Text>Animate</Text>
      </Pressable>
    </Animated.View>
  );
}
\`\`\`

### Gesture Handling
\`\`\`tsx
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

function DraggableBox() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ]
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
}
\`\`\`

## State Management

### Context API
\`\`\`tsx
import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
}

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
} | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
\`\`\`

### Zustand (Recommended)
\`\`\`tsx
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}));

// Usage
function Profile() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <View>
      <Text>{user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
\`\`\`

## Navigation (React Navigation)

### Stack Navigator
\`\`\`tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Detail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params.id })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Type-safe navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

function DetailScreen({ navigation, route }: Props) {
  const { id } = route.params;

  return <View><Text>{id}</Text></View>;
}
\`\`\`

### Tab Navigator
\`\`\`tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
\`\`\`

## Data Fetching

### React Query (TanStack Query)
\`\`\`tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/users');
      return response.json();
    }
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <UserItem user={item} />}
    />
  );
}

// Mutations
function CreateUserForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userData: User) => {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const handleSubmit = () => {
    mutation.mutate({ name: 'John', email: 'john@example.com' });
  };

  return (
    <Button
      title="Create User"
      onPress={handleSubmit}
      disabled={mutation.isPending}
    />
  );
}
\`\`\`

## Native Modules & Platform-Specific Code

### Platform-Specific Code
\`\`\`tsx
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'white'
      },
      android: {
        backgroundColor: 'blue'
      }
    })
  }
});

// Platform-specific files
// Component.ios.tsx
// Component.android.tsx
\`\`\`

### Linking & Deep Links
\`\`\`tsx
import { Linking } from 'react-native';

// Open URL
await Linking.openURL('https://example.com');

// Handle deep links
Linking.addEventListener('url', ({ url }) => {
  // Handle URL
});
\`\`\`

## Testing

### Jest & React Native Testing Library
\`\`\`tsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('LoginScreen', () => {
  it('should login user', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });
});
\`\`\`

## Best Practices

1. **Use New Architecture**: Default in 2025, provides better performance
2. **Enable Hermes**: Optimizes startup time and memory usage
3. **Optimize Lists**: Use FlatList with proper props
4. **Memoize Components**: Use React.memo for expensive renders
5. **Use Reanimated**: For 60fps animations
6. **Lazy Load Images**: Use FastImage for better performance
7. **Type Everything**: Use TypeScript with strict mode
8. **Profile Performance**: Use Flipper for debugging
9. **Test on Real Devices**: Emulators don't reflect real performance
10. **Keep Bundle Small**: Code split and remove unused dependencies

## Common Pitfalls

- Avoid inline functions in render
- Don't mutate state directly
- Use keys properly in lists
- Avoid nested FlatLists
- Don't overuse Context
- Profile before optimizing

## When to Use This Skill
- Building React Native mobile apps
- Optimizing app performance
- Implementing animations and gestures
- Setting up navigation
- Debugging React Native issues
- Migrating to New Architecture
`;
