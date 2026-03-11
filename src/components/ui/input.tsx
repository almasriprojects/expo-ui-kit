import React, { forwardRef } from 'react';
import { Text, TextInput, type TextInputProps, View } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InputProps = TextInputProps & {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Hint text displayed below the input when no error */
  hint?: string;
};

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, hint, style, ...props }, ref) => {
    const t = useTheme();

    return (
      <View style={{ gap: Spacing[1.5] }}>
        {label && (
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          accessibilityLabel={label ?? props.placeholder}
          aria-invalid={!!error}
          accessibilityHint={error ?? hint}
          placeholderTextColor={t.textTertiary}
          style={[
            {
              minHeight: 48,
              paddingHorizontal: Spacing[4],
              paddingVertical: Spacing[3],
              borderRadius: Radius.lg,
              fontSize: FontSize.lg.fontSize,
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
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.error, fontWeight: '500' }}>
            {error}
          </Text>
        )}
        {hint && !error && (
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>
            {hint}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';
