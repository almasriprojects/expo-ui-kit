import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Button } from './button';
import { ThemedText } from '@/components/themed-text';

export type ErrorScreenProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: string;
};

export function ErrorScreen({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  icon = '❌',
}: ErrorScreenProps) {
  const t = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        backgroundColor: t.background,
      }}
      accessibilityLabel={title}
      accessibilityRole="alert">
      <Text style={{ fontSize: 64, marginBottom: 24 }}>{icon}</Text>
      <ThemedText
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: t.text,
          textAlign: 'center',
          marginBottom: 12,
        }}>
        {title}
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 16,
          color: t.textSecondary,
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 32,
        }}>
        {message}
      </ThemedText>
      {onRetry && (
        <Button
          title={retryLabel}
          onPress={onRetry}
          variant="secondary"
          accessibilityLabel={retryLabel}
        />
      )}
    </View>
  );
}
