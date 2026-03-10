import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';

type MarqueeProps = {
  text: string;
  speed?: number;
  style?: ViewStyle;
  textStyle?: { fontSize?: number; fontWeight?: string; color?: string };
};

export function Marquee({ text, speed = 60, style, textStyle }: MarqueeProps) {
  const t = useTheme();
  const translateX = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const onTextLayout = (e: LayoutChangeEvent) => {
    setTextWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    if (containerWidth > 0 && textWidth > 0 && textWidth > containerWidth) {
      const distance = textWidth + containerWidth;
      const duration = (distance / speed) * 1000;
      translateX.value = containerWidth;
      translateX.value = withRepeat(
        withTiming(-textWidth, { duration, easing: Easing.linear }),
        -1,
      );
    }
  }, [containerWidth, textWidth, speed]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      onLayout={onContainerLayout}
      style={[{ overflow: 'hidden', paddingVertical: 8 }, style]}>
      <Animated.View style={[{ flexDirection: 'row' }, animStyle]}>
        <Text
          onLayout={onTextLayout}
          numberOfLines={1}
          style={{
            fontSize: textStyle?.fontSize ?? 14,
            fontWeight: (textStyle?.fontWeight as any) ?? '500',
            color: textStyle?.color ?? t.text,
          }}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
}
