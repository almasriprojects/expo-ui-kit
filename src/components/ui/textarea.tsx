import React, { forwardRef } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TextareaProps = TextInputProps & {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea */
  error?: string;
  /** Maximum number of characters allowed */
  maxLength?: number;
  /** Whether to display the character count */
  showCount?: boolean;
};

export const Textarea = forwardRef<TextInput, TextareaProps>(
  (
    {
      label,
      error,
      maxLength,
      showCount = false,
      value,
      style,
      ...props
    },
    ref
  ) => {
    const t = useTheme();
    const count = value?.length ?? 0;

    return (
      <View style={{ gap: Spacing[1.5] }}>
        {label && (
          <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{label}</ThemedText>
        )}
        <TextInput
          ref={ref}
          value={value}
          multiline
          textAlignVertical="top"
          placeholderTextColor={t.textTertiary}
          maxLength={maxLength}
          style={[
            {
              paddingHorizontal: Spacing[4],
              paddingVertical: Spacing[3],
              borderRadius: Radius.lg,
              fontSize: FontSize.lg.fontSize,
              minHeight: 100,
              backgroundColor: t.surface,
              color: t.text,
              borderWidth: 1.5,
              borderColor: error ? t.errorBorder : t.border,
            },
            typeof style === 'object' ? style : undefined,
          ]}
          {...props}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {error ? (
            <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.error }}>{error}</ThemedText>
          ) : (
            <View />
          )}
          {showCount && (
            <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>
              {count}{maxLength ? `/${maxLength}` : ''}
            </ThemedText>
          )}
        </View>
      </View>
    );
  }
);

Textarea.displayName = 'Textarea';
