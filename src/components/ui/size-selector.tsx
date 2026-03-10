import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SizeOption = {
  label: string;
  value: string;
  available?: boolean;
};

export type SizeSelectorProps = {
  sizes: SizeOption[];
  selected?: string;
  onSelect: (value: string) => void;
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
                fontSize: 14,
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
