import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  type ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MentionUser = {
  id: string;
  name: string;
  avatar?: string;
};

export type MentionInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  users: MentionUser[];
  placeholder?: string;
  style?: ViewStyle;
};

export function MentionInput({
  value,
  onChangeText,
  users,
  placeholder = 'Type a message...',
  style,
}: MentionInputProps) {
  const t = useTheme();
  const [cursorPos, setCursorPos] = useState(0);

  const { query, hasMentionTrigger } = useMemo(() => {
    const beforeCursor = value.slice(0, cursorPos);
    const atMatch = beforeCursor.match(/@(\w*)$/);
    return {
      query: atMatch ? atMatch[1].toLowerCase() : '',
      hasMentionTrigger: atMatch !== null,
    };
  }, [value, cursorPos]);

  const suggestions = useMemo(() => {
    if (!query) return users.slice(0, 5);
    return users
      .filter((u) => u.name.toLowerCase().includes(query))
      .slice(0, 5);
  }, [users, query]);

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);
    },
    [onChangeText],
  );

  const handleSelectUser = useCallback(
    (user: MentionUser) => {
      const beforeCursor = value.slice(0, cursorPos);
      const afterCursor = value.slice(cursorPos);
      const atIndex = beforeCursor.lastIndexOf('@');
      const newText =
        value.slice(0, atIndex) + `@${user.name} ` + afterCursor;
      onChangeText(newText);
    },
    [value, cursorPos, onChangeText],
  );

  const handleSelectionChange = useCallback(
    (e: { nativeEvent: { selection: { start: number; end: number } } }) => {
      setCursorPos(e.nativeEvent.selection.start);
    },
    [],
  );

  const showSuggestions = hasMentionTrigger && suggestions.length > 0;

  return (
    <View style={[{ position: 'relative' }, style]}>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        onSelectionChange={handleSelectionChange}
        placeholder={placeholder}
        placeholderTextColor={t.textTertiary}
        multiline
        style={{
          minHeight: 44,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          borderWidth: 1,
          borderColor: t.border,
          fontSize: 15,
          color: t.text,
        }}
        accessibilityLabel={placeholder}
        accessibilityHint="Type @ to mention a user" />
      {showSuggestions && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            marginTop: 4,
            borderRadius: Radius.lg,
            backgroundColor: t.card,
            borderWidth: 1,
            borderColor: t.border,
            maxHeight: 200,
            ...Shadows.md,
          }}
          accessibilityRole="list">
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            style={{ maxHeight: 196 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectUser(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: Radius.md,
                }}>
                {item.avatar ? (
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: Radius.full,
                    }}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: Radius.full,
                      backgroundColor: t.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: t.primaryForeground,
                      }}>
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                <Text style={{ fontSize: 15, color: t.text }}>{item.name}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
