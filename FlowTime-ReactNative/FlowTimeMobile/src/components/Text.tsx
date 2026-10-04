import React from 'react';
import { Text as RNText, type TextProps, type TextStyle, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

type Variant = 'body' | 'display' | 'mono' | 'label';

type Props = TextProps & {
  variant?: Variant;
  size?: number;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
  center?: boolean;
};

const displayFont = {
  regular: fonts.regular,
  medium: fonts.medium,
  semibold: fonts.semibold,
  bold: fonts.bold,
};
const monoFont = {
  regular: fonts.monoMedium,
  medium: fonts.monoMedium,
  semibold: fonts.mono,
  bold: fonts.monoBold,
};

/** Typography primitive mirroring the web's font-display / font-mono utilities. */
export function Text({
  variant = 'body',
  size,
  weight,
  color,
  center,
  style,
  ...rest
}: Props) {
  const base: TextStyle =
    variant === 'label'
      ? styles.label
      : variant === 'mono'
        ? { fontFamily: monoFont[weight ?? 'semibold'], fontSize: size ?? 14 }
        : variant === 'display'
          ? { fontFamily: displayFont[weight ?? 'bold'], fontSize: size ?? 18, letterSpacing: -0.3 }
          : { fontFamily: displayFont[weight ?? 'regular'], fontSize: size ?? 14 };

  return (
    <RNText
      {...rest}
      style={[
        { color: colors.foreground },
        base,
        size != null && { fontSize: size },
        color != null && { color },
        center && { textAlign: 'center' },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  // Matches: font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground
  label: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.mutedForeground,
  },
});
