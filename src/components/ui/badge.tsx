import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, type ThemeTokens, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export type BadgeProps = ViewProps & {
  /** Text content displayed inside the badge */
  label: string;
  /** Visual style variant indicating status */
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
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[
        {
          paddingHorizontal: Spacing[2.5],
          paddingVertical: 3,
          borderRadius: Radius.full,
          backgroundColor: v.bg,
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      <ThemedText style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: v.text }}>
        {label}
      </ThemedText>
    </View>
  );
}
