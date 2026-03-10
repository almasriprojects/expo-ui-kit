import React, { type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

import { Radius, Shadows, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BoxProps = {
  p?: number;
  px?: number;
  py?: number;
  m?: number;
  mx?: number;
  my?: number;
  bg?: string;
  rounded?: keyof typeof Radius;
  shadow?: keyof typeof Shadows;
  children: ReactNode;
  style?: ViewStyle;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'none' | 'button' | 'link' | 'search' | 'image' | 'text' | 'summary' | 'header' | 'adjustable' | 'imagebutton' | 'none';
  accessibilityState?: { disabled?: boolean; selected?: boolean; checked?: boolean | 'mixed'; busy?: boolean; expanded?: boolean };
  accessibilityHint?: string;
};

export function Box({
  p,
  px,
  py,
  m,
  mx,
  my,
  bg = 'transparent',
  rounded,
  shadow,
  children,
  style,
  accessible,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessibilityHint,
  ...props
}: BoxProps & React.ComponentPropsWithoutRef<typeof View>) {
  const t = useTheme();

  const resolvedBg = (typeof bg === 'string' && bg in t ? t[bg as ThemeColor] : bg) as string;

  const boxStyle: ViewStyle = {
    padding: p,
    paddingHorizontal: px,
    paddingVertical: py,
    margin: m,
    marginHorizontal: mx,
    marginVertical: my,
    backgroundColor: resolvedBg,
    borderRadius: rounded != null ? Radius[rounded] : undefined,
    ...(shadow != null ? Shadows[shadow] : {}),
  };

  return (
    <View
      style={[boxStyle, style]}
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
