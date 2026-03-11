import React, { type ReactNode } from 'react';
import { Image, type ImageSourcePropType, ScrollView, Text, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export type ParallaxScrollViewProps = {
  /** Image source URI or custom React node for the header */
  headerImage: { uri: string } | React.ReactNode;
  /** Height of the parallax header area in pixels */
  headerHeight?: number;
  /** Content rendered below the parallax header */
  children: ReactNode;
  /** Title text overlaid on the header image */
  title?: string;
  /** Accessibility label for the scroll view container */
  accessibilityLabel?: string;
  /** Accessibility hint for the scroll view container */
  accessibilityHint?: string;
};

const DEFAULT_HEADER_HEIGHT = 220;

export function ParallaxScrollView({
  headerImage,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  children,
  title,
  accessibilityLabel,
  accessibilityHint,
}: ParallaxScrollViewProps) {
  const t = useTheme();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const headerImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-headerHeight, 0],
      [1.5, 1],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [-headerHeight, 0, headerHeight],
      [headerHeight / 2, 0, -headerHeight / 2],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, headerHeight * 0.6],
      [1, 0.3],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }, { translateY }],
      opacity,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [headerHeight * 0.3, headerHeight * 0.6],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const isImageSource =
    typeof headerImage === 'object' &&
    headerImage !== null &&
    'uri' in headerImage &&
    typeof (headerImage as { uri: string }).uri === 'string';

  return (
    <View style={{ flex: 1 }} accessible accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint}>
      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: headerHeight, overflow: 'hidden' }}>
          {isImageSource ? (
            <AnimatedImage
              source={headerImage as ImageSourcePropType}
              style={[
                {
                  width: '100%',
                  height: headerHeight,
                  backgroundColor: t.surface,
                },
                headerImageStyle,
              ]}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
          ) : (
            <Animated.View
              style={[
                {
                  width: '100%',
                  height: headerHeight,
                  backgroundColor: t.surface,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                headerImageStyle,
              ]}
            >
              {headerImage as ReactNode}
            </Animated.View>
          )}
          {title && (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  backgroundColor: 'transparent',
                },
                titleStyle,
              ]}
            >
              <Text
                style={{
                  fontSize: FontSize['2xl'].fontSize,
                  fontWeight: '700',
                  color: t.text,
                  textShadowColor: t.overlay,
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 4,
                }}
              >
                {title}
              </Text>
            </Animated.View>
          )}
        </View>
        <View style={{ backgroundColor: t.background, padding: 20 }}>
          {children}
        </View>
      </AnimatedScrollView>
    </View>
  );
}
