import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { CheckCircle, Lock } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type LessonCardProps = {
  title: string;
  subtitle?: string;
  duration: string;
  progress?: number;
  icon?: string;
  locked?: boolean;
  completed?: boolean;
  current?: boolean;
  lessonNumber?: number;
  onPress?: () => void;
  style?: ViewStyle;
};

export function LessonCard({
  title,
  subtitle,
  duration,
  progress,
  icon = '📖',
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
              fontSize: 16,
              fontWeight: '800',
              color: current ? t.primaryForeground : t.textSecondary,
            }}>
            {lessonNumber}
          </Text>
        ) : (
          <Text style={{ fontSize: 18 }}>{icon}</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{title}</Text>
        {subtitle && (
          <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 1 }}>{subtitle}</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <Text style={{ fontSize: 11, color: t.textTertiary }}>🕐 {duration}</Text>
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
        <Text style={{ fontSize: 14, color: t.textTertiary }}>›</Text>
      )}
    </Pressable>
  );
}
