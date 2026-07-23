import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MoreVertical, Search, Settings } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { MiniPlayer } from '../components/MiniPlayer';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images, tracks } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function SoundsScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />
      <View style={styles.content}>
        <View style={styles.search}><Search size={36} color={colors.dim} /><TextInput placeholder="Search tracks, playlists..." placeholderTextColor={colors.muted} style={styles.searchInput} /></View>
        <View style={styles.tabs}>{['Audio Library','Playlists','Favorites'].map((t, i) => <View key={t} style={styles.tab}><Text style={[styles.tabText, i === 0 && styles.tabActive]}>{t}</Text>{i === 0 && <View style={styles.underline} />}</View>)}</View>
        <View style={styles.heading}><Text style={styles.h2}>Deep Work Essentials</Text><Text style={styles.viewAll}>VIEW ALL</Text></View>
        <View style={styles.carousel}>
          <ImageBackground source={images.soundFocus} style={styles.soundCard} imageStyle={styles.soundImage}><Text style={styles.chip}>BINAURAL</Text><Text style={styles.soundTitle}>Focus Engine 432Hz</Text></ImageBackground>
          <ImageBackground source={images.soundMidnight} style={styles.soundCardSmall} imageStyle={styles.soundImage}><Text style={styles.chip}>AMBIENT</Text><Text style={styles.soundTitle}>Midnight Library</Text></ImageBackground>
        </View>
        <Text style={styles.h2}>All Tracks</Text>
        {tracks.map(track => <Pressable key={track.title} onPress={() => navigation.navigate('NowPlaying')} style={styles.track}><View style={styles.trackIcon}><track.icon size={38} color={colors.accent} /></View><View style={{ flex: 1 }}><Text style={styles.trackTitle}>{track.title}</Text><Text style={styles.trackMeta}>{track.meta}</Text></View><MoreVertical size={30} color={colors.text} /></Pressable>)}
        <MiniPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 30 },
  search: { minHeight: 112, borderRadius: 24, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 36 },
  searchInput: { flex: 1, color: colors.text, fontSize: 26 },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { marginRight: 48, paddingBottom: 28 },
  tabText: { color: colors.muted, fontSize: 26 },
  tabActive: { color: colors.accent, fontFamily: font.sansBold, fontWeight: '900' },
  underline: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, backgroundColor: colors.accent },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  h2: { color: colors.text, fontSize: 43, fontFamily: font.sansBold, fontWeight: '900' },
  viewAll: { color: colors.accent, fontFamily: font.mono, fontSize: 18, letterSpacing: 4 },
  carousel: { flexDirection: 'row', gap: 32, overflow: 'hidden' },
  soundCard: { width: 480, height: 480, borderRadius: 26, overflow: 'hidden', justifyContent: 'flex-end', padding: 34 },
  soundCardSmall: { width: 330, height: 480, borderRadius: 26, overflow: 'hidden', justifyContent: 'flex-end', padding: 34 },
  soundImage: { borderRadius: 26 },
  chip: { alignSelf: 'flex-start', color: colors.accent, fontFamily: font.mono, fontSize: 17, letterSpacing: 2, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(154,180,226,0.22)', borderRadius: 10, paddingHorizontal: 18, paddingVertical: 16, overflow: 'hidden' },
  soundTitle: { color: colors.white, fontSize: 32, fontFamily: font.sansBold, fontWeight: '900', marginTop: 22 },
  track: { minHeight: 120, flexDirection: 'row', alignItems: 'center', gap: 30, paddingHorizontal: 34 },
  trackIcon: { width: 96, height: 96, borderRadius: 14, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
  trackTitle: { color: colors.text, fontSize: 27, fontFamily: font.sansBold, fontWeight: '900' },
  trackMeta: { color: colors.muted, fontSize: 20, fontFamily: font.mono, marginTop: 8 },
});
