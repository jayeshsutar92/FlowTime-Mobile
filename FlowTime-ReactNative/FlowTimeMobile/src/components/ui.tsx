import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { colors, alpha, fonts, glow, radius } from '../theme';
import { Text } from './Text';
import { Press } from './Press';
import { Gradient } from './Gradient';

/* ---------- Card ---------- */
export function Card({ style, children }: { style?: StyleProp<ViewStyle>; children: React.ReactNode }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/* ---------- Section heading ---------- */
export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <View style={styles.sectionRow}>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text variant="display" size={18} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text size={14} color={colors.mutedForeground} style={{ marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action ? <View style={{ flexShrink: 0 }}>{action}</View> : null}
    </View>
  );
}

/* ---------- Bottom sheet ---------- */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(open);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.timing(anim, {
        toValue: 1,
        duration: 320,
        easing: Easing.bezier(0.32, 0.72, 0.24, 1),
        useNativeDriver: true,
      }).start();
    } else if (visible) {
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() =>
        setVisible(false),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [600, 0] });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView
        style={styles.sheetRoot}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: anim }]}>
          <Pressable
            accessibilityLabel="Close sheet"
            onPress={onClose}
            style={[StyleSheet.absoluteFill, { backgroundColor: alpha(colors.background, 0.7) }]}
          />
        </Animated.View>
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={styles.sheetHandle} />
          {title ? (
            <Text variant="display" size={20} style={{ marginBottom: 16 }}>
              {title}
            </Text>
          ) : null}
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* ---------- Segmented control ---------- */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  style,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.segmented, style]}>
      {options.map((opt) => {
        const active = value === opt;
        const label = (
          <Text
            size={12}
            weight="semibold"
            numberOfLines={1}
            color={active ? colors.primaryForeground : colors.mutedForeground}
          >
            {opt}
          </Text>
        );
        return (
          <Press key={opt} onPress={() => onChange(opt)} style={{ flex: 1 }} accessibilityRole="tab">
            {active ? (
              <Gradient borderRadius={radius.full} style={[styles.segItem, glow]}>
                {label}
              </Gradient>
            ) : (
              <View style={styles.segItem}>{label}</View>
            )}
          </Press>
        );
      })}
    </View>
  );
}

/* ---------- Toggle ---------- */
export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  const anim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: checked ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  }, [checked, anim]);
  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [2, 22] });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked }}
      onPress={() => onChange(!checked)}
      hitSlop={8}
    >
      {checked ? (
        <Gradient borderRadius={radius.full} style={styles.toggle} />
      ) : (
        <View style={[styles.toggle, { backgroundColor: colors.muted }]} />
      )}
      <Animated.View style={[styles.knob, { transform: [{ translateX }] }]} />
    </Pressable>
  );
}

/* ---------- Empty state ---------- */
export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>{icon}</View>
      <Text variant="display" size={16} center>
        {title}
      </Text>
      {body ? (
        <Text size={14} color={colors.mutedForeground} center style={{ marginTop: 6, maxWidth: 240 }}>
          {body}
        </Text>
      ) : null}
      {action ? <View style={{ marginTop: 20 }}>{action}</View> : null}
    </View>
  );
}

/* ---------- Stat tile ---------- */
export function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card style={styles.statTile}>
      {icon}
      <Text variant="label" style={{ letterSpacing: 1.8 }} numberOfLines={1}>
        {label}
      </Text>
      <Text variant="display" size={24} numberOfLines={1}>
        {value}
      </Text>
    </Card>
  );
}

/* ---------- Stepper ---------- */
export function Stepper({
  value,
  onChange,
  min = 1,
  max = 180,
  suffix = 'm',
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <View style={styles.stepper}>
      <Press
        onPress={() => onChange(Math.max(min, value - 1))}
        style={styles.stepBtn}
        accessibilityLabel="Decrease"
        onLongPress={() => onChange(Math.max(min, value - 5))}
      >
        <Text weight="bold" size={18}>−</Text>
      </Press>
      <Text variant="mono" weight="bold" size={20}>
        {value}
        <Text size={14} color={colors.mutedForeground}> {suffix}</Text>
      </Text>
      <Press
        onPress={() => onChange(Math.min(max, value + 1))}
        style={styles.stepBtn}
        accessibilityLabel="Increase"
        onLongPress={() => onChange(Math.min(max, value + 5))}
      >
        <Text weight="bold" size={18}>+</Text>
      </Press>
    </View>
  );
}

/* ---------- Primary button ---------- */
export function PrimaryButton({
  children,
  onPress,
  style,
  disabled,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}) {
  return (
    <Press onPress={onPress} disabled={disabled} style={[glow, { borderRadius: radius['2xl'], opacity: disabled ? 0.6 : 1 }, style]} accessibilityRole="button">
      <Gradient borderRadius={radius['2xl']} style={styles.primaryBtn}>
        {children}
      </Gradient>
    </Press>
  );
}

/** Text styled for use inside PrimaryButton. */
export function ButtonLabel({ children, color = colors.primaryForeground }: { children: React.ReactNode; color?: string }) {
  return (
    <Text variant="display" size={16} color={color}>
      {children}
    </Text>
  );
}

/* ---------- Inputs ---------- */
export const Input = React.forwardRef<TextInput, TextInputProps>(function Input(
  { style, ...props },
  ref,
) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      ref={ref}
      placeholderTextColor={alpha('#8E97AD', 0.6)}
      selectionColor={colors.primary}
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      style={[styles.input, focused && { borderColor: colors.ring }, style]}
    />
  );
});

export function Field({ label, ...props }: { label: string } & TextInputProps) {
  return (
    <View>
      <Text variant="label" style={{ marginBottom: 6 }}>
        {label}
      </Text>
      <Input {...props} />
    </View>
  );
}

/* ---------- Progress bar ---------- */
export function ProgressBar({ value, height = 6 }: { value: number; height?: number }) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={{ height, borderRadius: radius.full, backgroundColor: colors.muted, overflow: 'hidden' }}>
      <Gradient borderRadius={radius.full} style={{ height: '100%', width: `${pct * 100}%` }} />
    </View>
  );
}

/* ---------- Pill badge ---------- */
export function Badge({ label, color, bg }: { label: string; color: string; bg?: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg ?? alpha(color, 0.15) }]}>
      <Text variant="mono" weight="bold" size={9} color={color} style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </Text>
    </View>
  );
}

/* ---------- Choice chip (phase pills / priority) ---------- */
export function Chip({
  label,
  active,
  onPress,
  mono,
  style,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  mono?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Press
      onPress={onPress}
      style={[
        styles.chip,
        active
          ? { borderColor: alpha(colors.primary, 0.5), backgroundColor: alpha(colors.primary, 0.15) }
          : { borderColor: colors.border, backgroundColor: alpha(colors.secondary, 0.5) },
        style,
      ]}
    >
      <Text
        variant={mono ? 'mono' : 'body'}
        weight={mono ? 'bold' : 'semibold'}
        size={mono ? 14 : 12}
        color={active ? colors.primary : colors.mutedForeground}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Press>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 20,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  sheetRoot: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.popover,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    elevation: 24,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: alpha('#8E97AD', 0.25),
    marginBottom: 20,
  },
  segmented: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.6),
  },
  segItem: {
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggle: { width: 48, height: 28, borderRadius: radius.full },
  knob: {
    position: 'absolute',
    top: 2,
    left: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryForeground,
    elevation: 2,
  },
  empty: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.6),
    marginBottom: 16,
  },
  statTile: { flex: 1, alignItems: 'center', gap: 8, paddingVertical: 20, paddingHorizontal: 12 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.5),
    padding: 8,
  },
  stepBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  input: {
    height: 48,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.5),
    paddingHorizontal: 16,
    color: colors.foreground,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  badge: { borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start' },
  chip: {
    flex: 1,
    borderRadius: radius.full,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 9,
    alignItems: 'center',
  },
});

export { Text } from './Text';
export { Press } from './Press';
export { Gradient } from './Gradient';
