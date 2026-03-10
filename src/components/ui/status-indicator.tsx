import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatusType = 'online' | 'offline' | 'busy' | 'away' | 'dnd';

type StatusIndicatorProps = {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  style?: ViewStyle;
};

const dotSizes = { sm: 8, md: 10, lg: 14 };

export function StatusIndicator({
  status,
  label,
  size = 'md',
  showLabel = false,
  style,
}: StatusIndicatorProps) {
  const t = useTheme();
  const dotSize = dotSizes[size];

  const config: Record<StatusType, { color: string; label: string }> = {
    online: { color: t.success, label: 'Online' },
    offline: { color: t.textTertiary, label: 'Offline' },
    busy: { color: t.error, label: 'Busy' },
    away: { color: t.warning, label: 'Away' },
    dnd: { color: t.error, label: 'Do Not Disturb' },
  };

  const c = config[status];

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
      <View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: Radius.full,
          backgroundColor: c.color,
        }}
      />
      {(showLabel || label) && (
        <Text
          style={{
            fontSize: size === 'sm' ? 11 : size === 'lg' ? 15 : 13,
            fontWeight: '500',
            color: t.textSecondary,
          }}>
          {label ?? c.label}
        </Text>
      )}
    </View>
  );
}
