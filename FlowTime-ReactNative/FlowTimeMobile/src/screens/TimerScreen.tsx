import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ChevronLeft, Pause, Play, RotateCcw, Sparkles, Timer as TimerIcon } from 'lucide-react-native';
import { colors, alpha, glow, radius } from '../theme';
import {
  ButtonLabel,
  Card,
  Chip,
  Gradient,
  Input,
  Press,
  PrimaryButton,
  Sheet,
  Stepper,
  Text,
} from '../components/ui';
import { Screen } from '../components/Screen';
import type { Phase, PhaseMinutes } from '../types/models';

const DEFAULT_MINUTES: PhaseMinutes = { Focus: 25, Break: 5, 'Long Break': 15 };
const PHASES: Phase[] = ['Focus', 'Break', 'Long Break'];
const QUICK = [15, 25, 50];

function format(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

type Mode = 'choose' | 'custom-setup' | 'running';

export function TimerScreen() {
  const [mode, setMode] = useState<Mode>('choose');
  const [config, setConfig] = useState<PhaseMinutes>(DEFAULT_MINUTES);
  const [draft, setDraft] = useState<PhaseMinutes>(DEFAULT_MINUTES);

  const startWith = (cfg: PhaseMinutes) => {
    setConfig(cfg);
    setMode('running');
  };

  if (mode === 'choose') {
    return (
      <Screen contentStyle={{ gap: 0 }}>
        <Text variant="display" size={24}>Choose your timer</Text>
        <Text size={14} color={colors.mutedForeground} style={{ marginTop: 4 }}>
          Pick a rhythm to start focusing.
        </Text>
        <Press
          onPress={() => startWith(DEFAULT_MINUTES)}
          style={[styles.choice, { marginTop: 24, borderColor: alpha(colors.primary, 0.4), backgroundColor: alpha(colors.primary, 0.1) }]}
        >
          <Gradient borderRadius={radius['2xl']} style={[styles.choiceIcon, glow]}>
            <TimerIcon size={24} color={colors.primaryForeground} />
          </Gradient>
          <View style={{ flex: 1 }}>
            <Text variant="display" size={18}>Default Timer</Text>
            <Text variant="mono" weight="medium" size={12} color={colors.mutedForeground}>
              25m focus · 5m break · 15m long
            </Text>
          </View>
        </Press>
        <Press
          onPress={() => setMode('custom-setup')}
          style={[styles.choice, { marginTop: 12, borderColor: colors.border, backgroundColor: colors.card }]}
        >
          <View style={[styles.choiceIcon, { backgroundColor: colors.muted }]}>
            <Sparkles size={24} color={colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="display" size={18}>Custom Timer</Text>
            <Text size={12} color={colors.mutedForeground}>Set your own focus and break lengths</Text>
          </View>
        </Press>
      </Screen>
    );
  }

  if (mode === 'custom-setup') {
    return (
      <Screen contentStyle={{ gap: 0 }}>
        <BackLink label="Back" onPress={() => setMode('choose')} />
        <Text variant="display" size={24}>Custom Timer</Text>
        <Text size={14} color={colors.mutedForeground} style={{ marginTop: 4 }}>
          Tune each phase to your flow.
        </Text>
        <Card style={{ marginTop: 24, gap: 16 }}>
          {PHASES.map((p) => (
            <View key={p}>
              <Text variant="label" style={{ marginBottom: 8 }}>{p}</Text>
              <Stepper value={draft[p]} onChange={(v) => setDraft((d) => ({ ...d, [p]: v }))} />
            </View>
          ))}
        </Card>
        <PrimaryButton style={{ marginTop: 24 }} onPress={() => startWith(draft)}>
          <Play size={20} color={colors.primaryForeground} fill={colors.primaryForeground} />
          <ButtonLabel>Start Custom Timer</ButtonLabel>
        </PrimaryButton>
      </Screen>
    );
  }

  return <RunningTimer config={config} onChange={() => setMode('choose')} />;
}

function BackLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Press onPress={onPress} style={styles.back}>
      <ChevronLeft size={16} color={colors.mutedForeground} />
      <Text size={14} weight="semibold" color={colors.mutedForeground}>{label}</Text>
    </Press>
  );
}

const SIZE = 280;
const R = 124;
const CIRC = 2 * Math.PI * R;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function RunningTimer({ config, onChange }: { config: PhaseMinutes; onChange: () => void }) {
  const [phase, setPhase] = useState<Phase>('Focus');
  const [minutes, setMinutes] = useState(config.Focus);
  const [secondsLeft, setSecondsLeft] = useState(config.Focus * 60);
  const [running, setRunning] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [customMin, setCustomMin] = useState(45);
  const [intention, setIntention] = useState('');
  const cycle = 1;

  const total = minutes * 60;
  const progress = total === 0 ? 0 : 1 - secondsLeft / total;

  // Smooth ring progress.
  const progressAnim = useRef(new Animated.Value(progress)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: running ? 1000 : 250,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress, running, progressAnim]);
  const dashOffset = progressAnim.interpolate({ inputRange: [0, 1], outputRange: [CIRC, 0] });

  // Pulse ring while running.
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!running) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.bezier(0.4, 0, 0.6, 1), useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [running, pulse]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const applyDuration = (mins: number) => {
    setMinutes(mins);
    setSecondsLeft(mins * 60);
    setRunning(false);
  };
  const pickPhase = (p: Phase) => {
    setPhase(p);
    applyDuration(config[p]);
  };

  const ringColor = phase === 'Focus' ? colors.primary : colors.success;

  return (
    <Screen contentStyle={{ alignItems: 'center', gap: 0 }}>
      <View style={{ alignSelf: 'stretch' }}>
        <BackLink label="Change timer" onPress={onChange} />
      </View>

      {/* Phase pills */}
      <View style={styles.rowFull}>
        {PHASES.map((p) => (
          <Chip key={p} label={p} active={phase === p} onPress={() => pickPhase(p)} />
        ))}
      </View>

      {/* Ring */}
      <View style={{ marginTop: 40, width: SIZE, height: SIZE }}>
        {running && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pulse,
              {
                opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }),
                transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }],
              },
            ]}
          />
        )}
        <Svg width={SIZE} height={SIZE} viewBox="0 0 280 280" style={{ transform: [{ rotate: '-90deg' }] }}>
          <Circle cx="140" cy="140" r={R} fill="none" stroke={colors.secondary} strokeWidth={10} />
          <AnimatedCircle
            cx="140"
            cy="140"
            r={R}
            fill="none"
            stroke={ringColor}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
          />
        </Svg>
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <Text variant="label" style={{ letterSpacing: 3 }}>{phase} · Cycle {cycle}</Text>
          <Text variant="mono" weight="bold" size={56} style={{ marginTop: 8, fontVariant: ['tabular-nums'] }}>
            {format(secondsLeft)}
          </Text>
          <Text size={12} weight="medium" color={colors.mutedForeground} style={{ marginTop: 8 }}>
            {running ? 'Stay in the zone' : 'Paused — breathe'}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={[styles.controls]}>
        <Press onPress={() => applyDuration(minutes)} accessibilityLabel="Reset" style={styles.smallCtl}>
          <RotateCcw size={20} color={colors.mutedForeground} />
        </Press>
        <Press
          onPress={() => {
            if (!running && secondsLeft === 0) setSecondsLeft(total);
            setRunning((r) => !r);
          }}
          accessibilityLabel={running ? 'Pause' : 'Start'}
          style={[glow, { borderRadius: 40 }]}
        >
          <Gradient borderRadius={40} style={styles.bigCtl}>
            {running ? (
              <Pause size={32} color={colors.primaryForeground} fill={colors.primaryForeground} />
            ) : (
              <Play size={32} color={colors.primaryForeground} fill={colors.primaryForeground} style={{ marginLeft: 4 }} />
            )}
          </Gradient>
        </Press>
        <Press onPress={() => setSheetOpen(true)} accessibilityLabel="Timer options" style={styles.smallCtl}>
          <Sparkles size={20} color={colors.mutedForeground} />
        </Press>
      </View>

      {/* Quick durations */}
      <View style={{ marginTop: 40, alignSelf: 'stretch' }}>
        <Text variant="label" style={{ marginBottom: 10 }}>Quick durations</Text>
        <View style={styles.rowFull}>
          {QUICK.map((m) => (
            <Chip
              key={m}
              mono
              label={`${m}m`}
              active={minutes === m}
              onPress={() => applyDuration(m)}
              style={{ borderRadius: radius['2xl'], paddingVertical: 12, backgroundColor: minutes === m ? alpha(colors.primary, 0.15) : colors.card }}
            />
          ))}
        </View>
      </View>

      {/* Session intention */}
      <Card style={{ marginTop: 24, alignSelf: 'stretch' }}>
        <Text variant="display" size={14}>Session intention</Text>
        <Input
          placeholder="What are you focusing on?"
          value={intention}
          onChangeText={setIntention}
          style={{ marginTop: 12 }}
        />
      </Card>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Choose your timer">
        <View style={{ gap: 12 }}>
          <PrimaryButton
            onPress={() => {
              pickPhase('Focus');
              setSheetOpen(false);
            }}
          >
            <TimerIcon size={20} color={colors.primaryForeground} />
            <ButtonLabel>Default Timer</ButtonLabel>
          </PrimaryButton>
          <View style={styles.sheetBox}>
            <View style={[styles.rowFull, { marginBottom: 12, alignItems: 'center' }]}>
              <Sparkles size={16} color={colors.accent} />
              <Text size={14} weight="semibold">Custom Timer</Text>
            </View>
            <Stepper value={customMin} onChange={setCustomMin} />
            <Press
              onPress={() => {
                applyDuration(customMin);
                setSheetOpen(false);
              }}
              style={styles.useBtn}
            >
              <Text size={14} weight="semibold">Use {customMin} minutes</Text>
            </Press>
          </View>
        </View>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: radius['3xl'],
    borderWidth: 1,
  },
  choiceIcon: { width: 48, height: 48, borderRadius: radius['2xl'], alignItems: 'center', justifyContent: 'center' },
  back: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', marginBottom: 16, paddingVertical: 4 },
  rowFull: { flexDirection: 'row', gap: 8, alignSelf: 'stretch' },
  pulse: {
    position: 'absolute',
    top: -24,
    left: -24,
    right: -24,
    bottom: -24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: alpha(colors.primary, 0.4),
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  controls: { marginTop: 40, flexDirection: 'row', alignItems: 'center', gap: 20 },
  smallCtl: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigCtl: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  sheetBox: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.secondary, 0.4),
    padding: 16,
  },
  useBtn: {
    marginTop: 12,
    borderRadius: radius.md,
    backgroundColor: colors.muted,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
