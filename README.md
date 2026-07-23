# FlowTime — Deep Focus Timer for Android

FlowTime is a premium productivity app built for deep focus. It combines adaptive timers, curated soundscapes, and session analytics to help you enter and sustain flow states.

**Built with React Native CLI** • Android-first • Hermes engine • New Architecture

---

## Features

| Feature | Description |
|---|---|
| **Adaptive Timer** | Pomodoro-style work/break cycles with customizable durations |
| **Presets** | Deep Work, Admin Tasks, Light Reading, Quick Sprint — or create your own |
| **Soundscapes** | Binaural beats, ambient noise, and nature sounds with a built-in player |
| **Dashboard** | Session history, streak tracking, and daily insights |
| **Onboarding Flow** | Goal selection → Rhythm configuration → Personalized setup |
| **Dark Theme** | AMOLED-optimized dark UI with the FlowTime design system |

## Screens

- **Landing** — Hero with CTAs (Start Free / Watch Demo)
- **Login** — Email + password with OTP fallback
- **Onboarding** — Goal selection, rhythm configuration (4-step flow)
- **Timer Home** — Default Timer and Custom Timer cards
- **Active Session** — Live countdown with ambient player
- **Custom Timer** — Configure work/break durations and session count
- **Presets** — Saved timer configurations with play/edit controls
- **Sounds** — Audio library with search, playlists, and favorites
- **Now Playing** — Full-screen player with progress, controls, and volume
- **Dashboard** — Focus stats, session timeline, daily insights
- **Profile** — Account settings, preferences, security
- **Preferences** — Auto-DND, strict mode, AMOLED mode, notifications

## Tech Stack

- **React Native** 0.86 (CLI, not Expo)
- **TypeScript** 5.8
- **React Navigation** 7 (Native Stack + Bottom Tabs)
- **Hermes** JS engine
- **lucide-react-native** for icons
- **react-native-safe-area-context** for SafeArea
- **react-native-screens** for native screen management
- **react-native-gesture-handler** for gestures
- **react-native-svg** for vector graphics

## Project Structure

```
Frontend-App/
├── android/              # Native Android project
├── src/
│   ├── assets/images/    # PNG assets (backgrounds, avatars, album art)
│   ├── components/       # Reusable UI components
│   │   ├── BrandHeader   # App header with logo + settings
│   │   ├── Card          # Surface card with border
│   │   ├── FlowMark      # Logo icon
│   │   ├── IconButton    # Circular icon button
│   │   ├── MiniPlayer    # Compact audio player bar
│   │   ├── PrimaryButton # CTA button with icon
│   │   ├── Primitives    # MonoLabel, SliderMock, ToggleMock
│   │   └── Screen        # SafeArea scroll wrapper
│   ├── data/content.ts   # Static data (presets, tracks, goals, settings)
│   ├── navigation/       # RootNavigator (stack + tabs)
│   ├── screens/          # All app screens
│   └── theme/            # Design tokens (colors, typography, spacing)
├── App.tsx               # Root component with NavigationContainer
├── index.js              # AppRegistry entry point
├── app.json              # App name: "FlowTime"
├── metro.config.js       # Metro bundler config
├── babel.config.js       # Babel with @react-native/babel-preset
└── tsconfig.json         # TypeScript config
```

## Getting Started

### Prerequisites

- Node.js ≥ 22.11
- Android SDK (API 36, Build Tools 36.0.0, NDK 27.1)
- Java 17+
- Android emulator or physical device

### Install & Run

```sh
cd Frontend-App

# Install dependencies
npm install

# Start Metro bundler
npx react-native start

# Build and launch on Android (in a separate terminal)
npx react-native run-android
```

### Build APK

```sh
cd Frontend-App/android
./gradlew assembleDebug
```

The debug APK will be at `android/app/build/outputs/apk/debug/app-debug.apk`.

## Design System

| Token | Value |
|---|---|
| Background | `#071122` |
| Surface | `#111a2d` |
| Accent | `#a9c3ff` |
| Accent Strong | `#4f8fff` |
| Text | `#dce5ff` |
| Muted | `#b9c0d3` |
| Border | `#202b43` |
| Font Sans | `sans-serif-medium` (Android) |
| Font Mono | `monospace` (Android) |

## Notes

- This is a **React Native CLI** project — do not use `npx expo start`.
- `expo` must not be in `package.json` dependencies (it gets auto-linked into Gradle and breaks the build).
- On Windows, limit `reactNativeArchitectures` in `gradle.properties` to avoid 260-char path limits with CMake.
- The app registers as `"FlowTime"` in `app.json` — `index.js` passes this to `AppRegistry.registerComponent`.

## License

Private — All rights reserved.
