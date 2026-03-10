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

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = ViewProps & {
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
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
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text, marginBottom: 6 }}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 48,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          borderWidth: 1.5,
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
        <Text style={{ fontSize: 14, color: t.textSecondary }}>▼</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="slide">
        <Pressable
          style={{ flex: 1, backgroundColor: t.overlay, justifyContent: 'flex-end' }}
          onPress={() => setOpen(false)}>
          <View
            style={{
              backgroundColor: t.card,
              borderTopLeftRadius: Radius['3xl'],
              borderTopRightRadius: Radius['3xl'],
              maxHeight: '55%',
              paddingBottom: insets.bottom + 16,
              ...Shadows.xl,
            }}>
            {/* Handle */}
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
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
                  fontSize: 16,
                  fontWeight: '700',
                  color: t.text,
                  textAlign: 'center',
                  paddingBottom: 12,
                }}>
                {label}
              </Text>
            )}

            {/* Options */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: t.border, marginHorizontal: 20 }} />
              )}
              renderItem={({ item }) => {
                const selected = item.value === value;
                return (
                  <Pressable
                    onPress={() => {
                      onValueChange(item.value);
                      setOpen(false);
                    }}
                    style={{
                      paddingHorizontal: 24,
                      paddingVertical: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: selected ? t.primarySoft : 'transparent',
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: selected ? '600' : '400',
                        color: selected ? t.primary : t.text,
                      }}>
                      {item.label}
                    </Text>
                    {selected && (
                      <Text style={{ fontSize: 16, fontWeight: '700', color: t.primary }}>✓</Text>
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
