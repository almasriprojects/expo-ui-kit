import React from 'react';
import { View, type ViewProps } from 'react-native';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, type ThemeTokens, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export type AlertProps = ViewProps & {
  /** Optional heading text for the alert */
  title?: string;
  /** Body text of the alert */
  message: string;
  /** Visual style variant indicating severity */
  variant?: AlertVariant;
};

const icons: Record<AlertVariant, React.ComponentType<{ size: number; color: string }>> = {
  default: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
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
          gap: Spacing[3],
          padding: Spacing[4],
          borderRadius: Radius.xl,
          borderWidth: 1,
          backgroundColor: v.bg,
          borderColor: v.border,
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      {React.createElement(icons[variant], { size: 20, color: v.border })}
      <View style={{ flex: 1 }}>
        {title && (
          <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', marginBottom: Spacing[0.5], color: v.title }}>
            {title}
          </ThemedText>
        )}
        <ThemedText style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>
          {message}
        </ThemedText>
      </View>
    </View>
  );
}
