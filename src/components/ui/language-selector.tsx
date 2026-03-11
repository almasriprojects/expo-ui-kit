import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { Check } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SearchBar } from './search-bar';

export type LanguageOption = {
  /** Language code (e.g. "en", "fr") */
  code: string;
  /** Display name of the language */
  name: string;
  /** Emoji flag for the language */
  flag?: string;
};

export type LanguageSelectorProps = {
  /** Available language options */
  languages: LanguageOption[];
  /** Currently selected language code */
  selected: string;
  /** Callback fired when a language is selected */
  onSelect: (code: string) => void;
  /** Whether to show the search bar */
  searchable?: boolean;
};

export function LanguageSelector({
  languages,
  selected,
  onSelect,
  searchable = true,
}: LanguageSelectorProps) {
  const t = useTheme();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return languages;
    const q = query.toLowerCase().trim();
    return languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q)
    );
  }, [languages, query, searchable]);

  return (
    <View style={{ flex: 1, backgroundColor: t.background }} accessibilityLabel="Language selector">
      {searchable && (
        <View style={{ padding: 16, paddingBottom: 8 }}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery('')}
            placeholder="Search languages..."
            accessibilityLabel="Search languages"
          />
        </View>
      )}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => {
          const isSelected = item.code === selected;
          return (
            <Pressable
              onPress={() => onSelect(item.code)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 14,
                paddingHorizontal: 12,
                borderRadius: Radius.lg,
                backgroundColor: pressed ? t.surfacePressed : 'transparent',
                opacity: pressed ? 0.8 : 1,
              })}
              accessibilityRole="radio"
              accessibilityLabel={`${item.name}${isSelected ? ', selected' : ''}`}
              accessibilityState={{ checked: isSelected }}
            >
              {item.flag != null && (
                <Text style={{ fontSize: FontSize.xl.fontSize }} accessibilityElementsHidden>
                  {item.flag}
                </Text>
              )}
              <Text
                style={{
                  flex: 1,
                  fontSize: FontSize.lg.fontSize,
                  fontWeight: isSelected ? '600' : '500',
                  color: t.text,
                }}
              >
                {item.name}
              </Text>
              {isSelected && (
                <Check size={18} color={t.primary} accessibilityLabel="Selected" />
              )}
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>
              No languages found
            </Text>
          </View>
        }
      />
    </View>
  );
}
