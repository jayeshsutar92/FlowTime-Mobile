import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Clock, Search, ShieldCheck, Users, Zap } from 'lucide-react-native';
import { colors, alpha, radius } from '../theme';
import { Badge, Card, Input, SectionTitle, StatTile, Text } from '../components/ui';
import { Screen } from '../components/Screen';
import type { AdminUser } from '../types/models';

type AdminStats = { totalUsers: string; activeNow: string; focusToday: string; uptime: string };
const DASH = '—';

export function AdminScreen() {
  const [query, setQuery] = useState('');
  // Load platform stats and users from the existing API.
  const [stats] = useState<AdminStats | null>(null);
  const [users] = useState<AdminUser[]>([]);

  const q = query.toLowerCase();
  const filtered = users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));

  return (
    <Screen>
      <View>
        <View style={styles.titleRow}>
          <ShieldCheck size={24} color={colors.accent} />
          <Text variant="display" size={24}>Admin</Text>
        </View>
        <Text size={14} color={colors.mutedForeground} style={{ marginTop: 4 }}>
          Users, activity and platform health.
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <View style={styles.row}>
          <StatTile icon={<Users size={20} color={colors.primary} />} label="Total users" value={stats?.totalUsers ?? DASH} />
          <StatTile icon={<Zap size={20} color={colors.success} />} label="Active now" value={stats?.activeNow ?? DASH} />
        </View>
        <View style={styles.row}>
          <StatTile icon={<Clock size={20} color={colors.accent} />} label="Focus today" value={stats?.focusToday ?? DASH} />
          <StatTile icon={<ShieldCheck size={20} color={colors.warning} />} label="Uptime" value={stats?.uptime ?? DASH} />
        </View>
      </View>

      <Card>
        <SectionTitle title="Users" subtitle={`${filtered.length} shown`} />
        <View style={{ marginTop: 16 }}>
          <View style={styles.searchIcon} pointerEvents="none">
            <Search size={16} color={colors.mutedForeground} />
          </View>
          <Input
            value={query}
            onChangeText={setQuery}
            placeholder="Search users…"
            autoCapitalize="none"
            style={{ height: 44, paddingLeft: 44 }}
          />
        </View>
        <View style={{ marginTop: 12, gap: 8 }}>
          {filtered.length === 0 && (
            <Text size={14} color={colors.mutedForeground} center style={{ paddingVertical: 24 }}>
              {query ? `No users match “${query}”.` : 'No users to show.'}
            </Text>
          )}
          {filtered.map((u) => (
            <View key={u.id} style={styles.user}>
              <View style={styles.avatar}>
                <Text size={12} weight="bold">
                  {u.name.split(' ').map((n) => n[0]).join('')}
                </Text>
                <View
                  style={[
                    styles.status,
                    { backgroundColor: u.active ? colors.success : alpha(colors.mutedForeground, 0.4) },
                  ]}
                />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text size={14} weight="semibold" numberOfLines={1}>{u.name}</Text>
                <Text size={12} color={colors.mutedForeground} numberOfLines={1}>{u.email}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Badge
                  label={u.role}
                  color={u.role === 'Admin' ? colors.accent : u.role === 'Moderator' ? colors.warning : colors.mutedForeground}
                  bg={u.role === 'User' ? colors.muted : undefined}
                />
                <Text variant="mono" size={10} color={colors.mutedForeground} style={{ marginTop: 4 }}>
                  {u.sessions} sessions
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  row: { flexDirection: 'row', gap: 12 },
  searchIcon: { position: 'absolute', left: 16, top: 0, bottom: 0, justifyContent: 'center', zIndex: 1 },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.4),
    padding: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.muted, alignItems: 'center', justifyContent: 'center' },
  status: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.card,
  },
});
