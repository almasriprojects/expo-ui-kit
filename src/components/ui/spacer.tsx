import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type SpacerProps = {
  size?: number;
  direction?: 'horizontal' | 'vertical';
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'none' | 'button' | 'link' | 'search' | 'image' | 'text' | 'summary' | 'header' | 'adjustable' | 'imagebutton' | 'none';
  accessibilityState?: { disabled?: boolean; selected?: boolean; checked?: boolean | 'mixed'; busy?: boolean; expanded?: boolean };
  accessibilityHint?: string;
};

export function Spacer({
  size,
  direction = 'vertical',
  style,
  accessible,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessibilityHint,
  ...props
}: SpacerProps & React.ComponentPropsWithoutRef<typeof View>) {
  useTheme();

  const spacerStyle: ViewStyle =
    size != null
      ? direction === 'horizontal'
        ? { width: size, height: 0 }
        : { width: 0, height: size }
      : { flex: 1 };

  return (
    <View
      style={[spacerStyle, style]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessibilityHint={accessibilityHint}
      {...props}
    />
  );
}
