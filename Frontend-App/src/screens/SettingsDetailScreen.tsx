import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Settings, Sparkles } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SettingsDetail'>;

export default function SettingsDetailScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <BrandHeader title={route.params.title} back onBack={() => navigation.goBack()} rightIcon={Settings} />
      <View style={styles.content}>
        <Card style={styles.card}><Sparkles size={54} color={colors.accent} /><Text style={styles.title}>{route.params.title}</Text><Text style={styles.body}>This frontend-only screen preserves the referenced navigation path without implementing account, backend, or business logic.</Text></Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 32 },
  card: { minHeight: 300, padding: 42, justifyContent: 'center', gap: 24 },
  title: { color: colors.text, fontSize: 34, fontFamily: font.sansBold, fontWeight: '900' },
  body: { color: colors.muted, fontSize: 22, lineHeight: 32 },
});
