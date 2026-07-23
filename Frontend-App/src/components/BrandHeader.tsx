import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Settings, ArrowLeft, LucideIcon } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';
import { FlowMark } from './FlowMark';
import { IconButton } from './IconButton';

export function BrandHeader({ title = 'FlowTime', back, onBack, rightIcon: RightIcon = Settings, onRight }: { title?: string; back?: boolean; onBack?: () => void; rightIcon?: LucideIcon; onRight?: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>{back ? <IconButton icon={ArrowLeft} onPress={onBack} /> : <FlowMark size={44} />}</View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <IconButton icon={RightIcon} onPress={onRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 96, paddingHorizontal: 32, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  left: { width: 54, alignItems: 'flex-start' },
  title: { flex: 1, color: colors.accent, fontSize: 38, fontFamily: font.sansBold, fontWeight: '800' },
});
