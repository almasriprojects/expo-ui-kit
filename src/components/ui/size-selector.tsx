import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SizeOption = {
  /** Display label for the size (e.g. "S", "M", "L") */
  label: string;
  /** Unique value identifier for the size */
  value: string;
  /** Whether this size is currently in stock */
  available?: boolean;
};

export type SizeSelectorProps = {
  /** Array of available size options */
  sizes: SizeOption[];
  /** Currently selected size value */
  selected?: string;
  /** Callback invoked when a size is selected */
  onSelect: (value: string) => void;
  /** Custom styles applied to the container */
  style?: ViewStyle;
};

export function SizeSelector({
  sizes,
  selected,
  onSelect,
  style,
}: SizeSelectorProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        style,
      ]}
      accessibilityRole="radiogroup"
      accessibilityLabel="Size options">
      {sizes.map((size) => {
        const isSelected = selected === size.value;
        const isUnavailable = size.available === false;

        return (
          <Pressable
            key={size.value}
            onPress={() => !isUnavailable && onSelect(size.value)}
            disabled={isUnavailable}
            style={{
              minWidth: 48,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: Radius.lg,
              backgroundColor: isSelected ? t.primary : t.surface,
              borderWidth: 1.5,
              borderColor: isSelected ? t.primary : t.border,
              opacity: isUnavailable ? 0.5 : 1,
            }}
            accessibilityRole="radio"
            accessibilityState={{
              selected: isSelected,
              disabled: isUnavailable,
            }}
            accessibilityLabel={`${size.label}${isUnavailable ? ', unavailable' : ''}`}>
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
                fontWeight: '600',
                color: isSelected ? t.primaryForeground : t.text,
                textDecorationLine: isUnavailable ? 'line-through' : undefined,
                textAlign: 'center',
              }}>
              {size.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
