import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type EmojiCategory = {
  /** Unique key identifying the category */
  key: string;
  /** Display label for the category tab */
  label: string;
  /** Array of emoji characters in this category */
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
  /** Callback fired when an emoji is selected */
  onSelect: (emoji: string) => void;
  /** Custom emoji categories to display */
  categories?: EmojiCategory[];
  /** Custom styles applied to the container */
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
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.text, fontWeight: activeCategory === cat.key ? '600' : '400' }}>
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
            <Text style={{ fontSize: FontSize['2xl'].fontSize }}>{emoji}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
