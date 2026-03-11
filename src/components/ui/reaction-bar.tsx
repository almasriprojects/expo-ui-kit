import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ReactionItem = {
  /** Emoji character for the reaction */
  emoji: string;
  /** Number of users who reacted with this emoji */
  count: number;
  /** Whether the current user has reacted with this emoji */
  reacted: boolean;
};

export type ReactionBarProps = {
  /** Array of reaction items to display */
  reactions: ReactionItem[];
  /** Callback invoked when a reaction emoji is toggled */
  onReact: (emoji: string) => void;
  /** Custom styles applied to the bar container */
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
          <Text style={{ fontSize: FontSize.lg.fontSize }}>{emoji}</Text>
          {count > 0 && (
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontVariant: ['tabular-nums'] }}>
              {count}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}
