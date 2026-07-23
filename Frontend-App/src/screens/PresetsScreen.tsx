import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Clock, MoreVertical, Play, Plus, Settings } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { MiniPlayer } from '../components/MiniPlayer';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { presets, images } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function PresetsScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader title="Presets" rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingHorizontal: sp(20) }]}
      >
        {/* Library chip + subhead */}
        <View style={styles.sectionHeader}>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { fontSize: fs(10) }]}>LIBRARY</Text>
          </View>
          <Text style={[styles.subhead, { fontSize: fs(16) }]}>Choose your state of mind</Text>
        </View>

        {/* Preset cards */}
        {presets.map(item => {
          // Parse detail: "25m Work | 5m Break | 4\nSessions" → flatten to single line
          const detail = item.detail.replace(/\n/g, ' ');
          const isActive = !!item.active;

          return (
            <Card key={item.title} style={styles.presetCard}>
              <View style={styles.presetCopy}>
                <Text
                  style={[styles.presetTitle, { fontSize: fs(17) }, !isActive && styles.mutedText]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View style={styles.presetMetaRow}>
                  <Clock size={fs(12)} color={colors.dim} />
                  <Text style={[styles.presetMeta, { fontSize: fs(12) }]} numberOfLines={1}>
                    {detail}
                  </Text>
                </View>
              </View>
              <Pressable hitSlop={8} style={styles.moreBtn}>
                <MoreVertical size={fs(18)} color={colors.dim} />
              </Pressable>
              <Pressable style={[styles.playBtn, isActive ? styles.playActive : styles.playInactive]}>
                <Play
                  size={fs(16)}
                  color={isActive ? colors.accentDark : colors.dim}
                  fill={isActive ? colors.accentDark : 'transparent'}
                />
              </Pressable>
            </Card>
          );
        })}

        {/* Create new preset */}
        <Pressable style={styles.createCard}>
          <Plus size={fs(18)} color={colors.accent} />
          <Text style={[styles.createText, { fontSize: fs(12) }]}>CREATE NEW PRESET</Text>
        </Pressable>

        {/* Daily insight card */}
        <ImageBackground
          source={images.insightCard}
          style={[styles.insight, { height: sp(180) }]}
          imageStyle={styles.insightImg}
        >
          <View style={styles.insightScrim} />
          <Text style={[styles.insightLabel, { fontSize: fs(10) }]}>DAILY INSIGHT</Text>
          <Text style={[styles.insightText, { fontSize: fs(22), lineHeight: fs(28) }]}>
            Music helps the brain enter flow states faster
          </Text>
        </ImageBackground>
      </ScrollView>

      {/* Fixed bottom: mini player */}
      <View style={[styles.playerWrap, { paddingHorizontal: sp(20) }]}>
        <MiniPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { gap: 10, paddingTop: 16, paddingBottom: 8 },

  // Section header
  sectionHeader: { gap: 4, marginBottom: 4 },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: colors.surfaceSoft,
  },
  badgeText: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 2.5,
  },
  subhead: { color: colors.muted },

  // Preset cards — horizontal layout
  presetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  presetCopy: { flex: 1, gap: 4 },
  presetTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  mutedText: { color: colors.muted },
  presetMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  presetMeta: {
    color: colors.dim,
    fontFamily: font.mono,
    letterSpacing: 0.5,
    flex: 1,
  },
  moreBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playActive: {
    backgroundColor: colors.accent,
  },
  playInactive: {
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },

  // Create new preset
  createCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  createText: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 3,
  },

  // Insight card
  insight: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'flex-end',
  },
  insightImg: { borderRadius: 16 },
  insightScrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(3,8,23,0.55)' },
  insightLabel: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 3,
    marginBottom: 6,
  },
  insightText: {
    color: colors.white,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },

  // Player
  playerWrap: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
