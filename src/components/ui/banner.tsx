import React, { useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error';

export type BannerProps = {
  /** Body text of the banner */
  message: string;
  /** Optional heading displayed above the message */
  title?: string;
  /** Visual style variant indicating severity */
  variant?: BannerVariant;
  /** Whether the banner can be dismissed by the user */
  dismissible?: boolean;
  /** Custom icon emoji or character */
  icon?: string;
  /** Optional action button with label and handler */
  action?: { label: string; onPress: () => void };
  /** Custom styles for the banner container */
  style?: ViewStyle;
};

export function Banner({
  message,
  title,
  variant = 'info',
  dismissible = false,
  icon,
  action,
  style,
}: BannerProps) {
  const t = useTheme();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const defaultIcons: Record<BannerVariant, React.ComponentType<{ size: number; color: string; strokeWidth?: number }>> = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const config: Record<BannerVariant, { bg: string; accent: string }> = {
    info: { bg: t.primarySoft, accent: t.primary },
    success: { bg: t.successSoft, accent: t.success },
    warning: { bg: t.warningSoft, accent: t.warning },
    error: { bg: t.errorSoft, accent: t.error },
  };

  const c = config[variant];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: Spacing[3],
          padding: Spacing[3.5],
          borderRadius: Radius.xl,
          backgroundColor: c.bg,
          borderLeftWidth: 4,
          borderLeftColor: c.accent,
        },
        style,
      ]}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: Radius.full,
          backgroundColor: c.accent,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}>
        {icon ? (
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '700', color: t.textOnColor }}>
            {icon}
          </Text>
        ) : (
          React.createElement(defaultIcons[variant], { size: 14, color: t.textOnColor, strokeWidth: 2.5 })
        )}
      </View>
      <View style={{ flex: 1 }}>
        {title && (
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.text, marginBottom: Spacing[0.5] }}>
            {title}
          </Text>
        )}
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.text, lineHeight: FontSize.sm.lineHeight }}>
          {message}
        </Text>
        {action && (
          <Pressable onPress={action.onPress} style={{ marginTop: Spacing[2] }}>
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '700', color: c.accent }}>
              {action.label}
            </Text>
          </Pressable>
        )}
      </View>
      {dismissible && (
        <Pressable onPress={() => setDismissed(true)} hitSlop={8}>
          <X size={16} color={t.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}
