import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Settings, Sparkles, TrendingUp } from 'lucide-react-native';
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
  return (
    <Screen>
      <BrandHeader title="Daily Insights" back onBack={() => navigation.goBack()} rightIcon={Settings} />
      <View style={styles.content}>
        <View style={styles.segment}>{['Day','Week','Month','Year'].map((x, i) => <View key={x} style={[styles.segItem, i === 0 && styles.segActive]}><Text style={[styles.segText, i === 0 && styles.segActiveText]}>{x}</Text></View>)}</View>
        <Card style={styles.total}><View style={styles.totalHead}><MonoLabel>TOTAL FOCUS TIME</MonoLabel><View style={styles.badge}><TrendingUp size={22} color={colors.accent} /><Text style={styles.badgeText}>+12%</Text></View></View><Text style={styles.massive}>5h 42m</Text><View style={styles.progress}><View style={styles.progressFill} /></View></Card>
        <Text style={styles.section}>Focus Intensity</Text>
        <Card style={styles.chart}><Bars /><View style={styles.axis}>{['00:00','08:00','16:00','23:59'].map(t => <Text key={t} style={styles.axisText}>{t}</Text>)}</View></Card>
        <Text style={styles.section}>Distribution</Text>
        <Card style={styles.dist}><Donut /><View style={styles.legend}>{[['Deep Work','60%'],['Creative Flow','25%'],['Admin Tasks','15%']].map((r, i) => <View key={r[0]} style={styles.legendRow}><View style={[styles.dot, i === 2 && styles.dotDim]} /><Text style={styles.legendText}>{r[0]}</Text><Text style={styles.legendPct}>{r[1]}</Text></View>)}</View></Card>
        <Card style={styles.tip}><View style={styles.spark}><Sparkles size={34} color={colors.accent} /></View><View style={{ flex: 1 }}><MonoLabel>PRO TIP</MonoLabel><Text style={styles.tipText}>Your peak focus window today was between <Text style={styles.bold}>9:00 AM and 11:30 AM.</Text> Schedule your most complex tasks then for maximum efficiency.</Text></View></Card>
        <Text style={styles.section}>Timeline</Text>
        {timeline.map((item, index) => <View key={item.title} style={styles.timeline}><View style={[styles.timelineDot, !item.active && styles.timelineOff]} />{index < 2 && <View style={styles.line} />}<View style={{ flex: 1 }}><Text style={styles.event}>{item.title}</Text><Text style={styles.eventMeta}>{item.meta}</Text></View><View><Text style={styles.time}>{item.time}</Text><Text style={styles.duration}>{item.duration}</Text></View></View>)}
        <MiniPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 24 },
  segment: { height: 80, borderRadius: 40, backgroundColor: colors.surface, flexDirection: 'row', padding: 8 },
  segItem: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 34 },
  segActive: { backgroundColor: colors.accentStrong },
  segText: { color: colors.muted, fontFamily: font.mono, fontSize: 20, letterSpacing: 2 },
  segActiveText: { color: colors.accentDark },
  total: { padding: 50, minHeight: 315 },
  totalHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.surfaceSoft, borderRadius: 28, paddingHorizontal: 24, paddingVertical: 14 },
  badgeText: { color: colors.accent, fontSize: 20, fontWeight: '800' },
  massive: { color: colors.accent, fontSize: 72, fontFamily: font.sansBold, fontWeight: '900', marginTop: 36 },
  progress: { height: 8, borderRadius: 8, backgroundColor: colors.surfaceSoft, marginTop: 56, overflow: 'hidden' },
  progressFill: { width: '72%', height: 8, backgroundColor: colors.accent },
  section: { color: colors.text, fontSize: 31, fontFamily: font.sansBold, fontWeight: '900', marginTop: 22 },
  chart: { padding: 34 },
  axis: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0, marginTop: 14 },
  axisText: { color: colors.muted, fontFamily: font.mono, fontSize: 18 },
  dist: { padding: 42, flexDirection: 'row', alignItems: 'center', gap: 42 },
  legend: { flex: 1, gap: 26 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  dot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.accent },
  dotDim: { backgroundColor: colors.surfaceSoft },
  legendText: { flex: 1, color: colors.text, fontSize: 24 },
  legendPct: { color: colors.text, fontSize: 27, fontFamily: font.mono },
  tip: { padding: 32, flexDirection: 'row', gap: 32, borderColor: colors.borderStrong },
  spark: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#1b3157', alignItems: 'center', justifyContent: 'center' },
  tipText: { color: colors.text, fontSize: 23, lineHeight: 36, marginTop: 22 },
  bold: { color: colors.accent, fontWeight: '900' },
  timeline: { flexDirection: 'row', gap: 28, minHeight: 92 },
  timelineDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.accent, marginTop: 8 },
  timelineOff: { backgroundColor: colors.surfaceSoft },
  line: { position: 'absolute', left: 11, top: 34, bottom: -10, width: 2, backgroundColor: colors.border },
  event: { color: colors.text, fontSize: 26, fontFamily: font.sansBold, fontWeight: '900' },
  eventMeta: { color: colors.muted, fontSize: 20, marginTop: 8 },
  time: { color: colors.text, fontFamily: font.mono, fontSize: 28 },
  duration: { color: colors.accent, fontSize: 19, textAlign: 'right', marginTop: 8 },
});
