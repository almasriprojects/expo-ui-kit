import React from 'react';
import { View, type ViewProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SliderProps = ViewProps & {
  /** Current value of the slider */
  value: number;
  /** Callback invoked when the slider value changes */
  onValueChange: (value: number) => void;
  /** Minimum value of the slider */
  min?: number;
  /** Maximum value of the slider */
  max?: number;
  /** Step increment for snapping values */
  step?: number;
  /** Whether to display the current value label */
  showValue?: boolean;
  /** Label text displayed above the slider */
  label?: string;
};

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = false,
  label,
  style,
  ...props
}: SliderProps) {
  const t = useTheme();
  const trackWidth = useSharedValue(0);
  const percentage = ((value - min) / (max - min)) * 100;

  const updateValue = (pct: number) => {
    const raw = min + (pct / 100) * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.min(max, Math.max(min, stepped));
    onValueChange(clamped);
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (trackWidth.value === 0) return;
      const pct = Math.min(100, Math.max(0, (e.x / trackWidth.value) * 100));
      runOnJS(updateValue)(pct);
    })
    .hitSlop({ top: 20, bottom: 20 });

  const tap = Gesture.Tap().onEnd((e) => {
    if (trackWidth.value === 0) return;
    const pct = Math.min(100, Math.max(0, (e.x / trackWidth.value) * 100));
    runOnJS(updateValue)(pct);
  });

  const composed = Gesture.Race(pan, tap);

  const thumbStyle = useAnimatedStyle(() => ({
    left: `${percentage}%`,
  }));

  return (
    <View style={typeof style === 'object' ? style : undefined} {...props}>
      {(label || showValue) && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing[2] }}>
          {label && (
            <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{label}</ThemedText>
          )}
          {showValue && (
            <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{value}</ThemedText>
          )}
        </View>
      )}
      <GestureDetector gesture={composed}>
        <View
          style={{ height: 40, justifyContent: 'center' }}
          accessibilityRole="adjustable"
          accessibilityLabel={label}
          accessibilityValue={{ min, max, now: value }}
          onLayout={(e) => {
            trackWidth.value = e.nativeEvent.layout.width;
          }}>
          <View
            style={{
              height: 8,
              borderRadius: Radius.full,
              backgroundColor: t.surfacePressed,
            }}>
            <View
              style={{
                height: 8,
                borderRadius: Radius.full,
                backgroundColor: t.primary,
                width: `${percentage}%`,
              }}
            />
          </View>
          <Animated.View
            style={[
              thumbStyle,
              {
                position: 'absolute',
                marginLeft: -10,
                width: 20,
                height: 20,
                borderRadius: Radius.full,
                backgroundColor: t.surfaceElevated,
                borderWidth: 2,
                borderColor: t.primary,
                ...Shadows.sm,
              },
            ]}
          />
        </View>
      </GestureDetector>
    </View>
  );
}
