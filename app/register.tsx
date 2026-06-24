import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, FontSizes, Spacing, Radii } from '@/constants/theme';
import { Card, Badge, Button, Label, SectionHeader } from '@/components/ui';
import { DEVICE_TYPES } from '@/constants/mockData';

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  cpu: 'hardware-chip-outline',
  server: 'server-outline',
  'device-laptop': 'laptop-outline',
};

export default function RegisterScreen() {
  const [mac, setMac] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  function handleSelectType(name: string) {
    setSelectedType(name);
    setDropdownOpen(false);
  }

  function handleRegister() {
    if (registered) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setRegistered(true);
    setTimeout(() => setRegistered(false), 2500);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.pageTitle}>REGISTER MINER</Text>

          {/* Step indicators */}
          <View style={styles.stepRow}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, { backgroundColor: Colors.red }]}>
                <Text style={styles.stepNum}>1</Text>
              </View>
              <Text style={[styles.stepLabel, { color: Colors.red }]}>Scan</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepInactive]}>
                <Text style={[styles.stepNum, { color: Colors.dim }]}>2</Text>
              </View>
              <Text style={[styles.stepLabel, { color: Colors.dim }]}>Confirm</Text>
            </View>
          </View>
        </View>

        {/* ── QR viewfinder ── */}
        <View style={styles.section}>
          <Card style={{ padding: 16, marginBottom: 12 }}>
            <View style={styles.viewfinder}>
              {/* Corner brackets */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
              {/* Scan line */}
              <View style={styles.scanLine} />
              <Ionicons name="camera-outline" size={32} color={Colors.border1} />
            </View>
            <Text style={styles.viewfinderHint}>
              Point camera at FEM device QR code
            </Text>
          </Card>
        </View>

        {/* ── Manual entry ── */}
        <View style={styles.section}>
          <SectionHeader title="Or enter manually" style={{ marginBottom: 8 }} />

          <Label style={{ marginBottom: 4 }}>Device MAC Address</Label>
          <Card style={{ paddingHorizontal: 12, paddingVertical: 9, marginBottom: 8 }}>
            <TextInput
              style={styles.macInput}
              placeholder="00:00:00:00:00:00"
              placeholderTextColor={Colors.dim}
              value={mac}
              onChangeText={setMac}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </Card>

          {/* Device type dropdown */}
          <Label style={{ marginBottom: 4 }}>Device Type</Label>
          <View style={{ marginBottom: 12 }}>
            <Pressable
              onPress={() => setDropdownOpen(!dropdownOpen)}
              style={[
                styles.dropdownTrigger,
                dropdownOpen && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
              ]}
            >
              <Text style={[styles.dropdownText, selectedType && { color: Colors.text }]}>
                {selectedType || 'Select miner type…'}
              </Text>
              <Ionicons
                name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={15}
                color={Colors.dim}
              />
            </Pressable>
            {dropdownOpen && (
              <View style={styles.dropdown}>
                {DEVICE_TYPES.map((dt, i) => (
                  <Pressable
                    key={dt.name}
                    style={[
                      styles.dropdownItem,
                      i < DEVICE_TYPES.length - 1 && { borderBottomWidth: 1, borderBottomColor: Colors.separator },
                    ]}
                    onPress={() => handleSelectType(dt.name)}
                  >
                    <Ionicons
                      name={(ICON_MAP[dt.icon] || 'hardware-chip-outline') as any}
                      size={13}
                      color={dt.color}
                    />
                    <Text style={styles.dropdownItemText}>{dt.name}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Popular types grid */}
          <SectionHeader title="Popular Types" style={{ marginBottom: 8 }} />
          <View style={styles.typeGrid}>
            {DEVICE_TYPES.slice(0, 4).map((dt) => {
              const isSelected = selectedType === dt.name;
              return (
                <Pressable
                  key={dt.name}
                  style={[
                    styles.typeCard,
                    isSelected && { borderColor: Colors.red },
                  ]}
                  onPress={() => setSelectedType(dt.name)}
                >
                  <Ionicons
                    name={(ICON_MAP[dt.icon] || 'hardware-chip-outline') as any}
                    size={15}
                    color={isSelected ? Colors.red : Colors.muted}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      isSelected ? { color: Colors.text } : { color: Colors.muted },
                    ]}
                  >
                    {dt.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Register button */}
          <Button
            title={registered ? '✓ DEVICE REGISTERED' : 'REGISTER DEVICE'}
            variant={registered ? 'teal' : 'primary'}
            onPress={handleRegister}
          />

          <View style={{ height: 30 }} />
        </View>
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

  stepRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, marginBottom: 12 },
  stepItem: { alignItems: 'center', gap: 3 },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInactive: {
    backgroundColor: Colors.separator,
    borderWidth: 1,
    borderColor: Colors.border2,
  },
  stepNum: { fontFamily: Fonts.mono, fontSize: 10, color: '#fff' },
  stepLabel: {
    fontFamily: Fonts.heading,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border1,
    marginHorizontal: 8,
    marginBottom: 12,
  },

  viewfinder: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    backgroundColor: Colors.surfaceNav,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  corner: { position: 'absolute', width: 16, height: 16 },
  cornerTL: { top: 7, left: 7, borderTopWidth: 2, borderLeftWidth: 2, borderColor: Colors.red },
  cornerTR: { top: 7, right: 7, borderTopWidth: 2, borderRightWidth: 2, borderColor: Colors.red },
  cornerBL: { bottom: 7, left: 7, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: Colors.red },
  cornerBR: { bottom: 7, right: 7, borderBottomWidth: 2, borderRightWidth: 2, borderColor: Colors.red },
  scanLine: {
    position: 'absolute',
    top: '50%',
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: Colors.red,
    opacity: 0.45,
  },
  viewfinderHint: {
    textAlign: 'center',
    marginTop: 9,
    fontSize: FontSizes.base,
    color: Colors.muted,
  },

  macInput: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: Colors.text,
    padding: 0,
  },

  dropdownTrigger: {
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border1,
    borderRadius: Radii.lg,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: { fontSize: FontSizes.base, color: Colors.dim },
  dropdown: {
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border1,
    borderTopWidth: 0,
    borderBottomLeftRadius: Radii.lg,
    borderBottomRightRadius: Radii.lg,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dropdownItemText: { fontSize: FontSizes.base, color: Colors.text },

  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 13,
  },
  typeCard: {
    width: '48%',
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border1,
    borderRadius: Radii.lg,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeText: {
    fontSize: 11,
    fontFamily: Fonts.bodyMedium,
  },
});
