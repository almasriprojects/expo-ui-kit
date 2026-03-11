import React, { useEffect, useState } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StreamingTextProps = {
  /** Full text to reveal character by character */
  text: string;
  /** Milliseconds per character reveal */
  speed?: number;
  /** Callback when all text has been revealed */
  onComplete?: () => void;
  /** Show a blinking cursor at the end */
  cursor?: boolean;
  /** Text style override */
  style?: ViewStyle;
};

function BlinkingCursor({ color }: { color: string }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 530 }), -1, true);
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.Text style={[{ color, fontWeight: '300', ...FontSize.md }, animStyle]}>
      |
    </Animated.Text>
  );
}

export function StreamingText({
  text,
  speed = 30,
  onComplete,
  cursor = false,
  style,
}: StreamingTextProps) {
  const t = useTheme();
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setCharIndex(0);
  }, [text]);

  useEffect(() => {
    if (charIndex >= text.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, text.length, speed, onComplete]);

  const revealed = text.slice(0, charIndex);
  const isComplete = charIndex >= text.length;

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }, style]}>
      <Text style={{ color: t.text, ...FontSize.md }}>{revealed}</Text>
      {cursor && !isComplete && <BlinkingCursor color={t.textSecondary} />}
    </View>
  );
}
