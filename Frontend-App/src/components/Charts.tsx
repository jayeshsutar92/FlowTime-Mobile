import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { font } from '../theme/typography';

export function Heatmap() {
  const values = [1,3,5,2,6,4,3,1,4,5,3,1,2,4,5,2,1,6,3,4,2,5,1,4,2,5,3,1,4,5,3,6,4,2,1];
  return (
    <View>
      <View style={styles.grid}>{values.map((v, i) => <View key={i} style={[styles.cell, { backgroundColor: shades[v - 1] }]} />)}</View>
      <View style={styles.days}>{['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => <Text key={d} style={styles.day}>{d}</Text>)}</View>
    </View>
  );
}

export function Bars() {
  const values = [0.25,0.34,0.28,0.42,0.68,0.74,1,0.78,0.58,0.4,0.3,0.26];
  return <View style={styles.bars}>{values.map((v, i) => <View key={i} style={[styles.bar, { opacity: 0.35 + v * 0.65, backgroundColor: i === 6 ? colors.accent : colors.accent }]} />)}</View>;
}

export function Donut() {
  return <View style={styles.donut}><View style={styles.donutHole} /></View>;
}

const shades = ['#202a40', '#34415f', '#4d6088', '#6e84b4', '#839bd0', '#9db7ed'];
const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: { width: '12.2%', aspectRatio: 1, borderRadius: 7 },
  days: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  day: { color: colors.muted, fontSize: 14, fontFamily: font.sans },
  bars: { height: 250, flexDirection: 'row', gap: 8, alignItems: 'flex-end', paddingHorizontal: 12 },
  bar: { flex: 1, height: '92%', borderRadius: 1 },
  donut: { width: 150, height: 150, borderRadius: 75, borderWidth: 16, borderLeftColor: colors.surfaceSoft, borderBottomColor: colors.accent, borderRightColor: colors.accent, borderTopColor: colors.accent },
  donutHole: { flex: 1, margin: 12, borderRadius: 50, backgroundColor: colors.surface },
});
