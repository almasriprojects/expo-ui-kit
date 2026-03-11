import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { CheckCircle, Clock, Flame } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type WorkoutCardProps = {
  /** Name of the workout */
  name: string;
  /** Category label (e.g. "Cardio", "Strength") */
  category?: string;
  /** Duration of the workout (e.g. "30 min") */
  duration: string;
  /** Estimated calories burned */
  calories?: string;
  /** Number of exercises in the workout */
  exercises?: number;
  /** Difficulty level of the workout */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** Whether the workout has been completed */
  completed?: boolean;
  /** Custom icon element displayed in the card */
  icon?: ReactNode;
  /** Callback invoked when the card is pressed */
  onPress?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

const difficultyTokens: Record<string, 'statusDone' | 'statusMedium' | 'statusUrgent'> = {
  beginner: 'statusDone',
  intermediate: 'statusMedium',
  advanced: 'statusUrgent',
};

export function WorkoutCard({
  name,
  category,
  duration,
  calories,
  exercises,
  difficulty,
  completed = false,
  icon,
  onPress,
  style,
}: WorkoutCardProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 16,
          borderWidth: 1,
          borderColor: completed ? t.success : t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: Radius.xl,
          backgroundColor: completed ? t.successSoft : t.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {completed ? <CheckCircle size={22} color={t.success} /> : icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{name}</Text>
        {category && (
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 1 }}>{category}</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Clock size={11} color={t.textSecondary} />
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{duration}</Text>
          </View>
          {calories && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Flame size={11} color={t.textSecondary} />
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{calories}</Text>
            </View>
          )}
          {exercises != null && (
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{exercises} exercises</Text>
          )}
        </View>
      </View>
      {difficulty && (
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: Radius.full,
            backgroundColor: t[difficultyTokens[difficulty]] + '18',
          }}>
          <Text
            style={{
              fontSize: FontSize['2xs'].fontSize,
              fontWeight: '700',
              color: t[difficultyTokens[difficulty]],
              textTransform: 'capitalize',
            }}>
            {difficulty}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
