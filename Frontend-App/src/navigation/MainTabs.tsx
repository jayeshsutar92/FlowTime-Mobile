import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
  return (
    <View style={styles.wrap}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = icons[route.name as keyof typeof icons];
        const { options } = descriptors[route.key];
        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={({ pressed }) => [styles.item, focused && styles.active, pressed && styles.pressed]}
          >
            <Icon size={30} color={focused ? colors.accent : colors.muted} strokeWidth={2.5} />
            <Text style={[styles.label, focused && styles.activeLabel]}>{String(options.title ?? route.name)}</Text>
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
  wrap: { minHeight: 96, paddingBottom: 12, paddingTop: 10, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderTopLeftRadius: 22, borderTopRightRadius: 22, borderTopWidth: 1, borderColor: colors.border },
  item: { flex: 1, minHeight: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 24, gap: 5 },
  active: { backgroundColor: '#142544', shadowColor: colors.accentStrong, shadowOpacity: 0.16, shadowRadius: 18, elevation: 6 },
  pressed: { opacity: 0.8 },
  label: { color: colors.muted, fontFamily: font.mono, fontSize: 17, letterSpacing: 1.4 },
  activeLabel: { color: colors.accent },
});
