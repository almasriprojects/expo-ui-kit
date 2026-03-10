import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  type ViewStyle,
} from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type WelcomeScreenProps = {
  logo?: string;
  title: string;
  tagline?: string;
  onGetStarted: () => void;
  onSignIn?: () => void;
  backgroundGradient?: boolean;
  style?: ViewStyle;
};

export function WelcomeScreen({
  logo,
  title,
  tagline,
  onGetStarted,
  onSignIn,
  backgroundGradient = false,
  style,
}: WelcomeScreenProps) {
  const t = useTheme();

  const content = (
    <>
      {logo && (
        <Text
          style={{ fontSize: 80, marginBottom: 32 }}
          accessibilityRole="image"
          accessibilityLabel="App logo"
        >
          {logo}
        </Text>
      )}
      <Text
        style={{
          fontSize: 28,
          fontWeight: '800',
          color: t.text,
          textAlign: 'center',
          marginBottom: tagline ? 12 : 40,
        }}
      >
        {title}
      </Text>
      {tagline && (
        <Text
          style={{
            fontSize: 16,
            color: t.textSecondary,
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: 40,
          }}
        >
          {tagline}
        </Text>
      )}
      <Pressable
        onPress={onGetStarted}
        style={{
          width: '100%',
          paddingVertical: 16,
          borderRadius: Radius.xl,
          backgroundColor: t.primary,
          alignItems: 'center',
          ...Shadows.md,
        }}
        accessibilityRole="button"
        accessibilityLabel="Get Started"
      >
        <Text style={{ fontSize: 17, fontWeight: '700', color: t.primaryForeground }}>
          Get Started
        </Text>
      </Pressable>
      {onSignIn && (
        <Pressable
          onPress={onSignIn}
          style={{ marginTop: 20, paddingVertical: 8, paddingHorizontal: 16 }}
          accessibilityRole="button"
          accessibilityLabel="Sign In"
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: t.linkText }}>
            Sign In
          </Text>
        </Pressable>
      )}
    </>
  );

  if (backgroundGradient) {
    return (
      <LinearGradient
        colors={[t.background, t.backgroundSecondary] as [string, string, ...string[]]}
        style={[{ flex: 1 }, style]}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 32,
            paddingVertical: 48,
          }}
          accessibilityRole="summary"
          accessibilityLabel={`Welcome. ${title}. ${tagline ?? ''}`}
        >
          {content}
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: t.background,
        },
        style,
      ]}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 48,
      }}
      accessibilityRole="summary"
      accessibilityLabel={`Welcome. ${title}. ${tagline ?? ''}`}
    >
      {content}
    </ScrollView>
  );
}
