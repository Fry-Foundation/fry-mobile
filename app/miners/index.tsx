import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes, Spacing, Radii } from '@/constants/theme';
import { Card, Badge, StatusDot, Separator } from '@/components/ui';
import { MOCK_MINERS } from '@/constants/mockData';

type FilterType = 'all' | 'online' | 'offline';

export default function MinersListScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = useMemo(() => {
    return MOCK_MINERS.filter((m) => {
      const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || m.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'online', label: 'Online' },
    { key: 'offline', label: 'Offline' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.pageTitle}>MINERS</Text>
            <Badge text={`${MOCK_MINERS.length} Devices`} variant="gray" />
          </View>

          {/* Search */}
          <Card style={styles.searchCard}>
            <Ionicons name="search-outline" size={15} color={Colors.dim} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search devices…"
              placeholderTextColor={Colors.dim}
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Card>

          {/* Filter pills */}
          <View style={styles.filterRow}>
            {filters.map((f) => (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[
                  styles.pill,
                  filter === f.key
                    ? styles.pillActive
                    : styles.pillInactive,
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    { color: filter === f.key ? '#fff' : Colors.muted },
                  ]}
                >
                  {f.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Separator />

        {/* Miner rows */}
        <View style={styles.section}>
          {filtered.map((m, i) => (
            <Pressable
              key={m.id}
              style={[
                styles.minerRow,
                i === filtered.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => router.push(`/miners/${m.id}`)}
            >
              {/* Icon box */}
              <View style={[styles.iconBox, { borderColor: m.borderColor }]}>
                <Ionicons
                  name={
                    m.iconName === 'server'
                      ? 'server-outline'
                      : m.iconName === 'device-laptop'
                      ? 'laptop-outline'
                      : 'hardware-chip-outline'
                  }
                  size={18}
                  color={m.iconColor}
                />
              </View>

              {/* Name + uptime bar */}
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={styles.nameRow}>
                  <StatusDot online={m.status === 'online'} />
                  <Text
                    style={[
                      styles.minerName,
                      m.status === 'offline' && { color: Colors.muted },
                    ]}
                    numberOfLines={1}
                  >
                    {m.name}
                  </Text>
                </View>
                <Text style={styles.monoSub}>
                  {m.type} · {m.uptime} uptime
                </Text>
                {/* Uptime bar */}
                <View style={styles.uptimeTrack}>
                  <View
                    style={[
                      styles.uptimeFill,
                      {
                        width: `${m.uptimePercent}%`,
                        backgroundColor: m.status === 'online' ? Colors.teal : Colors.offline,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Right: multiplier + badge + FRY */}
              <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <Text style={[styles.multText, { color: m.multiplierColor }]}>
                    {m.multiplier}
                  </Text>
                  <Badge text={m.badgeText} variant={m.badgeType} />
                </View>
                <Text style={[styles.monoSub, { marginTop: 2, color: Colors.dim }]}>
                  {m.todayFry}
                </Text>
              </View>
            </Pressable>
          ))}

          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No devices match your search</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  section: { paddingHorizontal: Spacing['4xl'] },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing['3xl'],
    marginBottom: Spacing.xl,
  },
  pageTitle: {
    fontFamily: Fonts.logo,
    fontSize: FontSizes.lg,
    color: Colors.text,
    letterSpacing: 0.5,
  },

  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    color: Colors.text,
    padding: 0,
  },

  filterRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.xl },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radii.xl,
  },
  pillActive: { backgroundColor: Colors.red },
  pillInactive: {
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border1,
  },
  pillText: {
    fontFamily: Fonts.heading,
    fontSize: FontSizes.sm,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  minerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 1 },
  minerName: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.bodyMedium,
    color: Colors.text,
  },
  monoSub: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    color: Colors.dim,
  },
  uptimeTrack: {
    height: 3,
    backgroundColor: Colors.separator,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 7,
  },
  uptimeFill: { height: '100%', borderRadius: 2 },
  multText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
  },

  emptyState: { paddingVertical: 40, alignItems: 'center' },
  emptyText: { fontFamily: Fonts.body, fontSize: FontSizes.base, color: Colors.dim },
});
