import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, type ViewStyle } from 'react-native';
import { X } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TagInputProps = {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  maxTags?: number;
  style?: ViewStyle;
};

export function TagInput({
  tags,
  onTagsChange,
  placeholder = 'Add tag...',
  label,
  maxTags,
  style,
}: TagInputProps) {
  const t = useTheme();
  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;
    onTagsChange([...tags, trimmed]);
    setInput('');
  };

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <View style={style}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text, marginBottom: 6 }}>
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          padding: 12,
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          borderWidth: 1.5,
          borderColor: t.border,
          minHeight: 48,
          alignItems: 'center',
        }}>
        {tags.map((tag, i) => (
          <View
            key={`${tag}-${i}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              backgroundColor: t.primarySoft,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: Radius.full,
            }}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: t.primary }}>
              {tag}
            </Text>
            <Pressable onPress={() => removeTag(i)} hitSlop={4}>
              <X size={12} color={t.primary} strokeWidth={3} />
            </Pressable>
          </View>
        ))}
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          placeholderTextColor={t.textTertiary}
          returnKeyType="done"
          style={{
            flex: 1,
            minWidth: 80,
            fontSize: 14,
            color: t.text,
            paddingVertical: 2,
          }}
        />
      </View>
    </View>
  );
}
