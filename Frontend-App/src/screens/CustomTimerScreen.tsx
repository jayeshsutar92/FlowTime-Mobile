import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Bookmark, Coffee, Play, RotateCcw, Settings, Shield, SlidersHorizontal } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ToggleMock } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CustomTimer'>;

export default function CustomTimerScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader
        title="Custom Timer"
        back
        onBack={() => navigation.goBack()}
        rightIcon={Settings}
        onRight={() => navigation.navigate('Preferences')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingHorizontal: sp(20) }]}
      >
        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { fontSize: fs(22) }]}>Build your session</Text>
          <Text style={[styles.subtitle, { fontSize: fs(13) }]}>
            Configure your rhythm for peak cognitive performance.
          </Text>
        </View>

        {/* Work Duration Card */}
        <Card style={styles.sliderCard}>
          <View style={styles.sliderHeaderRow}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>WORK DURATION (MIN)</Text>
            <Text style={[styles.amountText, { fontSize: fs(20) }]}>25</Text>
          </View>
          <View style={styles.trackContainer}>
            <View style={styles.trackBg}>
              <View style={[styles.trackFill, { width: '22%' }]} />
            </View>
            <View style={[styles.thumb, { left: '22%' }]} />
          </View>
          <View style={styles.sliderFooterRow}>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>1 MIN</Text>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>120 MIN</Text>
          </View>
        </Card>

        {/* Break Duration Card */}
        <Card style={styles.sliderCard}>
          <View style={styles.sliderHeaderRow}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>BREAK DURATION (MIN)</Text>
            <Text style={[styles.amountText, { fontSize: fs(20) }]}>5</Text>
          </View>
          <View style={styles.trackContainer}>
            <View style={styles.trackBg}>
              <View style={[styles.trackFill, { width: '16%' }]} />
            </View>
            <View style={[styles.thumb, { left: '16%' }]} />
          </View>
          <View style={styles.sliderFooterRow}>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>1 MIN</Text>
            <Text style={[styles.minMaxText, { fontSize: fs(10) }]}>30 MIN</Text>
          </View>
        </Card>

        {/* Metrics Row (Sessions & Long Break) */}
        <View style={styles.metricsRow}>
          <Card style={styles.metricCard}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>SESSIONS</Text>
            <View style={styles.metricBottomRow}>
              <Text style={[styles.metricValue, { fontSize: fs(24) }]}>4</Text>
              <SlidersHorizontal size={fs(18)} color={colors.dim} />
            </View>
          </Card>

          <Card style={styles.metricCard}>
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>LONG BREAK</Text>
            <View style={styles.metricBottomRow}>
              <Text style={[styles.metricValue, { fontSize: fs(24) }]}>15</Text>
              <Coffee size={fs(18)} color={colors.dim} />
            </View>
          </Card>
        </View>

        {/* Deep Work Mode Toggle */}
        <Card style={styles.modeCard}>
          <View style={styles.modeLeft}>
            <Shield size={fs(18)} color={colors.accent} />
            <Text style={[styles.monoLabel, { fontSize: fs(11) }]}>DEEP WORK MODE</Text>
          </View>
          <ToggleMock on />
        </Card>

        {/* Action Buttons */}
        <View style={styles.btnGroup}>
          <PrimaryButton
            title="Start Session"
            icon={Play}
            onPress={() => navigation.navigate('ActiveSession')}
            style={styles.primaryBtn}
          />
          <PrimaryButton
            title="Save as Preset"
            icon={Bookmark}
            variant="secondary"
            style={styles.secondaryBtn}
          />
        </View>

        {/* Last Session summary card */}
        <Card style={styles.lastCard}>
          <Image source={images.lastSession} style={[styles.lastThumb, { width: sp(44), height: sp(44) }]} />
          <View style={styles.lastCopy}>
            <Text style={[styles.lastTitle, { fontSize: fs(14) }]}>Last Session</Text>
            <Text style={[styles.lastMeta, { fontSize: fs(12) }]}>25:00 • Focused Deep Work</Text>
          </View>
          <Pressable hitSlop={8} style={styles.lastResetBtn}>
            <RotateCcw size={fs(16)} color={colors.text} />
          </Pressable>
          <Pressable
            style={[styles.lastPlayBtn, { width: sp(36), height: sp(36), borderRadius: sp(18) }]}
            onPress={() => navigation.navigate('ActiveSession')}
          >
            <Play size={fs(14)} color={colors.accentDark} fill={colors.accentDark} style={{ marginLeft: 2 }} />
          </Pressable>
        </Card>
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
    paddingTop: 12,
    paddingBottom: 24,
  },

  // Title Block
  titleBlock: {
    gap: 4,
    marginBottom: 2,
  },
  title: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
  },

  // Slider Cards
  sliderCard: {
    padding: 16,
    gap: 10,
  },
  sliderHeaderRow: {
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
  amountText: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  trackContainer: {
    height: 20,
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
  sliderFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  minMaxText: {
    color: colors.dim,
    fontFamily: font.mono,
    letterSpacing: 1,
  },

  // Metrics Row
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  metricBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  metricValue: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },

  // Deep Work Mode Card
  modeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  modeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // Button Group
  btnGroup: {
    gap: 10,
    marginTop: 4,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },

  // Last Session Card
  lastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    marginTop: 4,
  },
  lastThumb: {
    borderRadius: 8,
  },
  lastCopy: {
    flex: 1,
    gap: 2,
  },
  lastTitle: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  lastMeta: {
    color: colors.muted,
  },
  lastResetBtn: {
    padding: 6,
  },
  lastPlayBtn: {
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
