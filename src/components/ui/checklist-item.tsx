import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ChecklistItemProps = {
  title: string;
  subtitle?: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  priority?: 'low' | 'medium' | 'high';
  style?: ViewStyle;
};

const priorityKeys: Record<string, 'statusLow' | 'statusMedium' | 'statusHigh'> = {
  low: 'statusLow',
  medium: 'statusMedium',
  high: 'statusHigh',
};

export function ChecklistItem({
  title,
  subtitle,
  checked,
  onToggle,
  priority,
  style,
}: ChecklistItemProps) {
  const t = useTheme();

  const strikeStyle = useAnimatedStyle(() => ({
    textDecorationLine: checked ? 'line-through' : 'none',
    opacity: withTiming(checked ? 0.5 : 1, { duration: 200 }),
    color: t.text,
  }));

  return (
    <Pressable
      onPress={() => onToggle(!checked)}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingVertical: 12,
          paddingHorizontal: 4,
        },
        style,
      ]}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: Radius.md,
          borderWidth: 2,
          borderColor: checked ? t.success : t.borderStrong,
          backgroundColor: checked ? t.success : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {checked && (
          <Check size={14} color={t.textOnColor} strokeWidth={3} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Animated.Text style={[{ fontSize: 15, fontWeight: '500' }, strikeStyle]}>
          {title}
        </Animated.Text>
        {subtitle && (
          <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{subtitle}</Text>
        )}
      </View>
      {priority && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: Radius.full,
            backgroundColor: t[priorityKeys[priority]],
          }}
        />
      )}
    </Pressable>
  );
}
