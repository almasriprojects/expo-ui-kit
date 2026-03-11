import React, { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type EmptyStateProps = {
  /** Title text displayed prominently */
  title: string;
  /** Optional description text below the title */
  description?: string;
  /** Optional icon element displayed above the title */
  icon?: ReactNode;
  /** Optional action element (e.g. button) below the description */
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
      <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', textAlign: 'center', color: t.text }}>
        {title}
      </Text>
      {description && (
        <Text
          style={{
            fontSize: FontSize.md.fontSize,
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
