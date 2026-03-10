import React, { type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type WrapProps = {
  gap?: number;
  children: ReactNode;
  style?: ViewStyle;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'none' | 'button' | 'link' | 'search' | 'image' | 'text' | 'summary' | 'header' | 'adjustable' | 'imagebutton' | 'none';
  accessibilityState?: { disabled?: boolean; selected?: boolean; checked?: boolean | 'mixed'; busy?: boolean; expanded?: boolean };
  accessibilityHint?: string;
};

export function Wrap({
  gap,
  children,
  style,
  accessible,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessibilityHint,
  ...props
}: WrapProps & React.ComponentPropsWithoutRef<typeof View>) {
  useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap,
        },
        style,
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessibilityHint={accessibilityHint}
      {...props}
    >
      {children}
    </View>
  );
}
