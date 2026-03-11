import React from 'react';
import { Pressable, type ViewStyle } from 'react-native';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ToggleProps = {
  /** Whether the toggle is currently pressed/active */
  pressed: boolean;
  /** Callback invoked when the pressed state changes */
  onPressedChange: (pressed: boolean) => void;
  /** Content rendered inside the toggle button */
  children: React.ReactNode;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Visual style variant */
  variant?: 'default' | 'outline';
  /** Size variant of the toggle */
  size?: 'sm' | 'md' | 'lg';
  /** Custom styles applied to the toggle container */
  style?: ViewStyle;
};

const sizeMap = { sm: { px: 8, py: 4 }, md: { px: 12, py: 8 }, lg: { px: 16, py: 10 } };

export function Toggle({ pressed, onPressedChange, children, disabled, variant = 'default', size = 'md', style }: ToggleProps) {
  const t = useTheme();
  const s = sizeMap[size];
  const bg = pressed ? (variant === 'outline' ? t.surface : t.primarySoft) : 'transparent';
  const border = variant === 'outline' ? t.border : 'transparent';
  return (
    <Pressable
      onPress={() => !disabled && onPressedChange(!pressed)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected: pressed, disabled }}
      style={[{
        paddingHorizontal: s.px,
        paddingVertical: s.py,
        borderRadius: Radius.md,
        backgroundColor: bg,
        borderWidth: variant === 'outline' ? 1 : 0,
        borderColor: border,
        opacity: disabled ? 0.5 : 1,
        ...Shadows.sm,
      }, style]}>
      {children}
    </Pressable>
  );
}
