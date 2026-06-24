import React from 'react';
import { View, Text, Pressable, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { Colors, Fonts, Radii } from '@/constants/theme';

// ─── Card ────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  accent?: string; // left accent bar color
}

export function Card({ children, style, accent }: CardProps) {
  if (accent) {
    return (
      <View style={[styles.card, { flexDirection: 'row', overflow: 'hidden', padding: 0 }, style]}>
        <View style={{ width: 4, backgroundColor: accent }} />
        <View style={{ flex: 1, padding: 12 }}>{children}</View>
      </View>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

// ─── Badge ───────────────────────────────────────────────
type BadgeVariant = 'teal' | 'red' | 'amber' | 'gray' | 'blue';

const badgeColors: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  teal: { bg: Colors.tealAlpha, text: Colors.teal, border: Colors.tealAlphaBorder },
  red: { bg: Colors.redAlpha, text: Colors.red, border: Colors.redAlphaBorder },
  amber: { bg: Colors.amberAlpha, text: Colors.amber, border: Colors.amberAlphaBorder },
  blue: { bg: Colors.blueAlpha, text: Colors.blue, border: Colors.blueAlphaBorder },
  gray: { bg: Colors.grayAlpha, text: Colors.muted, border: Colors.border1 },
};

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ text, variant = 'gray', style }: BadgeProps) {
  const c = badgeColors[variant];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.border }, style]}>
      <Text style={[styles.badgeText, { color: c.text }]}>{text}</Text>
    </View>
  );
}

// ─── StatusDot ───────────────────────────────────────────
export function StatusDot({ online, size = 7 }: { online: boolean; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: online ? Colors.online : Colors.offline,
      }}
    />
  );
}

// ─── Button ──────────────────────────────────────────────
interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'teal' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', style, textStyle, disabled }: ButtonProps) {
  const bg =
    variant === 'teal' ? Colors.teal :
    variant === 'ghost' ? 'transparent' :
    Colors.red;
  const fg =
    variant === 'teal' ? Colors.background :
    variant === 'ghost' ? Colors.muted :
    '#fff';
  const border = variant === 'ghost' ? Colors.border1 : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: variant === 'ghost' ? 1 : 0,
          opacity: pressed ? 0.85 : disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: fg }, textStyle]}>{title}</Text>
    </Pressable>
  );
}

// ─── SectionHeader ───────────────────────────────────────
export function SectionHeader({
  title,
  right,
  style,
}: {
  title: string;
  right?: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, style]}>
      <Text style={styles.sectionLabel}>{title}</Text>
      {right}
    </View>
  );
}

// ─── Label ───────────────────────────────────────────────
export function Label({ children, style }: { children: string; style?: TextStyle }) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

// ─── Separator ───────────────────────────────────────────
export function Separator({ style }: { style?: ViewStyle } = {}) {
  return <View style={[{ height: 1, backgroundColor: Colors.separator }, style]} />;
}

// ─── Styles ──────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface1,
    borderWidth: 1,
    borderColor: Colors.border1,
    borderRadius: Radii.lg,
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.sm,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 0.4,
  },
  button: {
    paddingVertical: 13,
    borderRadius: Radii.lg - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Fonts.heading,
    fontSize: 13,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  sectionLabel: {
    fontFamily: Fonts.heading,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.muted,
  },
  label: {
    fontFamily: Fonts.heading,
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: Colors.dim,
  },
});
