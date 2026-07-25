import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Settings, Sparkles, TrendingUp } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { Bars, Donut } from '../components/Charts';
import { MiniPlayer } from '../components/MiniPlayer';
import { MonoLabel } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { timeline } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyInsights'>;

export default function DailyInsightsScreen({ navigation }: Props) {
  const [selectedSeg, setSelectedSeg] = useState(0);
  const { width } = useWindowDimensions();

  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  const segments = ['Day', 'Week', 'Month', 'Year'];

  return (
    <Screen>
      <BrandHeader
        title="Daily Insights"
        back
        onBack={() => navigation.goBack()}
        rightIcon={Settings}
        onRight={() => navigation.navigate('Preferences')}
      />
      <View style={[styles.content, { padding: sp(20) }]}>

        {/* Time Segment Filter Pills */}
        <View style={styles.segment}>
          {segments.map((x, i) => {
            const active = selectedSeg === i;
            return (
              <Pressable
                key={x}
                onPress={() => setSelectedSeg(i)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${x} view`}
                style={({ pressed }) => [
                  styles.segItem,
                  active && styles.segActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.segText, { fontSize: fs(12) }, active && styles.segActiveText]}>
                  {x}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Total Focus Summary Card */}
        <Card style={styles.totalCard}>
          <View style={styles.totalHead}>
            <MonoLabel>TOTAL FOCUS TIME</MonoLabel>
            <View style={styles.badge}>
              <TrendingUp size={fs(14)} color={colors.accent} />
              <Text style={[styles.badgeText, { fontSize: fs(11) }]}>+12%</Text>
            </View>
          </View>
          <Text style={[styles.massiveText, { fontSize: fs(34) }]}>5h 42m</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </Card>

        {/* Focus Intensity Bar Chart */}
        <Text style={[styles.sectionTitle, { fontSize: fs(16) }]}>Focus Intensity</Text>
        <Card style={styles.chartCard}>
          <Bars />
          <View style={styles.axisRow}>
            {['00:00', '08:00', '16:00', '23:59'].map((t) => (
              <Text key={t} style={[styles.axisText, { fontSize: fs(10) }]}>
                {t}
              </Text>
            ))}
          </View>
        </Card>

        {/* Distribution Donut Breakdown */}
        <Text style={[styles.sectionTitle, { fontSize: fs(16) }]}>Distribution</Text>
        <Card style={styles.distCard}>
          <Donut />
          <View style={styles.legendCol}>
            {[
              ['Deep Work', '60%'],
              ['Creative Flow', '25%'],
              ['Admin Tasks', '15%'],
            ].map((r, i) => (
              <View key={r[0]} style={styles.legendRow}>
                <View style={[styles.dot, i === 2 && styles.dotDim]} />
                <Text style={[styles.legendText, { fontSize: fs(13) }]}>{r[0]}</Text>
                <Text style={[styles.legendPct, { fontSize: fs(13) }]}>{r[1]}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Pro Tip Insight */}
        <Card style={styles.tipCard}>
          <View style={[styles.sparkWrap, { width: sp(36), height: sp(36), borderRadius: sp(10) }]}>
            <Sparkles size={fs(18)} color={colors.accent} />
          </View>
          <View style={styles.tipCopy}>
            <MonoLabel>PRO TIP</MonoLabel>
            <Text style={[styles.tipBody, { fontSize: fs(12), lineHeight: fs(18) }]}>
              Your peak focus window today was between{' '}
              <Text style={styles.boldHighlight}>9:00 AM and 11:30 AM.</Text> Schedule your most complex tasks then for maximum efficiency.
            </Text>
          </View>
        </Card>

        {/* Session Timeline */}
        <Text style={[styles.sectionTitle, { fontSize: fs(16) }]}>Timeline</Text>
        <View style={styles.timelineList}>
          {timeline.map((item, index) => (
            <View key={item.title} style={styles.timelineRow}>
              <View style={[styles.timelineDot, !item.active && styles.timelineOff]} />
              {index < timeline.length - 1 && <View style={styles.timelineLine} />}
              <View style={styles.eventCopy}>
                <Text style={[styles.eventTitle, { fontSize: fs(14) }]}>{item.title}</Text>
                <Text style={[styles.eventMeta, { fontSize: fs(11) }]}>{item.meta}</Text>
              </View>
              <View style={styles.timeCol}>
                <Text style={[styles.timeText, { fontSize: fs(13) }]}>{item.time}</Text>
                <Text style={[styles.durationText, { fontSize: fs(11) }]}>{item.duration}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Fixed MiniPlayer */}
        <MiniPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
  },

  // Segmented Pill Filter
  segment: {
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  segActive: {
    backgroundColor: colors.accentStrong,
  },
  segText: {
    color: colors.muted,
    fontFamily: font.mono,
    letterSpacing: 1,
  },
  segActiveText: {
    color: colors.accentDark,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },

  // Total Focus Card
  totalCard: {
    padding: 16,
    gap: 10,
  },
  totalHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  badgeText: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },
  massiveText: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceSoft,
    overflow: 'hidden',
  },
  progressFill: {
    width: '72%',
    height: '100%',
    backgroundColor: colors.accent,
  },

  // Section Headers
  sectionTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
    marginTop: 4,
  },

  // Chart Cards
  chartCard: {
    padding: 16,
  },
  axisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  axisText: {
    color: colors.muted,
    fontFamily: font.mono,
  },

  // Distribution Card
  distCard: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  legendCol: {
    flex: 1,
    gap: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  dotDim: {
    backgroundColor: colors.surfaceSoft,
  },
  legendText: {
    flex: 1,
    color: colors.text,
  },
  legendPct: {
    color: colors.text,
    fontFamily: font.mono,
  },

  // Pro Tip Card
  tipCard: {
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderColor: colors.borderStrong,
  },
  sparkWrap: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipCopy: {
    flex: 1,
    gap: 4,
  },
  tipBody: {
    color: colors.text,
  },
  boldHighlight: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },

  // Timeline
  timelineList: {
    gap: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  timelineOff: {
    backgroundColor: colors.surfaceSoft,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 16,
    bottom: -16,
    width: 2,
    backgroundColor: colors.border,
  },
  eventCopy: {
    flex: 1,
    gap: 2,
  },
  eventTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },
  eventMeta: {
    color: colors.muted,
  },
  timeCol: {
    alignItems: 'flex-end',
  },
  timeText: {
    color: colors.text,
    fontFamily: font.mono,
  },
  durationText: {
    color: colors.accent,
    fontFamily: font.mono,
  },
  pressed: {
    opacity: 0.8,
  },
});
