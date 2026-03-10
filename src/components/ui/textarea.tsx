import React, { forwardRef } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TextareaProps = TextInputProps & {
  label?: string;
  error?: string;
  maxLength?: number;
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
      <View style={{ gap: 6 }}>
        {label && (
          <ThemedText style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{label}</ThemedText>
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
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: Radius.lg,
              fontSize: 16,
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
            <ThemedText style={{ fontSize: 12, color: t.error }}>{error}</ThemedText>
          ) : (
            <View />
          )}
          {showCount && (
            <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>
              {count}{maxLength ? `/${maxLength}` : ''}
            </ThemedText>
          )}
        </View>
      </View>
    );
  }
);

Textarea.displayName = 'Textarea';
