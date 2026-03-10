import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Home, Star } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type RoomCardProps = {
  title: string;
  host?: string;
  price: string;
  priceUnit?: string;
  rating?: number;
  reviewCount?: number;
  amenities?: string[];
  guests?: number;
  beds?: number;
  baths?: number;
  superhost?: boolean;
  onPress?: () => void;
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
              <Text style={{ fontSize: 10, fontWeight: '700', color: t.text }}>SUPERHOST</Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ padding: 14 }}>
        {host && (
          <Text style={{ fontSize: 12, color: t.textSecondary, marginBottom: 2 }}>
            Hosted by {host}
          </Text>
        )}
        <Text style={{ fontSize: 16, fontWeight: '600', color: t.text }} numberOfLines={2}>{title}</Text>
        {(guests || beds || baths) && (
          <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 4 }}>
            {[guests && `${guests} guests`, beds && `${beds} beds`, baths && `${baths} baths`]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        )}
        {amenities && amenities.length > 0 && (
          <Text numberOfLines={1} style={{ fontSize: 12, color: t.textTertiary, marginTop: 4 }}>
            {amenities.join(' · ')}
          </Text>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: t.text }}>{price}</Text>
            <Text style={{ fontSize: 13, color: t.textSecondary }}> / {priceUnit}</Text>
          </View>
          {rating != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Star size={12} color={t.warning} fill={t.warning} />
              <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{rating.toFixed(1)}</Text>
              {reviewCount != null && (
                <Text style={{ fontSize: 12, color: t.textTertiary }}>({reviewCount})</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
