import React from 'react';
import { Text, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';

type NetworkBannerProps = {
  isOffline: boolean;
  message?: string;
  style?: ViewStyle;
};

export function NetworkBanner({
  isOffline,
  message,
  style,
}: NetworkBannerProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  if (!isOffline) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={[
        {
          backgroundColor: t.error,
          paddingTop: insets.top + 4,
          paddingBottom: 6,
          paddingHorizontal: 16,
          alignItems: 'center',
        },
        style,
      ]}>
      <Text style={{ fontSize: 13, fontWeight: '600', color: t.textOnColor }}>
        {message ?? 'No internet connection'}
      </Text>
    </Animated.View>
  );
}
