import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type RatingDisplayProps = {
  /** Numeric rating value */
  rating: number;
  /** Maximum number of stars to display */
  maxRating?: number;
  /** Number of reviews to show alongside the rating */
  reviews?: number;
  /** Size variant of the stars and text */
  size?: 'sm' | 'md' | 'lg';
  /** Visual presentation variant */
  variant?: 'stars' | 'badge' | 'compact';
  /** Custom styles applied to the container */
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
          <Star size={s.star} color={t.warning} fill={t.warning} />
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
        <Star size={s.star} color={t.warning} fill={t.warning} />
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
          <Star key={`f${i}`} size={s.star} color={t.warning} fill={t.warning} />
        ))}
        {hasHalf && <Star size={s.star} color={t.warning} fill={t.warning} />}
        {Array.from({ length: Math.max(0, emptyStars) }, (_, i) => (
          <Star key={`e${i}`} size={s.star} color={t.textSecondary} />
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
