import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { radius } from '../theme/spacing';

export function PrimaryButton({ title, icon: Icon, onPress, variant = 'primary', style }: { title: string; icon?: LucideIcon; onPress?: () => void; variant?: 'primary' | 'secondary' | 'outline' | 'danger'; style?: ViewStyle }) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, styles[variant], pressed && styles.pressed, style]}>
      {Icon ? <Icon size={24} color={isPrimary ? colors.accentDark : variant === 'danger' ? colors.danger : colors.text} strokeWidth={2.7} /> : null}
      <Text style={[styles.text, isPrimary && styles.primaryText, variant === 'danger' && styles.dangerText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 74, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 16, paddingHorizontal: 20 },
  primary: { backgroundColor: colors.accentStrong, shadowColor: colors.accentStrong, shadowOpacity: 0.28, shadowRadius: 18, elevation: 8 },
  secondary: { backgroundColor: colors.surfaceSoft },
  outline: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.border },
  danger: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: 'rgba(255,177,168,0.35)' },
  text: { color: colors.text, fontSize: 22, fontFamily: font.sansBold, fontWeight: '800' },
  primaryText: { color: colors.accentDark },
  dangerText: { color: colors.danger },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
