import React, { useRef, useState } from 'react';
import {
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SwipeableTab = {
  /** Unique key identifier for the tab */
  key: string;
  /** Title displayed in the tab bar */
  title: string;
  /** Content rendered when the tab is active */
  content: React.ReactNode;
};

export type SwipeableTabViewProps = {
  /** Array of tab definitions with content */
  tabs: SwipeableTab[];
  /** Key of the tab to display initially */
  initialTab?: string;
  /** Accessibility label for the tab view container */
  accessibilityLabel?: string;
  /** Accessibility hint for the tab view container */
  accessibilityHint?: string;
};

const SPRING_CONFIG = { damping: 22, stiffness: 200 };

export function SwipeableTabView({
  tabs,
  initialTab,
  accessibilityLabel,
  accessibilityHint,
}: SwipeableTabViewProps) {
  const t = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = tabs.findIndex((tab) => tab.key === initialTab);
    return idx >= 0 ? idx : 0;
  });
  const indicatorTranslate = useSharedValue(activeIndex * (width / tabs.length));

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== activeIndex && index >= 0 && index < tabs.length) {
      setActiveIndex(index);
      indicatorTranslate.value = withSpring(index * (width / tabs.length), SPRING_CONFIG);
    }
  };

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    indicatorTranslate.value = withSpring(index * (width / tabs.length), SPRING_CONFIG);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorTranslate.value }],
  }));

  if (tabs.length === 0) return null;

  const tabWidth = width / tabs.length;

  return (
    <View style={{ flex: 1 }} accessible accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: t.surface,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
        }}
        accessibilityRole="tablist"
      >
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.key}
            onPress={() => handleTabPress(index)}
            style={{
              flex: 1,
              paddingVertical: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityRole="tab"
            accessibilityLabel={tab.title}
            accessibilityState={{ selected: index === activeIndex }}
          >
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
                fontWeight: index === activeIndex ? '600' : '500',
                color: index === activeIndex ? t.primary : t.textSecondary,
              }}
            >
              {tab.title}
            </Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: tabWidth,
              height: 3,
              backgroundColor: t.primary,
              borderRadius: Radius.full,
            },
            indicatorStyle,
          ]}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const index = Math.round(x / width);
          indicatorTranslate.value = withSpring(index * tabWidth, SPRING_CONFIG);
        }}
        style={{ flex: 1 }}
      >
        {tabs.map((tab) => (
          <View key={tab.key} style={{ width, flex: 1 }}>
            {tab.content}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
