import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MapCardProps = {
  title: string;
  address: string;
  distance?: string;
  rating?: number;
  category?: string;
  onPress?: () => void;
  onDirections?: () => void;
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
        <Text style={{ fontSize: 40, marginBottom: 4 }}>📍</Text>
        <Text style={{ fontSize: 12, color: t.textTertiary }}>Map Preview</Text>
      </View>

      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }}>{title}</Text>
            {category && (
              <Text style={{ fontSize: 12, color: t.primary, fontWeight: '500', marginTop: 2 }}>
                {category}
              </Text>
            )}
            <Text style={{ fontSize: 13, color: t.textSecondary, marginTop: 4, lineHeight: 18 }}>
              {address}
            </Text>
          </View>
          {(rating || distance) && (
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              {rating && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <Star size={12} color={t.warning} fill={t.warning} />
                  <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{rating}</Text>
                </View>
              )}
              {distance && (
                <Text style={{ fontSize: 12, color: t.textSecondary }}>{distance}</Text>
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
            <Text style={{ fontSize: 14, fontWeight: '600', color: t.primaryForeground }}>
              Get Directions
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
