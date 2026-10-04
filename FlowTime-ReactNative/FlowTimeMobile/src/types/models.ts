/**
 * UI view-models used by the screens. Map your existing Django API
 * responses onto these shapes when connecting the backend.
 */
export type Phase = 'Focus' | 'Break' | 'Long Break';
export type PhaseMinutes = Record<Phase, number>;

export type Priority = 'Low' | 'Normal' | 'High';

export type Contribution = {
  id: string | number;
  title: string;
  note?: string;
  priority: Priority;
  done: boolean;
};

export type Preset = {
  id: string | number;
  name: string;
  focus: number;
  brk: number;
  long: number;
};

export type Track = {
  id: string | number;
  title: string;
  artist: string;
  duration: string;
  /** Hue (0–360) used for the artwork gradient. */
  hue: number;
};

export type AdminUser = {
  id: string | number;
  name: string;
  email: string;
  role: 'Admin' | 'Moderator' | 'User';
  sessions: number;
  active: boolean;
};

export type UserProfile = {
  name: string;
  email: string;
  plan?: string;
  level?: number;
  xp?: number;
  xpTarget?: number;
  sessions?: number;
  focusedHours?: number;
  streakDays?: number;
};
