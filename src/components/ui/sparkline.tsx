import React from 'react';
import { View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

export type SparklineProps = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color,
  accessibilityLabel,
  accessibilityHint,
}: SparklineProps) {
  const t = useTheme();
  const lineColor = color ?? t.primary;
  const padding = 2;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const points = data
    .map((val, i) => {
      const x = padding + (i / Math.max(1, data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((val - minVal) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `Sparkline with ${data.length} points`}
      accessibilityHint={accessibilityHint}>
      <Svg width={width} height={height}>
        <Polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
