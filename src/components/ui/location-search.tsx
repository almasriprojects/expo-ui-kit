import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  type ViewProps,
} from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LocationSearchSuggestion = {
  label: string;
  subtitle?: string;
};

export type LocationSearchProps = ViewProps & {
  value: string;
  onChangeText: (text: string) => void;
  recentSearches?: string[];
  suggestions?: LocationSearchSuggestion[];
  onSelect: (label: string) => void;
  placeholder?: string;
};

export function LocationSearch({
  value,
  onChangeText,
  recentSearches = [],
  suggestions = [],
  onSelect,
  placeholder = 'Search location...',
  style,
  ...props
}: LocationSearchProps) {
  const t = useTheme();

  const showRecent = value.trim().length === 0 && recentSearches.length > 0;
  const showSuggestions = value.trim().length > 0 && suggestions.length > 0;
  const hasResults = showRecent || showSuggestions;

  const items = useMemo(() => {
    if (showRecent) {
      return recentSearches.map((s) => ({ label: s, subtitle: undefined, isRecent: true }));
    }
    if (showSuggestions) {
      return suggestions.map((s) => ({ ...s, isRecent: false }));
    }
    return [];
  }, [showRecent, showSuggestions, recentSearches, suggestions]);

  const handleSelect = useCallback(
    (label: string) => {
      onSelect(label);
    },
    [onSelect],
  );

  const renderItem = useCallback(
    ({ item }: { item: { label: string; subtitle?: string } }) => (
      <Pressable
        onPress={() => handleSelect(item.label)}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 16,
          gap: 12,
          backgroundColor: pressed ? t.surfacePressed : t.surface,
          borderRadius: Radius.md,
        })}
        accessibilityRole="button"
        accessibilityLabel={item.subtitle ? `${item.label}, ${item.subtitle}` : item.label}
        accessibilityHint="Select this location">
        <Text style={{ fontSize: 18 }}>📍</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 15, fontWeight: '500', color: t.text }}
            numberOfLines={1}>
            {item.label}
          </Text>
          {item.subtitle && (
            <Text
              style={{ fontSize: 13, color: t.textSecondary, marginTop: 2 }}
              numberOfLines={1}>
              {item.subtitle}
            </Text>
          )}
        </View>
      </Pressable>
    ),
    [handleSelect, t],
  );

  const keyExtractor = useCallback((item: { label: string }) => item.label, []);

  return (
    <View
      style={[{ gap: 8 }, typeof style === 'object' ? style : undefined]}
      accessibilityRole="search"
      {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 48,
          paddingHorizontal: 16,
          gap: 12,
          backgroundColor: t.surface,
          borderRadius: Radius.lg,
          borderWidth: 1,
          borderColor: t.border,
        }}>
        <Text style={{ fontSize: 18 }}>📍</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={t.textTertiary}
          style={{
            flex: 1,
            fontSize: 16,
            color: t.text,
            paddingVertical: 12,
          }}
          returnKeyType="search"
          accessibilityLabel={placeholder}
          accessibilityRole="search"
        />
      </View>
      {hasResults && (
        <View
          style={{
            backgroundColor: t.card,
            borderRadius: Radius.lg,
            borderWidth: 1,
            borderColor: t.border,
            maxHeight: 240,
          }}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps="handled"
            style={{ maxHeight: 240 }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: t.border, marginHorizontal: 16 }} />
            )}
          />
        </View>
      )}
    </View>
  );
}
