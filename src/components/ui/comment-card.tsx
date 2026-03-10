import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

type CommentCardProps = {
  author: string;
  avatar?: string;
  text: string;
  time: string;
  likes?: number;
  liked?: boolean;
  replies?: number;
  onLike?: () => void;
  onReply?: () => void;
  style?: ViewStyle;
};

export function CommentCard({
  author,
  avatar,
  text,
  time,
  likes = 0,
  liked = false,
  replies,
  onLike,
  onReply,
  style,
}: CommentCardProps) {
  const t = useTheme();

  return (
    <View style={[{ flexDirection: 'row', gap: 10, paddingVertical: 8 }, style]}>
      <Avatar source={avatar} initials={author[0]} size="sm" />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{author}</Text>
          <Text style={{ fontSize: 11, color: t.textTertiary }}>{time}</Text>
        </View>
        <Text style={{ fontSize: 14, color: t.text, lineHeight: 20, marginTop: 4 }}>
          {text}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 8 }}>
          <Pressable
            onPress={onLike}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 13, color: liked ? t.error : t.textTertiary }}>
              {liked ? '❤️' : '🤍'}
            </Text>
            {likes > 0 && (
              <Text style={{ fontSize: 12, fontWeight: '500', color: liked ? t.error : t.textSecondary }}>
                {likes}
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={onReply}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: t.textSecondary }}>Reply</Text>
            {replies != null && replies > 0 && (
              <Text style={{ fontSize: 12, color: t.textTertiary }}>({replies})</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
