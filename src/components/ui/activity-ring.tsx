import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Ring = {
  /** Progress percentage from 0 to 100 */
  progress: number;
  /** Color of the ring stroke */
  color: string;
  /** Optional label displayed in the legend */
  label?: string;
};

export type ActivityRingProps = {
  /** Array of ring data to render concentrically */
  rings: Ring[];
  /** Overall diameter of the ring chart in pixels */
  size?: number;
  /** Thickness of each ring stroke */
  strokeWidth?: number;
  /** Custom styles for the outer container */
  style?: ViewStyle;
};

export function ActivityRing({
  rings,
  size = 120,
  strokeWidth = 10,
  style,
}: ActivityRingProps) {
  const t = useTheme();
  const gap = strokeWidth + 4;

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {rings.map((ring, i) => {
            const radius = (size - strokeWidth) / 2 - i * gap;
            if (radius <= 0) return null;
            const circumference = 2 * Math.PI * radius;
            const progress = Math.min(Math.max(ring.progress, 0), 100);
            const offset = circumference - (progress / 100) * circumference;

            return (
              <React.Fragment key={i}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={t.surface}
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={ring.color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
      {rings.some((r) => r.label) && (
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
          {rings.map((ring, i) =>
            ring.label ? (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View
                  style={{ width: 10, height: 10, borderRadius: Radius.full, backgroundColor: ring.color }}
                />
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{ring.label}</Text>
                <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '700', color: t.text }}>
                  {Math.round(ring.progress)}%
                </Text>
              </View>
            ) : null,
          )}
        </View>
      )}
    </View>
  );
}
