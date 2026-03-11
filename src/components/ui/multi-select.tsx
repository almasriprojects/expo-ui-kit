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

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MultiSelectOption = {
  /** Display label for the option */
  label: string;
  /** Unique value identifier for the option */
  value: string;
};

export type MultiSelectProps = ViewProps & {
  /** Available options to select from */
  options: MultiSelectOption[];
  /** Currently selected option values */
  values: string[];
  /** Callback invoked when the selection changes */
  onValuesChange: (values: string[]) => void;
  /** Placeholder text shown when no options are selected */
  placeholder?: string;
  /** Label text displayed above the selector */
  label?: string;
  /** Maximum number of options that can be selected */
  max?: number;
};

export function MultiSelect({
  options,
  values,
  onValuesChange,
  placeholder = 'Select...',
  label,
  max,
  style,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const selectedLabels = options
    .filter((o) => values.includes(o.value))
    .map((o) => o.label);

  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onValuesChange(values.filter((v) => v !== value));
    } else {
      if (max && values.length >= max) return;
      onValuesChange([...values, value]);
    }
  };

  return (
    <View style={typeof style === 'object' ? style : undefined} {...props}>
      {label && (
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text, marginBottom: 6 }}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 48,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          borderWidth: 1.5,
          borderColor: t.border,
        }}>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {selectedLabels.length > 0 ? (
            selectedLabels.map((lbl, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: t.primarySoft,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: Radius.full,
                }}>
                <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: t.primary }}>{lbl}</Text>
              </View>
            ))
          ) : (
            <Text style={{ fontSize: FontSize.lg.fontSize, color: t.textTertiary }}>{placeholder}</Text>
          )}
        </View>
        <ChevronDown size={16} color={t.textSecondary} style={{ marginLeft: 8 }} />
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
              maxHeight: '60%',
              paddingBottom: insets.bottom + 16,
              ...Shadows.xl,
            }}>
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

            {label && (
              <Text
                style={{
                  fontSize: FontSize.lg.fontSize,
                  fontWeight: '700',
                  color: t.text,
                  textAlign: 'center',
                  paddingBottom: 8,
                }}>
                {label}
              </Text>
            )}

            {max && (
              <Text
                style={{
                  fontSize: FontSize.sm.fontSize,
                  color: t.textTertiary,
                  textAlign: 'center',
                  paddingBottom: 8,
                }}>
                Select up to {max}
              </Text>
            )}

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: t.border, marginHorizontal: 20 }} />
              )}
              renderItem={({ item }) => {
                const selected = values.includes(item.value);
                return (
                  <Pressable
                    onPress={() => toggleValue(item.value)}
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
                        fontSize: FontSize.lg.fontSize,
                        fontWeight: selected ? '600' : '400',
                        color: selected ? t.primary : t.text,
                      }}>
                      {item.label}
                    </Text>
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: Radius.sm,
                        borderWidth: 2,
                        borderColor: selected ? t.primary : t.borderStrong,
                        backgroundColor: selected ? t.primary : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {selected && (
                        <Check size={12} color={t.primaryForeground} strokeWidth={3} />
                      )}
                    </View>
                  </Pressable>
                );
              }}
            />

            <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
              <Pressable
                onPress={() => setOpen(false)}
                style={{
                  paddingVertical: 14,
                  borderRadius: Radius.xl,
                  backgroundColor: t.primary,
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.primaryForeground }}>
                  Done ({values.length})
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
