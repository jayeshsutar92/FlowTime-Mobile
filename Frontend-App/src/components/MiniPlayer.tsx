import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Music, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { radius } from '../theme/spacing';

export function MiniPlayer({ compact = false, onPress, style }: { compact?: boolean; onPress?: () => void; style?: ViewStyle }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, compact && styles.compact, pressed && styles.pressed, style]}>
      <View style={styles.art}><Music size={28} color={colors.accent} fill={colors.accent} /></View>
      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={1}>No track playing</Text>
        <Text style={styles.meta} numberOfLines={1}>{compact ? 'AMBIENCE' : 'Select a soundscape'}</Text>
      </View>
      {compact ? null : <SkipBack size={28} color={colors.text} />}
      <View style={styles.play}><Play size={30} color={colors.accent} fill={colors.accent} /></View>
      {compact ? null : <SkipForward size={28} color={colors.text} />}
    </Pressable>
  );
}

export function FocusPlayer({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.focusWrap}>
      <View style={styles.artMuted}><Volume2 size={28} color={colors.muted} /></View>
      <View style={styles.copy}>
        <Text style={styles.focusMeta}>CURRENT SESSION</Text>
        <Text style={styles.title}>No track playing</Text>
      </View>
      <View style={styles.focusPlay}><Play size={30} color={colors.accent} /></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { minHeight: 112, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surfaceAlt, flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 24 },
  compact: { minHeight: 88, borderColor: colors.border, backgroundColor: colors.surface },
  focusWrap: { minHeight: 100, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 24 },
  art: { width: 70, height: 70, borderRadius: 12, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
  artMuted: { width: 58, height: 58, borderRadius: 8, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  title: { color: colors.text, fontSize: 23, fontFamily: font.sansBold, fontWeight: '800' },
  meta: { marginTop: 8, color: colors.muted, fontSize: 16, fontFamily: font.mono, letterSpacing: 2 },
  focusMeta: { color: colors.muted, fontSize: 15, fontFamily: font.mono, letterSpacing: 2 },
  play: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: colors.accent },
  focusPlay: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.86 },
});
