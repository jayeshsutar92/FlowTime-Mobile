import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pause, RotateCcw, SkipForward } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ActiveSession'>;

export default function ActiveSessionScreen({ navigation }: Props) {
  return (
    <Screen scroll={false}>
      <View style={styles.root}>
        <Text style={styles.kicker}>STAY FOCUSED</Text>
        <View style={styles.tinyLine} />
        <View style={styles.ring}><View style={styles.gap} /><Text style={styles.time}>24:43</Text><Text style={styles.session}>Session 1 of 4</Text></View>
        <View style={styles.controls}>
          <Pressable style={styles.small} onPress={() => navigation.goBack()}><RotateCcw size={38} color={colors.text} /></Pressable>
          <Pressable style={styles.pause}><Pause size={58} color={colors.accentDark} fill={colors.accentDark} /></Pressable>
          <Pressable style={styles.small}><SkipForward size={38} color={colors.text} /></Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgDeep, paddingHorizontal: 80, alignItems: 'center' },
  kicker: { marginTop: 38, color: colors.accent, fontFamily: font.mono, fontSize: 18, letterSpacing: 5 },
  tinyLine: { width: 64, height: 2, backgroundColor: colors.borderStrong, marginTop: 20 },
  ring: { width: 596, height: 596, maxWidth: '100%', aspectRatio: 1, borderRadius: 298, borderWidth: 20, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginTop: 410 },
  gap: { position: 'absolute', top: -22, width: 30, height: 24, backgroundColor: colors.bgDeep },
  time: { color: colors.text, fontSize: 46, fontFamily: font.sansBold, fontWeight: '800' },
  session: { color: colors.muted, fontFamily: font.mono, fontSize: 19, letterSpacing: 2, marginTop: 28 },
  controls: { position: 'absolute', bottom: 110, left: 80, right: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  small: { width: 96, height: 96, borderRadius: 20, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  pause: { width: 128, height: 128, borderRadius: 64, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', shadowColor: colors.accent, shadowOpacity: 0.3, shadowRadius: 25, elevation: 10 },
});
