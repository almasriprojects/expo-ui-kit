import React, { type ReactNode, useState } from 'react';
import { Pressable, type PressableProps, type ViewStyle } from 'react-native';

import { Radius, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant = 'default' | 'primary' | 'ghost' | 'outline';

export type IconButtonProps = PressableProps & {
  /** Icon element rendered inside the button */
  icon: ReactNode;
  /** Accessibility label for the button */
  label?: string;
  /** Size variant of the button */
  size?: IconButtonSize;
  /** Visual style variant of the button */
  variant?: IconButtonVariant;
};

const sizeStyles: Record<IconButtonSize, ViewStyle> = {
  sm: { width: 36, height: 36, borderRadius: Radius.lg },
  md: { width: 44, height: 44, borderRadius: Radius.lg },
  lg: { width: 52, height: 52, borderRadius: Radius.xl },
};

function getVariantStyle(
  variant: IconButtonVariant,
  t: ThemeTokens,
  pressed: boolean,
): ViewStyle {
  switch (variant) {
    case 'default':
      return {
        backgroundColor: pressed ? t.surfacePressed : t.surface,
        borderWidth: 1,
        borderColor: t.border,
      };
    case 'primary':
      return { backgroundColor: pressed ? t.primaryPressed : t.primary };
    case 'outline':
      return {
        borderWidth: 1.5,
        borderColor: t.border,
        backgroundColor: pressed ? t.surface : 'transparent',
      };
    case 'ghost':
      return {
        backgroundColor: pressed ? t.surface : 'transparent',
      };
  }
}

export function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'default',
  disabled,
  style,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  ...props
}: IconButtonProps) {
  const t = useTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      onPressIn={(e) => {
        setPressed(true);
        onPressInProp?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOutProp?.(e);
      }}
      style={[
        { alignItems: 'center' as const, justifyContent: 'center' as const },
        sizeStyles[size],
        getVariantStyle(variant, t, pressed),
        disabled && { opacity: 0.45 },
        typeof style === 'object' ? style : undefined,
      ]}
      disabled={disabled}
      {...props}>
      {icon}
    </Pressable>
  );
}
