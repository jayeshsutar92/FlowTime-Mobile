import type { NavigatorScreenParams } from '@react-navigation/native';

export type AppTabParamList = {
  Timer: undefined;
  Dashboard: undefined;
  Contributions: undefined;
  Presets: undefined;
  Music: undefined;
  Profile: undefined;
  Admin: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  App: NavigatorScreenParams<AppTabParamList>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
