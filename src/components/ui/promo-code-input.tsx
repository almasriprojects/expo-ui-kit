import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PromoCodeInputProps = {
  /** Callback invoked when a promo code is applied or removed */
  onApply: (code: string) => void;
  /** Currently applied promo code string */
  appliedCode?: string;
  /** Discount description shown next to the applied code */
  discount?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Whether the apply action is in a loading state */
  loading?: boolean;
  /** Custom styles applied to the container */
  style?: ViewStyle;
};

export function PromoCodeInput({
  onApply,
  appliedCode,
  discount,
  error,
  loading = false,
  style,
}: PromoCodeInputProps) {
  const t = useTheme();
  const [code, setCode] = useState('');
  const isApplied = !!appliedCode;

  if (isApplied) {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: t.successSoft,
            borderRadius: Radius.lg,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: t.success,
          },
          style,
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Check size={14} color={t.success} />
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.success }}>{appliedCode}</Text>
          {discount && (
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.success }}>({discount})</Text>
          )}
        </View>
        <Pressable onPress={() => onApply('')}>
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.error }}>Remove</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          borderWidth: 1.5,
          borderColor: error ? t.errorBorder : t.border,
          overflow: 'hidden',
        }}>
        <TextInput
          value={code}
          onChangeText={(text) => setCode(text.toUpperCase())}
          placeholder="Enter promo code"
          placeholderTextColor={t.textTertiary}
          autoCapitalize="characters"
          autoCorrect={false}
          style={{
            flex: 1,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: FontSize.md.fontSize,
            fontWeight: '600',
            color: t.text,
            letterSpacing: 1,
          }}
        />
        <Pressable
          onPress={() => code.trim() && onApply(code.trim())}
          disabled={!code.trim() || loading}
          style={{
            paddingHorizontal: 18,
            paddingVertical: 12,
            backgroundColor: code.trim() ? t.primary : t.surface,
          }}>
          <Text
            style={{
              fontSize: FontSize.md.fontSize,
              fontWeight: '700',
              color: code.trim() ? t.primaryForeground : t.textTertiary,
            }}>
            {loading ? '...' : 'Apply'}
          </Text>
        </Pressable>
      </View>
      {error && (
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.error, marginTop: 6, fontWeight: '500' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
