import React, { useEffect } from 'react';
import { Text, View, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Polygon } from 'react-native-svg';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MapMarkerProps = ViewProps & {
  label?: string;
  color?: string;
  size?: number;
  pulse?: boolean;
};

export function MapMarker({
  label,
  color,
  size = 32,
  pulse = false,
  style,
  ...props
}: MapMarkerProps) {
  const t = useTheme();
  const fillColor = color ?? t.primary;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    if (pulse) {
      scale.value = withRepeat(
        withTiming(1.8, { duration: 1200 }),
        -1,
        true,
      );
      opacity.value = withRepeat(
        withTiming(0, { duration: 1200 }),
        -1,
        true,
      );
    }
  }, [pulse, scale, opacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const circleRadius = size * 0.35;
  const centerX = size / 2;
  const centerY = size * 0.38;
  const triangleBottom = size * 0.92;
  const triangleWidth = size * 0.35;

  const trianglePoints = [
    `${centerX},${triangleBottom}`,
    `${centerX - triangleWidth},${centerY + circleRadius + 2}`,
    `${centerX + triangleWidth},${centerY + circleRadius + 2}`,
  ].join(' ');

  return (
    <View
      style={[{ alignItems: 'center', alignSelf: 'flex-start' }, typeof style === 'object' ? style : undefined]}
      accessibilityRole="image"
      accessibilityLabel={label ?? 'Map marker'}
      {...props}>
      {pulse && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: Radius.full,
              borderWidth: 2,
              borderColor: fillColor,
              top: 0,
              left: 0,
            },
            pulseStyle,
          ]}
          pointerEvents="none"
        />
      )}
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={centerX}
          cy={centerY}
          r={circleRadius}
          fill={fillColor}
          stroke={t.textOnColor}
          strokeWidth={2}
        />
        <Polygon
          points={trianglePoints}
          fill={fillColor}
          stroke={t.textOnColor}
          strokeWidth={2}
        />
      </Svg>
      {label && (
        <View
          style={{
            marginTop: 4,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: Radius.sm,
            backgroundColor: t.surface,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: t.text,
              maxWidth: 120,
            }}
            numberOfLines={1}>
            {label}
          </Text>
        </View>
      )}
    </View>
  );
}
