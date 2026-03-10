import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type RatingDisplayProps = {
  rating: number;
  maxRating?: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'stars' | 'badge' | 'compact';
  style?: ViewStyle;
};

const sizes = {
  sm: { star: 12, text: 12, gap: 2 },
  md: { star: 16, text: 14, gap: 3 },
  lg: { star: 22, text: 18, gap: 4 },
};

export function RatingDisplay({
  rating,
  maxRating = 5,
  reviews,
  size = 'md',
  variant = 'stars',
  style,
}: RatingDisplayProps) {
  const t = useTheme();
  const s = sizes[size];

  if (variant === 'badge') {
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: t.warningSoft,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: Radius.md,
          }}>
          <Text style={{ fontSize: s.star, color: t.star }}>★</Text>
          <Text style={{ fontSize: s.text, fontWeight: '700', color: t.text }}>
            {rating.toFixed(1)}
          </Text>
        </View>
        {reviews != null && (
          <Text style={{ fontSize: s.text - 2, color: t.textSecondary }}>
            ({reviews.toLocaleString()})
          </Text>
        )}
      </View>
    );
  }

  if (variant === 'compact') {
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 4 }, style]}>
        <Text style={{ fontSize: s.star, color: t.star }}>★</Text>
        <Text style={{ fontSize: s.text, fontWeight: '600', color: t.text }}>
          {rating.toFixed(1)}
        </Text>
        {reviews != null && (
          <Text style={{ fontSize: s.text - 2, color: t.textSecondary }}>
            ({reviews.toLocaleString()})
          </Text>
        )}
      </View>
    );
  }

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3 && rating - fullStars < 0.8;
  const emptyStars = maxRating - fullStars - (hasHalf ? 1 : 0);

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
      <View style={{ flexDirection: 'row', gap: s.gap }}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Text key={`f${i}`} style={{ fontSize: s.star, color: t.star }}>★</Text>
        ))}
        {hasHalf && <Text style={{ fontSize: s.star, color: t.star }}>★</Text>}
        {Array.from({ length: Math.max(0, emptyStars) }, (_, i) => (
          <Text key={`e${i}`} style={{ fontSize: s.star, color: t.surfaceActive }}>★</Text>
        ))}
      </View>
      <Text style={{ fontSize: s.text, fontWeight: '600', color: t.text }}>
        {rating.toFixed(1)}
      </Text>
      {reviews != null && (
        <Text style={{ fontSize: s.text - 2, color: t.textSecondary }}>
          ({reviews.toLocaleString()})
        </Text>
      )}
    </View>
  );
}
