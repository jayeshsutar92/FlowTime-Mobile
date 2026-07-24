import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MoreVertical, Search, Settings } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { MiniPlayer } from '../components/MiniPlayer';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images, tracks } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function SoundsScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const { width } = useWindowDimensions();

  const scale = Math.min(1.1, Math.max(0.85, width / 390));
  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  const tabs = ['Audio Library', 'Playlists', 'Favorites'];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingHorizontal: sp(20) }]}
      >
        {/* Search Bar */}
        <View style={[styles.searchBar, { paddingHorizontal: sp(14) }]}>
          <Search size={fs(18)} color={colors.dim} />
          <TextInput
            placeholder="Search tracks, playlists..."
            placeholderTextColor={colors.muted}
            style={[styles.searchInput, { fontSize: fs(14) }]}
          />
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabRow}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(idx)}
                style={styles.tabItem}
              >
                <Text
                  style={[
                    styles.tabText,
                    { fontSize: fs(14) },
                    isActive && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
                {isActive && <View style={styles.tabIndicator} />}
              </Pressable>
            );
          })}
        </View>

        {/* Section 1: Deep Work Essentials */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontSize: fs(18) }]}>Deep Work Essentials</Text>
          <Pressable hitSlop={6}>
            <Text style={[styles.viewAllText, { fontSize: fs(11) }]}>VIEW ALL</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {/* Card 1 */}
          <ImageBackground
            source={images.soundFocus}
            style={[styles.albumCard, { width: sp(210), height: sp(145) }]}
            imageStyle={styles.cardImg}
          >
            <View style={styles.cardScrim} />
            <Text style={[styles.chip, { fontSize: fs(10) }]}>BINAURAL</Text>
            <Text style={[styles.cardTitle, { fontSize: fs(15) }]} numberOfLines={1}>
              Focus Engine 432Hz
            </Text>
          </ImageBackground>

          {/* Card 2 */}
          <ImageBackground
            source={images.soundMidnight}
            style={[styles.albumCard, { width: sp(210), height: sp(145) }]}
            imageStyle={styles.cardImg}
          >
            <View style={styles.cardScrim} />
            <Text style={[styles.chip, { fontSize: fs(10) }]}>AMBIENT</Text>
            <Text style={[styles.cardTitle, { fontSize: fs(15) }]} numberOfLines={1}>
              Midnight Library
            </Text>
          </ImageBackground>
        </ScrollView>

        {/* Section 2: All Tracks */}
        <Text style={[styles.sectionTitle, { fontSize: fs(18), marginTop: 4 }]}>All Tracks</Text>

        <View style={styles.tracksList}>
          {tracks.map((track) => {
            const IconComponent = track.icon;
            return (
              <Pressable
                key={track.title}
                onPress={() => navigation.navigate('NowPlaying')}
                style={({ pressed }) => [styles.trackItem, pressed && styles.pressed]}
              >
                <View style={[styles.trackIconWrap, { width: sp(44), height: sp(44), borderRadius: sp(12) }]}>
                  <IconComponent size={fs(20)} color={colors.accent} />
                </View>
                <View style={styles.trackCopy}>
                  <Text style={[styles.trackTitle, { fontSize: fs(15) }]} numberOfLines={1}>
                    {track.title}
                  </Text>
                  <Text style={[styles.trackMeta, { fontSize: fs(12) }]} numberOfLines={1}>
                    {track.meta}
                  </Text>
                </View>
                <Pressable hitSlop={8} style={styles.moreBtn}>
                  <MoreVertical size={fs(18)} color={colors.dim} />
                </Pressable>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Fixed Bottom MiniPlayer */}
      <View style={[styles.playerWrap, { paddingHorizontal: sp(20) }]}>
        <MiniPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    gap: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },

  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
  },

  // Tabs Row
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 24,
  },
  tabItem: {
    paddingBottom: 10,
    position: 'relative',
  },
  tabText: {
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  tabIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  viewAllText: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 2,
  },

  // Horizontal Cards
  cardsRow: {
    gap: 12,
  },
  albumCard: {
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 14,
    gap: 6,
  },
  cardImg: {
    borderRadius: 16,
  },
  cardScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(3, 8, 23, 0.45)',
  },
  chip: {
    alignSelf: 'flex-start',
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 1.5,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(32, 43, 67, 0.75)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  cardTitle: {
    color: colors.white,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },

  // Track Items List
  tracksList: {
    gap: 6,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  trackIconWrap: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackCopy: {
    flex: 1,
    gap: 2,
  },
  trackTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '800',
  },
  trackMeta: {
    color: colors.muted,
    fontFamily: font.mono,
  },
  moreBtn: {
    padding: 6,
  },
  pressed: {
    opacity: 0.85,
  },

  // MiniPlayer Wrapper
  playerWrap: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
