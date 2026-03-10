import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PropertyCardProps = {
  title: string;
  address: string;
  price: string;
  priceUnit?: string;
  beds: number;
  baths: number;
  sqft: string;
  type?: string;
  featured?: boolean;
  onPress?: () => void;
  onFavorite?: () => void;
  favorited?: boolean;
  style?: ViewStyle;
};

export function PropertyCard({
  title,
  address,
  price,
  priceUnit,
  beds,
  baths,
  sqft,
  type,
  featured = false,
  onPress,
  onFavorite,
  favorited = false,
  style,
}: PropertyCardProps) {
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
          borderColor: featured ? t.primary : t.border,
          overflow: 'hidden',
          ...Shadows.sm,
        },
        style,
      ]}>
      <View style={{ height: 160, backgroundColor: t.surfaceActive, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 36, opacity: 0.4 }}>🏡</Text>
        {featured && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: t.primary,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: Radius.sm,
            }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: t.primaryForeground }}>FEATURED</Text>
          </View>
        )}
        {type && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: featured ? 10 : 10,
              backgroundColor: t.overlayDark,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: Radius.sm,
            }}>
            <Text style={{ fontSize: 10, fontWeight: '600', color: t.textOnColor }}>{type}</Text>
          </View>
        )}
        {onFavorite && (
          <Pressable
            onPress={onFavorite}
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              width: 34,
              height: 34,
              borderRadius: Radius.full,
              backgroundColor: t.surfaceOverlay,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16 }}>{favorited ? '❤️' : '🤍'}</Text>
          </Pressable>
        )}
      </View>
      <View style={{ padding: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: t.text }}>{price}</Text>
          {priceUnit && (
            <Text style={{ fontSize: 13, color: t.textSecondary }}>/{priceUnit}</Text>
          )}
        </View>
        <Text style={{ fontSize: 15, fontWeight: '600', color: t.text, marginTop: 4 }} numberOfLines={1}>
          {title}
        </Text>
        <Text style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>{address}</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 14,
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: t.border,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 13 }}>🛏️</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{beds}</Text>
            <Text style={{ fontSize: 12, color: t.textSecondary }}>beds</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 13 }}>🚿</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{baths}</Text>
            <Text style={{ fontSize: 12, color: t.textSecondary }}>baths</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 13 }}>📐</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{sqft}</Text>
            <Text style={{ fontSize: 12, color: t.textSecondary }}>sqft</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
