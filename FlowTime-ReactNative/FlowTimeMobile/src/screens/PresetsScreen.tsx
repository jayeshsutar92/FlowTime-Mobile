import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Play, Plus, SlidersHorizontal, Trash2 } from 'lucide-react-native';
import { colors, alpha, radius } from '../theme';
import {
  Badge,
  ButtonLabel,
  Card,
  EmptyState,
  Input,
  Press,
  PrimaryButton,
  Sheet,
  Stepper,
  Text,
} from '../components/ui';
import { Screen } from '../components/Screen';
import type { Preset } from '../types/models';

export function PresetsScreen() {
  // Load the user's presets from the existing API.
  const [presets, setPresets] = useState<Preset[]>([]);
  const [activeId, setActiveId] = useState<Preset['id'] | null>(null);
  const [sheet, setSheet] = useState(false);
  const [name, setName] = useState('');
  const [focus, setFocus] = useState(25);
  const [brk, setBrk] = useState(5);
  const [long, setLong] = useState(15);

  const create = () => {
    if (!name.trim()) return;
    setPresets((p) => [...p, { id: Date.now(), name: name.trim(), focus, brk, long }]);
    setName('');
    setSheet(false);
  };

  return (
    <Screen>
      <View>
        <Text variant="display" size={24}>Presets</Text>
        <Text size={14} color={colors.mutedForeground} style={{ marginTop: 4 }}>
          Manage your personalized flow rhythms.
        </Text>
      </View>

      {presets.length === 0 ? (
        <Card>
          <EmptyState
            icon={<SlidersHorizontal size={28} color={colors.mutedForeground} />}
            title="No presets yet"
            body="Create a rhythm for deep work, admin tasks or reading."
          />
        </Card>
      ) : (
        <View style={{ gap: 12 }}>
          {presets.map((p) => (
            <Card key={p.id} style={{ padding: 16 }}>
              <View style={styles.head}>
                <Text variant="display" size={16} numberOfLines={1} style={{ flex: 1 }}>{p.name}</Text>
                {activeId === p.id && <Badge label="Active" color={colors.success} />}
              </View>
              <View style={[styles.row, { marginTop: 12 }]}>
                {[
                  { v: p.focus, l: 'Focus', c: colors.primary },
                  { v: p.brk, l: 'Break', c: colors.accent },
                  { v: p.long, l: 'Long', c: colors.success },
                ].map(({ v, l, c }) => (
                  <View key={l} style={styles.interval}>
                    <Text variant="display" size={20} color={c}>{v}m</Text>
                    <Text variant="label" size={9} style={{ marginTop: 2 }}>{l}</Text>
                  </View>
                ))}
              </View>
              <View style={[styles.row, { marginTop: 12, alignItems: 'center' }]}>
                <Press onPress={() => setActiveId(p.id)} style={styles.select}>
                  <Play size={16} color={colors.foreground} />
                  <Text size={14} weight="semibold">Select</Text>
                </Press>
                <Press
                  onPress={() => setPresets((prev) => prev.filter((x) => x.id !== p.id))}
                  accessibilityLabel="Delete preset"
                  style={styles.delete}
                >
                  <Trash2 size={16} color={colors.destructive} />
                </Press>
              </View>
            </Card>
          ))}
        </View>
      )}

      <PrimaryButton onPress={() => setSheet(true)}>
        <Plus size={20} color={colors.primaryForeground} />
        <ButtonLabel>New Preset</ButtonLabel>
      </PrimaryButton>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="New preset">
        <View style={{ gap: 16 }}>
          <Input autoFocus value={name} onChangeText={setName} placeholder="Preset name" />
          {[
            { label: 'Focus', value: focus, set: setFocus },
            { label: 'Break', value: brk, set: setBrk },
            { label: 'Long break', value: long, set: setLong },
          ].map(({ label, value, set }) => (
            <View key={label}>
              <Text variant="label" style={{ marginBottom: 6 }}>{label}</Text>
              <Stepper value={value} onChange={set} />
            </View>
          ))}
          <PrimaryButton onPress={create}>
            <ButtonLabel>Create preset</ButtonLabel>
          </PrimaryButton>
        </View>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  row: { flexDirection: 'row', gap: 8 },
  interval: { flex: 1, alignItems: 'center', borderRadius: radius['2xl'], backgroundColor: alpha(colors.secondary, 0.5), paddingVertical: 12 },
  select: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius['2xl'],
    backgroundColor: colors.muted,
    paddingVertical: 12,
  },
  delete: {
    width: 44,
    height: 44,
    borderRadius: radius['2xl'],
    backgroundColor: alpha(colors.destructive, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
