import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Slider } from './slider';
import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AudioPlayerProps = {
  /** Track title */
  title?: string;
  /** Artist or creator name */
  artist?: string;
  /** Total duration of the track in seconds */
  duration: number;
  /** Current playback position in seconds */
  currentTime?: number;
  /** Whether the audio is currently playing */
  isPlaying?: boolean;
  /** Callback invoked to toggle play/pause */
  onPlayPause?: () => void;
  /** Callback invoked when the user seeks to a position */
  onSeek?: (time: number) => void;
  /** Callback invoked to skip to the previous track */
  onSkipBack?: () => void;
  /** Callback invoked to skip to the next track */
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
              style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text }}
              numberOfLines={1}>
              {title}
            </ThemedText>
          )}
          {artist && (
            <ThemedText
              style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary, marginTop: 2 }}
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
          <SkipBack size={20} color={t.text} />
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
          {isPlaying ? <Pause size={20} color={t.primaryForeground} /> : <Play size={20} color={t.primaryForeground} />}
        </Pressable>

        <Pressable
          onPress={onSkipForward}
          style={({ pressed }) => ({
            padding: 8,
            opacity: pressed ? 0.7 : 1,
          })}
          accessibilityRole="button"
          accessibilityLabel="Skip forward">
          <SkipForward size={20} color={t.text} />
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
          <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>
            {formatTime(currentTime)}
          </ThemedText>
          <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>
            {formatTime(duration)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
