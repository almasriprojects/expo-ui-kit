import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Fonts, FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ReceiptItem = {
  /** Label for the receipt line item */
  label: string;
  /** Numeric amount for the line item */
  amount: number;
};

export type ReceiptProps = {
  /** Array of purchased items */
  items: ReceiptItem[];
  /** Subtotal before tax */
  subtotal: number;
  /** Tax amount */
  tax?: number;
  /** Final total amount */
  total: number;
  /** Payment method description (e.g. "Visa ****1234") */
  paymentMethod?: string;
  /** Formatted date string for the transaction */
  date?: string;
  /** Currency symbol used for formatting amounts */
  currency?: string;
  /** Custom styles applied to the receipt container */
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
            fontSize: FontSize.sm.fontSize,
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
                fontSize: FontSize.md.fontSize,
                color: t.text,
                flex: 1,
                fontFamily: mono,
              }}
              numberOfLines={1}>
              {item.label}
            </Text>
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
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
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontFamily: mono }}>
            Subtotal
          </Text>
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontFamily: mono }}>
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
              style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontFamily: mono }}>
              Tax
            </Text>
            <Text
              style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontFamily: mono }}>
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
              fontSize: FontSize.lg.fontSize,
              fontWeight: '700',
              color: t.text,
              fontFamily: mono,
            }}>
            Total
          </Text>
          <Text
            style={{
              fontSize: FontSize.lg.fontSize,
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
            fontSize: FontSize.sm.fontSize,
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
