import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  type ViewProps,
} from 'react-native';

import { MapPin } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LocationSearchSuggestion = {
  /** Display label for the suggestion */
  label: string;
  /** Optional secondary text for the suggestion */
  subtitle?: string;
};

export type LocationSearchProps = ViewProps & {
  /** Current search input value */
  value: string;
  /** Callback invoked when the search text changes */
  onChangeText: (text: string) => void;
  /** List of recent search strings shown when input is empty */
  recentSearches?: string[];
  /** Location suggestions shown while the user types */
  suggestions?: LocationSearchSuggestion[];
  /** Callback invoked when a suggestion or recent search is selected */
  onSelect: (label: string) => void;
  /** Placeholder text for the search input */
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
        <MapPin size={FontSize.xl.fontSize} color={t.textSecondary} />
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', color: t.text }}
            numberOfLines={1}>
            {item.label}
          </Text>
          {item.subtitle && (
            <Text
              style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 2 }}
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
        <MapPin size={FontSize.xl.fontSize} color={t.textSecondary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={t.textTertiary}
          style={{
            flex: 1,
            fontSize: FontSize.lg.fontSize,
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
