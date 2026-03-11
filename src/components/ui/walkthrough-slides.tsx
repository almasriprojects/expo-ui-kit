import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type WalkthroughSlide = {
  /** Unique key identifier for the slide */
  key: string;
  /** Title text for the slide */
  title: string;
  /** Subtitle text displayed below the title */
  subtitle: string;
  /** Emoji icon displayed on the slide */
  icon: string;
};

export type WalkthroughSlidesProps = {
  /** Array of walkthrough slide data */
  slides: WalkthroughSlide[];
  /** Callback invoked when the user completes the walkthrough */
  onComplete: () => void;
  /** Callback invoked when the user skips the walkthrough */
  onSkip?: () => void;
};

export function WalkthroughSlides({
  slides,
  onComplete,
  onSkip,
}: WalkthroughSlidesProps) {
  const t = useTheme();
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');
  const isLast = current === slides.length - 1;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / width);
    setCurrent(index);
  };

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      scrollRef.current?.scrollTo({
        x: (current + 1) * width,
        animated: true,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.background }}>
      {onSkip && !isLast && (
        <Pressable
          onPress={onSkip}
          style={{ position: 'absolute', top: 16, right: 20, zIndex: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Skip walkthrough"
        >
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.textSecondary }}>
            Skip
          </Text>
        </Pressable>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        accessibilityRole="adjustable"
        accessibilityLabel={`Slide ${current + 1} of ${slides.length}`}
      >
        {slides.map((item) => (
          <View
            key={item.key}
            style={{
              width,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 40,
            }}
          >
            <Text
              style={{ fontSize: 72, marginBottom: 32 }}
              accessibilityRole="image"
              accessibilityLabel={item.title}
            >
              {item.icon}
            </Text>
            <Text
              style={{
                fontSize: 26,
                fontWeight: '800',
                color: t.text,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
                color: t.textSecondary,
                textAlign: 'center',
                lineHeight: 22,
              }}
            >
              {item.subtitle}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: 32, gap: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: Radius.full,
                backgroundColor: i === current ? t.primary : t.surfaceActive,
              }}
              accessibilityElementsHidden
            />
          ))}
        </View>

        <Pressable
          onPress={goNext}
          style={{
            paddingVertical: 16,
            borderRadius: Radius.xl,
            backgroundColor: t.primary,
            alignItems: 'center',
            ...Shadows.md,
          }}
          accessibilityRole="button"
          accessibilityLabel={isLast ? 'Get Started' : 'Next slide'}
        >
          <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.primaryForeground }}>
            {isLast ? 'Get Started' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
