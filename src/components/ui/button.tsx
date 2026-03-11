import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  Text,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Radius, Shadows, Spacing, type ThemeTokens, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = PressableProps & {
  /** Button label text */
  title: string;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset controlling padding and font size */
  size?: ButtonSize;
  /** Whether the button shows a loading spinner */
  loading?: boolean;
  /** Whether the button stretches to fill its container */
  fullWidth?: boolean;
};

const sizeMap: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: {
      minHeight: 36,
      paddingHorizontal: Spacing[3.5],
      paddingVertical: Spacing[2],
      borderRadius: Radius.lg,
    },
    text: { fontSize: FontSize.sm.fontSize, lineHeight: 18 },
  },
  md: {
    container: {
      minHeight: 44,
      paddingHorizontal: Spacing[5],
      paddingVertical: Spacing[2.5],
      borderRadius: Radius.lg,
    },
    text: { fontSize: FontSize.md.fontSize, lineHeight: 20 },
  },
  lg: {
    container: {
      minHeight: 52,
      paddingHorizontal: Spacing[7],
      paddingVertical: Spacing[3.5],
      borderRadius: Radius.xl,
    },
    text: { fontSize: FontSize.lg.fontSize, lineHeight: 22 },
  },
};

function getContainerStyle(
  variant: ButtonVariant,
  t: ThemeTokens,
  pressed: boolean,
): ViewStyle {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: pressed ? t.primaryPressed : t.primary,
        ...Shadows.sm,
      };
    case 'secondary':
      return {
        backgroundColor: pressed ? t.surfacePressed : t.surface,
      };
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
    case 'destructive':
      return {
        backgroundColor: pressed ? t.errorPressed : t.error,
        ...Shadows.sm,
      };
  }
}

function getTextColor(variant: ButtonVariant, t: ThemeTokens): string {
  switch (variant) {
    case 'primary':
      return t.primaryForeground;
    case 'secondary':
      return t.text;
    case 'outline':
      return t.text;
    case 'ghost':
      return t.primary;
    case 'destructive':
      return t.textOnColor;
  }
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const t = useTheme();
  const sizing = sizeMap[size];
  const [pressed, setPressed] = useState(false);

  const textColor = getTextColor(variant, t);
  const containerStyle = getContainerStyle(variant, t, pressed);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
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
          flexDirection: 'row' as const,
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
          gap: Spacing[2],
        },
        sizing.container,
        containerStyle,
        fullWidth ? { width: '100%' as const } : undefined,
        isDisabled ? { opacity: 0.45 } : undefined,
        typeof style === 'object' ? (style as ViewStyle) : undefined,
      ]}
      disabled={isDisabled}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : null}
      <Text style={[sizing.text, { fontWeight: '600', color: textColor }]}>
        {title}
      </Text>
    </Pressable>
  );
}
