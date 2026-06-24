import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing, Radii } from '@/constants/theme';
import { Card, Badge, StatusDot, SectionHeader, Separator } from '@/components/ui';
import {
  MOCK_MINERS,
  MOCK_NOTIFICATIONS,
  MOCK_CLAIMABLE,
} from '@/constants/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [bellDot, setBellDot] = useState(true);

  const onlineMiners = MOCK_MINERS.filter((m) => m.status === 'online');
  const offlineMiners = MOCK_MINERS.filter((m) => m.status === 'offline');

  function dismissNotifs() {
    setShowNotifs(false);
    setBellDot(false);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Notification panel (collapsible) ── */}
        {showNotifs && (
          <View style={styles.notifPanel}>
            <View style={styles.notifHeader}>
              <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
              <Pressable onPress={dismissNotifs}>
                <Text style={styles.dismissText}>DISMISS ALL</Text>
              </Pressable>
            </View>
            <Separator />
            {MOCK_NOTIFICATIONS.map((n) => (
              <View key={n.id} style={styles.notifRow}>
                <View style={[styles.notifDot, { backgroundColor: n.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifTitle}>{n.title}</Text>
                  <Text style={styles.notifBody}>{n.body}</Text>
                  <Text style={styles.notifTime}>{n.time}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ── Header: logo + bell ── */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoF}>F</Text>
            </View>
            <Text style={styles.logoText}>FRYNETWORKS</Text>
          </View>
          <Pressable onPress={() => setShowNotifs(!showNotifs)} style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={19} color={Colors.muted} />
            {bellDot && <View style={styles.bellDot} />}
          </Pressable>
        </View>

        {/* ── Greeting ── */}
        <View style={styles.section}>
          <Text style={styles.label}>Welcome back</Text>
          <View style={styles.greetingRow}>
            <Text style={styles.userName}>SAMUEL</Text>
            <Badge text="EPOCH 2" variant="teal" />
          </View>

          {/* ── Claimable rewards hero ── */}
          <Card style={{ marginBottom: Spacing.xl, overflow: 'hidden', padding: 0 }}>
            <View style={styles.heroAccent} />
            <View style={styles.heroInner}>
              <Text style={[styles.label, { color: Colors.teal, marginBottom: 6 }]}>
                Claimable Rewards
              </Text>
              <View style={styles.heroAmountRow}>
                <Text style={styles.heroAmount}>{MOCK_CLAIMABLE}</Text>
                <Text style={styles.heroUnit}>FRY</Text>
              </View>
              <View style={styles.heroFooter}>
                <Text style={styles.monoSmall}>≈ $4.12 · 3,471 wallets</Text>
                <Pressable onPress={() => router.push('/rewards')}>
                  <Text style={styles.claimLink}>
                    CLAIM <Ionicons name="arrow-forward" size={11} color={Colors.teal} />
                  </Text>
                </Pressable>
              </View>
            </View>
          </Card>

          {/* ── Fleet overview ── */}
          <SectionHeader title="Fleet Overview" style={{ marginBottom: Spacing.md }} />
          <View style={styles.fleetGrid}>
            <Card style={styles.fleetCard}>
              <Text style={styles.fleetNumber}>19k+</Text>
              <Text style={styles.fleetLabel}>Total</Text>
            </Card>
            <Card style={styles.fleetCard}>
              <View style={styles.fleetInner}>
                <StatusDot online />
                <Text style={[styles.fleetNumber, { color: Colors.teal }]}>
                  {onlineMiners.length}
                </Text>
              </View>
              <Text style={styles.fleetLabel}>Online</Text>
            </Card>
            <Card style={styles.fleetCard}>
              <View style={styles.fleetInner}>
                <StatusDot online={false} />
                <Text style={[styles.fleetNumber, { color: Colors.muted }]}>
                  {offlineMiners.length}
                </Text>
              </View>
              <Text style={styles.fleetLabel}>Offline</Text>
            </Card>
          </View>

          {/* ── Quick actions ── */}
          <SectionHeader title="Quick Actions" style={{ marginBottom: Spacing.md }} />
          <View style={styles.qaGrid}>
            {[
              { icon: 'cash-outline', color: Colors.teal, label: 'Claim', route: '/rewards' },
              { icon: 'hardware-chip-outline', color: Colors.blue, label: 'Miners', route: '/miners' },
              { icon: 'shield-checkmark-outline', color: Colors.red, label: 'Stake', route: '/stake', highlight: true },
              { icon: 'qr-code-outline', color: Colors.amber, label: 'Scan', route: '/register' },
            ].map((qa) => (
              <Pressable
                key={qa.label}
                style={[styles.qaCard, qa.highlight && { borderColor: Colors.red }]}
                onPress={() => router.push(qa.route as any)}
              >
                <Ionicons name={qa.icon as any} size={18} color={qa.color} />
                <Text style={[styles.qaLabel, qa.highlight && { color: Colors.red }]}>
                  {qa.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* ── Active miners ── */}
          <SectionHeader
            title="Active Miners"
            right={
              <Pressable onPress={() => router.push('/miners')}>
                <Text style={styles.seeAll}>See All</Text>
              </Pressable>
            }
            style={{ marginBottom: Spacing.md }}
          />
        </View>

        <Separator />

        <View style={styles.section}>
          {MOCK_MINERS.slice(0, 3).map((m, i) => (
            <View
              key={m.id}
              style={[
                styles.minerRow,
                i === 2 && { borderBottomWidth: 0 },
              ]}
            >
              <StatusDot online={m.status === 'online'} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.minerName, m.status === 'offline' && { color: Colors.muted }]}>
                  {m.name}
                </Text>
                <Text style={styles.monoSmall}>
                  {m.type} · {m.multiplier}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.monoReward, { color: m.status === 'online' ? Colors.teal : Colors.offline }]}>
                  {m.todayFry}
                </Text>
                <Text style={styles.rewardSub}>{m.status === 'online' ? 'today' : 'offline'}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  section: { paddingHorizontal: Spacing['4xl'] },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['4xl'],
    paddingTop: Spacing.xl,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  logoBox: {
    width: 24,
    height: 24,
    backgroundColor: Colors.red,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoF: { fontFamily: Fonts.logo, fontSize: 9, color: '#fff' },
  logoText: { fontFamily: Fonts.logo, fontSize: 11, color: Colors.text, letterSpacing: 0.7 },
  bellBtn: { padding: 4, position: 'relative' },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.red,
    borderWidth: 1.5,
    borderColor: Colors.background,
  },

  // Greeting
  label: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.sm,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: Colors.dim,
    marginTop: Spacing['2xl'],
    marginBottom: 2,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: Spacing.xl,
  },
  userName: { fontFamily: Fonts.logo, fontSize: FontSizes.xl, color: Colors.text, letterSpacing: 0.5 },

  // Hero card
  heroAccent: { height: 2, backgroundColor: Colors.teal },
  heroInner: { padding: 13 },
  heroAmountRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5, marginBottom: 3 },
  heroAmount: { fontFamily: Fonts.logo, fontSize: FontSizes['3xl'], color: Colors.text, letterSpacing: 0.3 },
  heroUnit: { fontFamily: Fonts.heading, fontSize: FontSizes.lg, color: Colors.muted, letterSpacing: 1.2 },
  heroFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  claimLink: { fontFamily: Fonts.heading, fontSize: FontSizes.base, color: Colors.teal, letterSpacing: 0.8 },

  // Fleet
  fleetGrid: { flexDirection: 'row', gap: 7, marginBottom: Spacing.xl },
  fleetCard: { flex: 1, padding: 10, alignItems: 'center' },
  fleetInner: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  fleetNumber: { fontFamily: Fonts.logo, fontSize: FontSizes.lg, color: Colors.text },
  fleetLabel: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.xs,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: Colors.dim,
    marginTop: 3,
  },

  // Quick actions
  qaGrid: { flexDirection: 'row', gap: 7, marginBottom: Spacing.xl },
  qaCard: {
    flex: 1,
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border1,
    borderRadius: Radii.lg,
    padding: 10,
    alignItems: 'center',
  },
  qaLabel: {
    fontFamily: Fonts.heading,
    fontSize: 8,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: Colors.dim,
    marginTop: 4,
  },

  // Miners list
  minerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  minerName: { fontSize: FontSizes.base, fontFamily: Fonts.bodyMedium, color: Colors.text },
  monoSmall: { fontFamily: Fonts.mono, fontSize: FontSizes.xs, color: Colors.dim, marginTop: 1 },
  monoReward: { fontFamily: Fonts.mono, fontSize: FontSizes.base },
  rewardSub: { fontSize: FontSizes.xs, color: Colors.dim, marginTop: 1 },

  // Notif panel
  notifPanel: { backgroundColor: Colors.surface1, borderBottomWidth: 1, borderBottomColor: Colors.border1 },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['4xl'],
    paddingVertical: 11,
  },
  sectionLabel: {
    fontFamily: Fonts.heading,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.muted,
  },
  dismissText: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.sm,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.red,
  },
  notifRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Spacing['4xl'],
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  notifDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  notifTitle: { fontSize: FontSizes.base, fontFamily: Fonts.bodyMedium, color: Colors.text, marginBottom: 1 },
  notifBody: { fontSize: 11, color: Colors.muted },
  notifTime: { fontFamily: Fonts.mono, fontSize: FontSizes.xs, color: Colors.dim, marginTop: 1 },

  // See all link
  seeAll: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.sm,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.red,
  },
});
