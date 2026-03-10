import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DropdownOption = { label: string; value: string };

export type DropdownProps = {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value: string;
  onValueChange: (value: string) => void;
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
            fontSize: 14,
            fontWeight: '600',
            color: t.text,
            marginBottom: 6,
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
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: Radius.lg,
            backgroundColor: t.surface,
            borderWidth: 1,
            borderColor: t.border,
            opacity: disabled ? 0.5 : 1,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: selectedLabel ? t.text : t.textTertiary,
            }}>
            {selectedLabel ?? placeholder}
          </Text>
          <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
            <Text style={{ fontSize: 14, color: t.textSecondary }}>▾</Text>
          </View>
        </Pressable>

        {open && (
          <View
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 4,
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
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: option.value === value ? t.primarySoft : 'transparent',
                  borderBottomWidth: index < options.length - 1 ? 1 : 0,
                  borderBottomColor: t.border,
                }}>
                <Text
                  style={{
                    fontSize: 16,
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
