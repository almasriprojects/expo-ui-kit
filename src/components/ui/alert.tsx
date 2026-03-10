import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

type AlertProps = ViewProps & {
  title?: string;
  message: string;
  variant?: AlertVariant;
};

const icons: Record<AlertVariant, string> = {
  default: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
  info: 'ℹ️',
};

function getVariantStyle(variant: AlertVariant, t: ThemeTokens) {
  switch (variant) {
    case 'success':
      return { bg: t.successSoft, border: t.success, title: t.success };
    case 'warning':
      return { bg: t.warningSoft, border: t.warning, title: t.warning };
    case 'error':
      return { bg: t.errorSoft, border: t.error, title: t.error };
    case 'info':
      return { bg: t.primarySoft, border: t.primary, title: t.primary };
    default:
      return { bg: t.surface, border: t.border, title: t.text };
  }
}

export function Alert({
  title,
  message,
  variant = 'default',
  style,
  ...props
}: AlertProps) {
  const t = useTheme();
  const v = getVariantStyle(variant, t);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: 12,
          padding: 16,
          borderRadius: Radius.xl,
          borderWidth: 1,
          backgroundColor: v.bg,
          borderColor: v.border,
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      <ThemedText style={{ fontSize: 16 }}>{icons[variant]}</ThemedText>
      <View style={{ flex: 1 }}>
        {title && (
          <ThemedText style={{ fontSize: 14, fontWeight: '600', marginBottom: 2, color: v.title }}>
            {title}
          </ThemedText>
        )}
        <ThemedText style={{ fontSize: 14, color: t.textSecondary }}>
          {message}
        </ThemedText>
      </View>
    </View>
  );
}
