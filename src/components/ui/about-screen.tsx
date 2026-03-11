import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AboutScreenLink = {
  /** Display label for the link */
  label: string;
  /** Callback invoked when the link is pressed */
  onPress: () => void;
};

export type AboutScreenProps = {
  /** Name of the application */
  appName: string;
  /** Version string (e.g. "1.0.0") */
  version: string;
  /** Build number string */
  buildNumber?: string;
  /** URL of the app icon image */
  icon?: string;
  /** Array of navigational links displayed on the screen */
  links?: AboutScreenLink[];
  /** Copyright text displayed at the bottom */
  copyright?: string;
};

export function AboutScreen({
  appName,
  version,
  buildNumber,
  icon,
  links = [],
  copyright,
}: AboutScreenProps) {
  const t = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.background }}
      contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
      accessibilityLabel={`About ${appName}`}
    >
      {/* App icon */}
      <View
        style={{
          alignSelf: 'center',
          marginBottom: 20,
        }}
        accessibilityRole="image"
        accessibilityLabel="App icon"
      >
        {icon ? (
          <View style={[{ width: 88, height: 88, borderRadius: Radius.xl, overflow: 'hidden' }, Shadows.md]}>
            <Image
              source={{ uri: icon }}
              style={{ width: 88, height: 88, borderRadius: Radius.xl }}
              contentFit="cover"
            />
          </View>
        ) : (
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: Radius.xl,
              backgroundColor: t.primary,
              alignItems: 'center',
              justifyContent: 'center',
              ...Shadows.md,
            }}
          >
            <Text style={{ fontSize: FontSize['4xl'].fontSize, color: t.primaryForeground }}>
              {appName.slice(0, 1).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* App name */}
      <Text
        style={{
          fontSize: FontSize['2xl'].fontSize,
          fontWeight: '700',
          color: t.text,
          textAlign: 'center',
          marginBottom: 4,
        }}
        accessibilityRole="header"
      >
        {appName}
      </Text>

      {/* Version info */}
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <Text style={{ fontSize: FontSize.lg.fontSize, color: t.textSecondary }}>
          Version {version}
          {buildNumber != null ? ` (${buildNumber})` : ''}
        </Text>
      </View>

      {/* Links */}
      {links.length > 0 && (
        <View
          style={{
            backgroundColor: t.card,
            borderRadius: Radius.xl,
            overflow: 'hidden',
            ...Shadows.sm,
          }}
        >
          {links.map((link, index) => (
            <Pressable
              key={link.label}
              onPress={link.onPress}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderBottomWidth: index < links.length - 1 ? 1 : 0,
                borderBottomColor: t.border,
                opacity: pressed ? 0.7 : 1,
              })}
              accessibilityRole="button"
              accessibilityLabel={link.label}
            >
              <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '500', color: t.text }}>
                {link.label}
              </Text>
              <Text style={{ fontSize: FontSize.xl.fontSize, color: t.textSecondary }}>›</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Copyright */}
      {copyright != null && copyright.length > 0 && (
        <Text
          style={{
            fontSize: FontSize.sm.fontSize,
            color: t.textTertiary,
            textAlign: 'center',
            marginTop: 32,
          }}
        >
          {copyright}
        </Text>
      )}
    </ScrollView>
  );
}
