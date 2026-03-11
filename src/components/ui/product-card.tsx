import React from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ProductCardProps = Omit<PressableProps, 'style'> & {
  /** Name of the product */
  title: string;
  /** Current price of the product */
  price: number;
  /** Original price shown with strikethrough for discounts */
  originalPrice?: number;
  /** URL of the product image */
  image?: string;
  /** Star rating of the product */
  rating?: number;
  /** Number of customer reviews */
  reviewCount?: number;
  /** Badge label overlaid on the image (e.g. "SALE") */
  badge?: string;
  /** Currency code displayed after the price */
  currency?: string;
  /** Currency symbol displayed before the price */
  symbol?: string;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

function ProductCardBase({
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
            <ThemedText style={{ color: t.primaryForeground, fontSize: FontSize.xs.fontSize, fontWeight: '700' }}>
              {badge}
            </ThemedText>
          </View>
        )}
      </View>

      <View style={{ padding: 12, gap: 4 }}>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', color: t.text }} numberOfLines={2}>
          {title}
        </Text>

        {rating != null && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Star size={12} color={t.warning} fill={t.warning} />
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: t.text }}>
              {rating.toFixed(1)}
            </Text>
            {reviewCount != null && (
              <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>
                ({reviewCount})
              </ThemedText>
            )}
          </View>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
          <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text }}>
            {symbol}{price.toFixed(2)}
          </Text>
          {hasDiscount && (
            <ThemedText
              style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, textDecorationLine: 'line-through' }}>
              {symbol}{originalPrice.toFixed(2)}
            </ThemedText>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export const ProductCard = React.memo(ProductCardBase);
