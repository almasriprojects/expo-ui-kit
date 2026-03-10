import React, { useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BannerVariant = 'info' | 'success' | 'warning' | 'error';

type BannerProps = {
  message: string;
  title?: string;
  variant?: BannerVariant;
  dismissible?: boolean;
  icon?: string;
  action?: { label: string; onPress: () => void };
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
          gap: 12,
          padding: 14,
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
          <Text style={{ fontSize: 12, fontWeight: '700', color: t.textOnColor }}>
            {icon}
          </Text>
        ) : (
          React.createElement(defaultIcons[variant], { size: 14, color: t.textOnColor, strokeWidth: 2.5 })
        )}
      </View>
      <View style={{ flex: 1 }}>
        {title && (
          <Text style={{ fontSize: 14, fontWeight: '700', color: t.text, marginBottom: 2 }}>
            {title}
          </Text>
        )}
        <Text style={{ fontSize: 13, color: t.text, lineHeight: 19 }}>
          {message}
        </Text>
        {action && (
          <Pressable onPress={action.onPress} style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: c.accent }}>
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
