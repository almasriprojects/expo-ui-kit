import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';

type CircularProgressProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  showValue?: boolean;
  style?: ViewStyle;
};

export function CircularProgress({
  progress,
  size = 100,
  strokeWidth = 8,
  color,
  trackColor,
  label,
  showValue = true,
  style,
}: CircularProgressProps) {
  const t = useTheme();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor ?? t.surface}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color ?? t.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        {showValue && (
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
            <Text style={{ fontSize: size * 0.22, fontWeight: '700', color: t.text }}>
              {Math.round(clampedProgress)}%
            </Text>
          </View>
        )}
      </View>
      {label && (
        <Text style={{ fontSize: 13, fontWeight: '500', color: t.textSecondary, marginTop: 8 }}>
          {label}
        </Text>
      )}
    </View>
  );
}
