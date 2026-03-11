import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check, X } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type QuizOptionProps = {
  /** Text label of the quiz answer option */
  label: string;
  /** Zero-based index used for the letter prefix */
  index: number;
  /** Whether this option is currently selected */
  selected?: boolean;
  /** Whether this option is the correct answer */
  correct?: boolean;
  /** Whether this option is an incorrect answer */
  incorrect?: boolean;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Callback invoked when the option is pressed */
  onPress: () => void;
  /** Custom styles applied to the option container */
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
          isCorrect ? (
            <Check size={14} color={t.textOnColor} />
          ) : (
            <X size={14} color={t.textOnColor} />
          )
        ) : (
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: letterColor }}>
            {letters[index] ?? index + 1}
          </Text>
        )}
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: FontSize.md.fontSize,
          fontWeight: selected || showResult ? '600' : '400',
          color: t.text,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
