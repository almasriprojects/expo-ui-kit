import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Heart } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';
import { FontSize } from '@/constants/theme';

export type CommentCardProps = {
  /** Name of the comment author */
  author: string;
  /** URL of the author's avatar image */
  avatar?: string;
  /** Comment body text */
  text: string;
  /** Formatted timestamp of the comment */
  time: string;
  /** Number of likes on the comment */
  likes?: number;
  /** Whether the current user has liked the comment */
  liked?: boolean;
  /** Number of replies to the comment */
  replies?: number;
  /** Callback invoked when the like button is pressed */
  onLike?: () => void;
  /** Callback invoked when the reply button is pressed */
  onReply?: () => void;
  /** Custom styles for the card container */
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
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{author}</Text>
          <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary }}>{time}</Text>
        </View>
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.text, lineHeight: 20, marginTop: 4 }}>
          {text}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 8 }}>
          <Pressable
            onPress={onLike}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Heart
              size={16}
              color={liked ? t.error : t.textSecondary}
              fill={liked ? t.error : 'none'}
            />
            {likes > 0 && (
              <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: liked ? t.error : t.textSecondary }}>
                {likes}
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={onReply}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.textSecondary }}>Reply</Text>
            {replies != null && replies > 0 && (
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>({replies})</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
