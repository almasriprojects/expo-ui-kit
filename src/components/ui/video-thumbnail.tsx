import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Play } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VideoThumbnailProps = {
  /** Title of the video */
  title?: string;
  /** Formatted duration string (e.g. "3:45") */
  duration?: string;
  /** View count string (e.g. "1.2M views") */
  views?: string;
  /** Channel or creator name */
  channel?: string;
  /** Aspect ratio of the thumbnail */
  aspectRatio?: number;
  /** Callback invoked when the thumbnail is pressed */
  onPress?: () => void;
  /** Custom styles applied to the thumbnail container */
  style?: ViewStyle;
};

export function VideoThumbnail({
  title,
  duration,
  views,
  channel,
  aspectRatio = 16 / 9,
  onPress,
  style,
}: VideoThumbnailProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          borderRadius: Radius.xl,
          overflow: 'hidden',
          backgroundColor: t.card,
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          aspectRatio,
          backgroundColor: t.surfaceActive,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: Radius.full,
            backgroundColor: t.overlayDark,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Play size={22} color={t.textOnColor} />
        </View>
        {duration && (
          <View
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: t.overlayDarkStrong,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: Radius.sm,
            }}>
            <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '600', color: t.textOnColor }}>{duration}</Text>
          </View>
        )}
      </View>
      {title && (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }} numberOfLines={2}>
            {title}
          </Text>
          {(channel || views) && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              {channel && (
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{channel}</Text>
              )}
              {channel && views && (
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>·</Text>
              )}
              {views && (
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{views}</Text>
              )}
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}
