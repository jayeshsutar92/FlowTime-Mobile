import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react-native';
import { colors, alpha, glow, radius } from '../theme';
import { ButtonLabel, Field, Gradient, Input, Press, PrimaryButton, Segmented, Text } from '../components/ui';

type Mode = 'Sign in' | 'Sign up' | 'OTP';
const MODES = ['Sign in', 'Sign up', 'OTP'] as const;

const COPY: Record<Mode, { title: string; sub: string; cta: string }> = {
  'Sign in': { title: 'Welcome back', sub: 'Enter your details to access your focus hub.', cta: 'Sign In' },
  'Sign up': { title: 'Create account', sub: 'Start your deep work journey.', cta: 'Sign Up' },
  OTP: { title: 'Login with OTP', sub: 'Login without a password using a one-time code.', cta: 'Sign In with OTP' },
};

export function AuthScreen() {
  const navigation = useNavigation();
  const [mode, setMode] = useState<Mode>('Sign in');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Connect to the existing Django auth endpoints here.
  const submit = () => navigation.reset({ index: 0, routes: [{ name: 'App' }] });
  const requestOtp = () => setOtpSent(true);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View pointerEvents="none" style={styles.glow} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.inner}>
          {/* Brand */}
          <View style={styles.brand}>
            <Gradient borderRadius={radius['2xl']} style={[styles.logo, glow]}>
              <View style={styles.logoDot} />
            </Gradient>
            <Text variant="display" size={24}>FlowTime</Text>
            <View style={styles.row}>
              <Sparkles size={12} color={colors.warning} />
              <Text size={12} weight="medium" color={colors.mutedForeground}>Now in early access</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text variant="display" size={24} center>{COPY[mode].title}</Text>
            <Text size={14} color={colors.mutedForeground} center style={{ marginTop: 6 }}>
              {COPY[mode].sub}
            </Text>

            <Segmented style={{ marginTop: 20 }} options={MODES} value={mode} onChange={setMode} />

            <View style={{ marginTop: 20, gap: 16 }}>
              <View style={[styles.row, { alignItems: 'flex-end', gap: 8 }]}>
                <View style={{ flex: 1 }}>
                  <Field
                    label="Email or username"
                    placeholder="you@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    value={identifier}
                    onChangeText={setIdentifier}
                  />
                </View>
                {mode === 'OTP' && (
                  <Press onPress={requestOtp} style={styles.otpBtn}>
                    <Text size={14} weight="semibold">Get OTP</Text>
                  </Press>
                )}
              </View>

              {mode === 'OTP' ? (
                <>
                  {otpSent && (
                    <View style={styles.success}>
                      <Text size={12} weight="semibold" color={colors.success}>
                        An OTP has been sent to your email.
                      </Text>
                    </View>
                  )}
                  <Field label="OTP" keyboardType="number-pad" placeholder="123456" maxLength={6} value={otp} onChangeText={setOtp} />
                </>
              ) : (
                <View>
                  <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 6 }]}>
                    <Text variant="label">Password</Text>
                    {mode === 'Sign in' && (
                      <Pressable hitSlop={8}>
                        <Text size={12} weight="semibold" color={colors.primary}>Forgot?</Text>
                      </Pressable>
                    )}
                  </View>
                  <View>
                    <Input
                      secureTextEntry={!showPassword}
                      placeholder="••••••••"
                      autoComplete={mode === 'Sign in' ? 'password' : 'password-new'}
                      value={password}
                      onChangeText={setPassword}
                      style={{ paddingRight: 48 }}
                    />
                    <Pressable
                      onPress={() => setShowPassword((s) => !s)}
                      accessibilityLabel="Toggle password visibility"
                      style={styles.eye}
                      hitSlop={8}
                    >
                      {showPassword ? <EyeOff size={18} color={colors.mutedForeground} /> : <Eye size={18} color={colors.mutedForeground} />}
                    </Pressable>
                  </View>
                </View>
              )}

              <PrimaryButton onPress={submit}>
                {mode === 'OTP' && <KeyRound size={18} color={colors.primaryForeground} />}
                <ButtonLabel>{COPY[mode].cta}</ButtonLabel>
              </PrimaryButton>
            </View>

            <View style={[styles.row, { justifyContent: 'center', marginTop: 20 }]}>
              <Text size={14} color={colors.mutedForeground}>
                {mode === 'Sign in' ? "Don't have an account? " : 'Already have an account? '}
              </Text>
              <Pressable onPress={() => setMode(mode === 'Sign in' ? 'Sign up' : 'Sign in')} hitSlop={8}>
                <Text size={14} weight="semibold" color={colors.primary}>
                  {mode === 'Sign in' ? 'Sign up' : 'Sign in'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    top: -128,
    alignSelf: 'center',
    width: 288,
    height: 288,
    borderRadius: 144,
    backgroundColor: alpha(colors.primary, 0.18),
  },
  container: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 40 },
  inner: { width: '100%', maxWidth: 384, alignSelf: 'center' },
  brand: { alignItems: 'center', marginBottom: 32, gap: 4 },
  logo: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primaryForeground },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  card: {
    borderRadius: radius.sheet,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24,
    elevation: 16,
  },
  otpBtn: {
    height: 48,
    borderRadius: radius['2xl'],
    backgroundColor: colors.muted,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  success: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: alpha(colors.success, 0.3),
    backgroundColor: alpha(colors.success, 0.1),
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  eye: { position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center', padding: 6 },
});
