import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DropdownOption = {
  /** Display text for the option */
  label: string;
  /** Unique value identifier for the option */
  value: string;
};

export type DropdownProps = {
  /** Label text shown above the dropdown */
  label?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Available options to select from */
  options: DropdownOption[];
  /** Currently selected option value */
  value: string;
  /** Callback fired when a new option is selected */
  onValueChange: (value: string) => void;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
};

export function Dropdown({
  label,
  placeholder = 'Select...',
  options,
  value,
  onValueChange,
  disabled = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const t = useTheme();
  const selectedLabel = options.find((o) => o.value === value)?.label;

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setOpen(false);
  };

  return (
    <View>
      {label && (
        <Text
          style={{
            fontSize: FontSize.md.fontSize,
            fontWeight: '600',
            color: t.text,
            marginBottom: Spacing[1.5],
          }}>
          {label}
        </Text>
      )}
      <View>
        <Pressable
          onPress={() => !disabled && setOpen(!open)}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={selectedLabel ?? placeholder}
          accessibilityState={{ expanded: open, disabled }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 48,
            paddingHorizontal: Spacing[4],
            paddingVertical: Spacing[3],
            borderRadius: Radius.lg,
            backgroundColor: t.surface,
            borderWidth: 1,
            borderColor: t.border,
            opacity: disabled ? 0.5 : 1,
          }}>
          <Text
            style={{
              fontSize: FontSize.lg.fontSize,
              color: selectedLabel ? t.text : t.textTertiary,
            }}>
            {selectedLabel ?? placeholder}
          </Text>
          <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
            <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>▾</Text>
          </View>
        </Pressable>

        {open && (
          <View
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: Spacing[1],
              borderRadius: Radius.lg,
              backgroundColor: t.card,
              borderWidth: 1,
              borderColor: t.border,
              overflow: 'hidden',
              zIndex: 1000,
              ...Shadows.md,
            }}>
            {options.map((option, index) => (
              <Pressable
                key={option.value}
                onPress={() => handleSelect(option.value)}
                accessibilityRole="button"
                accessibilityLabel={option.label}
                style={{
                  paddingHorizontal: Spacing[4],
                  paddingVertical: Spacing[3],
                  backgroundColor: option.value === value ? t.primarySoft : 'transparent',
                  borderBottomWidth: index < options.length - 1 ? 1 : 0,
                  borderBottomColor: t.border,
                }}>
                <Text
                  style={{
                    fontSize: FontSize.lg.fontSize,
                    color: option.value === value ? t.primary : t.text,
                    fontWeight: option.value === value ? '600' : '400',
                  }}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
