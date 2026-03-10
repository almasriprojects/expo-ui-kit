import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Star, UtensilsCrossed } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type RestaurantCardProps = {
  name: string;
  cuisine: string;
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  deliveryFee?: string;
  promo?: string;
  image?: string;
  onPress?: () => void;
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
            <Text style={{ fontSize: 11, fontWeight: '700', color: t.textOnColor }}>{promo}</Text>
          </View>
        )}
      </View>
      <View style={{ padding: 14 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }}>{name}</Text>
        <Text style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>{cuisine}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Star size={13} color={t.warning} fill={t.warning} />
            <Text style={{ fontSize: 13, fontWeight: '700', color: t.text }}>{rating.toFixed(1)}</Text>
            {reviewCount != null && (
              <Text style={{ fontSize: 12, color: t.textTertiary }}>({reviewCount})</Text>
            )}
          </View>
          <Text style={{ fontSize: 12, color: t.textTertiary }}>·</Text>
          <Text style={{ fontSize: 13, color: t.textSecondary }}>🕐 {deliveryTime}</Text>
          {deliveryFee && (
            <>
              <Text style={{ fontSize: 12, color: t.textTertiary }}>·</Text>
              <Text style={{ fontSize: 13, color: t.textSecondary }}>{deliveryFee}</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}
