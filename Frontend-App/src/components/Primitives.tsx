import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';

export function MonoLabel({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <Text style={[styles.label, muted && styles.muted]}>{children}</Text>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.section}>{children}</Text>;
}

export function SliderMock({ value = 0.25, labels = ['1 MIN', '120 MIN'] }: { value?: number; labels?: [string, string] }) {
  return (
    <View style={styles.sliderWrap}>
      <View style={styles.track}><View style={[styles.fill, { flex: value }]} /><View style={{ flex: 1 - value }} /></View>
      <View style={[styles.thumb, { left: `${Math.max(3, Math.min(92, value * 100))}%` }]} />
      <View style={styles.sliderLabels}><Text style={styles.sliderLabel}>{labels[0]}</Text><Text style={styles.sliderLabel}>{labels[1]}</Text></View>
    </View>
  );
}

export function ToggleMock({ on }: { on?: boolean }) {
  return <View style={[styles.toggle, on && styles.toggleOn]}><View style={[styles.knob, on && styles.knobOn]} /></View>;
}

const styles = StyleSheet.create({
  label: { color: colors.accent, fontFamily: font.mono, fontSize: 18, letterSpacing: 4, textTransform: 'uppercase' },
  muted: { color: colors.muted },
  section: { color: colors.text, fontSize: 32, fontFamily: font.sansBold, fontWeight: '800', marginBottom: 18 },
  sliderWrap: { height: 92, justifyContent: 'center' },
  track: { height: 8, borderRadius: 8, backgroundColor: colors.surfaceSoft, flexDirection: 'row', overflow: 'hidden' },
  fill: { backgroundColor: colors.accentStrong, opacity: 0.6 },
  thumb: { position: 'absolute', top: 28, width: 40, height: 40, marginLeft: -20, borderRadius: 20, backgroundColor: colors.accent, shadowColor: colors.accent, shadowOpacity: 0.7, shadowRadius: 16, elevation: 8 },
  sliderLabels: { marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabel: { color: colors.dim, fontFamily: font.mono, fontSize: 17, letterSpacing: 1 },
  toggle: { width: 88, height: 48, borderRadius: 24, backgroundColor: colors.surfaceSoft, padding: 6, alignItems: 'flex-start' },
  toggleOn: { backgroundColor: colors.accentStrong, alignItems: 'flex-end' },
  knob: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.white },
  knobOn: { backgroundColor: colors.white },
});
