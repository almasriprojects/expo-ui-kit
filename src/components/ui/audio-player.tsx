import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Slider } from './slider';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AudioPlayerProps = {
  title?: string;
  artist?: string;
  duration: number;
  currentTime?: number;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onSeek?: (time: number) => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function AudioPlayer({
  title,
  artist,
  duration,
  currentTime: controlledTime = 0,
  isPlaying = false,
  onPlayPause,
  onSeek,
  onSkipBack,
  onSkipForward,
}: AudioPlayerProps) {
  const t = useTheme();
  const [internalTime, setInternalTime] = useState(controlledTime);
  const currentTime = onSeek != null ? controlledTime : internalTime;

  const handleSeek = useCallback(
    (value: number) => {
      if (onSeek) {
        onSeek(value);
      } else {
        setInternalTime(value);
      }
    },
    [onSeek],
  );

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: t.surface,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: t.border,
      }}
      accessibilityRole="none"
      accessibilityLabel={title ? `Audio player: ${title}` : 'Audio player'}>
      {(title || artist) && (
        <View style={{ marginBottom: 12 }}>
          {title && (
            <ThemedText
              style={{ fontSize: 16, fontWeight: '600', color: t.text }}
              numberOfLines={1}>
              {title}
            </ThemedText>
          )}
          {artist && (
            <ThemedText
              style={{ fontSize: 14, color: t.textSecondary, marginTop: 2 }}
              numberOfLines={1}>
              {artist}
            </ThemedText>
          )}
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable
          onPress={onSkipBack}
          style={({ pressed }) => ({
            padding: 8,
            opacity: pressed ? 0.7 : 1,
          })}
          accessibilityRole="button"
          accessibilityLabel="Skip back">
          <ThemedText style={{ fontSize: 20, color: t.text }}>⏪</ThemedText>
        </Pressable>

        <Pressable
          onPress={onPlayPause}
          style={({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: Radius.full,
            backgroundColor: t.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
          })}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          accessibilityState={{ selected: isPlaying }}>
          <ThemedText style={{ fontSize: 20, color: t.primaryForeground }}>
            {isPlaying ? '⏸' : '▶'}
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={onSkipForward}
          style={({ pressed }) => ({
            padding: 8,
            opacity: pressed ? 0.7 : 1,
          })}
          accessibilityRole="button"
          accessibilityLabel="Skip forward">
          <ThemedText style={{ fontSize: 20, color: t.text }}>⏩</ThemedText>
        </Pressable>
      </View>

      <View style={{ marginTop: 12 }}>
        <Slider
          value={currentTime}
          onValueChange={handleSeek}
          min={0}
          max={duration}
          step={1}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
          }}>
          <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>
            {formatTime(currentTime)}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>
            {formatTime(duration)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
