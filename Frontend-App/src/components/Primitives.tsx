import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';

export function MonoLabel({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);

  return (
    <Text style={[styles.label, { fontSize: fs(11) }, muted && styles.muted]}>
      {children}
    </Text>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);

  return (
    <Text style={[styles.section, { fontSize: fs(18) }]}>
      {children}
    </Text>
  );
}

export function SliderMock({
  value = 0.25,
  labels = ['1 MIN', '120 MIN'],
}: {
  value?: number;
  labels?: [string, string];
}) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);

  const thumbLeft = Math.max(2, Math.min(94, value * 100));

  return (
    <View style={styles.sliderWrap}>
      <View style={styles.track}>
        <View style={[styles.fill, { flex: value }]} />
        <View style={{ flex: 1 - value }} />
      </View>
      <View style={[styles.thumb, { left: `${thumbLeft}%` }]} />
      <View style={styles.sliderLabels}>
        <Text style={[styles.sliderLabel, { fontSize: fs(10) }]}>{labels[0]}</Text>
        <Text style={[styles.sliderLabel, { fontSize: fs(10) }]}>{labels[1]}</Text>
      </View>
    </View>
  );
}

export function ToggleMock({ on }: { on?: boolean }) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const sp = (base: number) => Math.round(base * scale);

  return (
    <View
      accessibilityRole="switch"
      accessibilityState={{ checked: !!on }}
      style={[
        styles.toggle,
        { width: sp(44), height: sp(26), borderRadius: sp(13) },
        on && styles.toggleOn,
      ]}
    >
      <View
        style={[
          styles.knob,
          { width: sp(20), height: sp(20), borderRadius: sp(10) },
          on && styles.knobOn,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  muted: {
    color: colors.muted,
  },
  section: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
    marginBottom: 8,
  },
  sliderWrap: {
    height: 36,
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 4,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceSoft,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: colors.accentStrong,
  },
  thumb: {
    position: 'absolute',
    top: 9,
    width: 18,
    height: 18,
    marginLeft: -9,
    borderRadius: 9,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  sliderLabels: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    color: colors.dim,
    fontFamily: font.mono,
    letterSpacing: 1,
  },
  toggle: {
    backgroundColor: colors.surfaceSoft,
    padding: 3,
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: colors.accentStrong,
    alignItems: 'flex-end',
  },
  knob: {
    backgroundColor: colors.white,
  },
  knobOn: {
    backgroundColor: colors.white,
  },
});
