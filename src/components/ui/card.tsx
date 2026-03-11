import React, { type ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { Radius, Shadows, Spacing, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CardProps = ViewProps & {
  /** Optional heading text for the card */
  title?: string;
  /** Optional descriptive text below the title */
  subtitle?: string;
  /** Content rendered inside the card */
  children?: ReactNode;
  /** Visual style variant */
  variant?: 'elevated' | 'outlined' | 'filled';
  /** Accessibility label for the card container */
  accessibilityLabel?: string;
};

export function Card({
  title,
  subtitle,
  children,
  variant = 'elevated',
  accessibilityLabel,
  style,
  ...props
}: CardProps) {
  const t = useTheme();

  const variantStyles = {
    elevated: {
      backgroundColor: t.surfaceElevated,
      borderWidth: 1,
      borderColor: t.border,
      ...Shadows.sm,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: t.border,
    },
    filled: {
      backgroundColor: t.card,
      borderWidth: 0,
    },
  };

  return (
    <View
      accessibilityRole={title ? 'summary' : undefined}
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          borderRadius: Radius.xl,
          padding: Spacing[5],
        },
        variantStyles[variant],
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      {title && (
        <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', marginBottom: Spacing[1], color: t.text }}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary, marginBottom: Spacing[4] }}>
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
}
