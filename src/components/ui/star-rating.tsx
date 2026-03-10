import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { Star } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type StarRatingProps = ViewProps & {
  value: number;
  onValueChange?: (rating: number) => void;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showLabel?: boolean;
  label?: string;
};

const starSizes = { sm: 16, md: 24, lg: 32 };

export function StarRating({
  value,
  onValueChange,
  maxStars = 5,
  size = 'md',
  readonly = false,
  showLabel = false,
  label,
  ...props
}: StarRatingProps) {
  const t = useTheme();
  const starSize = starSizes[size];

  return (
    <View {...props}>
      {label && (
        <ThemedText style={{ fontSize: 14, fontWeight: '600', marginBottom: 6, color: t.text }}>
          {label}
        </ThemedText>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {Array.from({ length: maxStars }, (_, i) => {
          const starIndex = i + 1;
          const filled = starIndex <= Math.round(value);
          const half = !filled && starIndex - 0.5 <= value;
          return (
            <Pressable
              key={i}
              onPress={() => !readonly && onValueChange?.(starIndex)}
              disabled={readonly}
              hitSlop={4}>
              <Star
                size={starSize}
                color={t.warning}
                fill={filled || half ? t.warning : 'none'}
              />
            </Pressable>
          );
        })}
        {showLabel && (
          <ThemedText style={{ fontSize: 14, marginLeft: 8, color: t.textSecondary }}>
            {value.toFixed(1)}
          </ThemedText>
        )}
      </View>
    </View>
  );
}
