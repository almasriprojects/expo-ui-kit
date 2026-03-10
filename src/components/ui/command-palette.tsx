import { SymbolView } from 'expo-symbols';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CommandItem = {
  key: string;
  label: string;
  icon?: string;
  group?: string;
  onSelect: () => void;
};

export type CommandPaletteProps = {
  visible: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
};

export function CommandPalette({
  visible,
  onClose,
  items,
  placeholder = 'Search commands...',
}: CommandPaletteProps) {
  const t = useTheme();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!visible) setQuery('');
  }, [visible]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(q)
    );
  }, [items, query]);

  const groupedItems = useMemo(() => {
    const groups = new Map<string, CommandItem[]>();
    for (const item of filteredItems) {
      const group = item.group ?? '';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(item);
    }
    return Array.from(groups.entries());
  }, [filteredItems]);

  const handleSelect = (item: CommandItem) => {
    item.onSelect();
    onClose();
    setQuery('');
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      accessibilityViewIsModal
      accessibilityLabel="Command palette">
      <Pressable
        style={{
          flex: 1,
          backgroundColor: t.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
        onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 400,
            maxHeight: '70%',
            backgroundColor: t.card,
            borderRadius: Radius.xl,
            overflow: 'hidden',
            ...Shadows.xl,
          }}>
          {/* Search input */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 12,
              borderBottomWidth: 1,
              borderBottomColor: t.border,
            }}>
            <SymbolView
              name="magnifyingglass"
              size={18}
              tintColor={t.textTertiary}
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={placeholder}
              placeholderTextColor={t.textTertiary}
              style={{
                flex: 1,
                fontSize: 16,
                color: t.text,
                paddingVertical: 4,
              }}
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Search commands"
              accessibilityRole="search"
            />
          </View>

          {/* Items list */}
          <FlatList
            data={groupedItems}
            keyExtractor={([group]) => group || '__default'}
            style={{ maxHeight: 320 }}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View
                style={{
                  padding: 24,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: t.textSecondary,
                  }}>
                  No results found
                </Text>
              </View>
            }
            renderItem={({ item: [group, groupItems] }) => (
              <View style={{ paddingVertical: 8 }}>
                {group ? (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: t.textTertiary,
                      paddingHorizontal: 16,
                      paddingBottom: 8,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}>
                    {group}
                  </Text>
                ) : null}
                {groupItems.map((cmd) => (
                  <Pressable
                    key={cmd.key}
                    onPress={() => handleSelect(cmd)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      gap: 12,
                      backgroundColor: pressed ? t.surface : 'transparent',
                    })}
                    accessibilityRole="button"
                    accessibilityLabel={cmd.label}>
                    {cmd.icon ? (
                      <SymbolView
                        name={cmd.icon as any}
                        size={18}
                        tintColor={t.textSecondary}
                      />
                    ) : null}
                    <Text
                      style={{
                        fontSize: 15,
                        color: t.text,
                        fontWeight: '500',
                      }}>
                      {cmd.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
