import React, { useEffect } from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Animation, Radius as R } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SkeletonProps = ViewProps & {
  /** Width of the skeleton placeholder */
  width?: number | string;
  /** Height of the skeleton placeholder */
  height?: number | string;
  /** Border radius preset for the skeleton shape */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
};

const roundedValues = {
  none: 0,
  sm: R.sm,
  md: R.md,
  lg: R.lg,
  full: R.full,
};

export function Skeleton({
  width,
  height = 16,
  rounded = 'md',
  style,
  ...props
}: SkeletonProps) {
  const t = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: Animation.duration.slower }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as number | undefined,
          height: height as number | undefined,
          borderRadius: roundedValues[rounded],
          backgroundColor: t.surfaceActive,
        },
        animatedStyle,
        style,
      ]}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <View style={{ gap: 8 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? '60%' : '100%'}
          rounded="sm"
        />
      ))}
    </View>
  );
}

export function SkeletonCard() {
  const t = useTheme();

  return (
    <View
      style={{
        backgroundColor: t.card,
        borderRadius: R.xl,
        padding: 16,
        borderWidth: 1,
        borderColor: t.border,
        gap: 12,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Skeleton width={40} height={40} rounded="full" />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton height={14} width="50%" rounded="sm" />
          <Skeleton height={12} width="30%" rounded="sm" />
        </View>
      </View>
      <SkeletonText lines={2} />
    </View>
  );
}
