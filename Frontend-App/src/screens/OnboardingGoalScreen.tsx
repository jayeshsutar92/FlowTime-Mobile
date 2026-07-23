import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowRight } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { FlowMark } from '../components/FlowMark';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { goals } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingGoal'>;

export default function OnboardingGoalScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const scale = width / 375;
  const styles = createStyles(scale);
  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.brand}><FlowMark size={40} /><Text style={styles.brandText}>FlowTime</Text></View>
      <View style={styles.progress}><View style={styles.progressFill} /></View>
      <View style={styles.meta}><Text style={styles.mono}>STEP 1 OF 4 </Text><Text style={styles.mono}>GOAL SELECTION</Text></View>
      <Text style={styles.title}>What is your primary goal?</Text>
      <Text style={styles.subtitle}>We'll tailor your flow rhythms and atmosphere based on how you intend to use FlowTime.</Text>
      {goals.map(goal => <Card key={goal.title} style={styles.goal}><View style={styles.icon}><goal.icon size={34} color={colors.accent} /></View><Text style={styles.goalTitle}>{goal.title}</Text><Text style={styles.goalBody}>{goal.body}</Text></Card>)}
      <View style={styles.footer}><Text style={styles.skip}>SKIP</Text><PrimaryButton title="NEXT STEP" icon={ArrowRight} onPress={() => navigation.navigate('OnboardingRhythm')} style={styles.next} /></View>
    </Screen>
  );
}

const createStyles = (scale: number) => StyleSheet.create({
  content: { padding: Math.round(24 * scale), paddingBottom: Math.round(80 * scale) },
  brand: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: Math.round(14 * scale), marginTop: Math.round(20 * scale), marginBottom: Math.round(44 * scale) },
  brandText: { color: colors.accent, fontSize: Math.round(38 * scale), fontFamily: font.sansBold, fontWeight: '900' },
  progress: { height: Math.round(7 * scale), borderRadius: Math.round(7 * scale), backgroundColor: colors.surface, overflow: 'hidden', marginBottom: Math.round(30 * scale) },
  progressFill: { height: Math.round(7 * scale), width: '25%', backgroundColor: colors.accent },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Math.round(54 * scale) },
  mono: { color: colors.accent, fontFamily: font.mono, fontSize: Math.round(18 * scale), letterSpacing: Math.round(3 * scale) },
  title: { color: colors.text, fontSize: Math.round(38 * scale), lineHeight: Math.round(48 * scale), textAlign: 'center', fontFamily: font.sansBold, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: Math.round(23 * scale), lineHeight: Math.round(34 * scale), textAlign: 'center', marginTop: Math.round(28 * scale), marginBottom: Math.round(48 * scale) },
  goal: { minHeight: Math.round(228 * scale), padding: Math.round(42 * scale), marginBottom: Math.round(28 * scale), justifyContent: 'center', width: '100%', maxWidth: 340, alignSelf: 'center' },
  icon: { width: Math.round(88 * scale), height: Math.round(88 * scale), borderRadius: Math.round(12 * scale), backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center', marginBottom: Math.round(38 * scale) },
  goalTitle: { color: colors.text, fontSize: Math.round(29 * scale), fontFamily: font.sansBold, fontWeight: '900', marginBottom: Math.round(18 * scale) },
  goalBody: { color: colors.muted, fontSize: Math.round(20 * scale), lineHeight: Math.round(29 * scale) },
  footer: { flexDirection: 'row', alignItems: 'center', gap: Math.round(32 * scale), marginTop: Math.round(28 * scale) },
  skip: { flex: 1, textAlign: 'center', color: colors.muted, fontFamily: font.mono, fontSize: Math.round(22 * scale), letterSpacing: Math.round(4 * scale) },
  next: { flex: 1.8, backgroundColor: '#6c7fa6' },
});
