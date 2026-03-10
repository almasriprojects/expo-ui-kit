import React, { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  const t = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 48,
        gap: 12,
      }}>
      {icon && <View style={{ marginBottom: 8 }}>{icon}</View>}
      <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', color: t.text }}>
        {title}
      </Text>
      {description && (
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: t.textSecondary,
            lineHeight: 20,
          }}>
          {description}
        </Text>
      )}
      {action && <View style={{ marginTop: 12 }}>{action}</View>}
    </View>
  );
}
