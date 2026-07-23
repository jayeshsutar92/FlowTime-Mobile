import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Bookmark, Coffee, Play, RotateCcw, Settings, Shield, SlidersHorizontal } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { MonoLabel, SliderMock, ToggleMock } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CustomTimer'>;

export default function CustomTimerScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader title="Custom Timer" back onBack={() => navigation.goBack()} rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />
      <View style={styles.content}>
        <Text style={styles.title}>Build your session</Text>
        <Text style={styles.subtitle}>Configure your rhythm for peak cognitive performance.</Text>
        <Card style={styles.sliderCard}><View style={styles.row}><MonoLabel>WORK DURATION (MIN)</MonoLabel><Text style={styles.amount}>25</Text></View><SliderMock value={0.22} /></Card>
        <Card style={styles.sliderCard}><View style={styles.row}><MonoLabel>BREAK DURATION (MIN)</MonoLabel><Text style={styles.amount}>5</Text></View><SliderMock value={0.16} labels={['1 MIN','30 MIN']} /></Card>
        <View style={styles.metrics}><Card style={styles.metric}><MonoLabel>SESSIONS</MonoLabel><Text style={styles.metricValue}>4</Text><SlidersHorizontal size={38} color={colors.faint} style={styles.metricIcon} /></Card><Card style={styles.metric}><MonoLabel>LONG BREAK</MonoLabel><Text style={styles.metricValue}>15</Text><Coffee size={38} color={colors.faint} style={styles.metricIcon} /></Card></View>
        <Card style={styles.mode}><Shield size={42} color={colors.accent} /><MonoLabel>DEEP WORK MODE</MonoLabel><View style={{ flex: 1 }} /><ToggleMock on /></Card>
        <PrimaryButton title="Start Session" icon={Play} onPress={() => navigation.navigate('ActiveSession')} style={styles.primary} />
        <PrimaryButton title="Save as Preset" icon={Bookmark} variant="secondary" />
        <Card style={styles.last}><Image source={images.lastSession} style={styles.thumb} /><View style={{ flex: 1 }}><Text style={styles.lastTitle}>Last Session</Text><Text style={styles.lastMeta}>25:00 • Focused Deep Work</Text></View><RotateCcw size={36} color={colors.text} /><View style={styles.lastPlay}><Play size={34} color={colors.accentDark} fill={colors.accentDark} /></View></Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 26 },
  title: { color: colors.text, fontSize: 44, fontFamily: font.sansBold, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 26, lineHeight: 39, marginBottom: 44 },
  sliderCard: { padding: 48 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amount: { color: colors.accent, fontSize: 32, fontFamily: font.sansBold, fontWeight: '900' },
  metrics: { flexDirection: 'row', gap: 32 },
  metric: { flex: 1, minHeight: 190, padding: 48, justifyContent: 'center' },
  metricValue: { color: colors.accent, fontSize: 54, fontFamily: font.sansBold, fontWeight: '900', marginTop: 28 },
  metricIcon: { position: 'absolute', right: 42, bottom: 52 },
  mode: { minHeight: 108, paddingHorizontal: 40, flexDirection: 'row', alignItems: 'center', gap: 24 },
  primary: { marginTop: 78 },
  last: { minHeight: 118, padding: 28, flexDirection: 'row', alignItems: 'center', gap: 22 },
  thumb: { width: 78, height: 78, borderRadius: 8 },
  lastTitle: { color: colors.accent, fontSize: 23, fontFamily: font.sansBold, fontWeight: '900' },
  lastMeta: { color: colors.muted, fontSize: 20, marginTop: 4 },
  lastPlay: { width: 82, height: 82, borderRadius: 41, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
});
