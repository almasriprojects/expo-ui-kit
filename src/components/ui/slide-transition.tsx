import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export type SlideTransitionProps = {
  visible: boolean;
  direction?: SlideDirection;
  duration?: number;
  distance?: number;
  children: ReactNode;
  style?: ViewStyle;
};

const DEFAULT_DURATION = 300;
const DEFAULT_DISTANCE = 50;

function getTranslateForDirection(
  direction: SlideDirection,
  progress: number,
  distance: number
): { translateX: number; translateY: number } {
  const offset = (1 - progress) * distance;
  switch (direction) {
    case 'up':
      return { translateX: 0, translateY: offset };
    case 'down':
      return { translateX: 0, translateY: -offset };
    case 'left':
      return { translateX: offset, translateY: 0 };
    case 'right':
      return { translateX: -offset, translateY: 0 };
  }
}

export function SlideTransition({
  visible,
  direction = 'up',
  duration = DEFAULT_DURATION,
  distance = DEFAULT_DISTANCE,
  children,
  style,
}: SlideTransitionProps) {
  const progress = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, { duration });
  }, [visible, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const { translateX, translateY } = getTranslateForDirection(
      direction,
      progress.value,
      distance
    );
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <Animated.View
      style={[animatedStyle, style]}
      accessibilityElementsHidden={!visible}
      importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
    >
      {children}
    </Animated.View>
  );
}
