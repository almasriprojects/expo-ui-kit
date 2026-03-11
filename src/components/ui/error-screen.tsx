import React, { type ReactNode } from 'react';
import { View } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { Button } from './button';
import { ThemedText } from '@/components/themed-text';

export type ErrorScreenProps = {
  /** Heading text for the error screen */
  title?: string;
  /** Descriptive error message */
  message?: string;
  /** Callback fired when the retry button is pressed */
  onRetry?: () => void;
  /** Custom label for the retry button */
  retryLabel?: string;
  /** Custom icon element displayed above the title */
  icon?: ReactNode;
};

export function ErrorScreen({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  icon,
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
      <View style={{ marginBottom: 24 }}>
        {icon ?? <AlertCircle size={64} color={t.error} />}
      </View>
      <ThemedText
        style={{
          fontSize: FontSize['2xl'].fontSize,
          fontWeight: '700',
          color: t.text,
          textAlign: 'center',
          marginBottom: 12,
        }}>
        {title}
      </ThemedText>
      <ThemedText
        style={{
          fontSize: FontSize.lg.fontSize,
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
