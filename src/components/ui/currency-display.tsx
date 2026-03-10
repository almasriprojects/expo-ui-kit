import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CurrencyDisplayProps = {
  amount: number;
  currency?: string;
  locale?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
};

const sizeMap = {
  sm: FontSize.sm,
  md: FontSize.md,
  lg: FontSize.lg,
};

export function CurrencyDisplay({
  amount,
  currency = 'USD',
  locale,
  size = 'md',
  color,
}: CurrencyDisplayProps) {
  const t = useTheme();
  const textColor = color ?? t.text;

  const formatted = (() => {
    try {
      return new Intl.NumberFormat(locale ?? 'en-US', {
        style: 'currency',
        currency,
      }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(2)}`;
    }
  })();

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`${formatted}`}>
      <ThemedText
        style={{
          ...sizeMap[size],
          fontWeight: '600',
          color: textColor,
        }}>
        {formatted}
      </ThemedText>
    </View>
  );
}
