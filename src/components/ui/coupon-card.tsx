import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CouponCardProps = {
  code: string;
  description: string;
  expiresAt?: string;
  discount: string;
  onCopy?: () => void;
  style?: ViewStyle;
};

export function CouponCard({
  code,
  description,
  expiresAt,
  discount,
  onCopy,
  style,
}: CouponCardProps) {
  const t = useTheme();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    onCopy?.();
  };

  return (
    <View
      style={[
        {
          borderRadius: Radius.xl,
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: t.border,
          backgroundColor: t.card,
          padding: 16,
          ...Shadows.sm,
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel={`Coupon: ${discount} off. ${description}. Code: ${code}`}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
        }}>
        <View style={{ flex: 1, gap: 8 }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: t.primary,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: Radius.md,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                color: t.primaryForeground,
              }}>
              {discount}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: t.text,
              lineHeight: 20,
            }}>
            {description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: t.text,
                letterSpacing: 1,
              }}>
              {code}
            </Text>
            <Pressable
              onPress={handleCopy}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: Radius.md,
                backgroundColor: t.surface,
                borderWidth: 1,
                borderColor: t.border,
              }}
              accessibilityRole="button"
              accessibilityLabel={`Copy code ${code}`}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: t.primary,
                }}>
                Copy
              </Text>
            </Pressable>
          </View>
          {expiresAt && (
            <Text
              style={{
                fontSize: 12,
                color: t.textSecondary,
              }}>
              Expires {expiresAt}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
