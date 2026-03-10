import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

type BadgeProps = ViewProps & {
  label: string;
  variant?: BadgeVariant;
};

function getVariantStyle(variant: BadgeVariant, t: ThemeTokens) {
  switch (variant) {
    case 'success':
      return { bg: t.successSoft, text: t.success };
    case 'warning':
      return { bg: t.warningSoft, text: t.warning };
    case 'error':
      return { bg: t.errorSoft, text: t.error };
    case 'info':
      return { bg: t.primarySoft, text: t.primary };
    default:
      return { bg: t.surface, text: t.textSecondary };
  }
}

export function Badge({ label, variant = 'default', style, ...props }: BadgeProps) {
  const t = useTheme();
  const v = getVariantStyle(variant, t);

  return (
    <View
      style={[
        {
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: Radius.full,
          backgroundColor: v.bg,
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      <ThemedText style={{ fontSize: 12, fontWeight: '500', color: v.text }}>
        {label}
      </ThemedText>
    </View>
  );
}
