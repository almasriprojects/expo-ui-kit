import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MessageInputProps = {
  onSend: (message: string) => void;
  onAttach?: () => void;
  placeholder?: string;
  style?: ViewStyle;
};

export function MessageInput({
  onSend,
  onAttach,
  placeholder = 'Type a message...',
  style,
}: MessageInputProps) {
  const t = useTheme();
  const [text, setText] = useState('');
  const hasText = text.trim().length > 0;

  const handleSend = () => {
    if (!hasText) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: t.card,
          borderTopWidth: 1,
          borderTopColor: t.border,
        },
        style,
      ]}>
      {onAttach && (
        <Pressable
          onPress={onAttach}
          style={{
            width: 38,
            height: 38,
            borderRadius: Radius.full,
            backgroundColor: t.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 18, color: t.textSecondary }}>+</Text>
        </Pressable>
      )}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          backgroundColor: t.surface,
          borderRadius: Radius['2xl'],
          borderWidth: 1,
          borderColor: t.border,
          paddingHorizontal: 14,
          paddingVertical: 6,
          minHeight: 40,
          maxHeight: 120,
        }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={t.textTertiary}
          multiline
          style={{
            flex: 1,
            fontSize: 15,
            color: t.text,
            paddingVertical: 6,
            maxHeight: 100,
          }}
        />
      </View>

      <Pressable
        onPress={handleSend}
        disabled={!hasText}
        style={{
          width: 38,
          height: 38,
          borderRadius: Radius.full,
          backgroundColor: hasText ? t.primary : t.surface,
          alignItems: 'center',
          justifyContent: 'center',
          ...Shadows.sm,
        }}>
        <Text style={{ fontSize: 16, color: hasText ? t.primaryForeground : t.textTertiary }}>
          ➤
        </Text>
      </Pressable>
    </View>
  );
}
