import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MapCardProps = {
  /** Name of the location */
  title: string;
  /** Street address of the location */
  address: string;
  /** Distance from the user's current position */
  distance?: string;
  /** Star rating of the location */
  rating?: number;
  /** Category label for the location (e.g. "Restaurant") */
  category?: string;
  /** Callback invoked when the card is pressed */
  onPress?: () => void;
  /** Callback invoked when the directions button is pressed */
  onDirections?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

export function MapCard({
  title,
  address,
  distance,
  rating,
  category,
  onPress,
  onDirections,
  style,
}: MapCardProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      {/* Map placeholder */}
      <View
        style={{
          height: 140,
          backgroundColor: t.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MapPin size={FontSize['4xl'].fontSize} color={t.textTertiary} style={{ marginBottom: 4 }} />
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>Map Preview</Text>
      </View>

      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text }}>{title}</Text>
            {category && (
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.primary, fontWeight: '500', marginTop: 2 }}>
                {category}
              </Text>
            )}
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 4, lineHeight: 18 }}>
              {address}
            </Text>
          </View>
          {(rating || distance) && (
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              {rating && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <Star size={12} color={t.warning} fill={t.warning} />
                  <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.text }}>{rating}</Text>
                </View>
              )}
              {distance && (
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{distance}</Text>
              )}
            </View>
          )}
        </View>

        {onDirections && (
          <Pressable
            onPress={onDirections}
            style={{
              marginTop: 12,
              paddingVertical: 10,
              borderRadius: Radius.lg,
              backgroundColor: t.primary,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.primaryForeground }}>
              Get Directions
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
