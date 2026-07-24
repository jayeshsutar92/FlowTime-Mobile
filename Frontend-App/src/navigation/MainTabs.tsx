import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart3, Layers, Music, Timer, UserRound } from 'lucide-react-native';
import TimerHomeScreen from '../screens/TimerHomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PresetsScreen from '../screens/PresetsScreen';
import SoundsScreen from '../screens/SoundsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MainTabParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';

const Tab = createBottomTabNavigator<MainTabParamList>();
const icons = { Timer, Dashboard: BarChart3, Presets: Layers, Sounds: Music, Me: UserRound };

function FlowTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);

  // Dynamic bottom padding respecting Android system gesture/navigation bar insets
  const bottomPadding = Math.max(insets.bottom, 10);

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPadding }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = icons[route.name as keyof typeof icons];
        const { options } = descriptors[route.key];
        const title = String(options.title ?? route.name);

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={({ pressed }) => [
              styles.item,
              focused && styles.active,
              pressed && styles.pressed,
            ]}
          >
            <Icon
              size={fs(20)}
              color={focused ? colors.accent : colors.muted}
              strokeWidth={focused ? 2.2 : 1.8}
            />
            <Text
              style={[
                styles.label,
                { fontSize: fs(11) },
                focused && styles.activeLabel,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <FlowTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Timer" component={TimerHomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Presets" component={PresetsScreen} />
      <Tab.Screen name="Sounds" component={SoundsScreen} />
      <Tab.Screen name="Me" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 64,
    paddingTop: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: colors.border,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  item: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    gap: 3,
  },
  active: {
    backgroundColor: 'rgba(169, 195, 255, 0.12)',
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    color: colors.muted,
    fontFamily: font.sansBold,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  activeLabel: {
    color: colors.accent,
  },
});
