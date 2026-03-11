import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PollOption = {
  /** Unique identifier for the poll option */
  key: string;
  /** Display label for the option */
  label: string;
  /** Number of votes this option has received */
  votes: number;
};

export type PollProps = {
  /** Poll question text */
  question: string;
  /** Array of poll options */
  options: PollOption[];
  /** Total number of votes across all options */
  totalVotes: number;
  /** Key of the currently selected option */
  selectedKey?: string;
  /** Callback invoked when the user votes for an option */
  onVote: (key: string) => void;
  /** Custom styles applied to the poll container */
  style?: ViewStyle;
};

export function Poll({
  question,
  options,
  totalVotes,
  selectedKey,
  onVote,
  style,
}: PollProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: t.border,
          padding: 16,
        },
        style,
      ]}
      accessibilityLabel={`Poll: ${question}`}
      accessibilityRole="summary">
      <Text
        style={{
          fontSize: FontSize.lg.fontSize,
          fontWeight: '600',
          color: t.text,
          marginBottom: 12,
        }}>
        {question}
      </Text>

      {options.map((opt) => {
        const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
        const isSelected = selectedKey === opt.key;

        return (
          <Pressable
            key={opt.key}
            onPress={() => onVote(opt.key)}
            style={{
              marginBottom: 8,
              borderRadius: Radius.lg,
              overflow: 'hidden',
              borderWidth: 1.5,
              borderColor: isSelected ? t.primary : t.border,
              backgroundColor: isSelected ? t.primarySoft : t.surface,
            }}
            accessibilityRole="radio"
            accessibilityLabel={`${opt.label}, ${opt.votes} votes`}
            accessibilityState={{ selected: isSelected }}>
            <View style={{ padding: 12 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <Text
                  style={{
                    fontSize: FontSize.md.fontSize,
                    color: t.text,
                    fontWeight: isSelected ? '600' : '400',
                  }}>
                  {opt.label}
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.sm.fontSize,
                    color: t.textSecondary,
                    fontVariant: ['tabular-nums'],
                  }}>
                  {opt.votes} ({percentage.toFixed(0)}%)
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  borderRadius: Radius.full,
                  backgroundColor: t.surfaceActive,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    backgroundColor: t.primary,
                    borderRadius: Radius.full,
                  }}
                />
              </View>
            </View>
          </Pressable>
        );
      })}

      <Text
        style={{
          fontSize: FontSize.sm.fontSize,
          color: t.textTertiary,
          marginTop: 4,
          fontVariant: ['tabular-nums'],
        }}>
        {totalVotes} vote{totalVotes !== 1 ? 's' : ''} total
      </Text>
    </View>
  );
}
