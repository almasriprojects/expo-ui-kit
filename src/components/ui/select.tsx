import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
  type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, ChevronDown } from 'lucide-react-native';

import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SelectOption = {
  /** Display label for the option */
  label: string;
  /** Unique value identifier for the option */
  value: string;
};

export type SelectProps = ViewProps & {
  /** Available options to choose from */
  options: SelectOption[];
  /** Currently selected option value */
  value?: string;
  /** Callback invoked when the selected value changes */
  onValueChange: (value: string) => void;
  /** Placeholder text shown when no option is selected */
  placeholder?: string;
  /** Label text displayed above the selector */
  label?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
};

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  style,
  ...props
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <View style={typeof style === 'object' ? style : undefined} {...props}>
      {label && (
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text, marginBottom: Spacing[1.5] }}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => !disabled && setOpen(true)}
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
          borderWidth: 1.5,
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
        <ChevronDown size={16} color={t.textSecondary} />
      </Pressable>

      <Modal visible={open} transparent animationType="slide" accessibilityViewIsModal>
        <Pressable
          style={{ flex: 1, backgroundColor: t.overlay, justifyContent: 'flex-end' }}
          onPress={() => setOpen(false)}>
          <View
            style={{
              backgroundColor: t.card,
              borderTopLeftRadius: Radius['3xl'],
              borderTopRightRadius: Radius['3xl'],
              maxHeight: '55%',
              paddingBottom: insets.bottom + Spacing[4],
              ...Shadows.xl,
            }}>
            {/* Handle */}
            <View style={{ alignItems: 'center', paddingVertical: Spacing[3] }}>
              <View
                style={{
                  width: 40,
                  height: 5,
                  borderRadius: Radius.full,
                  backgroundColor: t.surfaceActive,
                }}
              />
            </View>

            {/* Title */}
            {label && (
              <Text
                style={{
                  fontSize: FontSize.lg.fontSize,
                  fontWeight: '700',
                  color: t.text,
                  textAlign: 'center',
                  paddingBottom: Spacing[3],
                }}>
                {label}
              </Text>
            )}

            {/* Options */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: t.border, marginHorizontal: Spacing[5] }} />
              )}
              renderItem={({ item }) => {
                const selected = item.value === value;
                return (
                  <Pressable
                    onPress={() => {
                      onValueChange(item.value);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={item.label}
                    style={{
                      paddingHorizontal: Spacing[6],
                      paddingVertical: Spacing[4],
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: selected ? t.primarySoft : 'transparent',
                    }}>
                    <Text
                      style={{
                        fontSize: FontSize.lg.fontSize,
                        fontWeight: selected ? '600' : '400',
                        color: selected ? t.primary : t.text,
                      }}>
                      {item.label}
                    </Text>
                    {selected && (
                      <Check size={16} color={t.primary} strokeWidth={3} />
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
