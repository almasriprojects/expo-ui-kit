import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  type ViewStyle,
} from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type WelcomeScreenProps = {
  /** Emoji or text logo displayed at the top */
  logo?: string;
  /** Main welcome title text */
  title: string;
  /** Tagline text displayed below the title */
  tagline?: string;
  /** Callback invoked when the "Get Started" button is pressed */
  onGetStarted: () => void;
  /** Callback invoked when the "Sign In" link is pressed */
  onSignIn?: () => void;
  /** Whether to render a gradient background */
  backgroundGradient?: boolean;
  /** Custom styles applied to the screen container */
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
          fontSize: FontSize['3xl'].fontSize,
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
            fontSize: FontSize.lg.fontSize,
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
        <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.primaryForeground }}>
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
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.linkText }}>
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
