import React from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

export type AreaChartProps = {
  data: number[];
  labels?: string[];
  height?: number;
  width?: number;
  color?: string;
  showDots?: boolean;
  showGrid?: boolean;
  fillOpacity?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

function createSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[Math.max(0, i - 2)];
    const p1 = points[i - 1];
    const p2 = points[i];
    const p3 = points[Math.min(points.length - 1, i + 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
}

export function AreaChart({
  data,
  labels,
  height = 180,
  width = 300,
  color,
  showDots = true,
  showGrid = true,
  fillOpacity = 0.4,
  accessibilityLabel,
  accessibilityHint,
}: AreaChartProps) {
  const t = useTheme();
  const lineColor = color ?? t.primary;
  const padding = { top: 16, right: 16, bottom: labels ? 24 : 16, left: labels ? 32 : 16 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((val, i) => ({
    x: padding.left + (i / Math.max(1, data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((val - minVal) / range) * chartHeight,
  }));

  const pathD = createSmoothPath(points);
  const fillPath = pathD
    ? `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`
    : '';

  const gridLines = 4;

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `Area chart with ${data.length} data points`}
      accessibilityHint={accessibilityHint}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={lineColor} stopOpacity={fillOpacity} />
            <Stop offset="1" stopColor={lineColor} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        {showGrid &&
          Array.from({ length: gridLines }).map((_, i) => (
            <Line
              key={i}
              x1={padding.left}
              y1={padding.top + (chartHeight / (gridLines + 1)) * (i + 1)}
              x2={width - padding.right}
              y2={padding.top + (chartHeight / (gridLines + 1)) * (i + 1)}
              stroke={t.border}
              strokeWidth={1}
            />
          ))}
        <Path d={fillPath} fill="url(#areaGradient)" />
        <Path
          d={pathD}
          stroke={lineColor}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {showDots &&
          points.map((p, i) => (
            <Circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={lineColor}
              stroke={t.background}
              strokeWidth={2}
            />
          ))}
        {labels &&
          labels.slice(0, data.length).map((label, i) => (
            <SvgText
              key={i}
              x={points[i]?.x ?? 0}
              y={height - 4}
              fill={t.textSecondary}
              fontSize={10}
              textAnchor="middle">
              {label}
            </SvgText>
          ))}
      </Svg>
    </View>
  );
}
