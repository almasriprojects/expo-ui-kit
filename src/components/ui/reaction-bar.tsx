import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ReactionItem = {
  emoji: string;
  count: number;
  reacted: boolean;
};

export type ReactionBarProps = {
  reactions: ReactionItem[];
  onReact: (emoji: string) => void;
  style?: ViewStyle;
};

export function ReactionBar({ reactions, onReact, style }: ReactionBarProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
        },
        style,
      ]}
      accessibilityLabel="Reactions"
      accessibilityRole="summary">
      {reactions.map(({ emoji, count, reacted }) => (
        <Pressable
          key={emoji}
          onPress={() => onReact(emoji)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: Radius.full,
            backgroundColor: reacted ? t.primarySoft : t.surface,
          }}
          accessibilityRole="button"
          accessibilityLabel={`${emoji} ${count} ${reacted ? 'reacted' : ''}`}
          accessibilityState={{ selected: reacted }}>
          <Text style={{ fontSize: 16 }}>{emoji}</Text>
          {count > 0 && (
            <Text style={{ fontSize: 13, color: t.textSecondary, fontVariant: ['tabular-nums'] }}>
              {count}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}
