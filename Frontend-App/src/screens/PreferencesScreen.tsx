import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Settings } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { ToggleMock } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { preferences } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

function PreferenceRow({
  item,
  nav,
  isLast,
  scale,
}: {
  item: any;
  nav?: () => void;
  isLast?: boolean;
  scale: number;
}) {
  const [isOn, setIsOn] = useState(!!item.on);
  const IconComponent = item.icon;

  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  const content = (
    <View style={[styles.row, isLast && styles.noBorder, { paddingVertical: sp(12), paddingHorizontal: sp(14) }]}>
      <View style={[styles.iconWrap, { width: sp(36), height: sp(36), borderRadius: sp(10) }]}>
        <IconComponent size={fs(18)} color={colors.accent} />
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.rowTitle, { fontSize: fs(14) }]} numberOfLines={1}>
          {item.title}
        </Text>
        {item.subtitle ? (
          <Text style={[styles.rowSubtitle, { fontSize: fs(11) }]} numberOfLines={1}>
            {item.subtitle}
          </Text>
        ) : null}
      </View>
      {typeof item.on === 'boolean' ? (
        <Pressable onPress={() => setIsOn(!isOn)} hitSlop={8}>
          <ToggleMock on={isOn} />
        </Pressable>
      ) : (
        <ChevronRight size={fs(18)} color={colors.dim} />
      )}
    </View>
  );

  if (nav) {
    return <Pressable onPress={nav}>{content}</Pressable>;
  }
  return content;
}

export default function PreferencesScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const scale = Math.min(1.1, Math.max(0.85, width / 390));

  const fs = (base: number) => Math.round(base * scale);
  const sp = (base: number) => Math.round(base * scale);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <BrandHeader
        title="App Preferences"
        back
        onBack={() => navigation.goBack()}
        rightIcon={Settings}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingHorizontal: sp(20) }]}
      >
        {/* Section 1: Focus Mode */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { fontSize: fs(11) }]}>FOCUS MODE</Text>
          <Card style={styles.cardGroup}>
            {preferences.focus.map((item, idx) => (
              <PreferenceRow
                key={item.title}
                item={item}
                isLast={idx === preferences.focus.length - 1}
                scale={scale}
              />
            ))}
          </Card>
        </View>

        {/* Section 2: Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { fontSize: fs(11) }]}>NOTIFICATIONS</Text>
          <Card style={styles.cardGroup}>
            {preferences.notifications.map((item, idx) => (
              <PreferenceRow
                key={item.title}
                item={item}
                isLast={idx === preferences.notifications.length - 1}
                nav={() => navigation.navigate('SettingsDetail', { title: item.title })}
                scale={scale}
              />
            ))}
          </Card>
        </View>

        {/* Section 3: Visuals */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { fontSize: fs(11) }]}>VISUALS</Text>
          <Card style={styles.cardGroup}>
            {preferences.visuals.map((item, idx) => (
              <PreferenceRow
                key={item.title}
                item={item}
                isLast={idx === preferences.visuals.length - 1}
                scale={scale}
              />
            ))}
          </Card>
        </View>
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
  section: {
    gap: 6,
  },
  sectionHeader: {
    color: colors.faint,
    fontFamily: font.mono,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardGroup: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  iconWrap: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    color: colors.text,
    fontFamily: font.sansBold,
    fontWeight: '700',
  },
  rowSubtitle: {
    color: colors.muted,
  },
});
