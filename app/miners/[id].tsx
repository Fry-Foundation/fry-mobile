import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Spacing, Radii } from '@/constants/theme';
import { Card, Badge, StatusDot, Separator, Button, Label, SectionHeader } from '@/components/ui';
import { MOCK_MINERS, MOCK_LOGS } from '@/constants/mockData';

type Pane = 'main' | 'logs' | 'manage';

const LEVEL_BADGE: Record<string, { variant: 'teal' | 'red' | 'amber'; label: string }> = {
  INFO: { variant: 'teal', label: 'INFO' },
  WARN: { variant: 'amber', label: 'WARN' },
  ERR: { variant: 'red', label: 'ERR' },
};

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  cpu: 'hardware-chip-outline',
  server: 'server-outline',
  'device-laptop': 'laptop-outline',
  globe: 'globe-outline',
  search: 'search-outline',
  database: 'server-outline',
  route: 'git-branch-outline',
  box: 'cube-outline',
};

export default function MinerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [pane, setPane] = useState<Pane>('main');
  const [nickname, setNickname] = useState('');

  const miner = MOCK_MINERS.find((m) => m.id === id);
  if (!miner) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Device not found</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>← Back to miners</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!nickname) setNickname(miner.name);

  function handleRestart() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Restart Device',
      `Send restart command to ${miner!.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restart',
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            // TODO: API call to restart device
          },
        },
      ]
    );
  }

  function handleRemove() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    Alert.alert(
      'Remove Device',
      `This will unregister ${miner!.name} from your fleet. This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // TODO: API call to remove device
            router.back();
          },
        },
      ]
    );
  }

  const iconName = ICON_MAP[miner.iconName] || 'hardware-chip-outline';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Fixed header */}
      <View style={styles.detHeader}>
        <Pressable onPress={() => (pane === 'main' ? router.back() : setPane('main'))} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={Colors.muted} />
        </Pressable>
        <Text style={styles.detTitle}>
          {pane === 'logs' ? 'Device Logs' : pane === 'manage' ? 'Settings' : miner.name}
        </Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── MAIN pane ── */}
        {pane === 'main' && (
          <View style={styles.section}>
            {/* Device identity */}
            <View style={styles.identityRow}>
              <View style={[styles.iconBox, { borderColor: miner.iconColor }]}>
                <Ionicons name={iconName} size={22} color={miner.iconColor} />
              </View>
              <View>
                <View style={styles.nameRow}>
                  <StatusDot online={miner.status === 'online'} />
                  <Text style={styles.devType}>{miner.type}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, marginTop: 4 }}>
                  <Badge text={miner.badgeText} variant={miner.badgeType} />
                  <Badge text="Algorand" variant="blue" />
                </View>
              </View>
            </View>

            {/* Stats grid */}
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <Label>Today</Label>
                <Text style={[styles.statValue, { color: Colors.teal }]}>{miner.todayFry}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Label>Multiplier</Label>
                <Text style={[styles.statValue, { color: miner.multiplierColor }]}>{miner.multiplier}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Label>Uptime</Label>
                <Text style={[styles.statValue, { color: Colors.text }]}>{miner.uptime}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Label>Total Earned</Label>
                <Text style={[styles.statValueSm, { color: Colors.text }]}>{miner.totalFry}</Text>
              </Card>
            </View>

            {/* Integrations */}
            <SectionHeader title="Integrations" style={{ marginBottom: 8 }} />
            <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
              {miner.integrations.map((integ, i) => (
                <View
                  key={integ.name}
                  style={[
                    styles.integRow,
                    i < miner.integrations.length - 1 && { borderBottomWidth: 1, borderBottomColor: Colors.separator },
                  ]}
                >
                  <View style={styles.integLeft}>
                    <Ionicons
                      name={(ICON_MAP[integ.icon] || 'cube-outline') as any}
                      size={14}
                      color={integ.active ? integ.color : Colors.dim}
                    />
                    <Text style={[styles.integName, !integ.active && { color: Colors.muted }]}>
                      {integ.name}
                    </Text>
                  </View>
                  <Badge
                    text={integ.active ? 'ACTIVE' : 'INACTIVE'}
                    variant={integ.active ? 'teal' : 'gray'}
                  />
                </View>
              ))}
            </Card>

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <Button
                title="VIEW LOGS"
                variant="ghost"
                style={{ flex: 1 }}
                onPress={() => setPane('logs')}
              />
              <Button
                title="MANAGE"
                style={{ flex: 1 }}
                onPress={() => setPane('manage')}
              />
            </View>
          </View>
        )}

        {/* ── LOGS pane ── */}
        {pane === 'logs' && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Pressable onPress={() => setPane('main')}>
                <Text style={styles.backLink}>← Back to device</Text>
              </Pressable>
              <Badge text="Live" variant="teal" />
            </View>
            {MOCK_LOGS.map((log, i) => {
              const lvl = LEVEL_BADGE[log.level];
              return (
                <View key={i} style={[styles.logEntry, i < MOCK_LOGS.length - 1 && { borderBottomWidth: 1, borderBottomColor: '#1a1a1e' }]}>
                  <Text style={styles.logTime}>{log.time}</Text>
                  <Badge text={lvl.label} variant={lvl.variant} style={{ marginHorizontal: 4 }} />
                  <Text
                    style={[styles.logMsg, log.level === 'ERR' && { color: Colors.muted }]}
                    numberOfLines={1}
                  >
                    {log.message}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* ── MANAGE pane ── */}
        {pane === 'manage' && (
          <View style={styles.section}>
            <Pressable onPress={() => setPane('main')} style={{ marginBottom: 12 }}>
              <Text style={styles.backLink}>← Back to device</Text>
            </Pressable>

            <Label style={{ marginBottom: 4 }}>Nickname</Label>
            <Card style={{ paddingHorizontal: 12, paddingVertical: 9, marginBottom: 12 }}>
              <TextInput
                style={styles.textInput}
                value={nickname}
                onChangeText={setNickname}
                autoCapitalize="characters"
              />
            </Card>

            <Label style={{ marginBottom: 4 }}>Device IP</Label>
            <Card style={{ paddingHorizontal: 12, paddingVertical: 9, marginBottom: 12 }}>
              <Text style={styles.infoText}>{miner.ip}</Text>
            </Card>

            <Label style={{ marginBottom: 4 }}>Registered</Label>
            <Card style={{ paddingHorizontal: 12, paddingVertical: 9, marginBottom: 16 }}>
              <Text style={styles.infoText}>{miner.registered}</Text>
            </Card>

            <Separator style={{ marginBottom: 14 }} />

            <Text style={[styles.sectionLabel, { color: Colors.red, marginBottom: 10 }]}>
              DANGER ZONE
            </Text>
            <View style={styles.actionRow}>
              <Button
                title="RESTART"
                variant="ghost"
                style={{ flex: 1 }}
                onPress={handleRestart}
              />
              <Button
                title="REMOVE"
                variant="ghost"
                style={{ flex: 1, borderColor: Colors.red }}
                textStyle={{ color: Colors.red }}
                onPress={handleRemove}
              />
            </View>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  section: { paddingHorizontal: Spacing['4xl'] },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontFamily: Fonts.body, fontSize: FontSizes.lg, color: Colors.muted, marginBottom: 12 },

  detHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: Spacing['4xl'],
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  backBtn: { padding: 2 },
  detTitle: { fontFamily: Fonts.logo, fontSize: FontSizes.md, color: Colors.text, letterSpacing: 0.5 },

  identityRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14, marginBottom: 14 },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderRadius: Radii.lg - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  devType: { fontSize: FontSizes.md, fontFamily: Fonts.bodyMedium, color: Colors.text },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 14,
  },
  statCard: { width: '48%', padding: 10 },
  statValue: { fontFamily: Fonts.mono, fontSize: 15, marginTop: 4 },
  statValueSm: { fontFamily: Fonts.mono, fontSize: 12, marginTop: 4 },

  integRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  integLeft: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  integName: { fontSize: FontSizes.base, color: Colors.text },

  actionRow: { flexDirection: 'row', gap: 9 },

  backLink: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.sm,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.red,
  },

  logEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  logTime: { fontFamily: Fonts.mono, fontSize: FontSizes.xs, color: Colors.dim, width: 58 },
  logMsg: { fontFamily: Fonts.body, fontSize: 11, color: Colors.text, flex: 1, marginLeft: 6 },

  textInput: { fontFamily: Fonts.mono, fontSize: 11, color: Colors.text, padding: 0 },
  infoText: { fontFamily: Fonts.mono, fontSize: 11, color: Colors.dim },

  sectionLabel: {
    fontFamily: Fonts.heading,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.muted,
  },
});
