import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InlineNotificationProps = {
  /** Visual variant determining colors and icon */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Optional bold title text */
  title?: string;
  /** Notification message text */
  message: string;
  /** Label for the optional action button */
  actionLabel?: string;
  /** Callback fired when the action button is pressed */
  onAction?: () => void;
  /** Callback fired when the dismiss button is pressed */
  onDismiss?: () => void;
};

const icons: Record<NonNullable<InlineNotificationProps['variant']>, React.ComponentType<{ size: number; color: string }>> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

function getVariantStyles(
  variant: NonNullable<InlineNotificationProps['variant']>,
  t: ReturnType<typeof useTheme>
) {
  switch (variant) {
    case 'info':
      return { bg: t.primarySoft, border: t.primary, icon: t.primary };
    case 'success':
      return { bg: t.successSoft, border: t.success, icon: t.success };
    case 'warning':
      return { bg: t.warningSoft, border: t.warning, icon: t.warning };
    case 'error':
      return { bg: t.errorSoft, border: t.error, icon: t.error };
    default:
      return { bg: t.primarySoft, border: t.primary, icon: t.primary };
  }
}

export function InlineNotification({
  variant = 'info',
  title,
  message,
  actionLabel,
  onAction,
  onDismiss,
}: InlineNotificationProps) {
  const t = useTheme();
  const styles = getVariantStyles(variant, t);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: Radius.lg,
        backgroundColor: styles.bg,
        borderLeftWidth: 4,
        borderLeftColor: styles.border,
        gap: 12,
      }}>
      {React.createElement(icons[variant], { size: 18, color: styles.icon })}
      <View style={{ flex: 1 }}>
        {title && (
          <Text
            style={{
              fontSize: FontSize.md.fontSize,
              fontWeight: '600',
              color: styles.icon,
              marginBottom: 2,
            }}>
            {title}
          </Text>
        )}
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>{message}</Text>
      </View>
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: Radius.md,
            backgroundColor: styles.icon,
          }}>
          <Text
            style={{
              fontSize: FontSize.md.fontSize,
              fontWeight: '600',
              color: t.textOnColor,
            }}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={8}
          style={{
            padding: 4,
            borderRadius: Radius.sm,
          }}>
          <X size={16} color={t.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}
