import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Play, Pause, Maximize } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Slider } from './slider';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VideoPlayerProps = {
  title?: string;
  duration: number;
  currentTime?: number;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onSeek?: (time: number) => void;
  onFullscreen?: () => void;
  aspectRatio?: number;
  posterUri?: string;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function VideoPlayer({
  title,
  duration,
  currentTime = 0,
  isPlaying = false,
  onPlayPause,
  onSeek,
  onFullscreen,
  aspectRatio = 16 / 9,
  posterUri,
}: VideoPlayerProps) {
  const t = useTheme();

  const handleSeek = (value: number) => {
    onSeek?.(value);
  };

  return (
    <View
      style={{
        backgroundColor: t.background,
        borderRadius: Radius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: t.border,
      }}
      accessibilityRole="none"
      accessibilityLabel={title ? `Video player: ${title}` : 'Video player'}>
      <Pressable
        onPress={onPlayPause}
        style={{
          aspectRatio,
          backgroundColor: t.surface,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause' : 'Play'}>
        {posterUri ? (
          <Image
            source={{ uri: posterUri }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        ) : null}
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: Radius.full,
            backgroundColor: t.overlay,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isPlaying ? <Pause size={28} color={t.textOnColor} /> : <Play size={28} color={t.textOnColor} />}
        </View>
      </Pressable>

      <View style={{ padding: 12, backgroundColor: t.surface }}>
        {title && (
          <ThemedText
            style={{ fontSize: 14, fontWeight: '600', color: t.text, marginBottom: 8 }}
            numberOfLines={1}>
            {title}
          </ThemedText>
        )}
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
            alignItems: 'center',
            marginTop: 8,
          }}>
          <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </ThemedText>
          <Pressable
            onPress={onFullscreen}
            style={({ pressed }) => ({
              padding: 8,
              opacity: pressed ? 0.7 : 1,
            })}
            accessibilityRole="button"
            accessibilityLabel="Fullscreen">
            <Maximize size={18} color={t.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
