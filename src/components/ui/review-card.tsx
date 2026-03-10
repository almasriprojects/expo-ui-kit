import React from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

type ReviewCardProps = ViewProps & {
  author: string;
  avatar?: string;
  rating: number;
  date?: string;
  comment: string;
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

  const stars = Array.from({ length: 5 }, (_, i) => (i < rating ? '★' : '☆')).join('');

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
            <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{author}</Text>
            {verified && (
              <View
                style={{
                  backgroundColor: t.successSoft,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: Radius.sm,
                }}>
                <ThemedText style={{ fontSize: 10, color: t.success, fontWeight: '600' }}>
                  Verified
                </ThemedText>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <ThemedText style={{ fontSize: 12, color: t.star }}>{stars}</ThemedText>
            {date && (
              <ThemedText style={{ fontSize: 11, color: t.textSecondary }}>
                {date}
              </ThemedText>
            )}
          </View>
        </View>
      </View>
      <ThemedText style={{ fontSize: 13, lineHeight: 20, color: t.textSecondary }}>
        {comment}
      </ThemedText>
    </View>
  );
}
