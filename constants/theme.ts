/**
 * Fry Networks brand system
 * Source of truth for all visual constants across the mobile app.
 */

export const Colors = {
  // Core
  background: '#09090b',
  red: '#e5271c',
  teal: '#00c49a',
  amber: '#f0a500',
  blue: '#4a9eff',

  // Text
  text: '#efecea',
  muted: '#9b9793',
  dim: '#5c5955',

  // Surfaces
  surface1: '#141418',
  surface2: '#1b1b20',
  surface3: '#232328',
  surfaceNav: '#0e0e11',

  // Borders
  border1: '#2c2c33',
  border2: '#3c3c45',
  separator: '#1e1e22',

  // Semantic
  online: '#00c49a',
  offline: '#3c3c45',
  error: '#e5271c',
  warning: '#f0a500',
  info: '#4a9eff',
  success: '#00c49a',

  // Derived / alpha
  redAlpha: 'rgba(229, 39, 28, 0.1)',
  redAlphaBorder: 'rgba(229, 39, 28, 0.22)',
  tealAlpha: 'rgba(0, 196, 154, 0.1)',
  tealAlphaBorder: 'rgba(0, 196, 154, 0.22)',
  amberAlpha: 'rgba(240, 165, 0, 0.1)',
  amberAlphaBorder: 'rgba(240, 165, 0, 0.22)',
  blueAlpha: 'rgba(74, 158, 255, 0.1)',
  blueAlphaBorder: 'rgba(74, 158, 255, 0.2)',
  grayAlpha: 'rgba(92, 89, 85, 0.1)',

  // Button states
  redDark: '#701410',
  tealDark: '#007a60',
} as const;

export const Fonts = {
  logo: 'Syncopate_700Bold',
  heading: 'Rajdhani_700Bold',
  headingSemi: 'Rajdhani_600SemiBold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
} as const;

export const FontSizes = {
  xs: 9,
  sm: 10,
  base: 12,
  md: 13,
  lg: 14,
  xl: 16,
  '2xl': 20,
  '3xl': 26,
  '4xl': 30,
  '5xl': 36,
} as const;

export const Spacing = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  '2xl': 14,
  '3xl': 16,
  '4xl': 18,
  '5xl': 20,
  '6xl': 24,
} as const;

export const Radii = {
  sm: 3,
  md: 9,
  lg: 12,
  xl: 16,
  full: 999,
} as const;

// Verification stake multiplier tiers
// Source of truth: admin panel (main.products)
export const StakeTiers = [
  { key: '1', mult: '1', label: 'No Stake', color: Colors.muted, fnode: 'free' },
  { key: '1.5', mult: '1.5', label: 'Verified', color: Colors.red, fnode: '500 fNODE' },
  { key: '3', mult: '3', label: 'Maximum', color: Colors.amber, fnode: '1,500 fNODE' },
] as const;

// Token identifiers
export const Tokens = {
  FRY: { asa: 2485314946, symbol: 'FRY', name: 'FRY 2.0' },
  fNODE: { asa: 2485202024, symbol: 'fNODE', name: 'fNODE' },
  tFRY: { asa: 2681521901, symbol: 'tFRY', name: 'tFRY' },
  fVPN: { asa: 2485198745, symbol: 'fVPN', name: 'fVPN' },
} as const;

// Integration partners
export const Integrations = [
  { name: 'Mysterium VPN', icon: 'globe', color: Colors.teal },
  { name: 'Presearch', icon: 'search', color: Colors.blue },
  { name: 'Diiisco', icon: 'database', color: Colors.dim },
  { name: 'Olostep', icon: 'route', color: Colors.dim },
  { name: 'SpaceAcres', icon: 'box', color: Colors.dim },
] as const;
