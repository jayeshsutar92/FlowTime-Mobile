import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Edit3, LogOut, Settings } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { FocusPlayer } from '../components/MiniPlayer';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images, profileSettings } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />
      <View style={styles.content}>
        <View style={styles.profile}><Image source={images.profileAvatar} style={styles.avatar} /><View style={styles.edit}><Edit3 size={28} color={colors.accentDark} /></View><Text style={styles.name}>Alex Rivera</Text><View style={styles.rank}><Settings size={20} color={colors.accent} /><Text style={styles.rankText}>FLOW MASTER</Text></View></View>
        <View style={styles.stats}><Card style={styles.stat}><Text style={styles.statLabel}>HOURS</Text><Text style={styles.statValue}>124h</Text><Text style={styles.statFoot}>TOTAL FOCUS</Text></Card><Card style={styles.stat}><Text style={styles.statLabel}>SESSIONS</Text><Text style={styles.statValue}>342</Text><Text style={styles.statFoot}>COMPLETED</Text></Card><Card style={styles.stat}><Text style={styles.statLabel}>RANK</Text><Text style={styles.statValue}>Top\n5%</Text><Text style={styles.statFoot}>GLOBAL</Text></Card></View>
        <Text style={styles.section}>APP SETTINGS</Text>
        {profileSettings.map(item => <Pressable key={item.title} style={styles.setting} onPress={() => item.route === 'Preferences' ? navigation.navigate('Preferences') : navigation.navigate('SettingsDetail', { title: item.title })}><item.icon size={34} color={colors.text} /><Text style={styles.settingText}>{item.title}</Text><ChevronRight size={36} color={colors.dim} /></Pressable>)}
        <Pressable style={styles.logout}><LogOut size={32} color={colors.danger} /><Text style={styles.logoutText}>Logout</Text></Pressable>
        <FocusPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 26 },
  profile: { alignItems: 'center', paddingTop: 32, paddingBottom: 42 },
  avatar: { width: 250, height: 250, borderRadius: 125, borderWidth: 4, borderColor: colors.accent },
  edit: { width: 68, height: 68, borderRadius: 34, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginTop: -76, marginLeft: 180, borderWidth: 8, borderColor: colors.bg },
  name: { color: colors.text, fontSize: 50, fontFamily: font.sansBold, fontWeight: '900', marginTop: 42 },
  rank: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 26, backgroundColor: colors.surfaceSoft, paddingHorizontal: 24, paddingVertical: 9, marginTop: 20 },
  rankText: { color: colors.accent, fontFamily: font.mono, fontSize: 18, letterSpacing: 4 },
  stats: { flexDirection: 'row', gap: 24 },
  stat: { flex: 1, minHeight: 322, padding: 26, alignItems: 'center', justifyContent: 'center' },
  statLabel: { color: colors.text, fontFamily: font.mono, fontSize: 18, letterSpacing: 3 },
  statValue: { color: colors.accent, fontSize: 48, fontFamily: font.sansBold, fontWeight: '900', textAlign: 'center', marginVertical: 34 },
  statFoot: { color: colors.dim, fontSize: 16, textAlign: 'center' },
  section: { color: colors.dim, fontFamily: font.mono, fontSize: 20, letterSpacing: 4, marginTop: 36 },
  setting: { minHeight: 114, flexDirection: 'row', alignItems: 'center', gap: 38, borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: 48 },
  settingText: { flex: 1, color: colors.text, fontSize: 28 },
  logout: { minHeight: 116, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,177,168,0.35)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 36 },
  logoutText: { color: colors.danger, fontSize: 24, fontFamily: font.mono },
});
