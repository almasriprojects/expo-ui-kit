import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Bath, Bed, Heart, Home, Ruler } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PropertyCardProps = {
  /** Name or title of the property listing */
  title: string;
  /** Street address of the property */
  address: string;
  /** Formatted price string */
  price: string;
  /** Price period unit (e.g. "month", "night") */
  priceUnit?: string;
  /** Number of bedrooms */
  beds: number;
  /** Number of bathrooms */
  baths: number;
  /** Square footage as a formatted string */
  sqft: string;
  /** Property type label (e.g. "Condo", "House") */
  type?: string;
  /** Whether this listing is featured */
  featured?: boolean;
  /** Callback invoked when the card is pressed */
  onPress?: () => void;
  /** Callback invoked when the favorite button is pressed */
  onFavorite?: () => void;
  /** Whether the property is currently favorited */
  favorited?: boolean;
  /** Custom styles applied to the card container */
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
        <Home size={36} color={t.textSecondary} />
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
            <Text style={{ fontSize: FontSize['2xs'].fontSize, fontWeight: '700', color: t.primaryForeground }}>FEATURED</Text>
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
            <Text style={{ fontSize: FontSize['2xs'].fontSize, fontWeight: '600', color: t.textOnColor }}>{type}</Text>
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
            <Heart
              size={16}
              color={favorited ? t.error : t.textSecondary}
              fill={favorited ? t.error : 'none'}
            />
          </Pressable>
        )}
      </View>
      <View style={{ padding: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '800', color: t.text }}>{price}</Text>
          {priceUnit && (
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>/{priceUnit}</Text>
          )}
        </View>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text, marginTop: 4 }} numberOfLines={1}>
          {title}
        </Text>
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 2 }}>{address}</Text>
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
            <Bed size={13} color={t.textSecondary} />
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.text }}>{beds}</Text>
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>beds</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Bath size={13} color={t.textSecondary} />
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.text }}>{baths}</Text>
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>baths</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ruler size={13} color={t.textSecondary} />
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.text }}>{sqft}</Text>
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>sqft</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
