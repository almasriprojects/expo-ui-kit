import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ColorSwatchOption = {
  label: string;
  value: string;
  hex: string;
};

export type ColorSwatchSelectorProps = {
  colors: ColorSwatchOption[];
  selected?: string;
  onSelect: (value: string) => void;
  showLabels?: boolean;
  style?: ViewStyle;
};

export function ColorSwatchSelector({
  colors,
  selected,
  onSelect,
  showLabels = true,
  style,
}: ColorSwatchSelectorProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'flex-end',
        },
        style,
      ]}
      accessibilityRole="radiogroup"
      accessibilityLabel="Color options">
      {colors.map((color) => {
        const isSelected = selected === color.value;

        return (
          <Pressable
            key={color.value}
            onPress={() => onSelect(color.value)}
            style={{
              alignItems: 'center',
              gap: 6,
            }}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${color.label}${isSelected ? ', selected' : ''}`}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: Radius.full,
                backgroundColor: color.hex,
                borderWidth: 2,
                borderColor: isSelected ? t.primary : t.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {isSelected && (
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: Radius.full,
                    backgroundColor: t.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Check size={12} color={t.primaryForeground} strokeWidth={3} />
                </View>
              )}
            </View>
            {showLabels && (
              <Text
                style={{
                  fontSize: 12,
                  color: t.textSecondary,
                  maxWidth: 56,
                  textAlign: 'center',
                }}
                numberOfLines={1}>
                {color.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
