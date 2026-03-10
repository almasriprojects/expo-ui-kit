import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type LoadingProps = {
  message?: string;
  size?: 'small' | 'large';
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
        <ThemedText style={{ fontSize: 14, color: t.textSecondary }}>
          {message}
        </ThemedText>
      )}
    </View>
  );
}
