import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart3, CalendarCheck2, SlidersHorizontal, Timer, Waves } from 'lucide-react-native';
import { colors, alpha, glow, radius } from '../theme';
import { Gradient, Press, Text } from '../components/ui';
import type { AppTabParamList } from './types';
import { TimerScreen } from '../screens/TimerScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ContributionsScreen } from '../screens/ContributionsScreen';
import { PresetsScreen } from '../screens/PresetsScreen';
import { MusicScreen } from '../screens/MusicScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AdminScreen } from '../screens/AdminScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

const TABS = [
  { name: 'Timer', label: 'Timer', Icon: Timer },
  { name: 'Dashboard', label: 'Stats', Icon: BarChart3 },
  { name: 'Contributions', label: 'Log', Icon: CalendarCheck2 },
  { name: 'Presets', label: 'Presets', Icon: SlidersHorizontal },
  { name: 'Music', label: 'Music', Icon: Waves },
] as const;

/** User initials shown in the header avatar. Provide from the signed-in user. */
const AVATAR_INITIALS = '';

function Header({ routeName, navigate }: { routeName: string; navigate: (r: keyof AppTabParamList) => void }) {
  const insets = useSafeAreaInsets();
  const onProfile = routeName === 'Profile';
  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <Press onPress={() => navigate('Timer')} style={styles.brand} accessibilityLabel="FlowTime home">
          <Gradient borderRadius={radius.md} style={[styles.logo, glow]}>
            <View style={styles.logoDot} />
          </Gradient>
          <Text variant="display" size={18} numberOfLines={1}>
            FlowTime
          </Text>
        </Press>
        <Press
          onPress={() => navigate('Profile')}
          accessibilityLabel="Profile"
          style={[
            styles.avatar,
            onProfile
              ? { borderColor: colors.primary, backgroundColor: alpha(colors.primary, 0.2) }
              : { borderColor: colors.border, backgroundColor: colors.secondary },
          ]}
        >
          <Text size={12} weight="bold" color={onProfile ? colors.primary : colors.mutedForeground}>
            {AVATAR_INITIALS}
          </Text>
        </Press>
      </View>
    </View>
  );
}

function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const current = state.routes[state.index]?.name;
  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 12 }]}>
      {TABS.map(({ name, label, Icon }) => {
        const active = current === name;
        return (
          <Press
            key={name}
            onPress={() => navigation.navigate(name)}
            style={styles.tabItem}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={label}
          >
            {active ? (
              <Gradient borderRadius={radius.full} style={[styles.tabIcon, glow]}>
                <Icon size={20} color={colors.primaryForeground} strokeWidth={2.4} />
              </Gradient>
            ) : (
              <View style={styles.tabIcon}>
                <Icon size={20} color={colors.mutedForeground} strokeWidth={2} />
              </View>
            )}
            <Text size={10} weight="semibold" color={active ? colors.foreground : colors.mutedForeground}>
              {label}
            </Text>
          </Press>
        );
      })}
    </View>
  );
}

export function AppShell() {
  return (
    <Tab.Navigator
      initialRouteName="Timer"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={({ route, navigation }) => ({
        header: () => <Header routeName={route.name} navigate={(r) => navigation.navigate(r)} />,
        sceneStyle: { backgroundColor: colors.background },
      })}
    >
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Contributions" component={ContributionsScreen} />
      <Tab.Screen name="Presets" component={PresetsScreen} />
      <Tab.Screen name="Music" component={MusicScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: alpha(colors.background, 0.95),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  logo: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  logoDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primaryForeground },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: alpha(colors.background, 0.96),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 6 },
  tabIcon: { width: 56, height: 36, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
});
