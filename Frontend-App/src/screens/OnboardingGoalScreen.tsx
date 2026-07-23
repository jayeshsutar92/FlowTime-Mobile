import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={[styles.container, { paddingHorizontal: sp(20) }]}>

        {/* Brand + Progress header */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <FlowMark size={sp(28)} />
            <Text style={[styles.brandText, { fontSize: fs(20) }]}>FlowTime</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.metaRow}>
            <Text style={[styles.mono, { fontSize: fs(10) }]}>STEP 1 OF 4</Text>
            <Text style={[styles.mono, { fontSize: fs(10) }]}>GOAL SELECTION</Text>
          </View>
        </View>

        {/* Title + Subtitle */}
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { fontSize: fs(22) }]}>
            What is your primary goal?
          </Text>
          <Text style={[styles.subtitle, { fontSize: fs(13), lineHeight: fs(19) }]}>
            We'll tailor your flow rhythms and atmosphere based on how you intend to use FlowTime.
          </Text>
        </View>

        {/* Goal cards — flex to fill available space */}
        <View style={styles.goalList}>
          {goals.map(goal => (
            <Card key={goal.title} style={styles.goalCard}>
              <View style={[styles.goalIcon, { width: sp(40), height: sp(40), borderRadius: sp(10) }]}>
                <goal.icon size={sp(20)} color={colors.accent} />
              </View>
              <View style={styles.goalCopy}>
                <Text style={[styles.goalTitle, { fontSize: fs(15) }]} numberOfLines={1}>
                  {goal.title}
                </Text>
                <Text style={[styles.goalBody, { fontSize: fs(12), lineHeight: fs(17) }]} numberOfLines={2}>
                  {goal.body}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Footer: Skip + Next */}
        <View style={styles.footer}>
          <Pressable
            onPress={() => navigation.navigate('OnboardingRhythm')}
            hitSlop={10}
            style={styles.skipBtn}
          >
            <Text style={[styles.skipText, { fontSize: fs(13) }]}>SKIP</Text>
          </Pressable>
          <PrimaryButton
            title="NEXT STEP"
            icon={ArrowRight}
            onPress={() => navigation.navigate('OnboardingRhythm')}
            style={styles.nextBtn}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1, gap: 12 },

  // Header
  header: { gap: 8, paddingTop: 12 },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  brandText: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  progressTrack: {
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  progressFill: { height: 4, width: '25%', backgroundColor: colors.accent },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mono: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 2,
  },

  // Title block
  titleBlock: { gap: 4 },
  title: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    textAlign: 'center',
  },

  // Goal cards
  goalList: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  goalIcon: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalCopy: { flex: 1, gap: 2 },
  goalTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  goalBody: {
    color: colors.muted,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 8,
  },
  skipBtn: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    color: colors.muted,
    fontFamily: font.mono,
    letterSpacing: 3,
  },
  nextBtn: { flex: 1.5 },
});
