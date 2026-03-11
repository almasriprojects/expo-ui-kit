import React, { useState } from 'react';
import { TextInput, View, type TextInputProps, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FloatingLabelInputProps = Omit<TextInputProps, 'placeholder'> & {
  /** Label text that floats above the input when focused */
  label: string;
  /** Error message displayed below the input */
  error?: string;
  /** Custom styles applied to the container */
  style?: ViewStyle;
};

export function FloatingLabelInput({
  label,
  value,
  error,
  onFocus,
  onBlur,
  style,
  ...rest
}: FloatingLabelInputProps) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);
  const hasValue = !!value && value.length > 0;
  const isActive = focused || hasValue;

  const labelTop = useSharedValue(isActive ? 6 : 18);
  const labelSize = useSharedValue(isActive ? 11 : 15);

  const animate = (active: boolean) => {
    labelTop.value = withTiming(active ? 6 : 18, { duration: 150 });
    labelSize.value = withTiming(active ? 11 : 15, { duration: 150 });
  };

  const labelStyle = useAnimatedStyle(() => ({
    top: labelTop.value,
    fontSize: labelSize.value,
  }));

  const borderColor = error ? t.error : focused ? t.primary : t.border;

  return (
    <View style={style}>
      <View
        style={{
          borderWidth: 1.5,
          borderColor,
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          minHeight: 56,
          justifyContent: 'center',
        }}>
        <Animated.Text
          style={[
            {
              position: 'absolute',
              left: 14,
              color: error ? t.error : focused ? t.primary : t.textTertiary,
              fontWeight: '500',
            },
            labelStyle,
          ]}>
          {label}
        </Animated.Text>
        <TextInput
          value={value}
          onFocus={(e) => {
            setFocused(true);
            animate(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            if (!hasValue) animate(false);
            onBlur?.(e);
          }}
          style={{
            paddingHorizontal: 14,
            paddingTop: 22,
            paddingBottom: 8,
            fontSize: FontSize.md.fontSize,
            color: t.text,
          }}
          placeholderTextColor={t.textTertiary}
          {...rest}
        />
      </View>
      {error && (
        <Animated.Text style={{ fontSize: FontSize.sm.fontSize, color: t.error, marginTop: 4, marginLeft: 4 }}>
          {error}
        </Animated.Text>
      )}
    </View>
  );
}
