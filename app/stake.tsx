import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Spacing, Radii, StakeTiers } from '@/constants/theme';
import { Card, Badge, Button, Label, SectionHeader } from '@/components/ui';

// Tier data keyed by multiplier string
const TIER_DATA: Record<string, {
  mult: string;
  color: string;
  badge: string;
  badgeVariant: 'gray' | 'red' | 'amber';
  accentColor: string;
  sub: string;
}> = {
  '1': {
    mult: '1',
    color: Colors.muted,
    badge: 'NO STAKE',
    badgeVariant: 'gray',
    accentColor: Colors.muted,
    sub: 'No stake required · base rate',
  },
  '1.5': {
    mult: '1.5',
    color: Colors.red,
    badge: 'VERIFIED',
    badgeVariant: 'red',
    accentColor: Colors.red,
    sub: '500 fNODE staked · 2 devices',
  },
  '3': {
    mult: '3',
    color: Colors.amber,
    badge: '3× MAX',
    badgeVariant: 'amber',
    accentColor: Colors.amber,
    sub: '1,500 fNODE required',
  },
};

export default function StakeScreen() {
  const [currentTier, setCurrentTier] = useState('1.5');
  const tier = TIER_DATA[currentTier];

  function handleUnstake() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Unstake fNODE',
      'This will remove your verification stake and reduce your multiplier to 1×. Proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unstake',
          style: 'destructive',
          onPress: () => {
            setCurrentTier('1');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  }

  function handleStakeMore() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: open Pera WalletConnect for staking transaction
    Alert.alert('Pera Wallet', 'This will open Pera Wallet to sign a staking transaction.');
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.pageTitle}>VERIFY STAKE</Text>
        </View>

        {/* ── Current tier hero ── */}
        <View style={styles.section}>
          <Card accent={tier.accentColor} style={{ marginBottom: 12 }}>
            <View style={styles.tierHeader}>
              <Label>Current Tier</Label>
              <Badge text={tier.badge} variant={tier.badgeVariant} />
            </View>
            <View style={styles.tierMultRow}>
              <Text style={[styles.tierMult, { color: tier.color }]}>{tier.mult}</Text>
              <Text style={styles.tierMultSuffix}>× MULTIPLIER</Text>
            </View>
            <Text style={styles.tierSub}>{tier.sub}</Text>
          </Card>
        </View>

        {/* ── Tier selector (3 tiers) ── */}
        <View style={styles.section}>
          <SectionHeader title="Multiplier Tiers" style={{ marginBottom: 8 }} />
          <View style={styles.tierGrid}>
            {StakeTiers.map((t) => {
              const isActive = currentTier === t.key;
              return (
                <Pressable
                  key={t.key}
                  style={[
                    styles.tierCard,
                    isActive
                      ? { borderColor: t.color, backgroundColor: `${t.color}12` }
                      : { borderColor: Colors.border1 },
                  ]}
                  onPress={() => setCurrentTier(t.key)}
                >
                  <Text style={[styles.tierCardMult, { color: t.color }]}>{t.mult}×</Text>
                  <Text
                    style={[
                      styles.tierCardLabel,
                      { color: isActive ? t.color : Colors.dim },
                    ]}
                  >
                    {t.label}
                  </Text>
                  <Text style={styles.tierCardFnode}>{t.fnode}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ── Balance info ── */}
        <View style={styles.section}>
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}>
            <View style={[styles.balanceRow, { borderBottomWidth: 1, borderBottomColor: Colors.separator }]}>
              <Label>Staked Balance</Label>
              <Text style={styles.balanceValue}>
                500 <Text style={styles.balanceUnit}>fNODE</Text>
              </Text>
            </View>
            <View style={[styles.balanceRow, { borderBottomWidth: 1, borderBottomColor: Colors.separator }]}>
              <Label>Wallet Balance</Label>
              <Text style={styles.balanceValue}>
                1,850 <Text style={styles.balanceUnit}>fNODE</Text>
              </Text>
            </View>
            <View style={styles.balanceRow}>
              <Label>Applied to</Label>
              <Text style={styles.balanceText}>2 devices</Text>
            </View>
          </Card>
        </View>

        {/* ── Info card ── */}
        <View style={styles.section}>
          <Card accent={Colors.blue} style={{ marginBottom: 12 }}>
            <View style={styles.infoRow}>
              <Ionicons name="information-circle-outline" size={15} color={Colors.blue} style={{ marginTop: 1 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>3× Maximum Tier</Text>
                <Text style={styles.infoBody}>
                  Stake 1,500+ fNODE to unlock the maximum reward multiplier across all devices.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* ── Action buttons ── */}
        <View style={[styles.section, styles.actionRow]}>
          <Button
            title="UNSTAKE"
            variant="ghost"
            style={{ flex: 1 }}
            onPress={handleUnstake}
          />
          <Button
            title="STAKE MORE"
            style={{ flex: 1 }}
            onPress={handleStakeMore}
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  section: { paddingHorizontal: Spacing['4xl'] },

  pageTitle: {
    fontFamily: Fonts.logo,
    fontSize: FontSizes.lg,
    color: Colors.text,
    letterSpacing: 0.5,
    marginTop: Spacing['3xl'],
    marginBottom: 12,
  },

  // Tier hero
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tierMultRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 2 },
  tierMult: { fontFamily: Fonts.logo, fontSize: FontSizes['4xl'], letterSpacing: 0.3 },
  tierMultSuffix: { fontFamily: Fonts.logo, fontSize: FontSizes.lg, color: Colors.muted },
  tierSub: { fontFamily: Fonts.mono, fontSize: FontSizes.sm, color: Colors.dim },

  // Tier selector grid
  tierGrid: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  tierCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 4,
    borderRadius: Radii.md,
    borderWidth: 1,
    backgroundColor: Colors.surface1,
  },
  tierCardMult: { fontFamily: Fonts.logo, fontSize: FontSizes.xl },
  tierCardLabel: {
    fontFamily: Fonts.heading,
    fontSize: 8,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  tierCardFnode: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    color: Colors.dim,
    marginTop: 5,
  },

  // Balance rows
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  balanceValue: { fontFamily: Fonts.mono, fontSize: FontSizes.md, color: Colors.text },
  balanceUnit: { color: Colors.muted, fontSize: FontSizes.sm },
  balanceText: { fontSize: FontSizes.base, fontFamily: Fonts.bodyMedium, color: Colors.text },

  // Info card
  infoRow: { flexDirection: 'row', gap: 8 },
  infoTitle: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.sm,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.blue,
    marginBottom: 2,
  },
  infoBody: { fontSize: 11, color: Colors.muted, lineHeight: 16.5 },

  // Actions
  actionRow: { flexDirection: 'row', gap: 9 },
});
