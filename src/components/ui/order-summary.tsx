import React from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LineItem = {
  /** Label text for the line item */
  label: string;
  /** Value text (e.g. price) for the line item */
  value: string;
  /** Whether to render the line item in bold */
  bold?: boolean;
  /** Custom text color for the line item */
  color?: string;
};

export type OrderSummaryProps = ViewProps & {
  /** Array of line items to display */
  items: LineItem[];
  /** Total row with label and value */
  total: { label: string; value: string };
  /** Title displayed at the top of the summary */
  title?: string;
};

export function OrderSummary({
  items,
  total,
  title = 'Order Summary',
  style,
  ...props
}: OrderSummaryProps) {
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme.card, borderRadius: Radius.xl, padding: 16 }, style]}
      {...props}>
      <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', marginBottom: 14, color: theme.text }}>
        {title}
      </Text>

      {items.map((item, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 6,
          }}>
          <ThemedText
            style={{
              fontSize: FontSize.sm.fontSize,
              color: item.color ?? theme.textSecondary,
              fontWeight: item.bold ? '600' : '400',
            }}>
            {item.label}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: FontSize.sm.fontSize,
              fontWeight: item.bold ? '600' : '400',
              color: item.color ?? theme.text,
            }}>
            {item.value}
          </ThemedText>
        </View>
      ))}

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: theme.cardPressed,
          marginVertical: 10,
        }}
      />

      {/* Total */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: theme.text }}>{total.label}</Text>
        <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', color: theme.text }}>{total.value}</Text>
      </View>
    </View>
  );
}
