import React, { useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FlashCardProps = {
  /** Text displayed on the front of the card */
  front: string;
  /** Text displayed on the back of the card */
  back: string;
  /** Category label shown above the front text */
  category?: string;
  /** Difficulty indicator dot color */
  difficulty?: 'easy' | 'medium' | 'hard';
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

export function FlashCard({
  front,
  back,
  category,
  difficulty,
  style,
}: FlashCardProps) {
  const t = useTheme();
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const handleFlip = () => {
    const target = flipped ? 0 : 1;
    rotation.value = withTiming(target, { duration: 400 });
    setFlipped(!flipped);
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const diffKeys: Record<string, 'statusDone' | 'statusMedium' | 'statusUrgent'> = {
    easy: 'statusDone',
    medium: 'statusMedium',
    hard: 'statusUrgent',
  };

  const cardStyle: ViewStyle = {
    width: '100%',
    minHeight: 200,
    borderRadius: Radius['2xl'],
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
    position: 'absolute',
  };

  return (
    <Pressable onPress={handleFlip} style={[{ minHeight: 200 }, style]}>
      <Animated.View
        style={[
          cardStyle,
          { backgroundColor: t.card, borderWidth: 1, borderColor: t.border },
          frontStyle,
        ]}>
        {category && (
          <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '600', color: t.primary, textTransform: 'uppercase', marginBottom: 12 }}>
            {category}
          </Text>
        )}
        <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', color: t.text, textAlign: 'center' }}>
          {front}
        </Text>
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary, marginTop: 16 }}>Tap to flip</Text>
        {difficulty && (
          <View
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 10,
              height: 10,
              borderRadius: Radius.full,
              backgroundColor: t[diffKeys[difficulty]],
            }}
          />
        )}
      </Animated.View>
      <Animated.View
        style={[
          cardStyle,
          { backgroundColor: t.primarySoft, borderWidth: 2, borderColor: t.primary },
          backStyle,
        ]}>
        <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '600', color: t.primary, marginBottom: 12 }}>
          ANSWER
        </Text>
        <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text, textAlign: 'center', lineHeight: 25 }}>
          {back}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
