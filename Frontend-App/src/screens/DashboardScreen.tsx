import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowUp, Calendar, Settings, TrendingUp, Zap } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { Heatmap } from '../components/Charts';
import { MiniPlayer } from '../components/MiniPlayer';
import { MonoLabel } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function DashboardScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />
      <View style={styles.content}>
        <Card style={styles.stat}><MonoLabel><TrendingUp size={20} color={colors.accent} /> VELOCITY</MonoLabel><View style={styles.statRow}><Text style={styles.big}>120%</Text><View style={styles.badge}><ArrowUp size={20} color={colors.accent} /><Text style={styles.badgeText}>HIGHER</Text></View></View><Text style={styles.desc}>Higher than yesterday</Text></Card>
        <Card style={styles.stat}><MonoLabel><Zap size={20} color={colors.accent} /> ENERGY</MonoLabel><Text style={styles.big}>Peak</Text><Text style={styles.desc}>Optimal for deep work</Text></Card>
        <Card style={styles.stat}><MonoLabel><Calendar size={20} color={colors.accent} /> STREAK</MonoLabel><Text style={styles.big}>12 Days</Text><Text style={styles.desc}>Keep the momentum</Text></Card>
        <Card style={styles.heat}>
          <MonoLabel>FOCUS HEATMAP</MonoLabel>
          <Heatmap />
        </Card>
        <Card style={styles.hours} onPress={() => navigation.navigate('DailyInsights')}><View style={styles.hoursHead}><MonoLabel>HOURS FOCUSED</MonoLabel><Text style={styles.desc}>Last 7 days</Text></View><View style={styles.axis}>{['M','T','W','T','F','S','S'].map(d => <Text key={d} style={styles.axisLabel}>{d}</Text>)}</View></Card>
        <MiniPlayer compact onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 32 },
  stat: { minHeight: 282, padding: 50, justifyContent: 'center' },
  statRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  big: { color: colors.text, fontSize: 54, fontFamily: font.sansBold, fontWeight: '900', marginTop: 32 },
  desc: { color: colors.muted, fontSize: 23, marginTop: 22 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surfaceSoft, paddingHorizontal: 18, paddingVertical: 9, borderRadius: 22 },
  badgeText: { color: colors.accent, fontFamily: font.sansBold, fontSize: 18 },
  heat: { padding: 50, gap: 36 },
  hours: { minHeight: 430, padding: 50, justifyContent: 'space-between' },
  hoursHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  axis: { flexDirection: 'row', justifyContent: 'space-between' },
  axisLabel: { color: colors.muted, fontSize: 20 },
});
