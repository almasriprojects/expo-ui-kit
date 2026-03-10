import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BarChartDataItem = {
  label: string;
  value: number;
  color?: string;
};

export type BarChartProps = {
  data: BarChartDataItem[];
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function BarChart({
  data,
  height = 200,
  showLabels = true,
  showValues = true,
  accessibilityLabel,
  accessibilityHint,
}: BarChartProps) {
  const t = useTheme();
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const barWidth = data.length > 0 ? Math.max(24, (280 - (data.length - 1) * 8) / data.length) : 32;
  const gap = 8;

  if (data.length === 0) {
    return null;
  }

  const chartHeight = height - (showLabels ? 28 : 0);
  const gridLines = 4;

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `Bar chart with ${data.length} bars`}
      accessibilityHint={accessibilityHint}
      style={{ paddingHorizontal: 8 }}>
      <View style={{ height: chartHeight, position: 'relative' }}>
        {Array.from({ length: gridLines }).map((_, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: (chartHeight / (gridLines + 1)) * (i + 1),
              height: 1,
              backgroundColor: t.border,
            }}
          />
        ))}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap, height: chartHeight }}>
        {data.map((item, index) => (
          <BarItem
            key={`${item.label}-${index}`}
            item={item}
            maxValue={maxValue}
            height={height - (showLabels ? 28 : 0)}
            barWidth={barWidth}
            themeColor={t.primary}
            showValues={showValues}
            labelColor={t.textSecondary}
          />
        ))}
        </View>
      </View>
      {showLabels && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8, paddingHorizontal: 4 }}>
          {data.map((item, index) => (
            <Text
              key={`label-${item.label}-${index}`}
              numberOfLines={1}
              style={{
                fontSize: 11,
                color: t.textSecondary,
                flex: 1,
                textAlign: 'center',
                maxWidth: barWidth + gap,
              }}>
              {item.label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

type BarItemProps = {
  item: BarChartDataItem;
  maxValue: number;
  height: number;
  barWidth: number;
  themeColor: string;
  showValues: boolean;
  labelColor: string;
};

function BarItem({ item, maxValue, height, barWidth, themeColor, showValues, labelColor }: BarItemProps) {
  const animatedHeight = useSharedValue(0);
  const targetHeight = (item.value / maxValue) * height;

  useEffect(() => {
    animatedHeight.value = withSpring(targetHeight, { damping: 15, stiffness: 100 });
  }, [animatedHeight, targetHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  const barColor = item.color ?? themeColor;

  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 4 }}>
      {showValues && (
        <Text
          numberOfLines={1}
          style={{
            fontSize: 11,
            fontWeight: '600',
            color: labelColor,
            marginBottom: 2,
          }}>
          {item.value}
        </Text>
      )}
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Animated.View
          style={[
            {
              width: barWidth,
              minHeight: 4,
              backgroundColor: barColor,
              borderTopLeftRadius: Radius.sm,
              borderTopRightRadius: Radius.sm,
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
}
