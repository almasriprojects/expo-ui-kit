import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { CardGradients, Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BankCardDisplayProps = ViewProps & {
  /** Full or partial card number */
  cardNumber: string;
  /** Name of the card holder */
  holderName: string;
  /** Expiration date string (e.g. "12/25") */
  expiry: string;
  /** Card network brand */
  brand?: 'visa' | 'mastercard' | 'amex' | 'generic';
  /** Visual color variant of the card */
  variant?: 'dark' | 'blue' | 'gradient';
};

const brandLogos = {
  visa: 'VISA',
  mastercard: 'MC',
  amex: 'AMEX',
  generic: '••',
};

const variantToGradient: Record<string, keyof typeof CardGradients> = {
  dark: 'dark',
  blue: 'blue',
  gradient: 'purple',
};

export function BankCardDisplay({
  cardNumber,
  holderName,
  expiry,
  brand = 'visa',
  variant = 'dark',
  style,
  ...props
}: BankCardDisplayProps) {
  const theme = useTheme();
  const masked = cardNumber.replace(/(.{4})/g, '$1 ').trim();
  const displayNumber = masked.length > 4
    ? '•••• •••• •••• ' + masked.slice(-4)
    : masked;
  const gradientKey = variantToGradient[variant];

  return (
    <View
      style={[
        {
          backgroundColor: CardGradients[gradientKey][0],
          borderRadius: Radius.xl,
          padding: 24,
          aspectRatio: 1.586,
          justifyContent: 'space-between',
        },
        style,
      ]}
      {...props}>
      {/* Top row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View
          style={{
            width: 40,
            height: 28,
            borderRadius: Radius.xs,
            backgroundColor: theme.primaryForeground,
            opacity: 0.3,
          }}
        />
        <ThemedText style={{ color: theme.primaryForeground, fontSize: FontSize.md.fontSize, fontWeight: '700', letterSpacing: 2 }}>
          {brandLogos[brand]}
        </ThemedText>
      </View>

      {/* Card number */}
      <ThemedText
        style={{
          color: theme.primaryForeground,
          fontSize: FontSize.xl.fontSize,
          fontWeight: '500',
          letterSpacing: 3,
          fontVariant: ['tabular-nums'],
        }}>
        {displayNumber}
      </ThemedText>

      {/* Bottom row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          <ThemedText style={{ color: theme.primaryForeground, opacity: 0.6, fontSize: FontSize['2xs'].fontSize, fontWeight: '500', textTransform: 'uppercase', marginBottom: 4 }}>
            Card Holder
          </ThemedText>
          <ThemedText style={{ color: theme.primaryForeground, fontSize: FontSize.sm.fontSize, fontWeight: '600', textTransform: 'uppercase' }}>
            {holderName}
          </ThemedText>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <ThemedText style={{ color: theme.primaryForeground, opacity: 0.6, fontSize: FontSize['2xs'].fontSize, fontWeight: '500', marginBottom: 4 }}>
            Expires
          </ThemedText>
          <ThemedText style={{ color: theme.primaryForeground, fontSize: FontSize.sm.fontSize, fontWeight: '600' }}>
            {expiry}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
