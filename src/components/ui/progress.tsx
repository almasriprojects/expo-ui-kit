import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

type ProgressProps = ViewProps & {
  value: number;
  max?: number;
  showLabel?: boolean;
  variant?: ProgressVariant;
  size?: 'sm' | 'md' | 'lg';
};

const sizeHeights = { sm: 4, md: 8, lg: 12 };

function getTrackColor(variant: ProgressVariant, t: ThemeTokens) {
  switch (variant) {
    case 'success':
      return t.success;
    case 'warning':
      return t.warning;
    case 'error':
      return t.error;
    default:
      return t.primary;
  }
}

export function Progress({
  value,
  max = 100,
  showLabel = false,
  variant = 'default',
  size = 'md',
  style,
  ...props
}: ProgressProps) {
  const t = useTheme();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const height = sizeHeights[size];

  return (
    <View style={[{ gap: 6 }, typeof style === 'object' ? style : undefined]} {...props}>
      {showLabel && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>
            Progress
          </ThemedText>
          <ThemedText style={{ fontSize: 12, fontWeight: '600', color: t.text }}>
            {Math.round(percentage)}%
          </ThemedText>
        </View>
      )}
      <View
        style={{
          width: '100%',
          height,
          borderRadius: Radius.full,
          overflow: 'hidden',
          backgroundColor: t.surfacePressed,
        }}>
        <View
          style={{
            height,
            borderRadius: Radius.full,
            backgroundColor: getTrackColor(variant, t),
            width: `${percentage}%`,
          }}
        />
      </View>
    </View>
  );
}
