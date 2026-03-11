import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ToggleOption = {
  /** Unique value identifier for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Optional emoji icon displayed before the label */
  icon?: string;
};

export type ToggleGroupProps = {
  /** Array of toggle options */
  options: ToggleOption[];
  /** Currently selected value(s) */
  value: string | string[];
  /** Callback invoked when the selection changes */
  onValueChange: (value: string | string[]) => void;
  /** Whether multiple options can be selected */
  multiple?: boolean;
  /** Size variant of the toggle buttons */
  size?: 'sm' | 'md' | 'lg';
  /** Custom styles applied to the group container */
  style?: ViewStyle;
};

const sizes = {
  sm: { px: 10, py: 6, fontSize: FontSize.sm.fontSize },
  md: { px: 14, py: 10, fontSize: FontSize.md.fontSize },
  lg: { px: 18, py: 12, fontSize: FontSize.lg.fontSize },
};

export function ToggleGroup({
  options,
  value,
  onValueChange,
  multiple = false,
  size = 'md',
  style,
}: ToggleGroupProps) {
  const t = useTheme();
  const s = sizes[size];

  const isActive = (optionValue: string) => {
    if (Array.isArray(value)) return value.includes(optionValue);
    return value === optionValue;
  };

  const handlePress = (optionValue: string) => {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [value];
      const next = arr.includes(optionValue)
        ? arr.filter((v) => v !== optionValue)
        : [...arr, optionValue];
      onValueChange(next);
    } else {
      onValueChange(optionValue);
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          borderRadius: Radius.xl,
          backgroundColor: t.surface,
          padding: 4,
          gap: 4,
        },
        style,
      ]}>
      {options.map((option) => {
        const active = isActive(option.value);
        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingHorizontal: s.px,
              paddingVertical: s.py,
              borderRadius: Radius.lg,
              backgroundColor: active ? t.card : 'transparent',
              ...(active ? Shadows.sm : {}),
            }}>
            {option.icon && (
              <Text style={{ fontSize: s.fontSize }}>{option.icon}</Text>
            )}
            <Text
              style={{
                fontSize: s.fontSize,
                fontWeight: active ? '600' : '500',
                color: active ? t.text : t.textSecondary,
              }}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
