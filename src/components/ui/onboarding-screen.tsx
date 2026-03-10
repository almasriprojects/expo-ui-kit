import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type OnboardingSlide = {
  icon: string;
  title: string;
  description: string;
};

type OnboardingScreenProps = {
  slides: OnboardingSlide[];
  onComplete: () => void;
  onSkip?: () => void;
  completeLabel?: string;
  style?: ViewStyle;
};

export function OnboardingScreen({
  slides,
  onComplete,
  onSkip,
  completeLabel = 'Get Started',
  style,
}: OnboardingScreenProps) {
  const t = useTheme();
  const [current, setCurrent] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width } = Dimensions.get('window');
  const isLast = current === slides.length - 1;

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      flatListRef.current?.scrollToIndex({ index: current + 1, animated: true });
    }
  };

  return (
    <View style={[{ flex: 1, backgroundColor: t.background }, style]}>
      {onSkip && !isLast && (
        <Pressable
          onPress={onSkip}
          style={{ position: 'absolute', top: 16, right: 20, zIndex: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: t.textSecondary }}>Skip</Text>
        </Pressable>
      )}

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setCurrent(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 40,
            }}>
            <Text style={{ fontSize: 72, marginBottom: 32 }}>{item.icon}</Text>
            <Text
              style={{
                fontSize: 26,
                fontWeight: '800',
                color: t.text,
                textAlign: 'center',
                marginBottom: 12,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: t.textSecondary,
                textAlign: 'center',
                lineHeight: 22,
              }}>
              {item.description}
            </Text>
          </View>
        )}
      />

      <View style={{ paddingHorizontal: 24, paddingBottom: 32, gap: 20 }}>
        {/* Dots */}
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
            />
          ))}
        </View>

        {/* Button */}
        <Pressable
          onPress={goNext}
          style={{
            paddingVertical: 16,
            borderRadius: Radius.xl,
            backgroundColor: t.primary,
            alignItems: 'center',
            ...Shadows.md,
          }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: t.primaryForeground }}>
            {isLast ? completeLabel : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
