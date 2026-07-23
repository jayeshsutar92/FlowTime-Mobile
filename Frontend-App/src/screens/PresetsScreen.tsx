import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MoreVertical, Plus, Play, Settings } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { MiniPlayer } from '../components/MiniPlayer';
import { MonoLabel } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { presets, images } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function PresetsScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader title="Presets" rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />
      <View style={styles.content}>
        <View style={styles.spacer} />
        <View style={styles.badge}><Text style={styles.badgeText}>LIBRARY</Text></View>
        <Text style={styles.subhead}>Choose your state of mind</Text>
        {presets.map(item => <Card key={item.title} style={styles.preset}><View style={{ flex: 1 }}><Text style={[styles.title, !item.active && styles.muted]}>{item.title}</Text><Text style={styles.meta}>{item.detail}</Text></View><MoreVertical size={34} color={colors.text} /><View style={[styles.play, !item.active && styles.playOff]}><Play size={34} color={colors.accentDark} fill={colors.accentDark} /></View></Card>)}
        <Card style={styles.create}><Plus size={34} color={colors.text} /><Text style={styles.createText}>CREATE NEW PRESET</Text></Card>
        <ImageBackground source={images.insightCard} style={styles.insight} imageStyle={styles.insightImage}><View style={styles.scrim} /><MonoLabel>DAILY INSIGHT</MonoLabel><Text style={styles.insightText}>Music helps the brain enter flow states faster</Text></ImageBackground>
        <MiniPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 32 },
  spacer: { height: 120 },
  badge: { alignSelf: 'flex-start', borderRadius: 22, borderWidth: 1, borderColor: colors.borderStrong, paddingHorizontal: 24, paddingVertical: 10, backgroundColor: colors.surfaceSoft },
  badgeText: { color: colors.accent, fontFamily: font.mono, fontSize: 17, letterSpacing: 3 },
  subhead: { color: colors.muted, fontSize: 28, marginBottom: 48 },
  preset: { minHeight: 162, padding: 32, flexDirection: 'row', alignItems: 'center', gap: 24 },
  title: { color: colors.text, fontSize: 32, fontFamily: font.sansBold, fontWeight: '900' },
  muted: { color: colors.muted },
  meta: { color: colors.muted, fontSize: 21, lineHeight: 30, marginTop: 18 },
  play: { width: 94, height: 94, borderRadius: 47, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  playOff: { backgroundColor: colors.surfaceSoft, borderWidth: 2, borderColor: colors.borderStrong },
  create: { minHeight: 124, borderStyle: 'dashed', borderWidth: 2, borderColor: colors.border, backgroundColor: colors.transparent, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 26 },
  createText: { color: colors.text, fontFamily: font.mono, fontSize: 23, letterSpacing: 5 },
  insight: { height: 530, borderRadius: 20, overflow: 'hidden', padding: 48, justifyContent: 'flex-start' },
  insightImage: { borderRadius: 20 },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(3,8,23,0.42)' },
  insightText: { color: colors.white, fontSize: 46, lineHeight: 58, fontFamily: font.sansBold, fontWeight: '900', marginTop: 26 },
});
