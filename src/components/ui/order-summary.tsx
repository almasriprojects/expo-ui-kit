import React from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type LineItem = {
  label: string;
  value: string;
  bold?: boolean;
  color?: string;
};

type OrderSummaryProps = ViewProps & {
  items: LineItem[];
  total: { label: string; value: string };
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
      style={[{ backgroundColor: theme.card, borderRadius: 16, padding: 16 }, style]}
      {...props}>
      <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 14, color: theme.text }}>
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
              fontSize: 13,
              color: item.color ?? theme.textSecondary,
              fontWeight: item.bold ? '600' : '400',
            }}>
            {item.label}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
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
        <Text style={{ fontSize: 15, fontWeight: '700', color: theme.text }}>{total.label}</Text>
        <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text }}>{total.value}</Text>
      </View>
    </View>
  );
}
