export const expoTemplate = `---
description: Expo development standards with SDK 54+ and Expo Router
globs:
  - "**/app/**"
  - "**/app.json"
  - "**/eas.json"
alwaysApply: false
---

# Expo Project Rules

## Project Setup (2025)
- Use Development Builds, not Expo Go for production apps
- Enable New Architecture (default in SDK 53+)
- Use Expo Router for navigation
- Keep SDK updated for best support

## Expo Router Structure
\`\`\`
app/
  _layout.tsx        # Root layout
  index.tsx          # Home (/)
  about.tsx          # /about
  (tabs)/            # Tab group
    _layout.tsx
    index.tsx
    profile.tsx
  users/
    [id].tsx         # Dynamic route
  +not-found.tsx     # 404
\`\`\`

## Navigation Patterns
\`\`\`tsx
import { router, useLocalSearchParams } from 'expo-router';

// Navigate
router.push('/about');
router.push(\`/users/\${id}\`);
router.back();

// Access params
const { id } = useLocalSearchParams<{ id: string }>();
\`\`\`

## Environment Variables
- Prefix with \`EXPO_PUBLIC_\` for client access
- Store secrets server-side only
- Use EAS Secrets for sensitive data

\`\`\`bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
\`\`\`

## Native Features
\`\`\`tsx
// Always request permissions first
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

// Request permission before using
const { status } = await Location.requestForegroundPermissionsAsync();
if (status === 'granted') {
  const location = await Location.getCurrentPositionAsync();
}
\`\`\`

## EAS Build & Update
\`\`\`json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
\`\`\`

## app.json Configuration
- Set proper bundle identifiers
- Configure permissions with explanations
- Use plugins for native features
- Set up splash screen and icon

\`\`\`json
{
  "expo": {
    "plugins": [
      "expo-router",
      ["expo-camera", {
        "cameraPermission": "Allow camera access"
      }]
    ]
  }
}
\`\`\`

## Performance
- Use \`expo-image\` instead of React Native Image
- Optimize bundle size with \`expo-atlas\`
- Enable Hermes (default)
- Lazy load heavy components

\`\`\`tsx
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  cachePolicy="memory-disk"
/>
\`\`\`

## Storage
- Use \`expo-secure-store\` for sensitive data
- Use \`AsyncStorage\` for general data
- Use \`expo-file-system\` for files

## Deployment
- Use EAS Build for all builds
- Implement EAS Update for OTA updates
- Test on real devices before release
- Use \`expo-doctor\` regularly

## Testing
\`\`\`json
{
  "jest": {
    "preset": "jest-expo"
  }
}
\`\`\`

## Migration Notes
- SDK 54: Use \`expo-video\` instead of \`expo-av\`
- Migrate to New Architecture (required soon)
- Use Development Builds over Expo Go

## Anti-Patterns
- Don't use Expo Go for production apps
- Don't ignore \`expo-doctor\` warnings
- Don't skip permission requests
- Don't forget to test OTA updates
- Don't ignore bundle size
`;
