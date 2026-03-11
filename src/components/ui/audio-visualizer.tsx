import React, { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AudioVisualizerProps = {
  /** Number of equalizer bars */
  bars?: number;
  /** Whether audio is playing (animates bars) */
  isPlaying: boolean;
  /** Bar color (defaults to theme primary) */
  color?: string;
  /** Maximum height of the visualizer */
  height?: number;
  /** Optional container style */
  style?: ViewStyle;
};

const MAX_BARS = 32;
const BAR_GAP = 2;

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function BarItem({
  index,
  barWidth,
  maxHeight,
  isPlaying,
  color,
}: {
  index: number;
  barWidth: number;
  maxHeight: number;
  isPlaying: boolean;
  color: string;
}) {
  const barHeight = useSharedValue(maxHeight * 0.1);

  useEffect(() => {
    if (isPlaying) {
      const targetHeight = maxHeight * (0.3 + seededRandom(index) * 0.7);
      const duration = 300 + seededRandom(index + 100) * 300;
      barHeight.value = withRepeat(
        withTiming(targetHeight, { duration }),
        -1,
        true,
      );
    } else {
      barHeight.value = withTiming(maxHeight * 0.1, { duration: 400 });
    }
  }, [isPlaying, maxHeight, barHeight, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: barHeight.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: barWidth,
          backgroundColor: color,
          borderTopLeftRadius: Radius['2xs'],
          borderTopRightRadius: Radius['2xs'],
        },
        animatedStyle,
      ]}
    />
  );
}

export function AudioVisualizer({
  bars = 16,
  isPlaying,
  color,
  height = 120,
  style,
}: AudioVisualizerProps) {
  const t = useTheme();
  const barColor = color ?? t.primary;
  const barCount = Math.min(bars, MAX_BARS);

  return (
    <View
      style={[
        {
          height,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: BAR_GAP,
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel={isPlaying ? 'Audio visualizer playing' : 'Audio visualizer paused'}
      onLayout={() => {}}>
      {Array.from({ length: barCount }).map((_, i) => {
        const totalGaps = (barCount - 1) * BAR_GAP;
        const barWidth = Math.max(2, (height * 2 - totalGaps) / barCount);
        return (
          <BarItem
            key={i}
            index={i}
            barWidth={barWidth}
            maxHeight={height}
            isPlaying={isPlaying}
            color={barColor}
          />
        );
      })}
    </View>
  );
}
