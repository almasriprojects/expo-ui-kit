import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type GaugeProps = {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  size?: number;
  color?: string;
  showValue?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

function createSemiCirclePath(cx: number, cy: number, radius: number): string {
  const startX = cx - radius;
  const endX = cx + radius;
  return `M ${startX} ${cy} A ${radius} ${radius} 0 0 1 ${endX} ${cy}`;
}

export function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  size = 160,
  color,
  showValue = true,
  accessibilityLabel,
  accessibilityHint,
}: GaugeProps) {
  const t = useTheme();
  const gaugeColor = color ?? t.primary;
  const radius = (size - 16) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const range = max - min || 1;
  const clampedValue = Math.min(Math.max(value, min), max);
  const progress = (clampedValue - min) / range;

  const semiCircleLength = Math.PI * radius;
  const filledLength = progress * semiCircleLength;

  const trackPath = createSemiCirclePath(cx, cy, radius);

  const animatedLength = useSharedValue(0);

  useEffect(() => {
    animatedLength.value = withSpring(filledLength, { damping: 18, stiffness: 90 });
  }, [animatedLength, filledLength]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: `${animatedLength.value} ${semiCircleLength}`,
  }));

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `Gauge showing ${clampedValue} of ${max}`}
      accessibilityHint={accessibilityHint}
      accessibilityValue={{ min, max, now: clampedValue }}
      style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size / 2 + 24 }}>
        <Svg width={size} height={size / 2 + 16} viewBox={`0 0 ${size} ${size / 2 + 16}`}>
          <Path
            d={trackPath}
            stroke={t.surface}
            strokeWidth={12}
            fill="none"
            strokeLinecap="round"
          />
          <AnimatedPath
            d={trackPath}
            stroke={gaugeColor}
            strokeWidth={12}
            fill="none"
            strokeLinecap="round"
            animatedProps={animatedProps}
          />
        </Svg>
        {showValue && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: size * 0.22,
                fontWeight: '700',
                color: t.text,
              }}>
              {Math.round(clampedValue)}
            </Text>
            {label && (
              <Text
                style={{
                  fontSize: 12,
                  color: t.textSecondary,
                  marginTop: 2,
                }}>
                {label}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
