import React, { forwardRef, useState } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, FontSize } from '@/constants/theme';

export type CurrencyInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  /** Current numeric value */
  value: number;
  /** Callback fired when the value changes */
  onValueChange: (value: number) => void;
  /** Currency code displayed on the right (e.g. "USD") */
  currency?: string;
  /** Currency symbol displayed on the left (e.g. "$") */
  symbol?: string;
  /** Label text shown above the input */
  label?: string;
  /** Error message shown below the input */
  error?: string;
};

export const CurrencyInput = forwardRef<TextInput, CurrencyInputProps>(
  (
    {
      value,
      onValueChange,
      currency = 'USD',
      symbol = '$',
      label,
      error,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [rawText, setRawText] = useState(value > 0 ? value.toFixed(2) : '');

    const handleChange = (text: string) => {
      const cleaned = text.replace(/[^0-9.]/g, '');
      const parts = cleaned.split('.');
      const formatted =
        parts.length > 2
          ? parts[0] + '.' + parts.slice(1).join('')
          : parts.length === 2
            ? parts[0] + '.' + parts[1].slice(0, 2)
            : cleaned;
      setRawText(formatted);
      const num = parseFloat(formatted);
      onValueChange(isNaN(num) ? 0 : num);
    };

    return (
      <View>
        {label && (
          <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: theme.text, marginBottom: 6 }}>
            {label}
          </ThemedText>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surface,
            borderRadius: Radius.lg,
            borderWidth: 1.5,
            borderColor: error ? theme.errorBorder : theme.border,
            minHeight: 48,
          }}>
          <View
            style={{
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRightWidth: 1,
              borderRightColor: theme.border,
            }}>
            <ThemedText style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: theme.textSecondary }}>
              {symbol}
            </ThemedText>
          </View>
          <TextInput
            ref={ref}
            value={rawText}
            onChangeText={handleChange}
            placeholder="0.00"
            placeholderTextColor={theme.textSecondary}
            keyboardType="decimal-pad"
            style={{
              flex: 1,
              paddingHorizontal: 14,
              paddingVertical: 12,
              fontSize: FontSize.lg.fontSize,
              color: theme.text,
            }}
            {...props}
          />
          <View style={{ paddingRight: 14 }}>
            <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, fontWeight: '500' }}>
              {currency}
            </ThemedText>
          </View>
        </View>
        {error && (
          <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.error, marginTop: 4, fontWeight: '500' }}>
            {error}
          </ThemedText>
        )}
      </View>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
