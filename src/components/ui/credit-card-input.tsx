import React, { useCallback, useState } from 'react';
import { Text, TextInput, View, type ViewProps } from 'react-native';

import { BrandColors, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { MaskedInput } from './masked-input';

export type CreditCardData = {
  number: string;
  expiry: string;
  cvv: string;
  type: string;
};

export type CreditCardInputProps = ViewProps & {
  onCardChange?: (card: CreditCardData) => void;
};

function detectCardType(number: string): string {
  const digits = number.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'visa';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^5[1-5]/.test(digits) || /^2(22[1-9]|2[3-9]\d|[3-6]\d{2}|7[01]\d|720)/.test(digits)) return 'mastercard';
  return 'unknown';
}

function CardIcon({ type, color }: { type: string; color: string }) {
  const size = 32;
  if (type === 'visa') {
    return (
      <View style={{ width: size, height: size * 0.65, justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color }}>VISA</Text>
      </View>
    );
  }
  if (type === 'mastercard') {
    return (
      <View style={{ width: size, height: size * 0.65, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: color, opacity: 0.9 }} />
        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: color, marginLeft: -6, opacity: 0.5 }} />
      </View>
    );
  }
  if (type === 'amex') {
    return (
      <View style={{ width: size, height: size * 0.65, justifyContent: 'center' }}>
        <Text style={{ fontSize: 12, fontWeight: '800', color }}>AMEX</Text>
      </View>
    );
  }
  return null;
}

export function CreditCardInput({
  onCardChange,
  style,
  ...props
}: CreditCardInputProps) {
  const t = useTheme();
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const cardType = detectCardType(number);
  const iconColor = cardType === 'visa' ? BrandColors.visa
    : cardType === 'mastercard' ? BrandColors.mastercard
    : cardType === 'amex' ? BrandColors.amex
    : t.textTertiary;

  const notifyChange = useCallback(
    (n: string, e: string, c: string) => {
      onCardChange?.({
        number: n,
        expiry: e,
        cvv: c,
        type: cardType,
      });
    },
    [onCardChange, cardType],
  );

  const handleNumberChange = useCallback(
    (raw: string) => {
      setNumber(raw);
      notifyChange(raw, expiry, cvv);
    },
    [expiry, cvv, notifyChange],
  );

  const handleExpiryChange = useCallback(
    (raw: string) => {
      let formatted = raw.slice(0, 4);
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
      }
      setExpiry(formatted);
      notifyChange(number, formatted, cvv);
    },
    [number, cvv, notifyChange],
  );

  const handleCvvChange = useCallback(
    (raw: string) => {
      const maxLen = cardType === 'amex' ? 4 : 3;
      setCvv(raw.slice(0, maxLen));
      notifyChange(number, expiry, raw.slice(0, maxLen));
    },
    [number, expiry, cardType, notifyChange],
  );

  return (
    <View style={[{ gap: 16 }, style]} {...props}>
      <View
        style={{
          padding: 20,
          borderRadius: Radius.xl,
          backgroundColor: t.surface,
          borderWidth: 1.5,
          borderColor: t.border,
          ...Shadows.md,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: t.textSecondary }}>Card number</Text>
          <CardIcon type={cardType} color={iconColor} />
        </View>
        <MaskedInput
          mask="#### #### #### ####"
          value={number}
          onChangeText={(raw) => handleNumberChange(raw)}
          placeholder="0000 0000 0000 0000"
          style={{ marginBottom: 16 }}
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: t.textSecondary, marginBottom: 6 }}>
              Expiry
            </Text>
            <TextInput
              value={expiry}
              onChangeText={(text) => {
                const raw = text.replace(/\D/g, '');
                handleExpiryChange(raw);
              }}
              placeholder="MM/YY"
              placeholderTextColor={t.textTertiary}
              keyboardType="number-pad"
              maxLength={5}
              accessibilityLabel="Expiry date"
              style={{
                minHeight: 48,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: Radius.lg,
                fontSize: 16,
                backgroundColor: t.background,
                color: t.text,
                borderWidth: 1.5,
                borderColor: t.border,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: t.textSecondary, marginBottom: 6 }}>
              CVV
            </Text>
            <TextInput
              value={cvv}
              onChangeText={(text) => handleCvvChange(text.replace(/\D/g, ''))}
              placeholder={cardType === 'amex' ? '0000' : '000'}
              placeholderTextColor={t.textTertiary}
              keyboardType="number-pad"
              maxLength={cardType === 'amex' ? 4 : 3}
              accessibilityLabel="CVV"
              secureTextEntry
              style={{
                minHeight: 48,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: Radius.lg,
                fontSize: 16,
                backgroundColor: t.background,
                color: t.text,
                borderWidth: 1.5,
                borderColor: t.border,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
