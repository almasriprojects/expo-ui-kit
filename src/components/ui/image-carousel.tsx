import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewProps,
} from 'react-native';
import { Image } from 'expo-image';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ImageCarouselProps = ViewProps & {
  images: string[];
  height?: number;
  showDots?: boolean;
  borderRadius?: number;
};

export function ImageCarousel({
  images,
  height = 240,
  showDots = true,
  borderRadius = Radius.xl,
  style,
  ...props
}: ImageCarouselProps) {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth - 40;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
    setActiveIndex(index);
  };

  return (
    <View
      style={[{ borderRadius, overflow: 'hidden' }, style]}
      {...props}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, height, backgroundColor: theme.cardPressed }}>
            <Image
              source={item}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>
        )}
      />
      {showDots && images.length > 1 && (
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
          {images.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: Radius.xs,
                backgroundColor: i === activeIndex ? theme.primaryForeground : theme.surfaceActive,
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
