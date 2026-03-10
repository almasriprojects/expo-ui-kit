import React, { useRef, useState } from 'react';
import { TextInput, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type OTPInputProps = ViewProps & {
  length?: number;
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
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
        <ThemedText style={{ fontSize: 14, fontWeight: '500', marginBottom: 8 }}>
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
              <ThemedText style={{ fontSize: 20, fontWeight: '600' }}>
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
        <ThemedText style={{ fontSize: 12, color: t.error, textAlign: 'center', marginTop: 8 }}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}
