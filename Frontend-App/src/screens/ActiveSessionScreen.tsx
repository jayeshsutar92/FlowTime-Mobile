import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ActiveSession'>;

export default function ActiveSessionScreen({ navigation }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const { width } = useWindowDimensions();

  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);

  // Responsive ring diameter based on screen width (70% width, min 220, max 280)
  const ringSize = Math.min(280, Math.max(220, Math.round(width * 0.7)));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        {/* Header Kicker */}
        <View style={styles.header}>
          <Text style={[styles.kicker, { fontSize: fs(12) }]}>STAY FOCUSED</Text>
          <View style={styles.tinyLine} />
        </View>

        {/* Centered Timer Ring */}
        <View style={styles.timerCenter}>
          <View
            style={[
              styles.ring,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: ringSize / 2,
              },
            ]}
          >
            {/* Top gap accent */}
            <View style={styles.gap} />

            <Text style={[styles.timeText, { fontSize: fs(46) }]}>24:43</Text>
            <Text style={[styles.sessionText, { fontSize: fs(13) }]}>Session 1 of 4</Text>
          </View>
        </View>

        {/* One-handed Bottom Controls */}
        <View style={styles.controlsRow}>
          <Pressable
            style={({ pressed }) => [styles.sideBtn, pressed && styles.pressed]}
            onPress={() => navigation.goBack()}
            hitSlop={8}
          >
            <RotateCcw size={22} color={colors.text} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.playBtn, pressed && styles.pressed]}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={28} color={colors.accentDark} fill={colors.accentDark} />
            ) : (
              <Play size={28} color={colors.accentDark} fill={colors.accentDark} style={{ marginLeft: 3 }} />
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.sideBtn, pressed && styles.pressed]}
            hitSlop={8}
          >
            <SkipForward size={22} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bgDeep,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  kicker: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  tinyLine: {
    width: 36,
    height: 2,
    backgroundColor: colors.borderStrong,
    borderRadius: 1,
  },
  timerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    borderWidth: 5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(169, 195, 255, 0.03)',
  },
  gap: {
    position: 'absolute',
    top: -5,
    width: 24,
    height: 8,
    backgroundColor: colors.bgDeep,
  },
  timeText: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
    letterSpacing: -1,
  },
  sessionText: {
    color: colors.muted,
    fontFamily: font.mono,
    letterSpacing: 1.5,
    marginTop: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginBottom: 16,
    width: '100%',
  },
  sideBtn: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 14,
  },
  pressed: {
    opacity: 0.82,
  },
});
