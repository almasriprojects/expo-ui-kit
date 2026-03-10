import React from 'react';
import { Text, View } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type KbdProps = {
  children: string;
};

export function Kbd({ children }: KbdProps) {
  const t = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: Radius.sm,
        backgroundColor: t.surface,
        borderWidth: 1,
        borderColor: t.border,
      }}
      accessibilityRole="none"
      accessibilityLabel={`Keyboard shortcut: ${children}`}>
      <Text
        style={{
          fontFamily: Fonts?.mono ?? 'monospace',
          fontSize: 12,
          color: t.text,
          fontWeight: '500',
        }}>
        {children}
      </Text>
    </View>
  );
}
