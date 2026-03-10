import React, { type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type AlignValue = 'start' | 'center' | 'end' | 'stretch';
type JustifyValue = 'start' | 'center' | 'end' | 'space-between' | 'space-around';

export type StackProps = {
  direction?: 'horizontal' | 'vertical';
  gap?: number;
  align?: AlignValue;
  justify?: JustifyValue;
  children: ReactNode;
  style?: ViewStyle;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'none' | 'button' | 'link' | 'search' | 'image' | 'text' | 'summary' | 'header' | 'adjustable' | 'imagebutton' | 'none';
  accessibilityState?: { disabled?: boolean; selected?: boolean; checked?: boolean | 'mixed'; busy?: boolean; expanded?: boolean };
  accessibilityHint?: string;
};

const alignMap: Record<AlignValue, ViewStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyMap: Record<JustifyValue, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
};

export function Stack({
  direction = 'vertical',
  gap,
  align,
  justify,
  children,
  style,
  accessible,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessibilityHint,
  ...props
}: StackProps & React.ComponentPropsWithoutRef<typeof View>) {
  useTheme();

  const stackStyle: ViewStyle = {
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    gap,
    alignItems: align ? alignMap[align] : undefined,
    justifyContent: justify ? justifyMap[justify] : undefined,
  };

  return (
    <View
      style={[stackStyle, style]}
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

export function VStack(
  props: Omit<StackProps, 'direction'> & React.ComponentPropsWithoutRef<typeof View>,
) {
  return <Stack {...props} direction="vertical" />;
}

export function HStack(
  props: Omit<StackProps, 'direction'> & React.ComponentPropsWithoutRef<typeof View>,
) {
  return <Stack {...props} direction="horizontal" />;
}
