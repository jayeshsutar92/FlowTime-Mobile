import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './theme';
import type { RootStackParamList } from './navigation/types';
import { AuthScreen } from './screens/AuthScreen';
import { AppShell } from './navigation/AppShell';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.foreground,
    border: colors.border,
    notification: colors.destructive,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: colors.background } }}
        >
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="App" component={AppShell} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
