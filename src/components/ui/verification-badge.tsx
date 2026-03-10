import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { Check, Crown, Star } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type VerificationBadgeProps = {
  variant?: 'verified' | 'official' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  style?: ViewStyle;
};

const sizes = { sm: 16, md: 20, lg: 26 };

function VariantIcon({ variant, iconSize, color }: { variant: string; iconSize: number; color: string }) {
  if (variant === 'official') return <Star size={iconSize} color={color} fill={color} />;
  if (variant === 'premium') return <Crown size={iconSize} color={color} />;
  return <Check size={iconSize} color={color} />;
}

export function VerificationBadge({
  variant = 'verified',
  size = 'md',
  label,
  style,
}: VerificationBadgeProps) {
  const t = useTheme();
  const dim = sizes[size];
  const iconSize = Math.round(dim * 0.55);

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
          <VariantIcon variant={variant} iconSize={iconSize} color={t.textOnColor} />
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
      <VariantIcon variant={variant} iconSize={iconSize} color={t.textOnColor} />
    </View>
  );
}
