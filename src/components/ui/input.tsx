import React, { forwardRef } from 'react';
import { Text, TextInput, type TextInputProps, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, hint, style, ...props }, ref) => {
    const t = useTheme();

    return (
      <View style={{ gap: 6 }}>
        {label && (
          <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor={t.textTertiary}
          style={[
            {
              minHeight: 48,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: Radius.lg,
              fontSize: 16,
              backgroundColor: t.surface,
              color: t.text,
              borderWidth: 1.5,
              borderColor: error ? t.errorBorder : t.border,
            },
            typeof style === 'object' ? style : undefined,
          ]}
          {...props}
        />
        {error && (
          <Text style={{ fontSize: 12, color: t.error, fontWeight: '500' }}>
            {error}
          </Text>
        )}
        {hint && !error && (
          <Text style={{ fontSize: 12, color: t.textTertiary }}>
            {hint}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';
