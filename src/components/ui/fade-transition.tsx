import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Animation } from '@/constants/theme';

export type FadeTransitionProps = {
  visible: boolean;
  duration?: number;
  children: ReactNode;
  style?: ViewStyle;
};

const DEFAULT_DURATION = Animation.duration.normal;

export function FadeTransition({
  visible,
  duration = DEFAULT_DURATION,
  children,
  style,
}: FadeTransitionProps) {
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration });
  }, [visible, duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

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
