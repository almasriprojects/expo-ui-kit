import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type CollapseTransitionProps = {
  expanded: boolean;
  duration?: number;
  children: ReactNode;
};

const DEFAULT_DURATION = 300;

export function CollapseTransition({
  expanded,
  duration = DEFAULT_DURATION,
  children,
}: CollapseTransitionProps) {
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const height = useSharedValue(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    setMeasuredHeight(h);
  }, []);

  useEffect(() => {
    height.value = withTiming(expanded ? measuredHeight : 0, { duration });
  }, [expanded, measuredHeight, duration, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden' as const,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View onLayout={onLayout} collapsable={false}>
        {children}
      </View>
    </Animated.View>
  );
}
