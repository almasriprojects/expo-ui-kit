import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SwitchProps = ViewProps & {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
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
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }} {...props}>
      <Pressable
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
        <ThemedText style={{ fontSize: 15, fontWeight: '500', color: t.text, opacity: disabled ? 0.5 : 1 }}>
          {label}
        </ThemedText>
      )}
    </View>
  );
}
