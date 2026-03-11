import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LoadingProps = {
  /** Optional message displayed below the loading indicator */
  message?: string;
  /** Size of the activity indicator */
  size?: 'small' | 'large';
  /** Whether the loader should fill the entire screen */
  fullScreen?: boolean;
};

export function Loading({ message, size = 'large', fullScreen = false }: LoadingProps) {
  const t = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        flex: fullScreen ? 1 : undefined,
        paddingVertical: fullScreen ? 0 : 32,
      }}>
      <ActivityIndicator size={size} color={t.primary} />
      {message && (
        <ThemedText style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>
          {message}
        </ThemedText>
      )}
    </View>
  );
}
