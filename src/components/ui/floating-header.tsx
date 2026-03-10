import React, { type ReactNode, useCallback, useRef, useState } from 'react';
import {
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FloatingHeaderProps = {
  title: string;
  children: ReactNode;
  headerContent?: ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

const THRESHOLD = 10;
const SPRING_CONFIG = { damping: 20, stiffness: 200 };

export function FloatingHeader({
  title,
  children,
  headerContent,
  accessibilityLabel,
  accessibilityHint,
}: FloatingHeaderProps) {
  const t = useTheme();
  const scrollY = useRef(0);
  const lastScrollY = useRef(0);
  const translateY = useSharedValue(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      const diff = y - lastScrollY.current;
      lastScrollY.current = y;
      scrollY.current = y;

      if (Math.abs(diff) < THRESHOLD) return;

      if (diff > 0) {
        translateY.value = withSpring(-headerHeight, SPRING_CONFIG);
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    },
    [headerHeight, translateY]
  );

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={{ flex: 1 }} accessible accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            zIndex: 10,
            backgroundColor: t.background,
            borderBottomWidth: 1,
            borderBottomColor: t.border,
            ...Shadows.sm,
          },
          headerAnimatedStyle,
        ]}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 20,
          }}
          accessibilityRole="header"
        >
          {headerContent ?? (
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: t.text,
              }}
            >
              {title}
            </Text>
          )}
        </View>
      </Animated.View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}
