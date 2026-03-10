import React, { useCallback } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type RangeSliderProps = {
  min: number;
  max: number;
  low: number;
  high: number;
  onValueChange: (low: number, high: number) => void;
  step?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  style?: ViewStyle;
};

const THUMB_SIZE = 26;
const TRACK_HEIGHT = 6;

export function RangeSlider({
  min,
  max,
  low,
  high,
  onValueChange,
  step = 1,
  prefix = '',
  suffix = '',
  label,
  style,
}: RangeSliderProps) {
  const t = useTheme();
  const trackWidth = useSharedValue(0);

  const toPosition = (val: number) => {
    'worklet';
    return ((val - min) / (max - min)) * trackWidth.value;
  };

  const toValue = (pos: number) => {
    'worklet';
    const raw = min + (pos / trackWidth.value) * (max - min);
    return Math.round(raw / step) * step;
  };

  const lowPos = useSharedValue(0);
  const highPos = useSharedValue(0);

  const update = useCallback(
    (l: number, h: number) => {
      onValueChange(Math.min(l, h), Math.max(l, h));
    },
    [onValueChange],
  );

  const lowGesture = Gesture.Pan()
    .onStart(() => {
      lowPos.value = toPosition(low);
    })
    .onUpdate((e) => {
      const newPos = Math.max(0, Math.min(toPosition(high) - 2, lowPos.value + e.translationX));
      const val = toValue(newPos);
      runOnJS(update)(val, high);
    });

  const highGesture = Gesture.Pan()
    .onStart(() => {
      highPos.value = toPosition(high);
    })
    .onUpdate((e) => {
      const newPos = Math.max(toPosition(low) + 2, Math.min(trackWidth.value, highPos.value + e.translationX));
      const val = toValue(newPos);
      runOnJS(update)(low, val);
    });

  const lowPct = max === min ? 0 : ((low - min) / (max - min)) * 100;
  const highPct = max === min ? 100 : ((high - min) / (max - min)) * 100;

  return (
    <View style={style}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text, marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: t.primary }}>
          {prefix}{low}{suffix}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: '600', color: t.primary }}>
          {prefix}{high}{suffix}
        </Text>
      </View>
      <GestureHandlerRootView>
        <View
          style={{ height: 40, justifyContent: 'center' }}
          onLayout={(e) => { trackWidth.value = e.nativeEvent.layout.width; }}>
          {/* Track background */}
          <View
            style={{
              height: TRACK_HEIGHT,
              borderRadius: Radius.full,
              backgroundColor: t.surface,
            }}
          />
          {/* Active range */}
          <View
            style={{
              position: 'absolute',
              height: TRACK_HEIGHT,
              left: `${lowPct}%`,
              right: `${100 - highPct}%`,
              borderRadius: Radius.full,
              backgroundColor: t.primary,
            }}
          />
          {/* Low thumb */}
          <GestureDetector gesture={lowGesture}>
            <Animated.View
              style={{
                position: 'absolute',
                left: `${lowPct}%`,
                marginLeft: -THUMB_SIZE / 2,
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                borderRadius: Radius.full,
                backgroundColor: t.card,
                borderWidth: 3,
                borderColor: t.primary,
                ...Shadows.md,
              }}
            />
          </GestureDetector>
          {/* High thumb */}
          <GestureDetector gesture={highGesture}>
            <Animated.View
              style={{
                position: 'absolute',
                left: `${highPct}%`,
                marginLeft: -THUMB_SIZE / 2,
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                borderRadius: Radius.full,
                backgroundColor: t.card,
                borderWidth: 3,
                borderColor: t.primary,
                ...Shadows.md,
              }}
            />
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
        <Text style={{ fontSize: 11, color: t.textTertiary }}>{prefix}{min}{suffix}</Text>
        <Text style={{ fontSize: 11, color: t.textTertiary }}>{prefix}{max}{suffix}</Text>
      </View>
    </View>
  );
}
