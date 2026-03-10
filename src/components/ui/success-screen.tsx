import React, { type ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { CheckCircle } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { Button } from './button';
import { ThemedText } from '@/components/themed-text';

export type SuccessScreenProps = {
  title?: string;
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
  icon?: ReactNode;
};

export function SuccessScreen({
  title = 'Success!',
  message,
  onAction,
  actionLabel = 'Continue',
  icon,
}: SuccessScreenProps) {
  const t = useTheme();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.2, { damping: 12, stiffness: 80 }),
      withSpring(1, { damping: 15, stiffness: 120 }),
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        backgroundColor: t.background,
      }}
      accessibilityLabel={title}
      accessibilityRole="summary">
      <Animated.View
        style={[
          {
            width: 80,
            height: 80,
            borderRadius: Radius.full,
            backgroundColor: t.successSoft,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          },
          animatedStyle,
        ]}>
        {icon ?? <CheckCircle size={40} color={t.success} />}
      </Animated.View>
      <ThemedText
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: t.text,
          textAlign: 'center',
          marginBottom: 12,
        }}>
        {title}
      </ThemedText>
      {message && (
        <ThemedText
          style={{
            fontSize: 16,
            color: t.textSecondary,
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: 32,
          }}>
          {message}
        </ThemedText>
      )}
      {onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          accessibilityLabel={actionLabel}
        />
      )}
    </View>
  );
}
