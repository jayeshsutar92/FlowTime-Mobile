import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingGoalScreen from '../screens/OnboardingGoalScreen';
import OnboardingRhythmScreen from '../screens/OnboardingRhythmScreen';
import MainTabs from './MainTabs';
import CustomTimerScreen from '../screens/CustomTimerScreen';
import ActiveSessionScreen from '../screens/ActiveSessionScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import DailyInsightsScreen from '../screens/DailyInsightsScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import SettingsDetailScreen from '../screens/SettingsDetailScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OnboardingGoal" component={OnboardingGoalScreen} />
      <Stack.Screen name="OnboardingRhythm" component={OnboardingRhythmScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="CustomTimer" component={CustomTimerScreen} />
      <Stack.Screen name="ActiveSession" component={ActiveSessionScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
      <Stack.Screen name="DailyInsights" component={DailyInsightsScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="SettingsDetail" component={SettingsDetailScreen} />
    </Stack.Navigator>
  );
}
