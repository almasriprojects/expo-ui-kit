import React, { useState } from 'react';
import { Dimensions, Text, View, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SwipeCardItem = {
  id: string;
  content: React.ReactNode;
};

type SwipeCardsProps = {
  items: SwipeCardItem[];
  onSwipeLeft?: (item: SwipeCardItem) => void;
  onSwipeRight?: (item: SwipeCardItem) => void;
  style?: ViewStyle;
};

const SWIPE_THRESHOLD = 100;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function SwipeCards({ items, onSwipeLeft, onSwipeRight, style }: SwipeCardsProps) {
  const t = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    const item = items[currentIndex];
    if (!item) return;
    if (direction === 'left') onSwipeLeft?.(item);
    else onSwipeRight?.(item);
    setCurrentIndex((prev) => prev + 1);
  };

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      rotate.value = (e.translationX / SCREEN_WIDTH) * 15;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > SWIPE_THRESHOLD) {
        const dir = e.translationX > 0 ? 'right' : 'left';
        translateX.value = withTiming(e.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH, { duration: 250 });
        rotate.value = withTiming(e.translationX > 0 ? 30 : -30, { duration: 250 });
        runOnJS(handleSwipe)(dir);
        setTimeout(() => {
          translateX.value = 0;
          rotate.value = 0;
        }, 300);
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  if (currentIndex >= items.length) {
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'center', height: 300 }, style]}>
        <Text style={{ fontSize: 32, marginBottom: 12 }}>🎉</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', color: t.text }}>All done!</Text>
        <Text style={{ fontSize: 14, color: t.textSecondary, marginTop: 4 }}>No more cards to show</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <View style={[{ height: 320, alignItems: 'center', justifyContent: 'center' }, style]}>
        {/* Background card */}
        {currentIndex + 1 < items.length && (
          <View
            style={{
              position: 'absolute',
              width: '92%',
              height: '92%',
              borderRadius: Radius.xl,
              backgroundColor: t.surface,
              ...Shadows.sm,
            }}
          />
        )}
        {/* Top card */}
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                width: '100%',
                height: '100%',
                borderRadius: Radius.xl,
                backgroundColor: t.card,
                borderWidth: 1,
                borderColor: t.border,
                overflow: 'hidden',
                ...Shadows.lg,
              },
              animatedStyle,
            ]}>
            {items[currentIndex].content}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
