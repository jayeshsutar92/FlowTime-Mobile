import {
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CloudRain,
  Contrast,
  Flag,
  Gauge,
  Headphones,
  HelpCircle,
  Lock,
  Moon,
  Mountain,
  Palette,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Target,
  Timer,
  UserRoundCog,
  Waves,
  Zap,
} from 'lucide-react-native';

export const presets = [
  { title: 'Deep Work', detail: '25m Work | 5m Break | 4\nSessions', active: true },
  { title: 'Admin Tasks', detail: '15m Work | 2m Break | 6\nSessions' },
  { title: 'Light Reading', detail: '45m Work | 15m Break | 2\nSessions' },
  { title: 'Quick Sprint', detail: '10m Work | 2m Break | 3\nSessions' },
];

export const tracks = [
  { title: 'Brown Noise Deep Bass', meta: 'Binaural  •  45:00', icon: Waves },
  { title: 'Silicon Valley Office Rain', meta: 'Ambient  •  1:20:00', icon: CloudRain },
  { title: 'Gamma Wave Synthesis', meta: 'Focus  •  30:00', icon: BarChart3 },
  { title: 'Nordic Forest Wind', meta: 'Nature  •  55:00', icon: Mountain },
];

export const goals = [
  { title: 'Deep Work', body: 'Long, uninterrupted sessions for complex problem solving and focus.', icon: Brain },
  { title: 'Learning', body: 'Balanced intervals optimized for retention, study, and research.', icon: BookOpen },
  { title: 'Creative Flow', body: 'Flexible rhythms for design, writing, and artistic exploration.', icon: Palette },
  { title: 'Admin Tasks', body: 'Short bursts for emails, scheduling, and organizational maintenance.', icon: BriefcaseBusiness },
];

export const profileSettings = [
  { title: 'Personal Goals', icon: Target },
  { title: 'Account Security', icon: Shield },
  { title: 'App Preferences', icon: SlidersHorizontal, route: 'Preferences' },
  { title: 'Notifications', icon: Bell },
  { title: 'Help & Support', icon: HelpCircle },
];

export const preferences = {
  focus: [
    { title: 'Auto-DND', subtitle: 'Automatically enable Do Not Disturb', icon: Gauge, on: true },
    { title: 'Lock Screen Focus', subtitle: 'Keep focus controls on lock screen', icon: Lock, on: false },
    { title: 'Strict Mode', subtitle: 'Prevent app closing during sessions', icon: Shield, on: true },
  ],
  notifications: [
    { title: 'Session Reminders', icon: Bell },
    { title: 'Break Alerts', icon: Timer },
    { title: 'Daily Goals', icon: Flag },
  ],
  visuals: [
    { title: 'Amoled Black Mode', subtitle: 'True black for OLED screens', icon: Moon, on: true },
    { title: 'High Contrast Mode', subtitle: 'Increase text readability', icon: Contrast, on: false },
  ],
};

export const landingFeatures = [
  { title: 'Adaptive Timer', body: 'Flow-state sequences that adjust based on your cognitive load.', icon: Timer },
  { title: 'Deep Analytics', body: 'Visualize your peak focus hours with technical precision.', icon: BarChart3 },
  { title: 'Sonic Shields', body: 'AI-generated soundscapes that block distracting frequencies.', icon: UserRoundCog },
];

export const rhythmTips = [
  { title: 'Cognitive Flow', body: 'Sustained sessions of 25+ minutes allow for "Deep Work" by minimizing context switching.', icon: Brain },
  { title: 'Neural Recovery', body: 'Short breaks prevent decision fatigue and help consolidate new information in the brain.', icon: Zap },
];

export const timeline = [
  { title: 'Strategic Planning', meta: 'Deep Work • Flow', time: '9:00 AM', duration: '120 min', active: true },
  { title: 'Concept Sketching', meta: 'Creative Flow • Mood', time: '2:15 PM', duration: '45 min', active: true },
  { title: 'Email Triaging', meta: 'Admin Tasks', time: '4:30 PM', duration: '30 min' },
];

export const images = {
  landingBg: require('../assets/images/landing-bg.png'),
  profileAvatar: require('../assets/images/profile-avatar.png'),
  soundFocus: require('../assets/images/sound-focus.png'),
  soundMidnight: require('../assets/images/sound-midnight.png'),
  albumFocus: require('../assets/images/album-focus.png'),
  insightCard: require('../assets/images/insight-card.png'),
  lastSession: require('../assets/images/last-session.png'),
};
