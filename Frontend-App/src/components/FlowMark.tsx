import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export function FlowMark({ size = 42 }: { size?: number }) {
  const dots = Array.from({ length: 49 });
  const dot = Math.max(2, size / 15);
  const gap = dot * 1.25;
  return (
    <View style={[styles.mark, { width: size, height: size }]}> 
      {dots.map((_, index) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        const distance = Math.abs(row - 3) + Math.abs(col - 3);
        if (distance > 5) return <View key={index} style={{ width: dot, height: dot, margin: gap / 2 }} />;
        return <View key={index} style={[styles.dot, { width: dot, height: dot, borderRadius: dot, margin: gap / 2, opacity: 1 - distance * 0.1 }]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mark: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' },
  dot: { backgroundColor: colors.accent },
});
