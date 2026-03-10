import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type VerificationBadgeProps = {
  variant?: 'verified' | 'official' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  style?: ViewStyle;
};

const sizes = { sm: 16, md: 20, lg: 26 };
const icons: Record<string, string> = {
  verified: '✓',
  official: '★',
  premium: '♛',
};

export function VerificationBadge({
  variant = 'verified',
  size = 'md',
  label,
  style,
}: VerificationBadgeProps) {
  const t = useTheme();
  const dim = sizes[size];
  const fontSize = dim * 0.55;

  const colors: Record<string, string> = {
    verified: t.primary,
    official: t.success,
    premium: t.warning,
  };

  const bg = colors[variant] ?? t.primary;

  if (label) {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: bg + '15',
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: Radius.full,
          },
          style,
        ]}>
        <View
          style={{
            width: dim,
            height: dim,
            borderRadius: Radius.full,
            backgroundColor: bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize, fontWeight: '700', color: t.textOnColor }}>
            {icons[variant]}
          </Text>
        </View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: bg }}>{label}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: Radius.full,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text style={{ fontSize, fontWeight: '700', color: t.textOnColor }}>
        {icons[variant]}
      </Text>
    </View>
  );
}
