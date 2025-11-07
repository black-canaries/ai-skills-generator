export const expoTemplate = `---
name: expo
description: Expo SDK 54+ development with New Architecture, Expo Router, and modern best practices for 2025
---

# Expo Development Expert

## Overview
You are an expert Expo developer with deep knowledge of Expo SDK 54+, New Architecture, Expo Router, and modern development workflows for building production-ready cross-platform applications in 2025.

## Project Setup

### Create New Project
\`\`\`bash
# Create new Expo app with latest SDK
npx create-expo-app@latest my-app

# With TypeScript template
npx create-expo-app@latest my-app --template

# With Expo Router
npx create-expo-app@latest my-app --template expo-router

# Check project health
npx expo-doctor
\`\`\`

### New Architecture (Default in SDK 53+)
The New Architecture is now enabled by default. It provides:
- **Fabric**: New rendering system
- **TurboModules**: Faster native modules
- **Hermes**: Optimized JS engine
- **Bridgeless Mode**: Direct JSI communication

## Expo Router (File-Based Routing)

### Basic Setup
\`\`\`
app/
├── _layout.tsx           # Root layout
├── index.tsx             # Home screen (/)
├── about.tsx             # About screen (/about)
├── (tabs)/               # Tab group
│   ├── _layout.tsx
│   ├── index.tsx         # /tabs
│   └── profile.tsx       # /tabs/profile
├── users/
│   ├── [id].tsx          # Dynamic route /users/:id
│   └── index.tsx         # /users
└── +not-found.tsx        # 404 page
\`\`\`

### Root Layout
\`\`\`tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
\`\`\`

### Tab Layout
\`\`\`tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
\`\`\`

### Navigation
\`\`\`tsx
import { router, useLocalSearchParams } from 'expo-router';

// Navigate
function HomeScreen() {
  return (
    <Button
      title="Go to About"
      onPress={() => router.push('/about')}
    />
  );
}

// Navigate with params
function UserList() {
  return (
    <Button
      title="View User"
      onPress={() => router.push(\`/users/\${userId}\`)}
    />
  );
}

// Access params
function UserDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>User ID: {id}</Text>;
}

// Go back
function DetailScreen() {
  return (
    <Button title="Go Back" onPress={() => router.back()} />
  );
}
\`\`\`

## Core Expo APIs

### File System
\`\`\`tsx
import * as FileSystem from 'expo-file-system';

// Read file
const content = await FileSystem.readAsStringAsync(
  FileSystem.documentDirectory + 'file.txt'
);

// Write file
await FileSystem.writeAsStringAsync(
  FileSystem.documentDirectory + 'file.txt',
  'Hello World'
);

// Download file
const { uri } = await FileSystem.downloadAsync(
  'https://example.com/file.pdf',
  FileSystem.documentDirectory + 'file.pdf'
);
\`\`\`

### Camera & Image Picker
\`\`\`tsx
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Image Picker
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
}

// Camera
function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <Button title="Grant Permission" onPress={requestPermission} />
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      facing="back"
      onBarcodeScanned={handleBarCodeScanned}
    />
  );
}
\`\`\`

### Location
\`\`\`tsx
import * as Location from 'expo-location';

async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permission denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High
  });

  return location.coords;
}

// Watch position
const subscription = await Location.watchPositionAsync(
  {
    accuracy: Location.Accuracy.High,
    timeInterval: 1000,
    distanceInterval: 10
  },
  (location) => {
    console.log(location.coords);
  }
);
\`\`\`

### Notifications
\`\`\`tsx
import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

// Request permissions
async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: 'your-project-id'
  });

  return token.data;
}

// Schedule notification
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Reminder',
    body: 'This is a notification',
    data: { userId: '123' }
  },
  trigger: {
    seconds: 60
  }
});

// Listen for notifications
Notifications.addNotificationReceivedListener((notification) => {
  console.log('Notification received:', notification);
});
\`\`\`

### Secure Storage
\`\`\`tsx
import * as SecureStore from 'expo-secure-store';

// Save securely
await SecureStore.setItemAsync('authToken', token);

// Retrieve
const token = await SecureStore.getItemAsync('authToken');

// Delete
await SecureStore.deleteItemAsync('authToken');
\`\`\`

### Media & Audio
\`\`\`tsx
import { Video } from 'expo-video';
import { useVideoPlayer, VideoView } from 'expo-video';

// Video (New in SDK 54)
function VideoPlayer() {
  const player = useVideoPlayer('https://example.com/video.mp4', player => {
    player.loop = true;
    player.play();
  });

  return (
    <VideoView
      style={{ width: 350, height: 275 }}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
}

// Audio
import { Audio } from 'expo-av';

const { sound } = await Audio.Sound.createAsync(
  require('./assets/sound.mp3')
);

await sound.playAsync();
await sound.pauseAsync();
await sound.stopAsync();
\`\`\`

## Development Builds

### Create Development Build
\`\`\`bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure

# Create development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Or build locally
npx expo run:ios
npx expo run:android
\`\`\`

### app.json Configuration
\`\`\`json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      "expo-router",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow app to access your camera"
        }
      ]
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.myapp"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
\`\`\`

## EAS Build & Updates

### EAS Build Profiles
\`\`\`json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./service-account.json"
      }
    }
  }
}
\`\`\`

### EAS Update (OTA Updates)
\`\`\`bash
# Install
npx expo install expo-updates

# Configure in app.json
{
  "updates": {
    "url": "https://u.expo.dev/your-project-id"
  }
}

# Publish update
eas update --branch production --message "Bug fixes"

# Publish to specific channel
eas update --channel preview --message "New features"
\`\`\`

### Use Updates in Code
\`\`\`tsx
import * as Updates from 'expo-updates';

async function checkForUpdates() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
}
\`\`\`

## Environment Variables
\`\`\`bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_KEY=your-api-key
\`\`\`

\`\`\`tsx
// Access in code (only EXPO_PUBLIC_ prefix)
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
\`\`\`

## Testing

### Jest Configuration
\`\`\`json
// package.json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ]
  }
}
\`\`\`

### Unit Tests
\`\`\`tsx
import { render, fireEvent } from '@testing-library/react-native';

describe('LoginScreen', () => {
  it('should submit form', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.press(getByText('Login'));

    expect(mockLogin).toHaveBeenCalled();
  });
});
\`\`\`

## Performance Optimization

### Bundle Size Optimization
\`\`\`bash
# Analyze bundle
npx expo-atlas

# Remove unused dependencies
npx expo install --check
npx depcheck
\`\`\`

### Asset Optimization
\`\`\`tsx
// Optimize images
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
\`\`\`

### Code Splitting
\`\`\`tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

## Best Practices (2025)

1. **Use Development Builds**: Expo Go is for quick prototyping only
2. **Enable New Architecture**: Default in SDK 53+, provides better performance
3. **Use Expo Router**: File-based routing is the modern standard
4. **Leverage EAS**: Build and Update services for CI/CD
5. **Optimize Assets**: Use expo-image and optimize bundle size
6. **Type Everything**: Use TypeScript with strict mode
7. **Test on Devices**: Real devices show actual performance
8. **Use expo-doctor**: Regularly check project health
9. **Update Regularly**: Stay on latest SDK for best support
10. **Monitor Performance**: Use Expo's built-in performance monitoring

## Migration Notes

### From Expo Go to Development Builds
\`\`\`bash
# Install expo-dev-client
npx expo install expo-dev-client

# Create development build
eas build --profile development --platform ios
eas build --profile development --platform android
\`\`\`

### Deprecations in SDK 54
- \`expo-av\` → Use \`expo-video\` and \`expo-audio\`
- Legacy architecture support may be removed soon
- Migrate to New Architecture if not already

## Common Issues & Solutions

### Slow Builds
- Use EAS Build instead of local builds
- Enable caching in eas.json
- Optimize dependencies

### Large Bundle Size
- Use expo-atlas to analyze
- Remove unused libraries
- Use dynamic imports

### Performance Issues
- Enable New Architecture
- Use expo-image instead of Image
- Profile with React DevTools

## When to Use This Skill
- Building cross-platform mobile apps with Expo
- Setting up Expo Router navigation
- Configuring EAS Build and Update
- Implementing native features (camera, location, etc.)
- Optimizing Expo app performance
- Migrating to latest Expo SDK
- Deploying apps to app stores
`;
