import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, EyeOff, KeyRound, Lock, LogIn } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlowMark } from '../components/FlowMark';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  // Clamp: 0.85 on 360dp, 1.0 on 390dp, cap at 1.05
  const scale = Math.min(1.05, Math.max(0.85, width / 390));

  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>

      {/* Back button row */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          hitSlop={8}
        >
          <ArrowLeft size={22} color={colors.text} />
        </Pressable>
      </View>

      {/* Main content — vertically centered, no scroll */}
      <View style={[styles.body, { paddingHorizontal: sp(24) }]}>

        {/* Logo + heading */}
        <View style={styles.logoRow}>
          <View style={[styles.logoCircle, { width: sp(56), height: sp(56), borderRadius: sp(28) }]}>
            <FlowMark size={sp(30)} />
          </View>
          <View style={styles.headingBlock}>
            <Text style={[styles.title, { fontSize: fs(24) }]}>Welcome back</Text>
            <Text style={[styles.subtitle, { fontSize: fs(13) }]}>
              Sign in to your FlowTime account
            </Text>
          </View>
        </View>

        {/* Email field */}
        <Text style={[styles.label, { fontSize: fs(11) }]}>EMAIL OR USERNAME</Text>
        <TextInput
          placeholder="you@example.com"
          placeholderTextColor={colors.faint}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, { height: sp(50), fontSize: fs(15), borderRadius: sp(12), paddingHorizontal: sp(16) }]}
        />

        {/* Password label + Forgot row */}
        <View style={styles.passwordLabelRow}>
          <Text style={[styles.label, { fontSize: fs(11) }]}>PASSWORD</Text>
          <Pressable hitSlop={8}>
            <Text style={[styles.forgot, { fontSize: fs(12) }]}>Forgot?</Text>
          </Pressable>
        </View>

        {/* Password input */}
        <View style={[styles.inputWrap, { height: sp(50), borderRadius: sp(12), paddingHorizontal: sp(16) }]}>
          <Lock size={16} color={colors.faint} style={{ marginRight: 8 }} />
          <TextInput
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={colors.faint}
            style={[styles.inputInline, { fontSize: fs(15) }]}
          />
          <EyeOff size={18} color={colors.faint} />
        </View>

        {/* Sign In */}
        <PrimaryButton
          title="Sign In"
          icon={LogIn}
          onPress={() => navigation.navigate('OnboardingGoal')}
          style={styles.signInBtn}
        />

        {/* OTP */}
        <PrimaryButton
          title="Login with OTP instead"
          icon={KeyRound}
          variant="outline"
          style={styles.otpBtn}
        />

        {/* Sign up section */}
        <View style={styles.signupRow}>
          <Text style={[styles.accountText, { fontSize: fs(13) }]}>Don't have an account? </Text>
          <Pressable hitSlop={8}>
            <Text style={[styles.signupText, { fontSize: fs(13) }]}>Sign up</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <Text style={[styles.footer, { fontSize: fs(10) }]}>
          🔒 Protected by end-to-end encryption
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
  },
  logoCircle: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingBlock: { flex: 1 },
  title: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    marginTop: 2,
  },
  label: {
    color: colors.faint,
    fontFamily: font.mono,
    letterSpacing: 2,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  forgot: {
    color: colors.accent,
    fontFamily: font.mono,
    fontWeight: '700',
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputInline: {
    flex: 1,
    color: colors.text,
  },
  signInBtn: { width: '100%', marginTop: 4 },
  otpBtn: { width: '100%' },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  accountText: { color: colors.muted },
  signupText: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },
  footer: {
    textAlign: 'center',
    color: colors.faint,
    fontFamily: font.mono,
    letterSpacing: 1,
    marginTop: 4,
  },
});
