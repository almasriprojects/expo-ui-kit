import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type EmojiCategory = {
  key: string;
  label: string;
  emojis: string[];
};

const DEFAULT_CATEGORIES: EmojiCategory[] = [
  { key: 'smileys', label: 'Smileys', emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛'] },
  { key: 'hearts', label: 'Hearts', emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️'] },
  { key: 'hands', label: 'Hands', emojis: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍'] },
  { key: 'animals', label: 'Animals', emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆'] },
  { key: 'food', label: 'Food', emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍕', '🍔', '🍟', '🌭'] },
  { key: 'objects', label: 'Objects', emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳'] },
];

export type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
  categories?: EmojiCategory[];
  style?: ViewStyle;
};

export function EmojiPicker({
  onSelect,
  categories = DEFAULT_CATEGORIES,
  style,
}: EmojiPickerProps) {
  const t = useTheme();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.key ?? '');

  const activeEmojis =
    categories.find((c) => c.key === activeCategory)?.emojis ?? [];

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: t.border,
          overflow: 'hidden',
        },
        style,
      ]}
      accessibilityLabel="Emoji picker"
      accessibilityRole="menu">
      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
          gap: 4,
        }}>
        {categories.map((cat) => (
          <Pressable
            key={cat.key}
            onPress={() => setActiveCategory(cat.key)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: Radius.lg,
              backgroundColor: activeCategory === cat.key ? t.primarySoft : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityRole="tab"
            accessibilityLabel={cat.label}
            accessibilityState={{ selected: activeCategory === cat.key }}>
            <Text style={{ fontSize: 13, color: t.text, fontWeight: activeCategory === cat.key ? '600' : '400' }}>
              {cat.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Emoji grid */}
      <ScrollView
        style={{ maxHeight: 220 }}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 8,
          gap: 4,
        }}
        showsVerticalScrollIndicator={false}>
        {activeEmojis.map((emoji, i) => (
          <Pressable
            key={`${emoji}-${i}`}
            onPress={() => onSelect(emoji)}
            style={{
              width: 40,
              height: 40,
              borderRadius: Radius.md,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityRole="button"
            accessibilityLabel={`Select ${emoji}`}>
            <Text style={{ fontSize: 24 }}>{emoji}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
