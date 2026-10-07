import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Award,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Plus,
  Target,
  Trash2,
} from 'lucide-react-native';
import { colors, alpha, glow, radius } from '../theme';
import {
  Badge,
  ButtonLabel,
  Card,
  Chip,
  EmptyState,
  Gradient,
  Input,
  Press,
  PrimaryButton,
  SectionTitle,
  Sheet,
  StatTile,
  Text,
} from '../components/ui';
import { Screen } from '../components/Screen';
import type { Contribution, Priority } from '../types/models';

const PRIORITIES: Priority[] = ['Low', 'Normal', 'High'];
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DASH = '—';

/** Summary stats shown in the four tiles. Populate from the Django API. */
type ContributionStats = { completion: string; streak: string; points: string; bestDay: string };

export function ContributionsScreen() {
  const [items, setItems] = useState<Contribution[]>([]);
  const [stats] = useState<ContributionStats | null>(null);
  /** Day-of-month numbers that have contributions in the visible month. */
  const [filledDays] = useState<number[]>([]);
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [sheet, setSheet] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState<Priority>('Normal');
  const [notes, setNotes] = useState('');

  const done = items.filter((i) => i.done).length;

  const { daysInMonth, leadingPad, monthLabel } = useMemo(() => {
    const dim = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const pad = (month.getDay() + 6) % 7; // Monday-first
    return {
      daysInMonth: dim,
      leadingPad: pad,
      monthLabel: month.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    };
  }, [month]);

  const shiftMonth = (delta: number) => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
    setSelectedDay(null);
  };

  const add = () => {
    if (!title.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), title: title.trim(), note: note.trim() || undefined, priority, done: false },
    ]);
    setTitle('');
    setNote('');
    setPriority('Normal');
    setSheet(false);
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingPad }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Screen>
      <View>
        <Text variant="display" size={24} center>Daily Contributions</Text>
        <Text size={14} color={colors.mutedForeground} center style={{ marginTop: 4, alignSelf: 'center', maxWidth: 280 }}>
          Track meaningful work independent of focus timers.
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <View style={styles.row}>
          <StatTile icon={<Target size={20} color={colors.primary} />} label="Completion" value={stats?.completion ?? DASH} />
          <StatTile icon={<Flame size={20} color={colors.warning} />} label="Streak" value={stats?.streak ?? DASH} />
        </View>
        <View style={styles.row}>
          <StatTile icon={<Award size={20} color={colors.success} />} label="Points" value={stats?.points ?? DASH} />
          <StatTile icon={<CalendarDays size={20} color={colors.accent} />} label="Best day" value={stats?.bestDay ?? DASH} />
        </View>
      </View>

      {/* Today */}
      <Card>
        <SectionTitle
          title="Today"
          action={
            <View style={styles.counter}>
              <Text variant="mono" weight="bold" size={12} color={colors.primary}>
                {done} / {items.length}
              </Text>
            </View>
          }
        />
        <View style={{ marginTop: 16, gap: 10 }}>
          {items.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={28} color={colors.mutedForeground} />}
              title="No contributions yet"
              body="Log your first task to start building your streak."
            />
          ) : (
            items.map((item) => (
              <View key={item.id} style={styles.item}>
                <Press
                  onPress={() =>
                    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, done: !i.done } : i)))
                  }
                  accessibilityLabel="Toggle complete"
                  style={[
                    styles.check,
                    item.done
                      ? { borderColor: colors.success, backgroundColor: colors.success }
                      : { borderColor: alpha(colors.mutedForeground, 0.4) },
                  ]}
                >
                  {item.done && <Check size={16} strokeWidth={3} color={colors.successForeground} />}
                </Press>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    size={14}
                    weight="semibold"
                    numberOfLines={1}
                    color={item.done ? colors.mutedForeground : colors.foreground}
                    style={item.done && { textDecorationLine: 'line-through' }}
                  >
                    {item.title}
                  </Text>
                  {item.note ? (
                    <Text size={12} color={colors.mutedForeground} numberOfLines={1}>{item.note}</Text>
                  ) : null}
                </View>
                <Badge
                  label={item.priority}
                  color={item.priority === 'High' ? colors.destructive : item.priority === 'Low' ? colors.mutedForeground : colors.primary}
                  bg={item.priority === 'Low' ? colors.muted : undefined}
                />
                <Pressable
                  onPress={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                  accessibilityLabel="Delete"
                  hitSlop={8}
                  style={{ padding: 4 }}
                >
                  <Trash2 size={16} color={colors.mutedForeground} />
                </Pressable>
              </View>
            ))
          )}
        </View>
        <Press onPress={() => setSheet(true)} style={styles.dashed}>
          <Plus size={16} color={colors.mutedForeground} />
          <Text size={14} weight="semibold" color={colors.mutedForeground}>Log a contribution</Text>
        </Press>
      </Card>

      {/* Calendar */}
      <Card>
        <View style={styles.calHeader}>
          <Press onPress={() => shiftMonth(-1)} accessibilityLabel="Previous month" style={styles.round}>
            <ChevronLeft size={16} color={colors.foreground} />
          </Press>
          <Text variant="display" size={16} center style={{ flex: 1 }}>{monthLabel}</Text>
          <Press onPress={() => shiftMonth(1)} accessibilityLabel="Next month" style={styles.round}>
            <ChevronRight size={16} color={colors.foreground} />
          </Press>
        </View>
        <View style={[styles.week, { marginTop: 20 }]}>
          {WEEKDAYS.map((d, i) => (
            <Text key={i} variant="mono" size={10} color={colors.mutedForeground} center style={styles.cellW}>
              {d}
            </Text>
          ))}
        </View>
        {Array.from({ length: cells.length / 7 }).map((_, w) => (
          <View key={w} style={[styles.week, { marginTop: 6 }]}>
            {cells.slice(w * 7, w * 7 + 7).map((day, i) => {
              if (day == null) return <View key={i} style={styles.cellW} />;
              const filled = filledDays.includes(day);
              const selected = selectedDay === day;
              return (
                <Press key={i} onPress={() => setSelectedDay(day)} style={styles.cellW}>
                  {selected ? (
                    <Gradient borderRadius={radius.md} style={[styles.cell, glow]}>
                      <Text size={12} weight="semibold" color={colors.primaryForeground}>{day}</Text>
                    </Gradient>
                  ) : (
                    <View
                      style={[
                        styles.cell,
                        { backgroundColor: filled ? alpha(colors.success, 0.25) : alpha(colors.secondary, 0.5) },
                      ]}
                    >
                      <Text size={12} weight="semibold" color={filled ? colors.success : colors.mutedForeground}>{day}</Text>
                    </View>
                  )}
                </Press>
              );
            })}
          </View>
        ))}
        <View style={styles.dayInfo}>
          {selectedDay ? (
            <>
              <Text variant="display" size={14} center>
                {month.toLocaleString('en-US', { month: 'long' })} {selectedDay}, {month.getFullYear()}
              </Text>
              <Text size={12} color={colors.mutedForeground} center style={{ marginTop: 4 }}>
                {filledDays.includes(selectedDay) ? 'Contributions logged this day.' : 'No contributions logged this day.'}
              </Text>
            </>
          ) : (
            <Text size={12} color={colors.mutedForeground} center>
              Tap any date to view past contributions.
            </Text>
          )}
        </View>
      </Card>

      {/* Scratchpad */}
      <Card>
        <SectionTitle title="Notes / Scratchpad" subtitle="A temporary place for ideas and to-dos." />
        <Input
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="- Fix authentication bug"
          style={styles.textarea}
        />
      </Card>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Log a contribution">
        <View style={{ gap: 16 }}>
          <Input autoFocus value={title} onChangeText={setTitle} placeholder="What did you achieve today?" />
          <Input value={note} onChangeText={setNote} placeholder="Add optional notes…" />
          <View style={styles.row}>
            {PRIORITIES.map((p) => (
              <Chip key={p} label={p} active={priority === p} onPress={() => setPriority(p)} style={{ borderRadius: radius.md, paddingVertical: 10 }} />
            ))}
          </View>
          <PrimaryButton onPress={add}>
            <Plus size={20} color={colors.primaryForeground} />
            <ButtonLabel>Add contribution</ButtonLabel>
          </PrimaryButton>
        </View>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  counter: { borderRadius: 999, backgroundColor: alpha(colors.primary, 0.15), paddingHorizontal: 12, paddingVertical: 4 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.4),
    padding: 14,
  },
  check: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  dashed: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    paddingVertical: 12,
  },
  calHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  round: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center' },
  week: { flexDirection: 'row', gap: 6 },
  cellW: { flex: 1 },
  cell: { aspectRatio: 1, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  dayInfo: {
    marginTop: 20,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.3),
    padding: 16,
  },
  textarea: { marginTop: 16, height: 128, paddingTop: 14, lineHeight: 22, backgroundColor: alpha(colors.secondary, 0.4) },
});
