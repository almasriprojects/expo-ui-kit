import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SnackbarProps = {
  visible: boolean;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss: () => void;
  duration?: number;
  variant?: 'default' | 'success' | 'error';
};

function getVariantBg(variant: SnackbarProps['variant'], t: ThemeTokens) {
  switch (variant) {
    case 'success':
      return t.success;
    case 'error':
      return t.error;
    default:
      return t.snackbar;
  }
}

export function Snackbar({
  visible,
  message,
  actionLabel,
  onAction,
  onDismiss,
  duration = 4000,
  variant = 'default',
}: SnackbarProps) {
  const insets = useSafeAreaInsets();
  const t = useTheme();

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(200)}
      style={{
        position: 'absolute',
        bottom: insets.bottom + 16,
        left: 16,
        right: 16,
        zIndex: 9998,
      }}>
      <View
        style={{
          backgroundColor: getVariantBg(variant, t),
          borderRadius: Radius.xl,
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...Shadows.lg,
        }}>
        <ThemedText
          style={{
            color: variant === 'default' ? t.snackbarText : t.primaryForeground,
            fontSize: 14,
            fontWeight: '500',
            flex: 1,
            marginRight: 12,
          }}
          numberOfLines={2}>
          {message}
        </ThemedText>
        {actionLabel && onAction && (
          <Pressable onPress={onAction}>
            <ThemedText style={{ color: t.linkText, fontSize: 14, fontWeight: '700' }}>
              {actionLabel}
            </ThemedText>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
