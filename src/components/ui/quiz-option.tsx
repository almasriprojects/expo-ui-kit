import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuizOptionProps = {
  label: string;
  index: number;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function QuizOption({
  label,
  index,
  selected = false,
  correct,
  incorrect,
  disabled = false,
  onPress,
  style,
}: QuizOptionProps) {
  const t = useTheme();

  const isCorrect = correct === true;
  const isIncorrect = incorrect === true;
  const showResult = isCorrect || isIncorrect;

  const borderColor = isCorrect
    ? t.success
    : isIncorrect
      ? t.error
      : selected
        ? t.primary
        : t.border;

  const bgColor = isCorrect
    ? t.successSoft
    : isIncorrect
      ? t.errorSoft
      : selected
        ? t.primarySoft
        : t.card;

  const letterBg = isCorrect
    ? t.success
    : isIncorrect
      ? t.error
      : selected
        ? t.primary
        : t.surface;

  const letterColor = selected || showResult ? t.textOnColor : t.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || showResult}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderRadius: Radius.xl,
          borderWidth: 2,
          borderColor,
          backgroundColor: bgColor,
          opacity: disabled && !showResult ? 0.5 : 1,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: Radius.full,
          backgroundColor: letterBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {showResult ? (
          <Text style={{ fontSize: 14, fontWeight: '700', color: t.textOnColor }}>
            {isCorrect ? '✓' : '✕'}
          </Text>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: '700', color: letterColor }}>
            {letters[index] ?? index + 1}
          </Text>
        )}
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 15,
          fontWeight: selected || showResult ? '600' : '400',
          color: t.text,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
