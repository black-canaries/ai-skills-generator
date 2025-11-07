export const reactNativeTemplate = `---
description: React Native development standards with New Architecture
globs:
  - "**/*.tsx"
  - "**/*.ts"
  - "**/app.json"
alwaysApply: false
---

# React Native Project Rules

## New Architecture (Default 2025)
- Fabric renderer enabled by default
- TurboModules for native modules
- Hermes engine for performance
- Don't disable unless absolutely necessary

## Component Best Practices
- Use \`SafeAreaView\` for iOS safe areas
- Prefer \`Pressable\` over \`TouchableOpacity\`
- Use \`FlatList\` for lists, never \`ScrollView\` with map

\`\`\`tsx
// Good - Virtualized list
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Item item={item} />}
  initialNumToRender={10}
  windowSize={5}
  removeClippedSubviews={true}
/>

// Bad - Not virtualized
<ScrollView>
  {items.map(item => <Item key={item.id} item={item} />)}
</ScrollView>
\`\`\`

## Styling
- Use \`StyleSheet.create()\` for performance
- Define styles outside component
- Use Flexbox (default flexDirection is 'column')
- Avoid inline styles

\`\`\`tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  }
});
\`\`\`

## Performance
- Memoize components with \`React.memo\`
- Use \`useCallback\` for callbacks to children
- Use \`useMemo\` for expensive calculations
- Implement \`getItemLayout\` for FlatList when possible

## Images
- Use FastImage for better performance
- Optimize image sizes before bundling
- Use proper \`resizeMode\`
- Cache images appropriately

## Navigation
- Use React Navigation v6+
- Type navigation with TypeScript
- Implement deep linking
- Handle Android back button

## State Management
- Local state for component-specific data
- Zustand for global state (recommended)
- React Query for server state
- Avoid Redux unless necessary

## Animations
- Use Reanimated 3.0 for 60fps animations
- Run animations on UI thread
- Use worklets for performance
- Implement gesture handling with Gesture Handler

\`\`\`tsx
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const opacity = useSharedValue(0);
const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value
}));
\`\`\`

## Platform-Specific Code
\`\`\`tsx
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: { fontFamily: 'System' },
      android: { fontFamily: 'Roboto' }
    })
  }
});
\`\`\`

## Testing
- Use React Native Testing Library
- Test user interactions
- Mock native modules
- Test on real devices

## Anti-Patterns
- Don't use index as key
- Don't mutate state directly
- Don't use nested FlatLists
- Don't overuse Context
- Don't forget to handle permissions
`;
