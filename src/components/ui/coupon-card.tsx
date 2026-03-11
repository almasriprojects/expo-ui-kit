import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CouponCardProps = {
  /** Coupon code string */
  code: string;
  /** Description of the coupon offer */
  description: string;
  /** Expiration date label */
  expiresAt?: string;
  /** Discount amount or percentage text */
  discount: string;
  /** Callback fired when the code is copied */
  onCopy?: () => void;
  /** Custom styles applied to the card container */
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
                fontSize: FontSize.sm.fontSize,
                fontWeight: '700',
                color: t.primaryForeground,
              }}>
              {discount}
            </Text>
          </View>
          <Text
            style={{
              fontSize: FontSize.md.fontSize,
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
                fontSize: FontSize.md.fontSize,
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
                  fontSize: FontSize.sm.fontSize,
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
                fontSize: FontSize.sm.fontSize,
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
