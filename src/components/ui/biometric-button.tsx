import React, { useState } from 'react';
import { Platform, Pressable, Text, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BiometricButtonProps = {
  onAuthenticate: () => void | Promise<void>;
  label?: string;
  variant?: 'default' | 'compact';
  style?: ViewStyle;
};

export function BiometricButton({
  onAuthenticate,
  label,
  variant = 'default',
  style,
}: BiometricButtonProps) {
  const t = useTheme();
  const [loading, setLoading] = useState(false);
  const isIOS = Platform.OS === 'ios';
  const icon = isIOS ? '👤' : '🔐';
  const defaultLabel = isIOS ? 'Sign in with Face ID' : 'Sign in with Fingerprint';

  const handlePress = async () => {
    setLoading(true);
    try {
      await onAuthenticate();
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={loading}
        style={[
          {
            width: 56,
            height: 56,
            borderRadius: Radius.xl,
            backgroundColor: t.surface,
            borderWidth: 1.5,
            borderColor: t.border,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loading ? 0.6 : 1,
            ...Shadows.sm,
          },
          style,
        ]}>
        <Text style={{ fontSize: 24 }}>{icon}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={loading}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: Radius.xl,
          backgroundColor: t.card,
          borderWidth: 1.5,
          borderColor: t.border,
          opacity: loading ? 0.6 : 1,
          ...Shadows.sm,
        },
        style,
      ]}>
      <Text style={{ fontSize: 22 }}>{icon}</Text>
      <Text style={{ fontSize: 16, fontWeight: '600', color: t.text }}>
        {loading ? 'Authenticating...' : label ?? defaultLabel}
      </Text>
    </Pressable>
  );
}
