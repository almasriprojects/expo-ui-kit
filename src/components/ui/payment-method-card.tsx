import React from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';
import { CreditCard, Landmark } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { BrandColors, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PaymentMethodCardProps = Omit<PressableProps, 'style'> & {
  style?: ViewStyle;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank';
  last4?: string;
  expiry?: string;
  label?: string;
  selected?: boolean;
  isDefault?: boolean;
};

const methodConfig = {
  visa: { abbr: 'V', name: 'Visa', color: BrandColors.visa, useIcon: true },
  mastercard: { abbr: 'MC', name: 'Mastercard', color: BrandColors.mastercard, useIcon: true },
  amex: { abbr: 'AX', name: 'Amex', color: BrandColors.amex, useIcon: true },
  paypal: { abbr: 'PP', name: 'PayPal', color: BrandColors.paypal, useIcon: false },
  apple_pay: { abbr: 'AP', name: 'Apple Pay', color: BrandColors.applePay, useIcon: false },
  google_pay: { abbr: 'GP', name: 'Google Pay', color: BrandColors.googlePay, useIcon: false },
  bank: { abbr: 'BK', name: 'Bank Transfer', color: BrandColors.bank, useIcon: false },
};

export function PaymentMethodCard({
  type,
  last4,
  expiry,
  label,
  selected = false,
  isDefault,
  style,
  ...props
}: PaymentMethodCardProps) {
  const theme = useTheme();
  const config = methodConfig[type];

  return (
    <Pressable
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.card,
          borderRadius: Radius.xl,
          padding: 14,
          gap: 12,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? theme.primaryPressed : theme.cardPressed,
        },
        style,
      ]}
      {...props}>
      {/* Radio indicator */}
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: Radius.lg,
          borderWidth: 2,
          borderColor: selected ? theme.primaryPressed : theme.cardPressed,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {selected && (
          <View style={{ width: 10, height: 10, borderRadius: Radius.full, backgroundColor: theme.primaryPressed }} />
        )}
      </View>

      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 28,
          borderRadius: Radius.sm,
          backgroundColor: theme.cardPressed,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {config.useIcon ? (
          <CreditCard size={16} color={config.color} />
        ) : type === 'bank' ? (
          <Landmark size={16} color={config.color} />
        ) : (
          <Text style={{ fontSize: 11, fontWeight: '800', color: config.color }}>{config.abbr}</Text>
        )}
      </View>

      {/* Details */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text }}>
            {label ?? config.name}
          </Text>
          {isDefault && (
            <View
              style={{
                backgroundColor: theme.primarySoft,
                paddingHorizontal: 6,
                paddingVertical: 1,
                borderRadius: Radius.xs,
              }}>
              <ThemedText style={{ fontSize: 9, color: theme.primaryPressed, fontWeight: '600' }}>
                DEFAULT
              </ThemedText>
            </View>
          )}
        </View>
        {last4 && (
          <ThemedText style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>
            •••• {last4}{expiry ? ` · ${expiry}` : ''}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}
