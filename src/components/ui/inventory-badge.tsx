import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InventoryBadgeProps = {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  count?: number;
};

const statusConfig = {
  'in-stock': {
    label: 'In Stock',
    colorKey: 'success' as const,
  },
  'low-stock': {
    label: (count: number) => `Low Stock (${count} left)`,
    colorKey: 'warning' as const,
  },
  'out-of-stock': {
    label: 'Out of Stock',
    colorKey: 'error' as const,
  },
};

export function InventoryBadge({ status, count }: InventoryBadgeProps) {
  const t = useTheme();

  const config = statusConfig[status];
  const label =
    typeof config.label === 'function' ? config.label(count ?? 0) : config.label;
  const bgColor =
    config.colorKey === 'success'
      ? t.successSoft
      : config.colorKey === 'warning'
        ? t.warningSoft
        : t.errorSoft;
  const textColor =
    config.colorKey === 'success'
      ? t.success
      : config.colorKey === 'warning'
        ? t.warning
        : t.error;

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Radius.full,
        backgroundColor: bgColor,
      }}
      accessibilityLabel={label}>
      <ThemedText
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: textColor,
        }}>
        {label}
      </ThemedText>
    </View>
  );
}
