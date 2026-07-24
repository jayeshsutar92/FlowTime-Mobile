import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Heart, MoreVertical, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'NowPlaying'>;

export default function NowPlayingScreen({ navigation }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const { width } = useWindowDimensions();

  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  // Responsive artwork size: 68% of screen width (min 200, max 260)
  const artworkSize = Math.min(260, Math.max(200, Math.round(width * 0.68)));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header Bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          hitSlop={8}
        >
          <ArrowLeft size={22} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { fontSize: fs(17) }]}>Now Playing</Text>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          hitSlop={8}
        >
          <MoreVertical size={20} color={colors.text} />
        </Pressable>
      </View>

      {/* Main Content Layout */}
      <View style={[styles.content, { paddingHorizontal: sp(24) }]}>
        {/* Artwork */}
        <View style={styles.artworkWrap}>
          <Image
            source={images.albumFocus}
            style={[
              styles.artwork,
              { width: artworkSize, height: artworkSize, borderRadius: sp(20) },
            ]}
          />
        </View>

        {/* Track Title & Subtitle */}
        <View style={styles.trackInfo}>
          <Text style={[styles.trackTitle, { fontSize: fs(22) }]} numberOfLines={1}>
            Focus Engine 432Hz
          </Text>
          <Text style={[styles.trackMeta, { fontSize: fs(11) }]} numberOfLines={1}>
            BINAURAL BEATS • DEEP FLOW
          </Text>
        </View>

        {/* Seek Bar */}
        <View style={styles.seekBlock}>
          <View style={styles.seekTrack}>
            <View style={[styles.seekFill, { width: '45%' }]} />
            <View style={[styles.seekThumb, { left: '45%' }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={[styles.timeText, { fontSize: fs(11) }]}>12:45</Text>
            <Text style={[styles.timeText, { fontSize: fs(11) }]}>-15:15</Text>
          </View>
        </View>

        {/* Playback Controls */}
        <View style={styles.controlsRow}>
          <Pressable hitSlop={8} style={({ pressed }) => [styles.ctrlBtn, pressed && styles.pressed]}>
            <Shuffle size={fs(18)} color={colors.dim} />
          </Pressable>

          <Pressable hitSlop={8} style={({ pressed }) => [styles.ctrlBtn, pressed && styles.pressed]}>
            <SkipBack size={fs(24)} color={colors.text} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.playBtn,
              { width: sp(64), height: sp(64), borderRadius: sp(32) },
              pressed && styles.pressed,
            ]}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={fs(26)} color={colors.accentDark} fill={colors.accentDark} />
            ) : (
              <Play size={fs(26)} color={colors.accentDark} fill={colors.accentDark} style={{ marginLeft: 2 }} />
            )}
          </Pressable>

          <Pressable hitSlop={8} style={({ pressed }) => [styles.ctrlBtn, pressed && styles.pressed]}>
            <SkipForward size={fs(24)} color={colors.text} />
          </Pressable>

          <Pressable hitSlop={8} style={({ pressed }) => [styles.ctrlBtn, pressed && styles.pressed]}>
            <Repeat size={fs(18)} color={colors.dim} />
          </Pressable>
        </View>

        {/* Favorite & Volume Bar */}
        <Card style={styles.bottomBar}>
          <Pressable
            onPress={() => setIsFav(!isFav)}
            style={styles.favBtn}
            hitSlop={8}
          >
            <Heart
              size={fs(18)}
              color={isFav ? colors.danger : colors.muted}
              fill={isFav ? colors.danger : 'transparent'}
            />
            <Text style={[styles.favText, { fontSize: fs(12) }, isFav && { color: colors.danger }]}>
              Favorite
            </Text>
          </Pressable>

          <View style={styles.volWrap}>
            <Volume2 size={fs(16)} color={colors.muted} />
            <View style={styles.volTrack}>
              <View style={[styles.volFill, { width: '65%' }]} />
              <View style={[styles.volKnob, { left: '65%' }]} />
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  artworkWrap: {
    shadowColor: colors.accent,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  artwork: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  trackInfo: {
    alignItems: 'center',
    gap: 4,
  },
  trackTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
    textAlign: 'center',
  },
  trackMeta: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  seekBlock: {
    width: '100%',
    gap: 6,
  },
  seekTrack: {
    height: 18,
    justifyContent: 'center',
    position: 'relative',
  },
  seekFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  seekThumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
    marginLeft: -7,
    elevation: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.dim,
    fontFamily: font.mono,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  ctrlBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  favBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favText: {
    color: colors.muted,
    fontFamily: font.sansBold,
  },
  volWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 0.8,
  },
  volTrack: {
    flex: 1,
    height: 14,
    justifyContent: 'center',
    position: 'relative',
  },
  volFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderStrong,
  },
  volKnob: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
    marginLeft: -6,
  },
  pressed: {
    opacity: 0.8,
  },
});
