import React from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

/** Scrollable page body with the app's horizontal padding and tab-bar clearance. */
export function Screen({
  children,
  contentStyle,
  footer,
}: {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  /** Content pinned above the tab bar (e.g. mini player). */
  footer?: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[styles.content, footer ? { paddingBottom: 200 } : null, contentStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 120, gap: 20 },
});
