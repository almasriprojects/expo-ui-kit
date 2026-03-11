import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SubscriptionCardProps = {
  /** Name of the subscription plan */
  name: string;
  /** Formatted price string */
  price: string;
  /** Billing period label (e.g. "/month") */
  period?: string;
  /** List of features included in the plan */
  features: string[];
  /** Whether this is the user's current plan */
  isCurrent?: boolean;
  /** Whether to highlight this plan as popular */
  isPopular?: boolean;
  /** Callback invoked when the plan is selected */
  onSelect: () => void;
  /** Label for the call-to-action button */
  ctaLabel?: string;
  /** Custom styles applied to the card container */
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
                fontSize: FontSize.sm.fontSize,
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
            fontSize: FontSize.xl.fontSize,
            fontWeight: '700',
            color: t.text,
          }}>
          {name}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text
            style={{
              fontSize: FontSize['3xl'].fontSize,
              fontWeight: '800',
              color: t.text,
            }}>
            {price}
          </Text>
          {period && (
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
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
                  fontSize: FontSize.md.fontSize,
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
              fontSize: FontSize.md.fontSize,
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
