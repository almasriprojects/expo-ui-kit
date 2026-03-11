import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Animation } from '@/constants/theme';

export type ScaleTransitionProps = {
  visible: boolean;
  duration?: number;
  from?: number;
  to?: number;
  children: ReactNode;
  style?: ViewStyle;
};

const DEFAULT_DURATION = Animation.duration.normal;
const DEFAULT_FROM = 0.8;
const DEFAULT_TO = 1;

export function ScaleTransition({
  visible,
  duration = DEFAULT_DURATION,
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
  children,
  style,
}: ScaleTransitionProps) {
  const progress = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, { duration });
  }, [visible, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = from + (to - from) * progress.value;
    return {
      transform: [{ scale }],
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
