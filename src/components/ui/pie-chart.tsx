import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PieChartDataItem = {
  /** Label for the chart segment */
  label: string;
  /** Numeric value determining the segment size */
  value: number;
  /** Fill color for the segment */
  color: string;
};

export type PieChartProps = {
  /** Array of data items representing chart segments */
  data: PieChartDataItem[];
  /** Diameter of the pie chart in pixels */
  size?: number;
  /** Width of the chart ring stroke */
  strokeWidth?: number;
  /** Whether to display the color legend below the chart */
  showLegend?: boolean;
  /** Accessibility label for the chart container */
  accessibilityLabel?: string;
  /** Accessibility hint for the chart container */
  accessibilityHint?: string;
};

export function PieChart({
  data,
  size = 160,
  strokeWidth = 24,
  showLegend = true,
  accessibilityLabel,
  accessibilityHint,
}: PieChartProps) {
  const t = useTheme();
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  let offset = 0;
  const segments = data.map((item) => {
    const fraction = item.value / total;
    const segmentLength = fraction * circumference;
    const dashArray = `${segmentLength} ${circumference - segmentLength}`;
    const dashOffset = -offset;
    offset += segmentLength;
    return { ...item, dashArray, dashOffset };
  });

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `Pie chart with ${data.length} segments`}
      accessibilityHint={accessibilityHint}
      style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {segments.map((seg, i) => (
            <Circle
              key={`${seg.label}-${i}`}
              cx={cx}
              cy={cy}
              r={radius}
              stroke={seg.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="round"
            />
          ))}
        </Svg>
      </View>
      {showLegend && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 16 }}>
          {data.map((item, i) => (
            <View
              key={`${item.label}-${i}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: Radius.full,
                  backgroundColor: item.color,
                }}
              />
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{item.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
