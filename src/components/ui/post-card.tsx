import React, { useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Heart, MessageCircle, ExternalLink, Image as ImageIcon } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';
import { VerificationBadge } from './verification-badge';

export type PostCardProps = {
  /** Name of the post author */
  author: string;
  /** URL of the author's avatar image */
  avatar?: string;
  /** Whether the author is verified */
  verified?: boolean;
  /** Formatted timestamp of the post */
  time: string;
  /** Text content of the post */
  text?: string;
  /** Whether the post includes an image placeholder */
  image?: boolean;
  /** Number of likes on the post */
  likes: number;
  /** Number of comments on the post */
  comments: number;
  /** Number of shares on the post */
  shares?: number;
  /** Whether the current user has liked the post */
  liked?: boolean;
  /** Callback invoked when the like button is pressed */
  onLike?: () => void;
  /** Callback invoked when the comment button is pressed */
  onComment?: () => void;
  /** Callback invoked when the share button is pressed */
  onShare?: () => void;
  /** Callback invoked when the author's profile is pressed */
  onProfile?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

export function PostCard({
  author,
  avatar,
  verified = false,
  time,
  text,
  image = false,
  likes,
  comments,
  shares = 0,
  liked = false,
  onLike,
  onComment,
  onShare,
  onProfile,
  style,
}: PostCardProps) {
  const t = useTheme();
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((c) => (isLiked ? c - 1 : c + 1));
    onLike?.();
  };

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: t.border,
          overflow: 'hidden',
          ...Shadows.sm,
        },
        style,
      ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 }}>
        <Pressable onPress={onProfile}>
          <Avatar source={avatar} initials={author[0]} size="sm" />
        </Pressable>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.text }}>{author}</Text>
            {verified && <VerificationBadge size="sm" />}
          </View>
          <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary }}>{time}</Text>
        </View>
        <Text style={{ fontSize: FontSize.xl.fontSize, color: t.textTertiary }}>···</Text>
      </View>

      {text && (
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.text, lineHeight: 21, paddingHorizontal: 14, paddingBottom: image ? 10 : 0 }}>
          {text}
        </Text>
      )}

      {image && (
        <View
          style={{
            aspectRatio: 4 / 3,
            backgroundColor: t.surfaceActive,
            marginTop: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageIcon size={32} color={t.textSecondary} style={{ opacity: 0.3 }} />
        </View>
      )}

      <View style={{ flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 4 }}>
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>
          {likeCount > 0 ? `${likeCount} likes` : ''}{comments > 0 ? `  ·  ${comments} comments` : ''}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: t.border,
          paddingVertical: 2,
        }}>
        <Pressable
          onPress={handleLike}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 }}>
          <Heart size={16} color={isLiked ? t.error : t.textSecondary} fill={isLiked ? t.error : 'none'} />
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: isLiked ? t.error : t.textSecondary }}>Like</Text>
        </Pressable>
        <Pressable
          onPress={onComment}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 }}>
          <MessageCircle size={16} color={t.textSecondary} />
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: t.textSecondary }}>Comment</Text>
        </Pressable>
        <Pressable
          onPress={onShare}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 }}>
          <ExternalLink size={16} color={t.textSecondary} />
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: t.textSecondary }}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}
