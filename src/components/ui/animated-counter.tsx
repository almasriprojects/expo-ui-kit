import React, { useEffect } from 'react';
import { Text, View, type TextStyle, type ViewStyle } from 'react-native';
import {
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

export type AnimatedCounterProps = {
  /** Target numeric value to animate to */
  value: number;
  /** Text displayed before the number */
  prefix?: string;
  /** Text displayed after the number */
  suffix?: string;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Number of decimal places to display */
  decimals?: number;
  /** Custom styles for the number text */
  textStyle?: TextStyle;
  /** Custom styles for the outer container */
  style?: ViewStyle;
};

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 800,
  decimals = 0,
  textStyle,
  style,
}: AnimatedCounterProps) {
  const t = useTheme();
  const animatedValue = useSharedValue(0);
  const [displayValue, setDisplayValue] = React.useState('0');

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration });
  }, [value, duration, animatedValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = animatedValue.value;
      setDisplayValue(current.toFixed(decimals));
    }, 16);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayValue(value.toFixed(decimals));
    }, duration + 50);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [value, duration, decimals, animatedValue]);

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'baseline' }, style]}>
      {prefix ? (
        <Text
          style={[
            { fontSize: FontSize.xl.fontSize, fontWeight: '600', color: t.textSecondary },
            textStyle,
          ]}>
          {prefix}
        </Text>
      ) : null}
      <Text
        style={[
          { fontSize: FontSize['3xl'].fontSize, fontWeight: '800', color: t.text, fontVariant: ['tabular-nums'] },
          textStyle,
        ]}>
        {displayValue}
      </Text>
      {suffix ? (
        <Text
          style={[
            { fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.textSecondary, marginLeft: 2 },
            textStyle,
          ]}>
          {suffix}
        </Text>
      ) : null}
    </View>
  );
}
