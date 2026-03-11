import React, { useRef, useState } from 'react';
import { TextInput, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type OTPInputProps = ViewProps & {
  /** Number of OTP digit boxes */
  length?: number;
  /** Current OTP string value */
  value: string;
  /** Callback invoked when the OTP value changes */
  onValueChange: (value: string) => void;
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
};

export function OTPInput({
  length = 6,
  value,
  onValueChange,
  label,
  error,
  style,
  ...props
}: OTPInputProps) {
  const t = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const digits = value.split('').concat(Array(length - value.length).fill(''));

  return (
    <View style={typeof style === 'object' ? style : undefined} {...props}>
      {label && (
        <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', marginBottom: 8 }}>
          {label}
        </ThemedText>
      )}
      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
        {digits.slice(0, length).map((digit, i) => {
          const isActive = focused && i === value.length;
          return (
            <View
              key={i}
              style={{
                width: 44,
                height: 56,
                borderRadius: Radius.xl,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                backgroundColor: t.backgroundSecondary,
                borderColor: error
                  ? t.errorBorder
                  : isActive
                    ? t.primary
                    : digit
                      ? t.borderStrong
                      : t.border,
              }}>
              <ThemedText style={{ fontSize: FontSize.xl.fontSize, fontWeight: '600' }}>
                {digit}
              </ThemedText>
            </View>
          );
        })}
      </View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
          onValueChange(cleaned);
        }}
        keyboardType="number-pad"
        maxLength={length}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        caretHidden
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
      />

      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        onTouchEnd={() => inputRef.current?.focus()}
      />

      {error && (
        <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.error, textAlign: 'center', marginTop: 8 }}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}
