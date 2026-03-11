import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { BookOpen, CheckCircle, Clock, Lock } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LessonCardProps = {
  /** Title of the lesson */
  title: string;
  /** Optional subtitle or description for the lesson */
  subtitle?: string;
  /** Duration label for the lesson (e.g. "5 min") */
  duration: string;
  /** Completion progress percentage (0–100) */
  progress?: number;
  /** Icon displayed in the lesson avatar */
  icon?: React.ReactNode;
  /** Whether the lesson is locked and inaccessible */
  locked?: boolean;
  /** Whether the lesson has been completed */
  completed?: boolean;
  /** Whether this is the currently active lesson */
  current?: boolean;
  /** Numeric lesson number displayed in the avatar */
  lessonNumber?: number;
  /** Callback invoked when the lesson card is pressed */
  onPress?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

function LessonCardBase({
  title,
  subtitle,
  duration,
  progress,
  icon,
  locked = false,
  completed = false,
  current = false,
  lessonNumber,
  onPress,
  style,
}: LessonCardProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={locked || !onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          backgroundColor: current ? t.primarySoft : t.card,
          borderRadius: Radius.xl,
          padding: 14,
          borderWidth: current ? 2 : 1,
          borderColor: current ? t.primary : t.border,
          opacity: locked ? 0.5 : 1,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: Radius.xl,
          backgroundColor: completed
            ? t.successSoft
            : current
              ? t.primary
              : t.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {locked ? (
          <Lock size={18} color={t.textSecondary} />
        ) : completed ? (
          <CheckCircle size={18} color={t.success} />
        ) : lessonNumber ? (
          <Text
            style={{
              fontSize: FontSize.lg.fontSize,
              fontWeight: '800',
              color: current ? t.primaryForeground : t.textSecondary,
            }}>
            {lessonNumber}
          </Text>
        ) : (
          icon ?? <BookOpen size={FontSize.xl.fontSize} color={t.textSecondary} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{title}</Text>
        {subtitle && (
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 1 }}>{subtitle}</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Clock size={FontSize.xs.fontSize} color={t.textTertiary} />
            <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary }}>{duration}</Text>
          </View>
          {progress != null && progress > 0 && progress < 100 && (
            <View style={{ flex: 1, maxWidth: 80 }}>
              <View
                style={{
                  height: 4,
                  borderRadius: Radius.full,
                  backgroundColor: t.surface,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    borderRadius: Radius.full,
                    backgroundColor: t.primary,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      {!locked && (
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textTertiary }}>›</Text>
      )}
    </Pressable>
  );
}

export const LessonCard = React.memo(LessonCardBase);
