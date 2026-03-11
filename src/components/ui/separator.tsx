import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

export type SeparatorProps = ViewProps & {
  /** Optional text label displayed in the center of the divider */
  label?: string;
  /** Direction of the separator line */
  orientation?: 'horizontal' | 'vertical';
};

export function Separator({
  label,
  orientation = 'horizontal',
  style,
  ...props
}: SeparatorProps) {
  const t = useTheme();
  const lineStyle = { backgroundColor: t.border };

  if (orientation === 'vertical') {
    return (
      <View
        style={[{ width: 1 }, lineStyle, typeof style === 'object' ? style : undefined]}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <View
        style={[
          { flexDirection: 'row', alignItems: 'center', gap: 16 },
          typeof style === 'object' ? style : undefined,
        ]}
        {...props}>
        <View style={[{ flex: 1, height: 1 }, lineStyle]} />
        <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, textTransform: 'uppercase', letterSpacing: 1 }}>
          {label}
        </ThemedText>
        <View style={[{ flex: 1, height: 1 }, lineStyle]} />
      </View>
    );
  }

  return (
    <View
      style={[{ height: 1, width: '100%' }, lineStyle, typeof style === 'object' ? style : undefined]}
      {...props}
    />
  );
}
