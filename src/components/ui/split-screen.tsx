import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { Spacing } from '@/constants/theme';

export type SplitScreenProps = {
  /** Content for the left/top pane */
  left: React.ReactNode;
  /** Content for the right/bottom pane */
  right: React.ReactNode;
  /** Split ratio for left/top pane (0-1, default 0.5) */
  ratio?: number;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Gap between panes in pixels */
  gap?: number;
  /** Optional container style */
  style?: ViewStyle;
};

export function SplitScreen({
  left,
  right,
  ratio = 0.5,
  direction = 'horizontal',
  gap = Spacing[3],
  style,
}: SplitScreenProps) {
  return (
    <View
      style={[
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap,
        },
        style,
      ]}>
      <View style={{ flex: ratio, overflow: 'hidden' }}>{left}</View>
      <View style={{ flex: 1 - ratio, overflow: 'hidden' }}>{right}</View>
    </View>
  );
}
