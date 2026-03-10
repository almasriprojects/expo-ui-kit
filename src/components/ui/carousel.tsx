import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CarouselProps = {
  data: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  onIndexChange?: (index: number) => void;
  height?: number;
};

export function Carousel({
  data,
  autoPlay = false,
  autoPlayInterval = 4000,
  showDots = true,
  onIndexChange,
  height = 200,
}: CarouselProps) {
  const t = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTouchingRef = useRef(false);
  const { width: screenWidth } = Dimensions.get('window');

  activeIndexRef.current = activeIndex;

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= data.length) return;
      scrollRef.current?.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
      setActiveIndex(index);
      onIndexChange?.(index);
    },
    [data.length, screenWidth, onIndexChange]
  );

  const startAutoPlay = useCallback(() => {
    if (!autoPlay || data.length <= 1) return;
    timerRef.current = setInterval(() => {
      if (isTouchingRef.current) return;
      const next = (activeIndexRef.current + 1) % data.length;
      goToIndex(next);
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, data.length, goToIndex]);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [autoPlay, startAutoPlay, stopAutoPlay]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    if (index !== activeIndex && index >= 0 && index < data.length) {
      setActiveIndex(index);
      onIndexChange?.(index);
    }
  };

  const handleTouchStart = () => {
    isTouchingRef.current = true;
    if (autoPlay) stopAutoPlay();
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    if (autoPlay) startAutoPlay();
  };

  if (data.length === 0) return null;

  return (
    <View
      style={{ height }}
      accessibilityRole="adjustable"
      accessibilityLabel="Image carousel">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScrollBeginDrag={handleTouchStart}
        onScrollEndDrag={handleTouchEnd}
        decelerationRate="fast"
        bounces={false}>
        {data.map((item, i) => (
          <View
            key={i}
            style={{
              width: screenWidth,
              height,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item}
          </View>
        ))}
      </ScrollView>

      {showDots && data.length > 1 && (
        <View
          style={{
            position: 'absolute',
            bottom: 12,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 6,
          }}>
          {data.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => goToIndex(i)}
              style={{
                width: i === activeIndex ? 20 : 8,
                height: 8,
                borderRadius: Radius.full,
                backgroundColor: i === activeIndex ? t.primary : t.border,
              }}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${i + 1} of ${data.length}`}
              accessibilityState={{ selected: i === activeIndex }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
