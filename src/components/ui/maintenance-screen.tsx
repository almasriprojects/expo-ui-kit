import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from '@/components/themed-text';

export type MaintenanceScreenProps = {
  title?: string;
  message?: string;
  estimatedTime?: string;
  icon?: string;
};

export function MaintenanceScreen({
  title = 'Under Maintenance',
  message = 'We are currently performing scheduled maintenance. Please check back soon.',
  estimatedTime,
  icon = '🔧',
}: MaintenanceScreenProps) {
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
      accessibilityRole="summary">
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
          marginBottom: estimatedTime ? 16 : 0,
        }}>
        {message}
      </ThemedText>
      {estimatedTime && (
        <ThemedText
          style={{
            fontSize: 14,
            color: t.textTertiary,
            textAlign: 'center',
          }}>
          Estimated time: {estimatedTime}
        </ThemedText>
      )}
    </View>
  );
}
