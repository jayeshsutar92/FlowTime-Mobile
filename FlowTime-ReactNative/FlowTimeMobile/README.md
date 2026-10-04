# FlowTime Mobile (React Native + TypeScript, Android)

React Native version of the FlowTime web UI: Sign in / Sign up / OTP, Timer (Default 25m or Custom), Dashboard, Contributions, Presets, Music, Profile and Admin.

## Run in Android Studio
1. Install Node 18+ and JDK 17, plus the Android SDK through Android Studio.
2. `npm install`
3. `npm start` (Metro bundler), then in a second terminal run `npm run android`.
   You can also open the `android/` folder in Android Studio and press Run while Metro is running.

## Structure
- `src/theme` – colours, fonts, radii and glow (taken from the web design)
- `src/components` – reusable UI kit (Card, Sheet, Segmented, Toggle, Stepper, PrimaryButton, Field, Badge, Chip…)
- `src/navigation` – auth stack plus the tab shell (header, avatar, bottom tab bar)
- `src/screens` – one file per screen
- `src/api` – small fetch client and the `API_BASE_URL` setting for your Django backend
- `src/types/models.ts` – the data shapes the screens expect

## Connecting the Django API
Screens start empty: no sample data is included. Each screen has a marked `useState` where data should be loaded.
Set `src/api/config.ts`. The emulator reaches your computer's localhost at `10.0.2.2`.
Call your existing endpoints with `api.get/post(...)`. Auth submit lives in `AuthScreen.tsx` (`submit` / `requestOtp`).
Fonts (Space Grotesk, JetBrains Mono) are bundled in `android/app/src/main/assets/fonts`.
