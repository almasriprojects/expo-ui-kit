import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { X } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AutocompleteOption = {
  label: string;
  value: string;
};

export type AutocompleteProps = {
  label?: string;
  placeholder?: string;
  options: AutocompleteOption[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function Autocomplete({
  label,
  placeholder = 'Search...',
  options,
  value,
  onValueChange,
  disabled = false,
  error,
}: AutocompleteProps) {
  const t = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const displayText = isOpen ? query : selectedOption?.label ?? query;

  const handleFocus = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setQuery(selectedOption?.label ?? '');
  }, [disabled, selectedOption?.label]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setIsOpen(false), 150);
  }, []);

  const handleChangeText = useCallback(
    (text: string) => {
      setQuery(text);
      if (!isOpen) setIsOpen(true);
    },
    [isOpen],
  );

  const handleSelect = useCallback(
    (optionValue: string) => {
      onValueChange(optionValue);
      setQuery('');
      setIsOpen(false);
    },
    [onValueChange],
  );

  const handleClear = useCallback(() => {
    onValueChange('');
    setQuery('');
    setIsOpen(false);
  }, [onValueChange]);

  return (
    <View accessibilityRole="combobox" style={{ gap: 6 }}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>
          {label}
        </Text>
      )}
      <View style={{ position: 'relative' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 48,
            paddingHorizontal: 16,
            paddingVertical: 12,
            paddingRight: value ? 44 : 16,
            borderRadius: Radius.lg,
            backgroundColor: t.surface,
            borderWidth: 1.5,
            borderColor: error ? t.errorBorder : t.border,
            opacity: disabled ? 0.5 : 1,
          }}>
          <TextInput
            value={displayText}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={t.textTertiary}
            editable={!disabled}
            style={{
              flex: 1,
              fontSize: 16,
              color: t.text,
              padding: 0,
            }}
          />
        </View>
        {value && !disabled && (
          <Pressable
            onPress={handleClear}
            hitSlop={8}
            style={{
              position: 'absolute',
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              padding: 4,
            }}
            accessibilityRole="button"
            accessibilityLabel="Clear selection">
            <X size={16} color={t.textSecondary} />
          </Pressable>
        )}
        {isOpen && (
          <View
            style={{
              marginTop: 4,
              borderRadius: Radius.lg,
              backgroundColor: t.card,
              borderWidth: 1,
              borderColor: t.border,
              maxHeight: 200,
              ...Shadows.md,
            }}>
            {filteredOptions.length === 0 ? (
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 15, color: t.textTertiary }}>
                  No results
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                style={{ maxHeight: 196 }}
                renderItem={({ item }) => {
                  const selected = item.value === value;
                  return (
                    <Pressable
                      onPress={() => handleSelect(item.value)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: selected ? t.primarySoft : 'transparent',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: selected ? '600' : '400',
                          color: selected ? t.primary : t.text,
                        }}>
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            )}
          </View>
        )}
      </View>
      {error && (
        <Text style={{ fontSize: 12, color: t.error, fontWeight: '500' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
