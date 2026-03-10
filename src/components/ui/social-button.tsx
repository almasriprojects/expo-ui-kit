import React, { useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { BrandColors, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SocialProvider = 'google' | 'apple' | 'facebook' | 'twitter' | 'github';

type SocialButtonProps = {
  provider: SocialProvider;
  onPress: () => void;
  label?: string;
  variant?: 'filled' | 'outline';
  style?: ViewStyle;
};

const providerConfig: Record<SocialProvider, { icon: string; label: string; bg: string; text: string }> = {
  google: { icon: 'G', label: 'Google', bg: BrandColors.google.bg, text: BrandColors.google.text },
  apple: { icon: '', label: 'Apple', bg: BrandColors.apple.bg, text: BrandColors.apple.text },
  facebook: { icon: 'f', label: 'Facebook', bg: BrandColors.facebook.bg, text: BrandColors.facebook.text },
  twitter: { icon: '𝕏', label: 'X', bg: BrandColors.twitter.bg, text: BrandColors.twitter.text },
  github: { icon: '⬢', label: 'GitHub', bg: BrandColors.github.bg, text: BrandColors.github.text },
};

export function SocialButton({
  provider,
  onPress,
  label,
  variant = 'outline',
  style,
}: SocialButtonProps) {
  const t = useTheme();
  const [pressed, setPressed] = useState(false);
  const config = providerConfig[provider];
  const displayLabel = label ?? `Continue with ${config.label}`;

  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: Radius.xl,
          backgroundColor: isOutline ? (pressed ? t.surface : t.card) : config.bg,
          borderWidth: isOutline ? 1.5 : 0,
          borderColor: t.border,
          minHeight: 50,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: Radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: !isOutline ? 'transparent' : undefined,
        }}>
        <Text
          style={{
            fontSize: provider === 'google' ? 18 : 16,
            fontWeight: '700',
            color: isOutline ? t.text : config.text,
          }}>
          {config.icon}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: isOutline ? t.text : config.text,
        }}>
        {displayLabel}
      </Text>
    </Pressable>
  );
}
