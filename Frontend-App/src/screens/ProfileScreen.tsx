import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Edit3, LogOut, Settings, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { FocusPlayer } from '../components/MiniPlayer';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { images, profileSettings } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function ProfileScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));

  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader rightIcon={Settings} onRight={() => navigation.navigate('Preferences')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingHorizontal: sp(20) }]}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarWrap, { width: sp(90), height: sp(90) }]}>
            <Image
              source={images.profileAvatar}
              style={[styles.avatar, { width: sp(90), height: sp(90), borderRadius: sp(45) }]}
            />
            <View style={[styles.editBadge, { width: sp(28), height: sp(28), borderRadius: sp(14) }]}>
              <Edit3 size={fs(14)} color={colors.accentDark} />
            </View>
          </View>

          <Text style={[styles.userName, { fontSize: fs(22) }]}>Alex Rivera</Text>

          <View style={styles.rankBadge}>
            <Shield size={fs(14)} color={colors.accent} />
            <Text style={[styles.rankText, { fontSize: fs(11) }]}>FLOW MASTER</Text>
          </View>
        </View>

        {/* 3-Column Summary Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { fontSize: fs(10) }]}>HOURS</Text>
            <Text style={[styles.statValue, { fontSize: fs(20) }]}>124h</Text>
            <Text style={[styles.statFoot, { fontSize: fs(10) }]}>TOTAL FOCUS</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { fontSize: fs(10) }]}>SESSIONS</Text>
            <Text style={[styles.statValue, { fontSize: fs(20) }]}>342</Text>
            <Text style={[styles.statFoot, { fontSize: fs(10) }]}>COMPLETED</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { fontSize: fs(10) }]}>RANK</Text>
            <Text style={[styles.statValue, { fontSize: fs(20) }]}>Top 5%</Text>
            <Text style={[styles.statFoot, { fontSize: fs(10) }]}>GLOBAL</Text>
          </Card>
        </View>

        {/* Grouped App Settings */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { fontSize: fs(11) }]}>APP SETTINGS</Text>
          <Card style={styles.settingsGroup}>
            {profileSettings.map((item, idx) => {
              const IconComponent = item.icon;
              const isLast = idx === profileSettings.length - 1;

              return (
                <Pressable
                  key={item.title}
                  onPress={() =>
                    item.route === 'Preferences'
                      ? navigation.navigate('Preferences')
                      : navigation.navigate('SettingsDetail', { title: item.title })
                  }
                  style={({ pressed }) => [
                    styles.settingRow,
                    isLast && styles.noBorder,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={[styles.settingIconWrap, { width: sp(36), height: sp(36), borderRadius: sp(10) }]}>
                    <IconComponent size={fs(18)} color={colors.accent} />
                  </View>
                  <Text style={[styles.settingText, { fontSize: fs(14) }]}>{item.title}</Text>
                  <ChevronRight size={fs(18)} color={colors.dim} />
                </Pressable>
              );
            })}
          </Card>
        </View>

        {/* Logout Button */}
        <Pressable style={({ pressed }) => [styles.logoutBtn, pressed && styles.pressed]}>
          <LogOut size={fs(18)} color={colors.danger} />
          <Text style={[styles.logoutText, { fontSize: fs(14) }]}>Logout</Text>
        </Pressable>

        {/* Focus Player Card */}
        <FocusPlayer onPress={() => navigation.navigate('NowPlaying')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    gap: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bg,
  },
  userName: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  rankText: {
    color: colors.accent,
    fontFamily: font.mono,
    letterSpacing: 2,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statLabel: {
    color: colors.faint,
    fontFamily: font.mono,
    letterSpacing: 1.5,
  },
  statValue: {
    color: colors.accent,
    fontFamily: font.sansBold,
    fontWeight: '900',
  },
  statFoot: {
    color: colors.dim,
  },

  // Settings Section
  settingsSection: {
    gap: 6,
  },
  sectionTitle: {
    color: colors.faint,
    fontFamily: font.mono,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  settingsGroup: {
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  settingIconWrap: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '700',
  },

  // Logout Button
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,177,168,0.35)',
    backgroundColor: 'rgba(255,177,168,0.05)',
  },
  logoutText: {
    color: colors.danger,
    fontFamily: font.mono,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
  },
});
