import React, { forwardRef, useState } from 'react';
import { Pressable, Text, TextInput, type TextInputProps, View } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PasswordInputProps = TextInputProps & {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Hint text shown below the input when there is no error */
  hint?: string;
};

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ label, error, hint, style, ...props }, ref) => {
    const t = useTheme();
    const [secure, setSecure] = useState(true);

    return (
      <View style={{ gap: 6 }}>
        {label && (
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>
            {label}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 48,
            borderRadius: Radius.lg,
            backgroundColor: t.surface,
            borderWidth: 1.5,
            borderColor: error ? t.errorBorder : t.border,
            paddingRight: 4,
          }}>
          <TextInput
            ref={ref}
            secureTextEntry={secure}
            placeholderTextColor={t.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            style={[
              {
                flex: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: FontSize.lg.fontSize,
                color: t.text,
              },
              typeof style === 'object' ? style : undefined,
            ]}
            {...props}
          />
          <Pressable
            onPress={() => setSecure((v) => !v)}
            hitSlop={8}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}>
            <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.primary }}>
              {secure ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        </View>
        {error && (
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.error, fontWeight: '500' }}>{error}</Text>
        )}
        {hint && !error && (
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>{hint}</Text>
        )}
      </View>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
