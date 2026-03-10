import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SubscriptionCardProps = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  isCurrent?: boolean;
  isPopular?: boolean;
  onSelect: () => void;
  ctaLabel?: string;
  style?: ViewStyle;
};

export function SubscriptionCard({
  name,
  price,
  period,
  features,
  isCurrent = false,
  isPopular = false,
  onSelect,
  ctaLabel,
  style,
}: SubscriptionCardProps) {
  const t = useTheme();

  const defaultCta = isCurrent ? 'Current Plan' : 'Select Plan';

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          borderWidth: 1.5,
          borderColor: isCurrent ? t.primary : t.border,
          padding: 20,
          ...Shadows.sm,
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel={`${name} plan. ${price}${period ? ` per ${period}` : ''}. ${isCurrent ? 'Current plan' : ''}`}>
      {isPopular && (
        <View
          style={{
            position: 'absolute',
            top: -1,
            left: 20,
            right: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: t.primary,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: Radius.md,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: t.primaryForeground,
              }}>
              Popular
            </Text>
          </View>
        </View>
      )}

      <View style={{ marginTop: isPopular ? 16 : 0, gap: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: t.text,
          }}>
          {name}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: t.text,
            }}>
            {price}
          </Text>
          {period && (
            <Text
              style={{
                fontSize: 14,
                color: t.textSecondary,
              }}>
              /{period}
            </Text>
          )}
        </View>

        <View style={{ gap: 8, marginTop: 4 }}>
          {features.map((feature, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <Check size={16} color={t.success} />
              <Text
                style={{
                  fontSize: 14,
                  color: t.text,
                  flex: 1,
                }}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={onSelect}
          disabled={isCurrent}
          style={{
            marginTop: 8,
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: Radius.lg,
            backgroundColor: isCurrent ? t.surface : t.primary,
            borderWidth: isCurrent ? 1.5 : 0,
            borderColor: isCurrent ? t.border : undefined,
            alignItems: 'center',
          }}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel ?? defaultCta}
          accessibilityState={{ disabled: isCurrent }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: isCurrent ? t.textSecondary : t.primaryForeground,
            }}>
            {ctaLabel ?? defaultCta}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
