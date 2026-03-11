import React, { useMemo } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Play, Pause } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VoiceMessageBubbleProps = {
  /** Total duration of the voice message in seconds */
  duration: number;
  /** Whether the voice message is currently playing */
  isPlaying?: boolean;
  /** Callback invoked when the play/pause button is pressed */
  onPlayPause?: () => void;
  /** Playback progress as a fraction (0–1) */
  progress?: number;
  /** Whether this message was sent by the current user */
  isOwn?: boolean;
  /** Custom styles applied to the bubble container */
  style?: ViewStyle;
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function VoiceMessageBubble({
  duration,
  isPlaying = false,
  onPlayPause,
  progress = 0,
  isOwn = true,
  style,
}: VoiceMessageBubbleProps) {
  const t = useTheme();

  const barHeights = useMemo(
    () => Array.from({ length: 24 }, () => 0.2 + Math.random() * 0.8),
    [],
  );

  const progressIndex = Math.floor(progress * barHeights.length);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: isOwn ? t.primary : t.card,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: Radius.xl,
          borderBottomRightRadius: isOwn ? Radius.xs : Radius.xl,
          borderBottomLeftRadius: isOwn ? Radius.xl : Radius.xs,
          maxWidth: 220,
        },
        style,
      ]}>
      <Pressable
        onPress={onPlayPause}
        style={{
          width: 36,
          height: 36,
          borderRadius: Radius.full,
          backgroundColor: isOwn ? t.surfaceOnColor : t.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
        accessibilityState={{ expanded: isPlaying }}>
        {isPlaying ? (
          <Pause size={14} color={isOwn ? t.primaryForeground : t.text} />
        ) : (
          <Play size={14} color={isOwn ? t.primaryForeground : t.text} />
        )}
      </Pressable>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          height: 28,
          gap: 2,
        }}>
        {barHeights.map((h, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: `${h * 100}%`,
              borderRadius: Radius.xs,
              backgroundColor:
                i < progressIndex
                  ? isOwn
                    ? t.primaryForeground
                    : t.primary
                  : isOwn
                    ? t.primaryForeground
                    : t.surfaceActive,
              opacity: i < progressIndex ? 1 : 0.4,
            }}
          />
        ))}
      </View>

      <Text
        style={{
          fontSize: FontSize.sm.fontSize,
          color: isOwn ? t.primaryForeground : t.textSecondary,
          fontVariant: ['tabular-nums'],
          opacity: isOwn ? 0.9 : 1,
        }}>
        {formatDuration(duration)}
      </Text>
    </View>
  );
}
