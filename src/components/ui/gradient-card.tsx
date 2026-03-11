import { LinearGradient } from 'expo-linear-gradient';
import React, { type ReactNode } from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type GradientCardProps = {
  /** Array of gradient colors (minimum two) */
  colors: [string, string, ...string[]];
  /** Title text displayed on the card */
  title?: string;
  /** Subtitle text displayed below the title */
  subtitle?: string;
  /** Additional content rendered inside the card */
  children?: ReactNode;
  /** Emoji or text icon displayed at the top */
  icon?: string;
  /** Gradient start point coordinates */
  start?: { x: number; y: number };
  /** Gradient end point coordinates */
  end?: { x: number; y: number };
  /** Custom styles applied to the card container */
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
          <Text style={{ fontSize: FontSize['3xl'].fontSize }}>{icon}</Text>
        </View>
      )}
      {title && (
        <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', color: t.textOnColor, marginBottom: 4 }}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textOnColorSecondary, lineHeight: 20 }}>
          {subtitle}
        </Text>
      )}
      {children}
    </LinearGradient>
  );
}
