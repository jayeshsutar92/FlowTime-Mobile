import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowRight, Minus, Plus, Settings } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { rhythmTips } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingRhythm'>;

export default function OnboardingRhythmScreen({ navigation }: Props) {
  const [cycles, setCycles] = useState(4);
  const { width } = useWindowDimensions();

  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader rightIcon={Settings} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingHorizontal: sp(20) }]}
      >
        {/* Step Progress Indicators */}
        <View style={styles.progressRow}>
          <View style={styles.stepDot} />
          <View style={styles.stepDot} />
          <View style={[styles.stepDot, styles.stepActive]} />
          <View style={styles.stepDot} />
        </View>

        {/* Title & Subtitle */}
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { fontSize: fs(22) }]}>Set your first rhythm</Text>
          <Text style={[styles.subtitle, { fontSize: fs(13) }]}>
            Flow rhythms help your brain alternate between periods of intense focus and restorative recovery.
          </Text>
        </View>

        {/* Rhythm Builder Card */}
        <Card style={styles.builderCard}>
          {/* Work Duration Row */}
          <View style={styles.durationHeader}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>WORK DURATION</Text>
            <Text style={[styles.valueText, { fontSize: fs(20) }]}>
              25 <Text style={[styles.unitText, { fontSize: fs(12) }]}>MIN</Text>
            </Text>
          </View>
          <View style={styles.trackContainer}>
            <View style={styles.trackBg}>
              <View style={[styles.trackFill, { width: '22%' }]} />
            </View>
            <View style={[styles.thumb, { left: '22%' }]} />
          </View>
          <View style={styles.minMaxRow}>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>10m</Text>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>90m</Text>
          </View>

          {/* Break Duration Row */}
          <View style={[styles.durationHeader, { marginTop: 8 }]}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>BREAK DURATION</Text>
            <Text style={[styles.valueText, { fontSize: fs(20) }]}>
              5 <Text style={[styles.unitText, { fontSize: fs(12) }]}>MIN</Text>
            </Text>
          </View>
          <View style={styles.trackContainer}>
            <View style={styles.trackBg}>
              <View style={[styles.trackFill, { width: '13%' }]} />
            </View>
            <View style={[styles.thumb, { left: '13%' }]} />
          </View>
          <View style={styles.minMaxRow}>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>2m</Text>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>30m</Text>
          </View>

          {/* Daily Cycles Stepper */}
          <View style={styles.cyclesRow}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>DAILY CYCLES</Text>
            <View style={styles.stepperWrap}>
              <Pressable
                onPress={() => setCycles(Math.max(1, cycles - 1))}
                style={({ pressed }) => [styles.stepBtn, pressed && styles.pressed]}
                hitSlop={6}
              >
                <Minus size={fs(16)} color={colors.text} />
              </Pressable>

              <Text style={[styles.cycleNumber, { fontSize: fs(18) }]}>{cycles}</Text>

              <Pressable
                onPress={() => setCycles(cycles + 1)}
                style={({ pressed }) => [styles.stepBtn, pressed && styles.pressed]}
                hitSlop={6}
              >
                <Plus size={fs(16)} color={colors.text} />
              </Pressable>
            </View>
          </View>

          {/* Total Focus Summary */}
          <Text style={[styles.totalSummary, { fontSize: fs(12) }]}>
            Total focused time: {cycles * 25}m today
          </Text>
        </Card>

        {/* Feature / Tip Cards */}
        {rhythmTips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <Card key={tip.title} style={styles.tipCard}>
              <View style={[styles.tipIconWrap, { width: sp(36), height: sp(36), borderRadius: sp(10) }]}>
                <IconComponent size={fs(18)} color={colors.accent} />
              </View>
              <View style={styles.tipCopy}>
                <Text style={[styles.tipTitle, { fontSize: fs(14) }]}>{tip.title}</Text>
                <Text style={[styles.tipBody, { fontSize: fs(12) }]}>{tip.body}</Text>
              </View>
            </Card>
          );
        })}

        {/* CTA & Note */}
        <View style={styles.bottomBlock}>
          <PrimaryButton
            title="Complete Setup"
            icon={ArrowRight}
            onPress={() => navigation.replace('MainTabs')}
            style={styles.ctaBtn}
          />
          <Text style={[styles.noteText, { fontSize: fs(11) }]}>
            You can adjust these settings anytime in Dashboard
          </Text>
        </View>
      </ScrollView>
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
    paddingTop: 8,
    paddingBottom: 24,
  },

  // Step Progress Dots
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  stepDot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceSoft,
  },
  stepActive: {
    backgroundColor: colors.accent,
  },

  // Title Block
  titleBlock: {
    gap: 4,
    alignItems: 'center',
  },
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

  // Rhythm Builder Card
  builderCard: {
    padding: 16,
    gap: 8,
  },
  durationHeader: {
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
  valueText: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  unitText: {
    color: colors.muted,
    fontFamily: font.mono,
  },
  trackContainer: {
    height: 18,
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 2,
  },
  trackBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceSoft,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: colors.accentStrong,
  },
  thumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent,
    marginLeft: -9,
    elevation: 4,
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  minMaxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minMaxText: {
    color: colors.dim,
    fontFamily: font.mono,
  },

  // Daily Cycles Stepper
  cyclesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stepperWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cycleNumber: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
    minWidth: 20,
    textAlign: 'center',
  },
  totalSummary: {
    color: colors.muted,
    fontStyle: 'italic',
    marginTop: 4,
  },

  // Feature / Tip Cards
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  tipIconWrap: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipCopy: {
    flex: 1,
    gap: 2,
  },
  tipTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },
  tipBody: {
    color: colors.muted,
  },

  // Bottom CTA Block
  bottomBlock: {
    gap: 8,
    marginTop: 4,
  },
  ctaBtn: {
    width: '100%',
  },
  noteText: {
    color: colors.dim,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.82,
  },
});
