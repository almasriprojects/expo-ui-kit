import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = ViewProps & {
  options: RadioOption[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  horizontal?: boolean;
};

export function RadioGroup({
  options,
  value,
  onValueChange,
  label,
  disabled = false,
  horizontal = false,
  style,
  ...props
}: RadioGroupProps) {
  const t = useTheme();

  return (
    <View style={typeof style === 'object' ? style : undefined} {...props}>
      {label && (
        <ThemedText style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: t.text }}>
          {label}
        </ThemedText>
      )}
      <View
        style={horizontal ? { flexDirection: 'row', flexWrap: 'wrap', gap: 16 } : { gap: 12 }}
        accessibilityRole="radiogroup"
        accessibilityLabel={label}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => !disabled && onValueChange(option.value)}
              accessibilityRole="radio"
              accessibilityLabel={option.label}
              accessibilityState={{ checked: selected, disabled }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                opacity: disabled ? 0.5 : 1,
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: Radius.full,
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: selected ? t.primary : t.surfaceActive,
                }}>
                {selected && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: Radius.full,
                      backgroundColor: t.primary,
                    }}
                  />
                )}
              </View>
              <ThemedText style={{ fontSize: 15, fontWeight: '500', color: t.text }}>{option.label}</ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
