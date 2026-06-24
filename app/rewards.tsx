import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Spacing, Tokens } from '@/constants/theme';
import { Card, Badge, Button, Label, SectionHeader, Separator } from '@/components/ui';
import {
  MOCK_CLAIMABLE,
  MOCK_CLAIMABLE_USD,
  MOCK_WALLET_SHORT,
  MOCK_EPOCH_BREAKDOWN,
  MOCK_PAYOUTS,
} from '@/constants/mockData';

export default function RewardsScreen() {
  const [claimed, setClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleClaim() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setClaimed(true);
    // TODO: trigger Pera WalletConnect claim transaction
    setTimeout(() => setClaimed(false), 2500);
  }

  async function handleCopy() {
    await Clipboard.setStringAsync('JONBQZE4...');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.pageTitle}>REWARDS</Text>
        </View>

        {/* ── Claim hero ── */}
        <View style={styles.section}>
          <Card style={{ overflow: 'hidden', padding: 0, marginBottom: 13 }}>
            <View style={{ height: 2, backgroundColor: Colors.teal }} />
            <View style={styles.heroInner}>
              <Label style={{ color: Colors.teal, marginBottom: 8 }}>Epoch 2 · Claimable</Label>
              <Text style={styles.heroAmount}>{MOCK_CLAIMABLE}</Text>
              <Text style={styles.heroUnit}>FRY</Text>
              <Text style={styles.heroUsd}>
                {MOCK_CLAIMABLE_USD} · ASA {Tokens.FRY.asa}
              </Text>
              <Button
                title={claimed ? '✓ CLAIMED' : 'CLAIM ALL'}
                variant="teal"
                style={{ maxWidth: 180, alignSelf: 'center', marginTop: 14 }}
                onPress={handleClaim}
                disabled={claimed}
              />
            </View>
          </Card>
        </View>

        {/* ── Wallet ── */}
        <View style={styles.section}>
          <Card style={{ paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 }}>
            <Label style={{ marginBottom: 6 }}>Receiving Wallet</Label>
            <View style={styles.walletRow}>
              <Ionicons name="wallet-outline" size={14} color={Colors.muted} />
              <Text style={styles.walletAddr}>{MOCK_WALLET_SHORT}</Text>
              <Pressable onPress={handleCopy} style={{ padding: 2 }}>
                <Ionicons
                  name={copied ? 'checkmark' : 'copy-outline'}
                  size={14}
                  color={copied ? Colors.teal : Colors.dim}
                />
              </Pressable>
            </View>
          </Card>
        </View>

        {/* ── Epoch breakdown table ── */}
        <View style={styles.section}>
          <SectionHeader title="Epoch Breakdown" style={{ marginBottom: 8 }} />
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}>
            {/* Table header */}
            <View style={[styles.tableRow, { backgroundColor: Colors.surfaceNav }]}>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Device</Text>
              <Text style={[styles.tableHeaderCell, { width: 44, textAlign: 'right' }]}>Mult</Text>
              <Text style={[styles.tableHeaderCell, { width: 66, textAlign: 'right' }]}>FRY</Text>
            </View>
            {MOCK_EPOCH_BREAKDOWN.map((row, i) => (
              <View
                key={row.device}
                style={[
                  styles.tableRow,
                  i < MOCK_EPOCH_BREAKDOWN.length - 1 && { borderBottomWidth: 1, borderBottomColor: Colors.separator },
                ]}
              >
                <Text style={[styles.tableCell, { flex: 1 }]}>{row.device}</Text>
                <Text style={[styles.tableMono, { width: 44, textAlign: 'right', color: row.multiplierColor }]}>
                  {row.multiplier}
                </Text>
                <Text style={[styles.tableMono, { width: 66, textAlign: 'right', color: Colors.text }]}>
                  {row.fry}
                </Text>
              </View>
            ))}
          </Card>
        </View>

        {/* ── Recent payouts ── */}
        <View style={styles.section}>
          <SectionHeader title="Recent Payouts" style={{ marginBottom: 8 }} />
          <Separator />
          {MOCK_PAYOUTS.map((p, i) => (
            <View
              key={p.id}
              style={[
                styles.payoutRow,
                i < MOCK_PAYOUTS.length - 1 && { borderBottomWidth: 1, borderBottomColor: Colors.separator },
              ]}
            >
              <View>
                <Text style={styles.payoutLabel}>{p.label}</Text>
                <Text style={styles.payoutTxid}>TXID: {p.txid}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.payoutAmount}>{p.amount}</Text>
                <Text style={styles.payoutTime}>{p.timeAgo}</Text>
              </View>
            </View>
          ))}
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
  },

  heroInner: { padding: 18, alignItems: 'center' },
  heroAmount: {
    fontFamily: Fonts.logo,
    fontSize: FontSizes['5xl'],
    color: Colors.text,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  heroUnit: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.xl,
    color: Colors.muted,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroUsd: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.sm,
    color: Colors.dim,
  },

  walletRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  walletAddr: { fontFamily: Fonts.mono, fontSize: FontSizes.sm, color: Colors.text, flex: 1 },

  tableRow: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8 },
  tableHeaderCell: {
    fontFamily: Fonts.heading,
    fontSize: 8,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: Colors.dim,
  },
  tableCell: { fontSize: 11, color: Colors.text },
  tableMono: { fontFamily: Fonts.mono, fontSize: 11 },

  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  payoutLabel: { fontSize: 11, color: Colors.text, marginBottom: 2 },
  payoutTxid: { fontFamily: Fonts.mono, fontSize: FontSizes.xs, color: Colors.dim },
  payoutAmount: { fontFamily: Fonts.mono, fontSize: FontSizes.base, color: Colors.teal },
  payoutTime: { fontSize: FontSizes.xs, color: Colors.dim, marginTop: 1 },
});
