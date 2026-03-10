import React, { type ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CardProps = ViewProps & {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
};

export function Card({
  title,
  subtitle,
  children,
  variant = 'elevated',
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
      style={[
        {
          borderRadius: Radius.xl,
          padding: 20,
        },
        variantStyles[variant],
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      {title && (
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 4, color: t.text }}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={{ fontSize: 14, color: t.textSecondary, marginBottom: 16 }}>
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
}
