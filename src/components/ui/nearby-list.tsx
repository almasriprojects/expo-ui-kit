import React from 'react';
import { FlatList, Pressable, Text, View, type ViewProps } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type NearbyPlace = {
  key: string;
  name: string;
  category: string;
  distance: string;
  rating?: number;
  icon?: string;
};

export type NearbyListProps = ViewProps & {
  places: NearbyPlace[];
  onPlacePress?: (key: string) => void;
};

function StarRatingDisplay({ rating }: { rating: number }) {
  const t = useTheme();
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3 && rating - fullStars < 0.8;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {Array.from({ length: fullStars }, (_, i) => (
        <Text key={`f${i}`} style={{ fontSize: 12, color: t.star }}>
          ★
        </Text>
      ))}
      {hasHalf && <Text style={{ fontSize: 12, color: t.star }}>★</Text>}
      {Array.from({ length: Math.max(0, emptyStars) }, (_, i) => (
        <Text key={`e${i}`} style={{ fontSize: 12, color: t.surfaceActive }}>
          ★
        </Text>
      ))}
      <Text style={{ fontSize: 12, color: t.textSecondary, marginLeft: 4 }}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
}

export function NearbyList({
  places,
  onPlacePress,
  style,
  ...props
}: NearbyListProps) {
  const t = useTheme();

  return (
    <View style={[{ gap: 8 }, typeof style === 'object' ? style : undefined]} {...props}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPlacePress?.(item.key)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              backgroundColor: pressed ? t.surfacePressed : t.card,
              borderRadius: Radius.lg,
              borderWidth: 1,
              borderColor: t.border,
              gap: 12,
            })}
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${item.category}, ${item.distance}${item.rating != null ? `, ${item.rating} stars` : ''}`}
            accessibilityHint={onPlacePress ? 'Press to view details' : undefined}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: Radius.md,
                backgroundColor: t.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 20 }}>{item.icon ?? '📍'}</Text>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text
                style={{ fontSize: 15, fontWeight: '600', color: t.text }}
                numberOfLines={1}>
                {item.name}
              </Text>
              <Text
                style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}
                numberOfLines={1}>
                {item.category}
              </Text>
              {item.rating != null && (
                <View style={{ marginTop: 4 }}>
                  <StarRatingDisplay rating={item.rating} />
                </View>
              )}
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: Radius.sm,
                backgroundColor: t.surface,
              }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: t.text }}>
                {item.distance}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
