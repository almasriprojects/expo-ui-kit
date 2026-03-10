import React from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ProductCardProps = Omit<PressableProps, 'style'> & {
  title: string;
  price: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  currency?: string;
  symbol?: string;
  style?: ViewStyle;
};

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  badge,
  currency,
  symbol = '$',
  style,
  ...props
}: ProductCardProps) {
  const t = useTheme();
  const hasDiscount = originalPrice != null && originalPrice > price;

  return (
    <Pressable
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}>
      <View style={{ aspectRatio: 1, backgroundColor: t.cardPressed }}>
        {image && (
          <Image
            source={image}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        )}
        {badge && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: t.error,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: Radius.md,
            }}>
            <ThemedText style={{ color: t.primaryForeground, fontSize: 11, fontWeight: '700' }}>
              {badge}
            </ThemedText>
          </View>
        )}
      </View>

      <View style={{ padding: 12, gap: 4 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: t.text }} numberOfLines={2}>
          {title}
        </Text>

        {rating != null && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <ThemedText style={{ fontSize: 12, color: t.star }}>★</ThemedText>
            <Text style={{ fontSize: 12, fontWeight: '500', color: t.text }}>
              {rating.toFixed(1)}
            </Text>
            {reviewCount != null && (
              <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>
                ({reviewCount})
              </ThemedText>
            )}
          </View>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }}>
            {symbol}{price.toFixed(2)}
          </Text>
          {hasDiscount && (
            <ThemedText
              style={{ fontSize: 12, color: t.textSecondary, textDecorationLine: 'line-through' }}>
              {symbol}{originalPrice.toFixed(2)}
            </ThemedText>
          )}
        </View>
      </View>
    </Pressable>
  );
}
