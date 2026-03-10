import React, { forwardRef, useState } from 'react';
import { Pressable, Text, TextInput, type TextInputProps, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PasswordInputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
};

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ label, error, hint, style, ...props }, ref) => {
    const t = useTheme();
    const [secure, setSecure] = useState(true);

    return (
      <View style={{ gap: 6 }}>
        {label && (
          <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>
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
                fontSize: 16,
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
            <Text style={{ fontSize: 14, fontWeight: '600', color: t.primary }}>
              {secure ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        </View>
        {error && (
          <Text style={{ fontSize: 12, color: t.error, fontWeight: '500' }}>{error}</Text>
        )}
        {hint && !error && (
          <Text style={{ fontSize: 12, color: t.textTertiary }}>{hint}</Text>
        )}
      </View>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
