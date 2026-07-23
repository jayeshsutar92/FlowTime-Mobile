import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronRight, Settings } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { MonoLabel, ToggleMock } from '../components/Primitives';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { preferences } from '../data/content';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

function PreferenceRow({ item, nav }: { item: any; nav?: () => void }) {
  return <Pressable onPress={nav} style={styles.row}><item.icon size={38} color={colors.accent} /><View style={{ flex: 1 }}><Text style={styles.title}>{item.title}</Text>{item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}</View>{typeof item.on === 'boolean' ? <ToggleMock on={item.on} /> : <ChevronRight size={36} color={colors.text} />}</Pressable>;
}

export default function PreferencesScreen({ navigation }: Props) {
  return (
    <Screen>
      <BrandHeader title="App Preferences" back onBack={() => navigation.goBack()} rightIcon={Settings} />
      <View style={styles.content}>
        <MonoLabel muted>FOCUS MODE</MonoLabel>
        <Card>{preferences.focus.map(item => <PreferenceRow key={item.title} item={item} />)}</Card>
        <MonoLabel muted>NOTIFICATIONS</MonoLabel>
        <Card>{preferences.notifications.map(item => <PreferenceRow key={item.title} item={item} nav={() => navigation.navigate('SettingsDetail', { title: item.title })} />)}</Card>
        <MonoLabel muted>VISUALS</MonoLabel>
        <Card>{preferences.visuals.map(item => <PreferenceRow key={item.title} item={item} />)}</Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32, gap: 34 },
  row: { minHeight: 144, flexDirection: 'row', alignItems: 'center', gap: 32, paddingHorizontal: 36, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { color: colors.text, fontSize: 28 },
  subtitle: { color: colors.muted, fontSize: 20, marginTop: 8 },
});
