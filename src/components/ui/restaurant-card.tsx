import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Clock, Star, UtensilsCrossed } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type RestaurantCardProps = {
  /** Name of the restaurant */
  name: string;
  /** Cuisine type (e.g. "Italian", "Japanese") */
  cuisine: string;
  /** Star rating of the restaurant */
  rating: number;
  /** Number of customer reviews */
  reviewCount?: number;
  /** Estimated delivery time string */
  deliveryTime: string;
  /** Delivery fee string (e.g. "Free", "$2.99") */
  deliveryFee?: string;
  /** Promotional badge text overlaid on the image */
  promo?: string;
  /** URL of the restaurant image */
  image?: string;
  /** Callback invoked when the card is pressed */
  onPress?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

export function RestaurantCard({
  name,
  cuisine,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  promo,
  onPress,
  style,
}: RestaurantCardProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: t.border,
          overflow: 'hidden',
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          height: 140,
          backgroundColor: t.surfaceActive,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <UtensilsCrossed size={40} color={t.textTertiary} style={{ opacity: 0.4 }} />
        {promo && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: t.error,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: Radius.sm,
            }}>
            <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '700', color: t.textOnColor }}>{promo}</Text>
          </View>
        )}
      </View>
      <View style={{ padding: 14 }}>
        <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text }}>{name}</Text>
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 2 }}>{cuisine}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Star size={13} color={t.warning} fill={t.warning} />
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '700', color: t.text }}>{rating.toFixed(1)}</Text>
            {reviewCount != null && (
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>({reviewCount})</Text>
            )}
          </View>
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>·</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Clock size={FontSize.sm.fontSize} color={t.textSecondary} />
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{deliveryTime}</Text>
          </View>
          {deliveryFee && (
            <>
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>·</Text>
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{deliveryFee}</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}
