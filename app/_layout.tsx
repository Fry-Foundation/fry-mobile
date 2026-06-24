import React, { useCallback } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Syncopate_700Bold,
} from '@expo-google-fonts/syncopate';
import {
  Rajdhani_600SemiBold,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
} from '@expo-google-fonts/ibm-plex-mono';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

// Keep splash visible while fonts load
SplashScreen.preventAutoHideAsync();

// Tabler-style icon names → we use @expo/vector-icons Ionicons as base,
// but wrap our own tab bar for full control
import { Ionicons } from '@expo/vector-icons';

const TAB_ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  miners: 'hardware-chip-outline',
  rewards: 'cash-outline',
  register: 'add-circle-outline',
  stake: 'shield-checkmark-outline',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  miners: 'Miners',
  rewards: 'Rewards',
  register: 'Register',
  stake: 'Stake',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Syncopate_700Bold,
    Rajdhani_600SemiBold,
    Rajdhani_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
  });

  const onLayoutReady = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }} onLayout={onLayoutReady}>
      <StatusBar style="light" />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: Colors.red,
          tabBarInactiveTintColor: Colors.dim,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ color, size }) => {
            const iconName = TAB_ICON_MAP[route.name] || 'help-outline';
            return <Ionicons name={iconName} size={20} color={color} />;
          },
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>
              {TAB_LABELS[route.name] || route.name}
            </Text>
          ),
        })}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="miners" />
        <Tabs.Screen name="rewards" />
        <Tabs.Screen name="register" />
        <Tabs.Screen name="stake" />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surfaceNav,
    borderTopColor: Colors.surface3,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },
  tabLabel: {
    fontFamily: Fonts.heading,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
