import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Settings, SlidersHorizontal, TimerReset } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { MiniPlayer } from '../components/MiniPlayer';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function TimerHomeScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />

      <View style={[styles.content, { paddingHorizontal: Math.round(20 * scale) }]}>

        {/* Section label */}
        <Text style={[styles.label, { fontSize: Math.round(11 * scale) }]}>CHOOSE YOUR TIMER</Text>

        {/* Default Timer card */}
        <Pressable
          onPress={() => navigation.navigate('ActiveSession')}
          style={({ pressed }) => [styles.optionPrimary, pressed && styles.pressed]}
        >
          <View style={styles.iconActive}>
            <TimerReset size={36} color={colors.accentDark} />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.optionTitle, { fontSize: Math.round(20 * scale) }]}>Default Timer</Text>
            <Text style={[styles.optionMeta, { fontSize: Math.round(13 * scale) }]}>
              25 min Work {'|'} 5 min Break
            </Text>
          </View>
          <View style={styles.chevronWrap}>
            <ChevronRight size={22} color={colors.accentDark} />
          </View>
        </Pressable>

        {/* Custom Timer card */}
        <Pressable
          onPress={() => navigation.navigate('CustomTimer')}
          style={({ pressed }) => [styles.optionSecondary, pressed && styles.pressed]}
        >
          <View style={styles.iconGhost}>
            <SlidersHorizontal size={36} color={colors.accent} />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.optionTitle, { fontSize: Math.round(20 * scale) }]}>Custom Timer</Text>
            <Text style={[styles.optionMeta, { fontSize: Math.round(13 * scale) }]}>
              CONFIGURE YOUR OWN RHYTHM
            </Text>
          </View>
          <SlidersHorizontal size={22} color={colors.dim} />
        </Pressable>

        {/* Mini music player */}
        <MiniPlayer
          compact
          onPress={() => navigation.navigate('NowPlaying')}
          style={styles.player}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, gap: 14, paddingTop: 12 },
  label: {
    color: colors.faint,
    fontFamily: font.mono,
    letterSpacing: 2.5,
    marginBottom: 2,
  },
  optionPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.accentStrong,
  },
  optionSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  iconActive: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGhost: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1 },
  optionTitle: { color: colors.text, fontFamily: font.sansBold, fontWeight: '900' },
  optionMeta: {
    color: colors.muted,
    fontFamily: font.mono,
    letterSpacing: 1.2,
    marginTop: 4,
    lineHeight: 18,
  },
  chevronWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  player: { marginTop: 4 },
});
