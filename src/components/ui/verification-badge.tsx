import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { Check, Crown, Star } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VerificationBadgeProps = {
  /** Badge variant determining the icon and color */
  variant?: 'verified' | 'official' | 'premium';
  /** Size variant of the badge */
  size?: 'sm' | 'md' | 'lg';
  /** Optional text label displayed beside the badge */
  label?: string;
  /** Custom styles applied to the badge container */
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
        <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: bg }}>{label}</Text>
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
