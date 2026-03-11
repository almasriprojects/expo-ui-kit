import React, { type ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { CheckCircle } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { Button } from './button';
import { ThemedText } from '@/components/themed-text';

export type SuccessScreenProps = {
  /** Title text displayed on the success screen */
  title?: string;
  /** Descriptive message displayed below the title */
  message?: string;
  /** Callback invoked when the action button is pressed */
  onAction?: () => void;
  /** Label for the action button */
  actionLabel?: string;
  /** Custom icon element replacing the default checkmark */
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
          fontSize: FontSize['2xl'].fontSize,
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
            fontSize: FontSize.lg.fontSize,
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
