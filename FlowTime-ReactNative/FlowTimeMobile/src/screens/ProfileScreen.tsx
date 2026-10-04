import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Award, Bell, ChevronRight, Download, LogOut, ShieldCheck, Vibrate, Volume2 } from 'lucide-react-native';
import { colors, alpha, glow, radius } from '../theme';
import { Card, Gradient, Press, ProgressBar, SectionTitle, Text, Toggle } from '../components/ui';
import { Screen } from '../components/Screen';
import type { UserProfile } from '../types/models';

const PREFS = [
  { label: 'Notifications', Icon: Bell },
  { label: 'Session sounds', Icon: Volume2 },
  { label: 'Haptics', Icon: Vibrate },
  { label: 'Weekly report', Icon: Download },
] as const;
type PrefKey = (typeof PREFS)[number]['label'];

const DASH = '—';

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileScreen() {
  const navigation = useNavigation();
  // Load the signed-in user's profile from the existing API.
  const [user] = useState<UserProfile | null>(null);
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
    Notifications: true,
    'Session sounds': true,
    Haptics: false,
    'Weekly report': true,
  });

  const hasLevel = user?.level != null && user.xp != null && user.xpTarget;

  return (
    <Screen>
      {/* Identity */}
      <Card style={styles.identity}>
        <Gradient borderRadius={radius['3xl']} style={[styles.avatar, glow]}>
          <Text variant="display" size={20} color={colors.primaryForeground}>
            {user ? initials(user.name) : ''}
          </Text>
        </Gradient>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text variant="display" size={20} numberOfLines={1}>{user?.name ?? DASH}</Text>
          <Text size={14} color={colors.mutedForeground} numberOfLines={1}>{user?.email ?? ''}</Text>
          {user?.plan ? (
            <View style={styles.plan}>
              <ShieldCheck size={12} color={colors.primary} />
              <Text variant="mono" weight="bold" size={9} color={colors.primary} style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {user.plan}
              </Text>
            </View>
          ) : null}
        </View>
      </Card>

      {/* Level */}
      <Card>
        <View style={styles.levelRow}>
          <View style={styles.levelIcon}>
            <Award size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={styles.between}>
              <Text variant="display" size={16}>{hasLevel ? `Level ${user!.level} Focus` : 'Focus Level'}</Text>
              <Text variant="mono" size={10} color={colors.mutedForeground}>
                {hasLevel ? `${user!.xp!.toLocaleString()} / ${user!.xpTarget!.toLocaleString()} XP` : DASH}
              </Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <ProgressBar value={hasLevel ? user!.xp! / user!.xpTarget! : 0} />
            </View>
          </View>
        </View>
        <View style={styles.statsRow}>
          {[
            { v: user?.sessions != null ? String(user.sessions) : DASH, l: 'Sessions' },
            { v: user?.focusedHours != null ? `${user.focusedHours}h` : DASH, l: 'Focused' },
            { v: user?.streakDays != null ? String(user.streakDays) : DASH, l: 'Day streak' },
          ].map(({ v, l }) => (
            <View key={l} style={styles.stat}>
              <Text variant="display" size={18}>{v}</Text>
              <Text variant="label" size={9} numberOfLines={1}>{l}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Preferences */}
      <Card>
        <SectionTitle title="Preferences" />
        <View style={{ marginTop: 8 }}>
          {PREFS.map(({ label, Icon }, i) => (
            <View key={label} style={[styles.pref, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
              <Icon size={18} color={colors.mutedForeground} />
              <Text size={14} weight="medium" numberOfLines={1} style={{ flex: 1 }}>{label}</Text>
              <Toggle checked={prefs[label]} onChange={(v) => setPrefs((p) => ({ ...p, [label]: v }))} />
            </View>
          ))}
        </View>
      </Card>

      {/* Links */}
      <Card style={{ padding: 8 }}>
        <Press onPress={() => navigation.navigate('App', { screen: 'Admin' })} style={styles.link}>
          <ShieldCheck size={18} color={colors.accent} />
          <Text size={14} weight="semibold" numberOfLines={1} style={{ flex: 1 }}>Admin Panel</Text>
          <ChevronRight size={16} color={colors.mutedForeground} />
        </Press>
      </Card>

      <Press
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })}
        style={styles.logout}
      >
        <LogOut size={16} color={colors.destructive} />
        <Text size={14} weight="bold" color={colors.destructive}>Log out</Text>
      </Press>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  plan: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: alpha(colors.primary, 0.15),
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: alpha(colors.primary, 0.3),
    backgroundColor: alpha(colors.primary, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  between: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  stat: { flex: 1, alignItems: 'center', borderRadius: radius['2xl'], backgroundColor: alpha(colors.secondary, 0.5), paddingVertical: 12 },
  pref: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: radius['2xl'], padding: 14 },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: alpha(colors.destructive, 0.3),
    backgroundColor: alpha(colors.destructive, 0.1),
    paddingVertical: 14,
  },
});
