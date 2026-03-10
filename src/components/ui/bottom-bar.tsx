import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BottomBarProps = {
  children: React.ReactNode;
  transparent?: boolean;
  style?: ViewStyle;
};

export function BottomBar({ children, transparent = false, style }: BottomBarProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: transparent ? 'transparent' : t.card,
          borderTopWidth: transparent ? 0 : 1,
          borderTopColor: t.border,
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom, 12),
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          ...(transparent ? {} : Shadows.lg),
        },
        style,
      ]}>
      {children}
    </View>
  );
}
