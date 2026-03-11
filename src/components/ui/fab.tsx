import React, { type ReactNode, useState } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FABProps = PressableProps & {
  /** Icon element rendered inside the button */
  icon?: ReactNode;
  /** Optional text label displayed next to the icon */
  label?: string;
  /** Screen position of the floating button */
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
};

const positionStyles = {
  'bottom-right': { right: 24 },
  'bottom-center': { alignSelf: 'center' as const, left: 0, right: 0 },
  'bottom-left': { left: 24 },
};

export function FAB({
  icon,
  label,
  position = 'bottom-right',
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  style,
  ...props
}: FABProps) {
  const t = useTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPressIn={(e) => {
        setPressed(true);
        onPressInProp?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOutProp?.(e);
      }}
      style={[
        {
          position: 'absolute',
          bottom: 24,
          backgroundColor: pressed ? t.primaryPressed : t.primary,
          alignItems: 'center',
          justifyContent: 'center',
          ...Shadows.lg,
          ...(label
            ? {
                paddingHorizontal: 20,
                paddingVertical: 14,
                borderRadius: Radius['2xl'],
                flexDirection: 'row' as const,
                gap: 8,
              }
            : {
                width: 56,
                height: 56,
                borderRadius: Radius.full,
              }),
          ...positionStyles[position],
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      {icon}
      {label && (
        <Text style={{ color: t.primaryForeground, fontWeight: '600', fontSize: FontSize.md.fontSize }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
