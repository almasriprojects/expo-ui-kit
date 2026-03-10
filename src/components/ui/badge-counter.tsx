import React, { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BadgeCounterProps = {
  count?: number;
  max?: number;
  dot?: boolean;
  color?: string;
  children: ReactNode;
};

export function BadgeCounter({
  count = 0,
  max = 99,
  dot = false,
  color,
  children,
}: BadgeCounterProps) {
  const t = useTheme();
  const bgColor = color ?? t.error;

  const displayValue =
    dot ? null : count > max ? `${max}+` : count > 0 ? String(count) : null;

  const visible = dot ? count > 0 : count > 0;

  return (
    <View style={{ position: 'relative' }}>
      {children}
      {visible && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            minWidth: dot ? 8 : 18,
            height: dot ? 8 : 18,
            borderRadius: Radius.full,
            backgroundColor: bgColor,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: dot ? 0 : 4,
          }}
          accessibilityLabel={
            dot ? 'Has unread' : `${count} ${count > max ? 'or more' : ''} items`
          }
          accessibilityRole="text">
          {!dot && (
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: t.textOnColor,
              }}>
              {displayValue}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
