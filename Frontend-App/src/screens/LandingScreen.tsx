import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowRight, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlowMark } from '../components/FlowMark';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  // Clamp scale: never below 0.8 (tiny device) or above 1.15 (large tablet)
  const scale = Math.min(1.15, Math.max(0.8, width / 390));

  return (
    <ImageBackground source={images.landingBg} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>

        {/* Nav row */}
        <View style={styles.nav}>
          <View style={styles.brand}>
            <FlowMark size={32} />
            <Text style={[styles.brandText, { fontSize: Math.round(22 * scale) }]}>FlowTime</Text>
          </View>
        </View>

        {/* Hero — fills remaining space */}
        <View style={styles.hero}>
          {/* Badge */}
          <View style={styles.badge}>
            <Sparkles size={14} color={colors.accent} />
            <Text style={[styles.badgeText, { fontSize: Math.round(11 * scale) }]}>NOW IN EARLY ACCESS</Text>
          </View>

          {/* Headline */}
          <Text style={[styles.h1, { fontSize: Math.round(34 * scale), lineHeight: Math.round(42 * scale) }]}>
            Turn minutes into{'\n'}real progress
          </Text>

          {/* Subtitle */}
          <Text style={[styles.body, { fontSize: Math.round(15 * scale), lineHeight: Math.round(23 * scale) }]}>
            The productivity tool built for deep focus. Simple, powerful, designed to keep you in the zone.
          </Text>

          {/* Primary CTA */}
          <PrimaryButton
            title="Start Free"
            icon={ArrowRight}
            onPress={() => navigation.navigate('Login')}
            style={styles.primaryBtn}
          />

          {/* Secondary CTA */}
          <Pressable style={styles.secondaryBtn}>
            <Text style={[styles.secondaryText, { fontSize: Math.round(16 * scale) }]}>Watch Demo</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(7,17,34,0.78)' },
  safe: { flex: 1 },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandText: { color: colors.text, fontFamily: font.sansBold, fontWeight: '700' },
  hero: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 18,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: colors.surfaceSoft,
  },
  badgeText: { color: colors.accent, fontFamily: font.mono, letterSpacing: 2 },
  h1: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  body: {
    color: colors.muted,
    marginBottom: 8,
  },
  primaryBtn: { width: '100%' },
  secondaryBtn: {
    width: '100%',
    minHeight: 52,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
  },
  secondaryText: { color: colors.text, fontFamily: font.sansBold, fontWeight: '700' },
});
