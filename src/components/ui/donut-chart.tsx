import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type DonutChartDataItem = {
  label: string;
  value: number;
  color: string;
};

export type DonutChartProps = {
  data: DonutChartDataItem[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

type DonutSegmentProps = {
  radius: number;
  cx: number;
  cy: number;
  strokeWidth: number;
  dashArray: string;
  dashOffset: number;
  color: string;
};

function DonutSegment({
  radius,
  cx,
  cy,
  strokeWidth,
  dashArray,
  dashOffset,
  color,
}: DonutSegmentProps) {
  const animatedOffset = useSharedValue(0);

  useEffect(() => {
    animatedOffset.value = withSpring(dashOffset, { damping: 18, stiffness: 90 });
  }, [animatedOffset, dashOffset]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value,
  }));

  return (
    <AnimatedCircle
      cx={cx}
      cy={cy}
      r={radius}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray={dashArray}
      strokeLinecap="round"
      transform={`rotate(-90 ${cx} ${cy})`}
      animatedProps={animatedProps}
    />
  );
}

export function DonutChart({
  data,
  size = 160,
  strokeWidth = 24,
  centerLabel,
  centerValue,
  accessibilityLabel,
  accessibilityHint,
}: DonutChartProps) {
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
      accessibilityLabel={accessibilityLabel ?? `Donut chart with ${data.length} segments`}
      accessibilityHint={accessibilityHint}
      style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {segments.map((seg, i) => (
            <DonutSegment
              key={`${seg.label}-${i}`}
              radius={radius}
              cx={cx}
              cy={cy}
              strokeWidth={strokeWidth}
              dashArray={seg.dashArray}
              dashOffset={seg.dashOffset}
              color={seg.color}
            />
          ))}
        </Svg>
        {(centerLabel ?? centerValue) && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {centerValue && (
              <Text
                style={{
                  fontSize: size * 0.2,
                  fontWeight: '700',
                  color: t.text,
                }}>
                {centerValue}
              </Text>
            )}
            {centerLabel && (
              <Text
                style={{
                  fontSize: size * 0.1,
                  color: t.textSecondary,
                  marginTop: centerValue ? 2 : 0,
                }}>
                {centerLabel}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
