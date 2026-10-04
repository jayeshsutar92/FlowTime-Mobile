import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Heart, ListMusic, Pause, Play, SkipBack, SkipForward, Upload, Waves } from 'lucide-react-native';
import { colors, alpha, glow, radius } from '../theme';
import { Card, EmptyState, Gradient, Press, ProgressBar, Segmented, Text } from '../components/ui';
import { Screen } from '../components/Screen';
import type { Track } from '../types/models';

const TABS = ['Library', 'Playlists', 'Favorites'] as const;
type Tab = (typeof TABS)[number];

/** HSL artwork gradient derived from a track hue (web used oklch). */
function art(hue: number): [string, string] {
  return [`hsla(${hue}, 60%, 50%, 0.85)`, `hsla(${hue + 30}, 45%, 28%, 0.85)`];
}

export function MusicScreen() {
  const [tab, setTab] = useState<Tab>('Library');
  // Load the audio library from the existing API.
  const [tracks] = useState<Track[]>([]);
  const [currentId, setCurrentId] = useState<Track['id'] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [favorites, setFavorites] = useState<Track['id'][]>([]);

  const current = tracks.find((t) => t.id === currentId) ?? null;
  const visible = tab === 'Favorites' ? tracks.filter((t) => favorites.includes(t.id)) : tracks;

  const miniPlayer = current ? (
    <View style={styles.miniWrap} pointerEvents="box-none">
      <View style={styles.mini}>
        <View style={styles.miniRow}>
          <Gradient from={art(current.hue)[0]} to={art(current.hue)[1]} borderRadius={radius.md} style={styles.miniArt}>
            <Waves size={20} color={colors.primaryForeground} />
          </Gradient>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text size={14} weight="bold" numberOfLines={1}>{current.title}</Text>
            <Text size={12} color={colors.mutedForeground} numberOfLines={1}>{current.artist}</Text>
          </View>
          <View style={styles.miniCtl}>
            <Press accessibilityLabel="Previous" style={{ padding: 8 }}>
              <SkipBack size={18} color={colors.mutedForeground} fill={colors.mutedForeground} />
            </Press>
            <Press
              accessibilityLabel={playing ? 'Pause' : 'Play'}
              onPress={() => setPlaying((p) => !p)}
              style={[glow, { borderRadius: 22 }]}
            >
              <Gradient borderRadius={22} style={styles.miniPlay}>
                {playing ? (
                  <Pause size={20} color={colors.primaryForeground} fill={colors.primaryForeground} />
                ) : (
                  <Play size={20} color={colors.primaryForeground} fill={colors.primaryForeground} style={{ marginLeft: 2 }} />
                )}
              </Gradient>
            </Press>
            <Press accessibilityLabel="Next" style={{ padding: 8 }}>
              <SkipForward size={18} color={colors.mutedForeground} fill={colors.mutedForeground} />
            </Press>
          </View>
        </View>
        <View style={{ marginTop: 12 }}>
          <ProgressBar value={0} height={4} />
        </View>
      </View>
    </View>
  ) : null;

  return (
    <Screen footer={miniPlayer}>
      <View style={styles.header}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={styles.titleRow}>
            <Waves size={24} color={colors.primary} />
            <Text variant="display" size={24} numberOfLines={1} style={{ flexShrink: 1 }}>Focus Ambience</Text>
          </View>
          <Text size={14} color={colors.mutedForeground} style={{ marginTop: 4 }}>
            Binaural beats and soundscapes that drop you into flow.
          </Text>
        </View>
        <Press style={[glow, { borderRadius: radius['2xl'] }]}>
          <Gradient borderRadius={radius['2xl']} style={styles.upload}>
            <Upload size={16} color={colors.primaryForeground} />
            <Text size={14} weight="bold" color={colors.primaryForeground}>Upload</Text>
          </Gradient>
        </Press>
      </View>

      <Segmented options={TABS} value={tab} onChange={setTab} />

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Waves size={28} color={colors.mutedForeground} />}
            title="No tracks here yet"
            body="Add music or favorite tracks to start listening."
          />
        </Card>
      ) : (
        <View style={{ gap: 10 }}>
          {visible.map((t) => {
            const active = currentId === t.id;
            const fav = favorites.includes(t.id);
            const [a, b] = art(t.hue);
            return (
              <Press
                key={t.id}
                onPress={() => {
                  setCurrentId(t.id);
                  setPlaying(true);
                }}
                style={[
                  styles.track,
                  active
                    ? { borderColor: alpha(colors.primary, 0.4), backgroundColor: alpha(colors.primary, 0.1) }
                    : { borderColor: colors.border, backgroundColor: colors.card },
                ]}
              >
                <Gradient from={a} to={b} borderRadius={radius.md} style={styles.art}>
                  {active && playing ? (
                    <Pause size={20} color={colors.primaryForeground} fill={colors.primaryForeground} />
                  ) : (
                    <Play size={20} color={colors.primaryForeground} fill={colors.primaryForeground} style={{ marginLeft: 2 }} />
                  )}
                </Gradient>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text size={14} weight="semibold" numberOfLines={1}>{t.title}</Text>
                  <Text size={12} color={colors.mutedForeground} numberOfLines={1}>
                    {t.artist} · {t.duration}
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel="Favorite"
                  hitSlop={8}
                  style={{ padding: 8 }}
                  onPress={() =>
                    setFavorites((f) => (f.includes(t.id) ? f.filter((x) => x !== t.id) : [...f, t.id]))
                  }
                >
                  <Heart
                    size={18}
                    color={fav ? colors.destructive : colors.mutedForeground}
                    fill={fav ? colors.destructive : 'transparent'}
                  />
                </Pressable>
              </Press>
            );
          })}
        </View>
      )}

      {/* Active queue */}
      <Card>
        <View style={styles.queueHead}>
          <ListMusic size={16} color={colors.primary} />
          <Text variant="label">Active Queue</Text>
          <Text size={12} weight="semibold" color={colors.mutedForeground} style={{ marginLeft: 'auto' }}>
            {current ? 1 : 0} Tracks
          </Text>
        </View>
        {current ? (
          <Text size={14} weight="semibold" numberOfLines={1} style={{ marginTop: 12 }}>
            {current.title} <Text color={colors.mutedForeground}>— {current.artist}</Text>
          </Text>
        ) : (
          <EmptyState icon={<Waves size={28} color={colors.mutedForeground} />} title="Queue is empty" />
        )}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  upload: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10 },
  track: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: radius['2xl'], borderWidth: 1, padding: 12 },
  art: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  queueHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  miniWrap: { position: 'absolute', left: 0, right: 0, bottom: 100, paddingHorizontal: 20 },
  mini: {
    borderRadius: radius['3xl'],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: alpha(colors.popover, 0.97),
    padding: 12,
    elevation: 20,
  },
  miniRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  miniArt: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  miniCtl: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  miniPlay: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
