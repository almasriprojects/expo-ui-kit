import React from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PriceTagProps = ViewProps & {
  amount: number;
  currency?: string;
  symbol?: string;
  originalAmount?: number;
  period?: string;
  size?: 'sm' | 'md' | 'lg';
};

const fontSizes = { sm: 18, md: 26, lg: 36 };

export function PriceTag({
  amount,
  currency,
  symbol = '$',
  originalAmount,
  period,
  size = 'md',
  style,
  ...props
}: PriceTagProps) {
  const t = useTheme();
  const fontSize = fontSizes[size];
  const hasDiscount = originalAmount != null && originalAmount > amount;
  const discount = hasDiscount
    ? Math.round(((originalAmount - amount) / originalAmount) * 100)
    : 0;

  return (
    <View
      style={[{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }, typeof style === 'object' ? style : undefined]}
      {...props}>
      <Text style={{ fontSize, fontWeight: '800', color: t.text }}>
        {symbol}{amount.toFixed(2)}
      </Text>
      {currency && (
        <Text style={{ fontSize: fontSize * 0.4, color: t.textSecondary, fontWeight: '600' }}>
          {currency}
        </Text>
      )}
      {period && (
        <Text style={{ fontSize: fontSize * 0.4, color: t.textSecondary }}>
          /{period}
        </Text>
      )}
      {hasDiscount && (
        <>
          <Text
            style={{
              fontSize: fontSize * 0.5,
              color: t.textTertiary,
              textDecorationLine: 'line-through',
            }}>
            {symbol}{originalAmount.toFixed(2)}
          </Text>
          <View
            style={{
              backgroundColor: t.errorSoft,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: Radius.sm,
            }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: t.error }}>
              -{discount}%
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
