import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '../theme/colors';

export function IconButton({ icon: Icon, onPress, size = 34, color = colors.text, framed = false }: { icon: LucideIcon; onPress?: () => void; size?: number; color?: string; framed?: boolean }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [framed && styles.framed, pressed && styles.pressed]}>
      <Icon size={size} color={color} strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  framed: { width: 64, height: 64, borderRadius: 18, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.72 },
});
