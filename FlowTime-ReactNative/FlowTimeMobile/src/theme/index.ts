/**
 * FlowTime design tokens — converted from the web app's oklch palette
 * (src/styles.css) to sRGB hex values usable by React Native.
 */
export const colors = {
  background: '#0A0F22',
  foreground: '#EEF2F9',
  card: '#12182E',
  popover: '#161D35',
  secondary: '#1B223B',
  muted: '#1B223B',
  mutedForeground: '#8E97AD',
  primary: '#3F74F0',
  primaryForeground: '#FAFBFE',
  accent: '#6D4EF0',
  destructive: '#E5484D',
  success: '#22C58A',
  successForeground: '#0B2219',
  warning: '#F0A92C',
  border: 'rgba(255,255,255,0.08)',
  input: 'rgba(255,255,255,0.10)',
  ring: '#3F74F0',
  gradientStart: '#4A80F7',
  gradientEnd: '#5B3EE6',
} as const;

/** Apply an alpha (0–1) to a #RRGGBB colour. */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/** Font family names match the TTF files in android/app/src/main/assets/fonts. */
export const fonts = {
  regular: 'SpaceGrotesk-Regular',
  medium: 'SpaceGrotesk-Medium',
  semibold: 'SpaceGrotesk-SemiBold',
  bold: 'SpaceGrotesk-Bold',
  monoMedium: 'JetBrainsMono-Medium',
  mono: 'JetBrainsMono-SemiBold',
  monoBold: 'JetBrainsMono-Bold',
} as const;

export const radius = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  sheet: 32,
  full: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
} as const;

/** Soft blue glow used on primary elements (Android uses elevation colour). */
export const glow = {
  shadowColor: colors.primary,
  shadowOpacity: 0.55,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 8 },
  elevation: 10,
} as const;
