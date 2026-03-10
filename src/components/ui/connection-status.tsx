import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeOutUp,
  SlideInDown,
  SlideOutUp,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';

export type ConnectionStatusProps = {
  isConnected: boolean;
  message?: string;
};

const HIDE_DELAY_MS = 3000;

export function ConnectionStatus({
  isConnected,
  message,
}: ConnectionStatusProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(!isConnected);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (isConnected) {
      hideTimeoutRef.current = setTimeout(() => {
        setVisible(false);
        hideTimeoutRef.current = null;
      }, HIDE_DELAY_MS);
    } else {
      setVisible(true);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [isConnected]);

  if (!visible) return null;

  const offlineContent = (
    <Text style={{ fontSize: 13, fontWeight: '600', color: t.textOnColor }}>
      {message ?? 'No internet connection'}
    </Text>
  );

  const onlineContent = (
    <Text style={{ fontSize: 13, fontWeight: '600', color: t.textOnColor }}>
      {message ?? 'Back online'}
    </Text>
  );

  const bgColor = isConnected ? t.success : t.error;

  return (
    <Animated.View
      entering={isConnected ? FadeInDown.duration(200) : SlideInDown.duration(200)}
      exiting={isConnected ? FadeOutUp.duration(200) : SlideOutUp.duration(200)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: bgColor,
        paddingTop: insets.top + 4,
        paddingBottom: 6,
        paddingHorizontal: 16,
        alignItems: 'center',
      }}
      accessibilityLabel={isConnected ? 'Connection restored' : 'No connection'}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite">
      {isConnected ? onlineContent : offlineContent}
    </Animated.View>
  );
}
