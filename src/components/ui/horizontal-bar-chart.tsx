import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HorizontalBarChartDataItem = {
  /** Label text for the bar */
  label: string;
  /** Numeric value determining bar width */
  value: number;
  /** Custom color for the bar */
  color?: string;
};

export type HorizontalBarChartProps = {
  /** Array of data items to render as bars */
  data: HorizontalBarChartDataItem[];
  /** Overall height of the chart in pixels */
  height?: number;
  /** Whether to display numeric values next to bars */
  showValues?: boolean;
  /** Custom maximum value for scaling bars */
  maxValue?: number;
  /** Accessibility label for the chart container */
  accessibilityLabel?: string;
  /** Accessibility hint for the chart container */
  accessibilityHint?: string;
};

type BarRowProps = {
  item: HorizontalBarChartDataItem;
  maxValue: number;
  barColor: string;
  trackColor: string;
  labelColor: string;
  showValues: boolean;
};

function BarRow({ item, maxValue, barColor, trackColor, labelColor, showValues }: BarRowProps) {
  const animatedWidth = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const barWidthPercent = maxValue > 0 ? Math.min(item.value / maxValue, 1) : 0;

  useEffect(() => {
    animatedWidth.value = withSpring(barWidthPercent, { damping: 18, stiffness: 90 });
  }, [animatedWidth, barWidthPercent]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: containerWidth > 0 ? animatedWidth.value * containerWidth : 0,
  }));

  const onLayout = useCallback((e: { nativeEvent: { layout: { width: number } } }) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 32 }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: FontSize.sm.fontSize,
          color: labelColor,
          width: 80,
          flexShrink: 0,
        }}>
        {item.label}
      </Text>
      <View style={{ flex: 1, height: 20, justifyContent: 'center' }}>
        <View
          onLayout={onLayout}
          style={{
            flex: 1,
            height: 12,
            backgroundColor: trackColor,
            borderRadius: Radius.sm,
            overflow: 'hidden',
          }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: barColor,
                borderRadius: Radius.sm,
              },
              animatedStyle,
            ]}
          />
        </View>
      </View>
      {showValues && (
        <Text
          style={{
            fontSize: FontSize.sm.fontSize,
            fontWeight: '600',
            color: labelColor,
            width: 40,
            textAlign: 'right',
          }}>
          {item.value}
        </Text>
      )}
    </View>
  );
}

export function HorizontalBarChart({
  data,
  height,
  showValues = true,
  maxValue,
  accessibilityLabel,
  accessibilityHint,
}: HorizontalBarChartProps) {
  const t = useTheme();
  const computedMax = maxValue ?? Math.max(...data.map((d) => d.value), 1);
  const gap = 12;

  if (data.length === 0) {
    return null;
  }

  const contentHeight = height ?? data.length * (32 + gap) - gap;

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `Horizontal bar chart with ${data.length} bars`}
      accessibilityHint={accessibilityHint}
      style={{ minHeight: contentHeight }}>
      <View style={{ gap }}>
        {data.map((item, index) => (
          <BarRow
            key={`${item.label}-${index}`}
            item={item}
            maxValue={computedMax}
            barColor={item.color ?? t.primary}
            trackColor={t.surface}
            labelColor={t.textSecondary}
            showValues={showValues}
          />
        ))}
      </View>
    </View>
  );
}
