import { LinearGradient } from 'expo-linear-gradient';
import React, { type ReactNode } from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type GradientCardProps = {
  colors: [string, string, ...string[]];
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: string;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
};

export function GradientCard({
  colors,
  title,
  subtitle,
  children,
  icon,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
}: GradientCardProps) {
  const t = useTheme();
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[
        {
          borderRadius: Radius.xl,
          padding: 20,
          overflow: 'hidden',
          ...Shadows.md,
        },
        style,
      ]}>
      {icon && (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 28 }}>{icon}</Text>
        </View>
      )}
      {title && (
        <Text style={{ fontSize: 20, fontWeight: '700', color: t.textOnColor, marginBottom: 4 }}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={{ fontSize: 14, color: t.textOnColorSecondary, lineHeight: 20 }}>
          {subtitle}
        </Text>
      )}
      {children}
    </LinearGradient>
  );
}
