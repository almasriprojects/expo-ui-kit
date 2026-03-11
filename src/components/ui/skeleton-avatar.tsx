import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Animation, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SkeletonAvatarProps = {
  /** Diameter of the skeleton avatar circle in pixels */
  size?: number;
};

export type SkeletonImageProps = {
  /** Width of the skeleton image placeholder */
  width?: number | string;
  /** Height of the skeleton image placeholder in pixels */
  height?: number;
  /** Border radius of the skeleton image */
  borderRadius?: number;
};

function usePulseAnimation() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.7, { duration: Animation.duration.slower }), -1, true);
  }, [opacity]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
}

export function SkeletonAvatar({ size = 48 }: SkeletonAvatarProps) {
  const t = useTheme();
  const animatedStyle = usePulseAnimation();

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: Radius.full,
          backgroundColor: t.surface,
        },
        animatedStyle,
      ]}
    />
  );
}

export function SkeletonImage({
  width,
  height = 120,
  borderRadius = Radius.md,
}: SkeletonImageProps) {
  const t = useTheme();
  const animatedStyle = usePulseAnimation();

  return (
    <Animated.View
      style={[
        {
          width: width as number | undefined,
          height,
          borderRadius,
          backgroundColor: t.surface,
        },
        animatedStyle,
      ]}
    />
  );
}
