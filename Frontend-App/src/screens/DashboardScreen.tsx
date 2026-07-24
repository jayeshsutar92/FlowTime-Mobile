import React from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowUpRight, Calendar, Flame, Lightbulb, Settings, TrendingUp, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { Heatmap } from '../components/Charts';
import { MiniPlayer } from '../components/MiniPlayer';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function DashboardScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));

  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingHorizontal: sp(20) }]}
      >
        {/* Today's Focus Summary Card */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>TOTAL FOCUS TIME</Text>
            <View style={styles.badge}>
              <ArrowUpRight size={fs(14)} color={colors.accent} />
              <Text style={[styles.badgeText, { fontSize: fs(11) }]}>+12%</Text>
            </View>
          </View>

          <Text style={[styles.bigReadout, { fontSize: fs(34) }]}>5h 42m</Text>

          <Text style={[styles.subText, { fontSize: fs(12) }]}>
            Higher than yesterday • Optimal energy peak
          </Text>
        </Card>

        {/* 2-Column Statistic Cards */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <View style={styles.statIconRow}>
              <Flame size={fs(18)} color={colors.accent} />
              <Text style={[styles.monoLabel, { fontSize: fs(10) }]}>STREAK</Text>
            </View>
            <Text style={[styles.statValue, { fontSize: fs(22) }]}>12 Days</Text>
            <Text style={[styles.statDesc, { fontSize: fs(11) }]}>Keep the momentum</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIconRow}>
              <TrendingUp size={fs(18)} color={colors.accent} />
              <Text style={[styles.monoLabel, { fontSize: fs(10) }]}>VELOCITY</Text>
            </View>
            <Text style={[styles.statValue, { fontSize: fs(22) }]}>120%</Text>
            <Text style={[styles.statDesc, { fontSize: fs(11) }]}>Optimal for deep work</Text>
          </Card>
        </View>

        {/* Focus Activity Heatmap */}
        <Card style={styles.heatCard}>
          <View style={styles.heatHeader}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>FOCUS HEATMAP</Text>
            <Text style={[styles.subText, { fontSize: fs(11) }]}>Last 30 days</Text>
          </View>
          <Heatmap />
        </Card>

        {/* Daily Insight Tip Card */}
        <Card style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Lightbulb size={fs(18)} color={colors.accent} />
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>PRO TIP</Text>
          </View>
          <Text style={[styles.insightBody, { fontSize: fs(13), lineHeight: fs(19) }]}>
            Your peak focus window today was between <Text style={styles.boldHighlight}>9:00 AM</Text> and{' '}
            <Text style={styles.boldHighlight}>11:30 AM</Text>. Schedule your most complex tasks then for maximum efficiency.
          </Text>
        </Card>
      </ScrollView>

      {/* Fixed Bottom MiniPlayer */}
      <View style={[styles.playerWrap, { paddingHorizontal: sp(20) }]}>
        <MiniPlayer compact onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    gap: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },

  // Today's Focus Summary Card
  summaryCard: {
    padding: 16,
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monoLabel: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  badgeText: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },
  bigReadout: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  subText: {
    color: colors.muted,
  },

  // 2-Column Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 14,
    gap: 6,
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  statDesc: {
    color: colors.muted,
  },

  // Focus Heatmap Card
  heatCard: {
    padding: 16,
    gap: 12,
  },
  heatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Insight Tip Card
  insightCard: {
    padding: 16,
    gap: 8,
    backgroundColor: colors.surfaceSoft,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightBody: {
    color: colors.text,
  },
  boldHighlight: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },

  // MiniPlayer Wrapper
  playerWrap: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
