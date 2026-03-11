import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows, Spacing, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SnackbarProps = {
  /** Whether the snackbar is visible */
  visible: boolean;
  /** Message text displayed in the snackbar */
  message: string;
  /** Label for the optional action button */
  actionLabel?: string;
  /** Callback invoked when the action button is pressed */
  onAction?: () => void;
  /** Callback invoked when the snackbar is dismissed */
  onDismiss: () => void;
  /** Auto-dismiss duration in milliseconds */
  duration?: number;
  /** Color variant of the snackbar */
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
          paddingHorizontal: Spacing[4],
          paddingVertical: Spacing[3.5],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...Shadows.lg,
        }}>
        <ThemedText
          style={{
            color: variant === 'default' ? t.snackbarText : t.primaryForeground,
            fontSize: FontSize.md.fontSize,
            fontWeight: '500',
            flex: 1,
            marginRight: Spacing[3],
          }}
          numberOfLines={2}>
          {message}
        </ThemedText>
        {actionLabel && onAction && (
          <Pressable onPress={onAction}>
            <ThemedText style={{ color: t.linkText, fontSize: FontSize.md.fontSize, fontWeight: '700' }}>
              {actionLabel}
            </ThemedText>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
