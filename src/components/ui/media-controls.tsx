import React, { useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MediaControlsProps = {
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  title?: string;
  artist?: string;
  onPlayPause?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onSeek?: (time: number) => void;
  style?: ViewStyle;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MediaControls({
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  title,
  artist,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  style,
}: MediaControlsProps) {
  const t = useTheme();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      {(title || artist) && (
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          {title && (
            <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }} numberOfLines={1}>
              {title}
            </Text>
          )}
          {artist && (
            <Text style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}>
              {artist}
            </Text>
          )}
        </View>
      )}

      {/* Progress bar */}
      <View style={{ marginBottom: 8 }}>
        <Pressable
          onPress={(e) => {
            if (onSeek && duration > 0) {
              const { locationX } = e.nativeEvent;
              const width = e.nativeEvent.target ? 300 : 300;
              onSeek((locationX / width) * duration);
            }
          }}
          style={{
            height: 4,
            borderRadius: Radius.full,
            backgroundColor: t.surface,
            overflow: 'hidden',
          }}>
          <View
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: Radius.full,
              backgroundColor: t.primary,
            }}
          />
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
          <Text style={{ fontSize: 11, color: t.textTertiary }}>{formatTime(currentTime)}</Text>
          <Text style={{ fontSize: 11, color: t.textTertiary }}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <Pressable onPress={onPrevious} hitSlop={12}>
          <Text style={{ fontSize: 24, color: t.text }}>⏮</Text>
        </Pressable>
        <Pressable
          onPress={onPlayPause}
          style={{
            width: 56,
            height: 56,
            borderRadius: Radius.full,
            backgroundColor: t.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...Shadows.md,
          }}>
          <Text style={{ fontSize: 22, color: t.primaryForeground }}>
            {isPlaying ? '⏸' : '▶'}
          </Text>
        </Pressable>
        <Pressable onPress={onNext} hitSlop={12}>
          <Text style={{ fontSize: 24, color: t.text }}>⏭</Text>
        </Pressable>
      </View>
    </View>
  );
}
