import React, { type ReactNode } from 'react';
import { View } from 'react-native';
import { Wrench } from 'lucide-react-native';

import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from '@/components/themed-text';

export type MaintenanceScreenProps = {
  /** Heading displayed on the maintenance screen */
  title?: string;
  /** Descriptive message explaining the maintenance */
  message?: string;
  /** Estimated time until the service is restored */
  estimatedTime?: string;
  /** Icon shown above the title */
  icon?: ReactNode;
};

export function MaintenanceScreen({
  title = 'Under Maintenance',
  message = 'We are currently performing scheduled maintenance. Please check back soon.',
  estimatedTime,
  icon,
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
      <View style={{ marginBottom: 24 }}>
        {icon ?? <Wrench size={40} color={t.textSecondary} />}
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
          marginBottom: estimatedTime ? 16 : 0,
        }}>
        {message}
      </ThemedText>
      {estimatedTime && (
        <ThemedText
          style={{
            fontSize: FontSize.md.fontSize,
            color: t.textTertiary,
            textAlign: 'center',
          }}>
          Estimated time: {estimatedTime}
        </ThemedText>
      )}
    </View>
  );
}
