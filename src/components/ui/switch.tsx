import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SwitchProps = ViewProps & {
  /** Whether the switch is toggled on */
  value: boolean;
  /** Callback invoked when the switch value changes */
  onValueChange: (value: boolean) => void;
  /** Label text displayed beside the switch */
  label?: string;
  /** Whether the switch is disabled */
  disabled?: boolean;
};

export function Switch({
  value,
  onValueChange,
  label,
  disabled = false,
  ...props
}: SwitchProps) {
  const t = useTheme();
  const offset = useSharedValue(value ? 20 : 2);

  React.useEffect(() => {
    offset.value = withTiming(value ? 20 : 2, { duration: 200 });
  }, [value, offset]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }} {...props}>
      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={label}
        accessibilityState={{ checked: value, disabled }}
        onPress={() => !disabled && onValueChange(!value)}
        style={{
          width: 44,
          height: 24,
          borderRadius: Radius.lg,
          justifyContent: 'center',
          backgroundColor: value ? t.primary : t.switchTrackOff,
          opacity: disabled ? 0.5 : 1,
        }}>
        <Animated.View
          style={[
            thumbStyle,
            {
              width: 20,
              height: 20,
              borderRadius: Radius.full,
              backgroundColor: t.primaryForeground,
            },
          ]}
        />
      </Pressable>
      {label && (
        <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', color: t.text, opacity: disabled ? 0.5 : 1 }}>
          {label}
        </ThemedText>
      )}
    </View>
  );
}
