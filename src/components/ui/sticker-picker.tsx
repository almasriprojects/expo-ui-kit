import React, { useState, useMemo } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Search, X } from 'lucide-react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StickerItem = {
  /** Unique identifier for the sticker */
  id: string;
  /** Image URI for the sticker */
  uri: string;
  /** Optional alt text */
  label?: string;
};

export type StickerCategory = {
  /** Category identifier */
  id: string;
  /** Display name for the category tab */
  name: string;
  /** Icon element for the category tab */
  icon: React.ReactNode;
  /** Array of stickers in this category */
  items: StickerItem[];
};

export type StickerPickerProps = {
  /** Array of sticker categories */
  categories: StickerCategory[];
  /** Callback when a sticker is selected */
  onSelect: (sticker: StickerItem) => void;
  /** Callback to close the picker */
  onClose?: () => void;
  /** Number of columns in the grid */
  columns?: number;
  /** Container height */
  height?: number;
  /** Optional container style */
  style?: ViewStyle;
};

export function StickerPicker({
  categories,
  onSelect,
  onClose,
  columns = 4,
  height = 300,
  style,
}: StickerPickerProps) {
  const t = useTheme();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '');
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const category = categories.find((c) => c.id === activeCategory);
    if (!category) return [];
    if (!query.trim()) return category.items;
    const lower = query.toLowerCase();
    return category.items.filter((s) => s.label?.toLowerCase().includes(lower));
  }, [categories, activeCategory, query]);

  return (
    <View
      accessibilityRole="menu"
      accessibilityLabel="Sticker picker"
      style={[{ height, backgroundColor: t.background, borderRadius: Radius.lg }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: t.surface,
          borderRadius: Radius.md,
          marginHorizontal: Spacing[3],
          marginTop: Spacing[3],
          paddingHorizontal: Spacing[3],
          gap: Spacing[2],
        }}>
        <Search size={16} color={t.textTertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search stickers"
          placeholderTextColor={t.textTertiary}
          style={{
            flex: 1,
            ...FontSize.sm,
            color: t.text,
            paddingVertical: Spacing[2],
          }}
          accessibilityLabel="Search stickers"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={6} accessibilityLabel="Clear search">
            <X size={14} color={t.textTertiary} />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing[3],
          paddingVertical: Spacing[2],
          gap: Spacing[2],
        }}>
        {categories.map((cat) => {
          const active = cat.id === activeCategory;
          return (
            <Pressable
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={cat.name}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: Spacing[1],
                paddingHorizontal: Spacing[3],
                paddingVertical: Spacing[1.5],
                borderRadius: Radius.full,
                backgroundColor: active ? t.primarySoft : t.surface,
              }}>
              {cat.icon}
              <Text
                style={{
                  ...FontSize.sm,
                  fontWeight: active ? '600' : '400',
                  color: active ? t.primary : t.textSecondary,
                }}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={filteredItems}
        numColumns={columns}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Spacing[2], paddingBottom: Spacing[2] }}
        columnWrapperStyle={{ gap: Spacing[1] }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing[1] }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSelect(item)}
            accessibilityRole="button"
            accessibilityLabel={item.label ?? 'Sticker'}
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: Radius.md,
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: item.uri }}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
              accessibilityLabel={item.label ?? 'Sticker'}
            />
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: Spacing[8] }}>
            <Text style={{ ...FontSize.sm, color: t.textTertiary }}>No stickers found</Text>
          </View>
        }
      />
    </View>
  );
}
