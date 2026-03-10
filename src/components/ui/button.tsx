import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  Text,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Radius, Shadows, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
};

const sizeMap: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: {
      minHeight: 36,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: Radius.lg,
    },
    text: { fontSize: 13, lineHeight: 18 },
  },
  md: {
    container: {
      minHeight: 44,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: Radius.lg,
    },
    text: { fontSize: 15, lineHeight: 20 },
  },
  lg: {
    container: {
      minHeight: 52,
      paddingHorizontal: 28,
      paddingVertical: 14,
      borderRadius: Radius.xl,
    },
    text: { fontSize: 17, lineHeight: 22 },
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
          gap: 8,
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
