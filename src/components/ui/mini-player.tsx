import React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { Pause, Play } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MiniPlayerProps = {
  /** Track or video title */
  title: string;
  /** Artist or channel name */
  subtitle?: string;
  /** Thumbnail image URI */
  thumbnailUri?: string;
  /** Whether media is currently playing */
  isPlaying: boolean;
  /** Toggle play/pause */
  onPlayPause: () => void;
  /** Tap to expand to full player */
  onPress?: () => void;
  /** Playback progress 0 to 1 */
  progress?: number;
  /** Optional container style */
  style?: ViewStyle;
};

export function MiniPlayer({
  title,
  subtitle,
  thumbnailUri,
  isPlaying,
  onPlayPause,
  onPress,
  progress = 0,
  style,
}: MiniPlayerProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: t.card,
          borderTopLeftRadius: Radius.lg,
          borderTopRightRadius: Radius.lg,
          ...Shadows.md,
          opacity: pressed ? 0.95 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Now playing: ${title}`}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: t.border,
          borderTopLeftRadius: Radius.lg,
          borderTopRightRadius: Radius.lg,
          overflow: 'hidden',
        }}>
        <View
          style={{
            height: 2,
            width: `${Math.min(progress, 1) * 100}%`,
            backgroundColor: t.primary,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: Spacing[4],
          gap: Spacing[3],
        }}>
        {thumbnailUri && (
          <Image
            source={{ uri: thumbnailUri }}
            style={{
              width: 48,
              height: 48,
              borderRadius: Radius.md,
            }}
            contentFit="cover"
          />
        )}

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ThemedText
            style={{
              fontSize: FontSize.md.fontSize,
              fontWeight: '600',
              color: t.text,
            }}
            numberOfLines={1}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              style={{
                fontSize: FontSize.sm.fontSize,
                color: t.textSecondary,
                marginTop: 2,
              }}
              numberOfLines={1}>
              {subtitle}
            </ThemedText>
          )}
        </View>

        <Pressable
          onPress={(e) => {
            e.stopPropagation?.();
            onPlayPause();
          }}
          hitSlop={8}
          style={({ pressed }) => ({
            padding: Spacing[2],
            opacity: pressed ? 0.7 : 1,
          })}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <Pause size={28} color={t.text} />
          ) : (
            <Play size={28} color={t.text} />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
}
