import React, { useState } from 'react';
import { Platform, Pressable, Text, type ViewStyle } from 'react-native';
import { Lock, User } from 'lucide-react-native';

import { Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BiometricButtonProps = {
  /** Callback invoked to trigger biometric authentication */
  onAuthenticate: () => void | Promise<void>;
  /** Custom label text for the button */
  label?: string;
  /** Layout variant of the button */
  variant?: 'default' | 'compact';
  /** Custom styles for the button container */
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
  const IconComponent = isIOS ? User : Lock;
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
        <IconComponent size={24} color={t.text} />
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
      <IconComponent size={22} color={t.text} />
      <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text }}>
        {loading ? 'Authenticating...' : label ?? defaultLabel}
      </Text>
    </Pressable>
  );
}
