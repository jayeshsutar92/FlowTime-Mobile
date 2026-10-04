import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Activity, Award, Flame, TrendingUp } from 'lucide-react-native';
import { colors, alpha, glow, radius } from '../theme';
import { Card, Gradient, ProgressBar, SectionTitle, Segmented, Text } from '../components/ui';
import { Screen } from '../components/Screen';

const RANGES = ['7 Days', '30 Days', 'All Time'] as const;
type Range = (typeof RANGES)[number];

/** Shape of the analytics the dashboard renders. Populate from the Django API. */
export type DashboardStats = {
  totalFocusHours: number;
  sessions: number;
  productivityScore: number; // 0–100
  scoreLabel: string;
  avgFocusMinutes: number;
  completionRate: number; // 0–100
  bestSlot: string;
  insight?: string;
  /** 7 values 0–1, with day labels. */
  heatmap: { day: string; value: number }[];
  rhythm: { day: string; value: number }[];
  level: number;
  xp: number;
  xpTarget: number;
};

const EMPTY_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({ day, value: 0 }));
const DASH = '—';

export function DashboardScreen() {
  const [range, setRange] = useState<Range>('7 Days');
  // Load for the selected `range` from the existing API.
  const [stats] = useState<DashboardStats | null>(null);

  const heat = stats?.heatmap ?? EMPTY_WEEK;
  const rhythm = stats?.rhythm ?? EMPTY_WEEK;
  const maxHeat = Math.max(...heat.map((h) => h.value));
  const score = stats?.productivityScore ?? 0;
  const C = 2 * Math.PI * 58;

  return (
    <Screen>
      <View>
        <Text variant="display" size={24} center>Dashboard</Text>
        <Text size={14} color={colors.mutedForeground} center style={{ marginTop: 4, alignSelf: 'center', maxWidth: 280 }}>
          Analyze your focus performance and weekly rhythms.
        </Text>
      </View>

      <Segmented options={RANGES} value={range} onChange={setRange} />

      <View style={styles.grid2}>
        <Card style={{ flex: 1 }}>
          <Text variant="label" style={{ letterSpacing: 1.8 }}>Total Focus</Text>
          <Text variant="display" size={36} style={{ marginTop: 8 }}>
            {stats ? stats.totalFocusHours : DASH}
            <Text size={16} weight="medium" color={colors.mutedForeground}> hrs</Text>
          </Text>
        </Card>
        <Card style={{ flex: 1 }}>
          <Text variant="label" style={{ letterSpacing: 1.8 }}>Sessions</Text>
          <Text variant="display" size={36} style={{ marginTop: 8 }}>
            {stats ? stats.sessions : DASH}
            <Text size={16} weight="medium" color={colors.mutedForeground}> done</Text>
          </Text>
        </Card>
      </View>

      {/* Productivity score */}
      <Card style={{ alignItems: 'center', paddingVertical: 32 }}>
        <Text variant="label" style={{ letterSpacing: 3 }}>Productivity Score</Text>
        <View style={{ marginTop: 20, width: 140, height: 140 }}>
          <Svg width={140} height={140} viewBox="0 0 140 140" style={{ transform: [{ rotate: '-90deg' }] }}>
            <Defs>
              <LinearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.gradientStart} />
                <Stop offset="1" stopColor={colors.gradientEnd} />
              </LinearGradient>
            </Defs>
            <Circle cx="70" cy="70" r="58" fill="none" stroke={colors.secondary} strokeWidth={10} />
            <Circle
              cx="70"
              cy="70"
              r="58"
              fill="none"
              stroke="url(#scoreGrad)"
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - score / 100)}
            />
          </Svg>
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <Text variant="display" size={36}>{stats ? score : DASH}</Text>
          </View>
        </View>
        {stats?.scoreLabel ? (
          <Text variant="label" color={colors.success} style={{ marginTop: 16, letterSpacing: 2.5, color: colors.success }}>
            {stats.scoreLabel}
          </Text>
        ) : null}
        <Text size={12} color={colors.mutedForeground} center style={{ marginTop: 4, maxWidth: 260 }}>
          Based on your recent sessions and completion frequency.
        </Text>
      </Card>

      {/* Focus insights */}
      <Card>
        <SectionTitle title="Focus Insights" />
        <View style={[styles.grid3, { marginTop: 16 }]}>
          {[
            { label: 'Avg Focus', value: stats ? String(stats.avgFocusMinutes) : DASH, unit: 'min / session', Icon: Activity },
            { label: 'Completion', value: stats ? `${stats.completionRate}%` : DASH, unit: 'of sessions', Icon: TrendingUp },
            { label: 'Best Slot', value: stats?.bestSlot ?? DASH, unit: 'peak flow', Icon: Flame },
          ].map(({ label, value, unit, Icon }) => (
            <View key={label} style={styles.insight}>
              <Icon size={16} color={colors.primary} />
              <Text variant="label" size={9} style={{ marginTop: 8, letterSpacing: 1.2 }} numberOfLines={1}>{label}</Text>
              <Text variant="display" size={18} style={{ marginTop: 4 }} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
              <Text size={10} color={colors.mutedForeground} numberOfLines={1}>{unit}</Text>
            </View>
          ))}
        </View>
        {stats?.insight ? (
          <Gradient borderRadius={radius['2xl']} style={styles.tip}>
            <TrendingUp size={20} color={colors.primaryForeground} />
            <Text size={14} weight="semibold" color={colors.primaryForeground} style={{ flex: 1 }}>
              {stats.insight}
            </Text>
          </Gradient>
        ) : null}
      </Card>

      {/* Session heatmap */}
      <Card>
        <SectionTitle
          title="Session Heatmap"
          action={
            <View style={styles.legend}>
              <Text variant="label" size={9} style={{ letterSpacing: 1 }}>Less</Text>
              {[0.15, 0.35, 0.6, 0.85].map((o) => (
                <View key={o} style={[styles.legendDot, { opacity: o }]} />
              ))}
              <Text variant="label" size={9} style={{ letterSpacing: 1 }}>More</Text>
            </View>
          }
        />
        <View style={[styles.bars, { marginTop: 20 }]}>
          {heat.map((h, i) => {
            const top = maxHeat > 0 && h.value === maxHeat;
            const height = `${Math.max(h.value * 100, 8)}%` as const;
            return (
              <View key={i} style={styles.barCol}>
                <View style={[styles.barTrack, { height: 96 }]}>
                  {top ? (
                    <Gradient borderRadius={8} style={[{ width: '100%', height }, glow]} />
                  ) : (
                    <View style={{ width: '100%', height, borderRadius: 8, backgroundColor: colors.primary, opacity: 0.25 + h.value * 0.6 }} />
                  )}
                </View>
                <Text variant="label" size={9} style={{ letterSpacing: 0.8 }}>{h.day}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* Level */}
      <Card style={styles.levelRow}>
        <View style={styles.levelIcon}>
          <Award size={24} color={colors.primary} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text variant="display" size={16}>{stats ? `Level ${stats.level} Focus` : 'Focus Level'}</Text>
          <Text size={12} color={colors.mutedForeground} numberOfLines={1} style={{ marginTop: 2 }}>
            {stats ? `${stats.xp.toLocaleString()} / ${stats.xpTarget.toLocaleString()} XP to Level ${stats.level + 1}` : DASH}
          </Text>
          <View style={{ marginTop: 10 }}>
            <ProgressBar value={stats ? stats.xp / stats.xpTarget : 0} />
          </View>
        </View>
      </Card>

      {/* Rhythm */}
      <Card>
        <SectionTitle title="Rhythm Visualization" subtitle="Daily focus distribution, past 7 days" />
        <View style={[styles.bars, { marginTop: 20 }]}>
          {rhythm.map((r, i) => (
            <View key={i} style={styles.barCol}>
              <View style={[styles.barTrack, { height: 64 }]}>
                <View
                  style={{
                    width: '100%',
                    height: `${Math.max(r.value * 100, 10)}%`,
                    borderRadius: 999,
                    backgroundColor: colors.accent,
                    opacity: 0.3 + r.value * 0.7,
                  }}
                />
              </View>
              <Text variant="label" size={9} style={{ letterSpacing: 0.8 }}>{r.day}</Text>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid2: { flexDirection: 'row', gap: 12 },
  grid3: { flexDirection: 'row', gap: 10 },
  center: { alignItems: 'center', justifyContent: 'center' },
  insight: {
    flex: 1,
    alignItems: 'center',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.4),
    padding: 12,
  },
  tip: { marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  barCol: { flex: 1, alignItems: 'center', gap: 8 },
  barTrack: { width: '100%', justifyContent: 'flex-end' },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  levelIcon: {
    width: 56,
    height: 56,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: alpha(colors.primary, 0.3),
    backgroundColor: alpha(colors.primary, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
