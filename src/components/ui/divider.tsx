import React from 'react';
import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type DividerProps = ViewProps & {
  orientation?: 'horizontal' | 'vertical';
};

export function Divider({ orientation = 'horizontal', style, ...props }: DividerProps) {
  const t = useTheme();

  return (
    <View
      style={[
        { backgroundColor: t.border },
        orientation === 'horizontal'
          ? { height: 1, width: '100%' }
          : { width: 1, height: '100%' },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}
    />
  );
}
