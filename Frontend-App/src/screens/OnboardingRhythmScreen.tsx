import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowRight, Minus, Plus, Settings } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { MonoLabel, SliderMock } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { rhythmTips } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingRhythm'>;

export default function OnboardingRhythmScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader rightIcon={Settings} />
      <View style={styles.content}>
        <View style={styles.dots}><View /><View /><View style={styles.dotActive} /></View>
        <Text style={styles.title}>Set your first rhythm</Text>
        <Text style={styles.subtitle}>Flow rhythms help your brain alternate between periods of intense focus and restorative recovery.</Text>
        <Card style={styles.builder}>
          <View style={styles.row}><MonoLabel>WORK DURATION</MonoLabel><Text style={styles.value}>25<Text style={styles.unit}> MIN</Text></Text></View>
          <SliderMock value={0.2} labels={['10m', '90m']} />
          <View style={styles.row}><MonoLabel>BREAK DURATION</MonoLabel><Text style={styles.valueSmall}>5<Text style={styles.unit}> MIN</Text></Text></View>
          <SliderMock value={0.13} labels={['2m', '30m']} />
          <View style={styles.cycles}><MonoLabel>DAILY CYCLES</MonoLabel><View style={styles.step}><Minus size={24} color={colors.text} /></View><Text style={styles.cycleValue}>4</Text><View style={styles.step}><Plus size={24} color={colors.text} /></View></View>
          <Text style={styles.total}>Total focused time: 100m today</Text>
        </Card>
        {rhythmTips.map(tip => <Card key={tip.title} style={styles.tip}><tip.icon size={40} color={colors.accent} /><Text style={styles.tipTitle}>{tip.title}</Text><Text style={styles.tipBody}>{tip.body}</Text></Card>)}
        <PrimaryButton title="Complete Setup" icon={ArrowRight} onPress={() => navigation.replace('MainTabs')} />
        <Text style={styles.note}>You can adjust these settings anytime in Dashboard</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 26 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 60 },
  dotActive: { backgroundColor: colors.accent, shadowColor: colors.accent, shadowOpacity: 0.8, shadowRadius: 10 },
  title: { color: colors.text, fontSize: 42, fontFamily: font.sansBold, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: colors.muted, textAlign: 'center', fontSize: 25, lineHeight: 38 },
  builder: { padding: 48, gap: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  value: { color: colors.text, fontSize: 58, fontFamily: font.sansBold, fontWeight: '900' },
  valueSmall: { color: colors.text, fontSize: 58, fontFamily: font.sansBold, fontWeight: '900' },
  unit: { fontSize: 26, fontWeight: '500' },
  cycles: { flexDirection: 'row', alignItems: 'center', gap: 28, marginTop: 14 },
  step: { width: 80, height: 80, borderRadius: 12, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  cycleValue: { color: colors.text, fontSize: 42, fontFamily: font.sansBold, fontWeight: '900' },
  total: { color: colors.text, fontStyle: 'italic', fontSize: 19, letterSpacing: 1 },
  tip: { padding: 34, gap: 24 },
  tipTitle: { color: colors.text, fontSize: 29, fontFamily: font.sansBold, fontWeight: '900' },
  tipBody: { color: colors.muted, fontSize: 21, lineHeight: 32 },
  note: { color: colors.muted, textAlign: 'center', fontSize: 20, marginBottom: 24 },
});
