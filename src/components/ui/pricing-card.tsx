import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PricingCardProps = {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  buttonLabel?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function PricingCard({
  title,
  price,
  period = '/month',
  description,
  features,
  highlighted = false,
  badge,
  buttonLabel = 'Get Started',
  onPress,
  style,
}: PricingCardProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: highlighted ? t.primary : t.card,
          borderRadius: Radius.xl,
          padding: 24,
          borderWidth: highlighted ? 0 : 1,
          borderColor: t.border,
          ...(highlighted ? Shadows.lg : Shadows.sm),
        },
        style,
      ]}>
      {badge && (
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: highlighted ? t.surfaceOnColor : t.primarySoft,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: Radius.full,
            marginBottom: 12,
          }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: highlighted ? t.textOnColor : t.primary,
              textTransform: 'uppercase',
            }}>
            {badge}
          </Text>
        </View>
      )}

      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: highlighted ? t.textOnColorSecondary : t.textSecondary,
        }}>
        {title}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2, marginTop: 8 }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: '800',
            color: highlighted ? t.textOnColor : t.text,
          }}>
          {price}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: highlighted ? t.textOnColorTertiary : t.textTertiary,
          }}>
          {period}
        </Text>
      </View>

      {description && (
        <Text
          style={{
            fontSize: 13,
            color: highlighted ? t.textOnColorTertiary : t.textSecondary,
            marginTop: 8,
            lineHeight: 19,
          }}>
          {description}
        </Text>
      )}

      <View style={{ marginTop: 20, gap: 10 }}>
        {features.map((feature, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: Radius.full,
                backgroundColor: highlighted ? t.surfaceOnColor : t.successSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Check size={12} color={highlighted ? t.textOnColor : t.success} />
            </View>
            <Text
              style={{
                fontSize: 14,
                color: highlighted ? t.textOnColorSecondary : t.text,
                flex: 1,
              }}>
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onPress}
        style={{
          marginTop: 24,
          paddingVertical: 14,
          borderRadius: Radius.xl,
          alignItems: 'center',
          backgroundColor: highlighted ? t.textOnColor : t.primary,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: highlighted ? t.primary : t.primaryForeground,
          }}>
          {buttonLabel}
        </Text>
      </Pressable>
    </View>
  );
}
