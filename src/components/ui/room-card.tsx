import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Home, Star } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type RoomCardProps = {
  /** Title or name of the room listing */
  title: string;
  /** Name of the host */
  host?: string;
  /** Formatted price string */
  price: string;
  /** Price period unit (e.g. "night") */
  priceUnit?: string;
  /** Star rating of the listing */
  rating?: number;
  /** Number of guest reviews */
  reviewCount?: number;
  /** List of amenity names */
  amenities?: string[];
  /** Maximum number of guests */
  guests?: number;
  /** Number of beds */
  beds?: number;
  /** Number of bathrooms */
  baths?: number;
  /** Whether the host has superhost status */
  superhost?: boolean;
  /** Callback invoked when the card is pressed */
  onPress?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

export function RoomCard({
  title,
  host,
  price,
  priceUnit = 'night',
  rating,
  reviewCount,
  amenities,
  guests,
  beds,
  baths,
  superhost = false,
  onPress,
  style,
}: RoomCardProps) {
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
      <View style={{ height: 160, backgroundColor: t.surfaceActive, alignItems: 'center', justifyContent: 'center' }}>
        <Home size={36} color={t.textSecondary} />
        {superhost && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: t.card,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: Radius.sm,
              ...Shadows.sm,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Star size={10} color={t.warning} fill={t.warning} />
              <Text style={{ fontSize: FontSize['2xs'].fontSize, fontWeight: '700', color: t.text }}>SUPERHOST</Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ padding: 14 }}>
        {host && (
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginBottom: 2 }}>
            Hosted by {host}
          </Text>
        )}
        <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text }} numberOfLines={2}>{title}</Text>
        {(guests || beds || baths) && (
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 4 }}>
            {[guests && `${guests} guests`, beds && `${beds} beds`, baths && `${baths} baths`]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        )}
        {amenities && amenities.length > 0 && (
          <Text numberOfLines={1} style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary, marginTop: 4 }}>
            {amenities.join(' · ')}
          </Text>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
            <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '800', color: t.text }}>{price}</Text>
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}> / {priceUnit}</Text>
          </View>
          {rating != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Star size={12} color={t.warning} fill={t.warning} />
              <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.text }}>{rating.toFixed(1)}</Text>
              {reviewCount != null && (
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>({reviewCount})</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
