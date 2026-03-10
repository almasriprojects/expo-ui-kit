import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ReceiptItem = {
  label: string;
  amount: number;
};

export type ReceiptProps = {
  items: ReceiptItem[];
  subtotal: number;
  tax?: number;
  total: number;
  paymentMethod?: string;
  date?: string;
  currency?: string;
  style?: ViewStyle;
};

function formatAmount(amount: number, currency = '$'): string {
  return `${currency}${amount.toFixed(2)}`;
}

export function Receipt({
  items,
  subtotal,
  tax,
  total,
  paymentMethod,
  date,
  currency = '$',
  style,
}: ReceiptProps) {
  const t = useTheme();
  const mono = Fonts?.mono ?? 'monospace';

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: t.border,
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel={`Receipt. Total: ${formatAmount(total, currency)}`}>
      {date && (
        <Text
          style={{
            fontSize: 12,
            color: t.textSecondary,
            marginBottom: 12,
            fontFamily: mono,
          }}>
          {date}
        </Text>
      )}

      <View style={{ gap: 8, marginBottom: 12 }}>
        {items.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: t.text,
                flex: 1,
                fontFamily: mono,
              }}
              numberOfLines={1}>
              {item.label}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: t.text,
                fontFamily: mono,
              }}>
              {formatAmount(item.amount, currency)}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          paddingTop: 12,
          gap: 6,
        }}>
        <View
          style={{
            height: 0,
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: t.border,
            marginBottom: 12,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 13, color: t.textSecondary, fontFamily: mono }}>
            Subtotal
          </Text>
          <Text style={{ fontSize: 13, color: t.textSecondary, fontFamily: mono }}>
            {formatAmount(subtotal, currency)}
          </Text>
        </View>
        {tax != null && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{ fontSize: 13, color: t.textSecondary, fontFamily: mono }}>
              Tax
            </Text>
            <Text
              style={{ fontSize: 13, color: t.textSecondary, fontFamily: mono }}>
              {formatAmount(tax, currency)}
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
            paddingTop: 8,
            borderTopWidth: 1,
            borderColor: t.border,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: t.text,
              fontFamily: mono,
            }}>
            Total
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: t.text,
              fontFamily: mono,
            }}>
            {formatAmount(total, currency)}
          </Text>
        </View>
      </View>

      {paymentMethod && (
        <Text
          style={{
            fontSize: 12,
            color: t.textTertiary,
            marginTop: 12,
            fontFamily: mono,
          }}>
          Paid with {paymentMethod}
        </Text>
      )}
    </View>
  );
}
