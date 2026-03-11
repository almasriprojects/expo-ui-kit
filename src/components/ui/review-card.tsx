import React from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { Star } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

export type ReviewCardProps = ViewProps & {
  /** Name of the review author */
  author: string;
  /** URL of the author's avatar image */
  avatar?: string;
  /** Star rating given by the reviewer (1–5) */
  rating: number;
  /** Formatted date string of the review */
  date?: string;
  /** Review text content */
  comment: string;
  /** Whether the reviewer is a verified purchaser */
  verified?: boolean;
};

export function ReviewCard({
  author,
  avatar,
  rating,
  date,
  comment,
  verified,
  style,
  ...props
}: ReviewCardProps) {
  const t = useTheme();

  const starsArray = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 16,
        },
        style,
      ]}
      {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Avatar source={avatar} initials={author[0]} size="sm" />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{author}</Text>
            {verified && (
              <View
                style={{
                  backgroundColor: t.successSoft,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: Radius.sm,
                }}>
                <ThemedText style={{ fontSize: FontSize['2xs'].fontSize, color: t.success, fontWeight: '600' }}>
                  Verified
                </ThemedText>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              {starsArray.map((filled, i) => (
                <Star
                  key={i}
                  size={12}
                  color={t.warning}
                  fill={filled ? t.warning : 'none'}
                />
              ))}
            </View>
            {date && (
              <ThemedText style={{ fontSize: FontSize.xs.fontSize, color: t.textSecondary }}>
                {date}
              </ThemedText>
            )}
          </View>
        </View>
      </View>
      <ThemedText style={{ fontSize: FontSize.sm.fontSize, lineHeight: 20, color: t.textSecondary }}>
        {comment}
      </ThemedText>
    </View>
  );
}
