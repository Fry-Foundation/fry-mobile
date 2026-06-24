/**
 * Mock data for development.
 * In production, this is replaced by API calls to dashboard.frynetworks.com
 * and the hardwareapi on ZEUS00.
 */

export interface Miner {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline';
  uptime: string;
  uptimePercent: number;
  todayFry: string;
  todayValue: number;
  totalFry: string;
  multiplier: string;
  multiplierColor: string;
  iconName: string;
  iconColor: string;
  borderColor: string;
  badgeText: string;
  badgeType: 'teal' | 'red' | 'amber' | 'gray';
  integrations: IntegrationStatus[];
  ip: string;
  registered: string;
}

export interface IntegrationStatus {
  name: string;
  icon: string;
  active: boolean;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  color: string; // dot color
  type: 'reward' | 'alert' | 'governance';
}

export interface EpochBreakdown {
  device: string;
  multiplier: string;
  multiplierColor: string;
  fry: string;
}

export interface Payout {
  id: string;
  label: string;
  txid: string;
  amount: string;
  timeAgo: string;
}

export const MOCK_MINERS: Miner[] = [
  {
    id: 'rpi-a4f2',
    name: 'RPi-MINER-A4F2',
    type: 'Raspberry Pi 4',
    status: 'online',
    uptime: '98.4%',
    uptimePercent: 98,
    todayFry: '+0.82 FRY',
    todayValue: 0.82,
    totalFry: '1,241.30 FRY',
    multiplier: '1.5×',
    multiplierColor: '#00c49a',
    iconName: 'cpu',
    iconColor: '#4a9eff',
    borderColor: '#2c2c33',
    badgeText: 'VFD',
    badgeType: 'teal',
    integrations: [
      { name: 'Mysterium VPN', icon: 'globe', active: true, color: '#00c49a' },
      { name: 'Presearch', icon: 'search', active: true, color: '#4a9eff' },
      { name: 'Diiisco', icon: 'database', active: false, color: '#5c5955' },
      { name: 'Olostep', icon: 'route', active: false, color: '#5c5955' },
      { name: 'SpaceAcres', icon: 'box', active: false, color: '#5c5955' },
    ],
    ip: '192.168.1.100',
    registered: '2025-08-14',
  },
  {
    id: 'fhub-8b91',
    name: 'FHUB-PRO-8B91',
    type: 'FryHub Pro',
    status: 'online',
    uptime: '99.9%',
    uptimePercent: 99,
    todayFry: '+1.44 FRY',
    todayValue: 1.44,
    totalFry: '3,892.10 FRY',
    multiplier: '3×',
    multiplierColor: '#e5271c',
    iconName: 'server',
    iconColor: '#e5271c',
    borderColor: '#e5271c',
    badgeText: '3×MAX',
    badgeType: 'red',
    integrations: [
      { name: 'Mysterium VPN', icon: 'globe', active: true, color: '#00c49a' },
      { name: 'Presearch', icon: 'search', active: true, color: '#4a9eff' },
      { name: 'Diiisco', icon: 'database', active: true, color: '#00c49a' },
      { name: 'Olostep', icon: 'route', active: true, color: '#00c49a' },
      { name: 'SpaceAcres', icon: 'box', active: false, color: '#5c5955' },
    ],
    ip: '192.168.1.101',
    registered: '2025-06-01',
  },
  {
    id: 'desk-e912',
    name: 'DESK-NODE-E912',
    type: 'Desktop Node',
    status: 'online',
    uptime: '100%',
    uptimePercent: 100,
    todayFry: '+0.55 FRY',
    todayValue: 0.55,
    totalFry: '802.40 FRY',
    multiplier: '1×',
    multiplierColor: '#9b9793',
    iconName: 'device-laptop',
    iconColor: '#4a9eff',
    borderColor: '#2c2c33',
    badgeText: 'STK',
    badgeType: 'gray',
    integrations: [
      { name: 'Mysterium VPN', icon: 'globe', active: false, color: '#5c5955' },
      { name: 'Presearch', icon: 'search', active: true, color: '#4a9eff' },
      { name: 'Diiisco', icon: 'database', active: false, color: '#5c5955' },
      { name: 'Olostep', icon: 'route', active: false, color: '#5c5955' },
      { name: 'SpaceAcres', icon: 'box', active: false, color: '#5c5955' },
    ],
    ip: '192.168.1.50',
    registered: '2025-09-22',
  },
  {
    id: 'nano-3c07',
    name: 'NANO-UNIT-3C07',
    type: 'Arduino Nano',
    status: 'offline',
    uptime: '0%',
    uptimePercent: 0,
    todayFry: '+0.00 FRY',
    todayValue: 0,
    totalFry: '0.00 FRY',
    multiplier: '0×',
    multiplierColor: '#3c3c45',
    iconName: 'cpu',
    iconColor: '#3c3c45',
    borderColor: '#2c2c33',
    badgeText: 'OFF',
    badgeType: 'gray',
    integrations: [
      { name: 'Mysterium VPN', icon: 'globe', active: false, color: '#5c5955' },
      { name: 'Presearch', icon: 'search', active: false, color: '#5c5955' },
      { name: 'Diiisco', icon: 'database', active: false, color: '#5c5955' },
      { name: 'Olostep', icon: 'route', active: false, color: '#5c5955' },
      { name: 'SpaceAcres', icon: 'box', active: false, color: '#5c5955' },
    ],
    ip: '—',
    registered: '2026-01-10',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Epoch 2 rewards ready',
    body: '1,248.50 FRY claimable',
    time: '2 hours ago',
    color: '#00c49a',
    type: 'reward',
  },
  {
    id: 'n2',
    title: 'NANO-UNIT-3C07 offline',
    body: 'Device offline 6+ hours',
    time: '6 hours ago',
    color: '#e5271c',
    type: 'alert',
  },
  {
    id: 'n3',
    title: 'FIP-017 vote now open',
    body: 'FRY 3.0 governance snapshot',
    time: '1 day ago',
    color: '#f0a500',
    type: 'governance',
  },
];

export const MOCK_EPOCH_BREAKDOWN: EpochBreakdown[] = [
  { device: 'RPi-MINER-A4F2', multiplier: '1.5×', multiplierColor: '#00c49a', fry: '412.50' },
  { device: 'FHUB-PRO-8B91', multiplier: '3×', multiplierColor: '#e5271c', fry: '781.00' },
  { device: 'DESK-NODE-E912', multiplier: '1×', multiplierColor: '#9b9793', fry: '55.00' },
];

export const MOCK_PAYOUTS: Payout[] = [
  { id: 'p1', label: 'Epoch 1 Payout', txid: '8K4F…A92C', amount: '+984.20 FRY', timeAgo: '7 days ago' },
  { id: 'p2', label: 'Epoch 0 Payout', txid: '3BX1…F50D', amount: '+642.75 FRY', timeAgo: '14 days ago' },
];

export const MOCK_WALLET = 'JONBQZE4...'; // truncated display
export const MOCK_WALLET_SHORT = 'JONB...QZE4';
export const MOCK_CLAIMABLE = '1,248.50';
export const MOCK_CLAIMABLE_USD = '≈ $4.12 USDC';

export const DEVICE_TYPES = [
  { name: 'Raspberry Pi 4', icon: 'cpu', color: '#4a9eff' },
  { name: 'FryHub Pro', icon: 'server', color: '#e5271c' },
  { name: 'Arduino Nano', icon: 'cpu', color: '#9b9793' },
  { name: 'Desktop Node', icon: 'device-laptop', color: '#4a9eff' },
  { name: 'NVIDIA Jetson Nano', icon: 'cpu', color: '#00c49a' },
  { name: 'Orange Pi 5', icon: 'cpu', color: '#f0a500' },
] as const;

// Mock log entries for miner detail
export const MOCK_LOGS = [
  { time: '09:38:14', level: 'INFO' as const, message: 'Uptime heartbeat OK' },
  { time: '09:35:01', level: 'INFO' as const, message: 'Mysterium: 1.2 GB served' },
  { time: '09:30:44', level: 'WARN' as const, message: 'Diiisco sync delayed 12s' },
  { time: '09:28:31', level: 'INFO' as const, message: 'Presearch: 1,024 queries' },
  { time: '09:25:00', level: 'INFO' as const, message: 'Epoch 2 checkpoint saved' },
  { time: '09:20:19', level: 'INFO' as const, message: 'FRY epoch tick received' },
  { time: '09:15:00', level: 'INFO' as const, message: 'Uptime heartbeat OK' },
  { time: '09:10:44', level: 'ERR' as const, message: 'Olostep connection timeout' },
  { time: '09:05:31', level: 'INFO' as const, message: 'Device registered on ATLAS00' },
];
