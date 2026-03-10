import React, { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TypingIndicatorProps = {
  style?: ViewStyle;
};

function Dot({ delay }: { delay: number }) {
  const t = useTheme();
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 300 }),
          withTiming(0, { duration: 300 }),
        ),
        -1,
      ),
    );
  }, [delay, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 7,
          height: 7,
          borderRadius: Radius.full,
          backgroundColor: t.textTertiary,
        },
        animStyle,
      ]}
    />
  );
}

export function TypingIndicator({ style }: TypingIndicatorProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          backgroundColor: t.surface,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: Radius.xl,
          borderBottomLeftRadius: Radius.xs,
          alignSelf: 'flex-start',
        },
        style,
      ]}>
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
}
