import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heart, Maximize2, MoreVertical, Pause, Repeat2, Rewind, SkipForward, Speaker, StepBack, StepForward } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { IconButton } from '../components/IconButton';
import { SliderMock } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'NowPlaying'>;

export default function NowPlayingScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader title="Now Playing" back onBack={() => navigation.goBack()} rightIcon={MoreVertical} />
      <View style={styles.content}>
        <Image source={images.albumFocus} style={styles.album} />
        <Text style={styles.title}>Focus Engine 432Hz</Text>
        <Text style={styles.meta}>BINAURAL BEATS • DEEP FLOW</Text>
        <View style={styles.progress}><SliderMock value={0.45} labels={['12:45','-15:15']} /></View>
        <View style={styles.controls}><IconButton icon={Maximize2} size={44} /><IconButton icon={StepBack} size={48} /><View style={styles.pause}><Pause size={66} color={colors.accentDark} fill={colors.accentDark} /></View><IconButton icon={SkipForward} size={48} /><IconButton icon={Repeat2} size={44} /></View>
        <Card style={styles.panel}><Heart size={42} color={colors.text} /><Text style={styles.favorite}>Favorite</Text><Speaker size={36} color={colors.text} /><View style={styles.volume}><View style={styles.volumeFill} /><View style={styles.volumeKnob} /></View><Rewind size={34} color={colors.text} /></Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 48, alignItems: 'center' },
  album: { width: '100%', aspectRatio: 1, borderRadius: 20, borderWidth: 1, borderColor: colors.borderStrong, marginTop: 72 },
  title: { color: colors.text, fontSize: 44, fontFamily: font.sansBold, fontWeight: '900', marginTop: 76, textAlign: 'center' },
  meta: { color: colors.accent, fontFamily: font.mono, fontSize: 20, letterSpacing: 4, marginTop: 22 },
  progress: { alignSelf: 'stretch', marginTop: 70 },
  controls: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 52 },
  pause: { width: 160, height: 160, borderRadius: 80, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', shadowColor: colors.accent, shadowOpacity: 0.25, shadowRadius: 24, elevation: 10 },
  panel: { alignSelf: 'stretch', marginTop: 72, minHeight: 112, paddingHorizontal: 40, flexDirection: 'row', alignItems: 'center', gap: 24 },
  favorite: { color: colors.text, fontFamily: font.mono, fontSize: 21, letterSpacing: 2, flex: 1 },
  volume: { width: 190, height: 8, borderRadius: 8, backgroundColor: colors.surfaceSoft },
  volumeFill: { width: '68%', height: 8, borderRadius: 8, backgroundColor: colors.borderStrong },
  volumeKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.accent, marginTop: -16, marginLeft: '62%' },
});
