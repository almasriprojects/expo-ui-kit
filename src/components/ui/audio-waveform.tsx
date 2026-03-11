import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Play, Pause } from 'lucide-react-native';

import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AudioWaveformProps = {
  /** Formatted duration string (e.g. "1:30") */
  duration: string;
  /** Whether the audio is currently playing */
  isPlaying?: boolean;
  /** Playback progress from 0 to 1 */
  progress?: number;
  /** Callback invoked to toggle play/pause */
  onPlayPause?: () => void;
  /** Number of waveform bars to render */
  barCount?: number;
  /** Custom styles for the outer container */
  style?: ViewStyle;
};

export function AudioWaveform({
  duration,
  isPlaying = false,
  progress = 0,
  onPlayPause,
  barCount = 30,
  style,
}: AudioWaveformProps) {
  const t = useTheme();
  const bars = React.useMemo(() => {
    return Array.from({ length: barCount }, () => 0.15 + Math.random() * 0.85);
  }, [barCount]);

  const progressIndex = Math.floor(progress * barCount);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: t.surface,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: Radius.xl,
        },
        style,
      ]}>
      <Pressable
        onPress={onPlayPause}
        style={{
          width: 36,
          height: 36,
          borderRadius: Radius.full,
          backgroundColor: t.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isPlaying ? <Pause size={14} color={t.primaryForeground} /> : <Play size={14} color={t.primaryForeground} />}
      </Pressable>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: 32, gap: 1.5 }}>
        {bars.map((h, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: `${h * 100}%`,
              borderRadius: 1,
              backgroundColor: i < progressIndex ? t.primary : t.surfaceActive,
            }}
          />
        ))}
      </View>

      <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontVariant: ['tabular-nums'], minWidth: 36 }}>
        {duration}
      </Text>
    </View>
  );
}
