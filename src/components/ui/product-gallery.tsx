import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  View,
  type ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { X } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ProductGalleryImage = {
  uri: string;
  alt?: string;
};

export type ProductGalleryProps = {
  images: ProductGalleryImage[];
  height?: number;
  style?: ViewStyle;
};

export function ProductGallery({
  images,
  height = 320,
  style,
}: ProductGalleryProps) {
  const t = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const currentImage = images[selectedIndex];

  const openFullscreen = () => {
    if (images.length > 0) setFullscreenVisible(true);
  };

  const closeFullscreen = () => setFullscreenVisible(false);

  if (images.length === 0) return null;

  return (
    <View style={[{ gap: 12 }, style]}>
      <Pressable
        onPress={openFullscreen}
        style={{
          width: '100%',
          height,
          backgroundColor: t.cardPressed,
          borderRadius: Radius.xl,
          overflow: 'hidden',
        }}
        accessibilityRole="imagebutton"
        accessibilityLabel={currentImage?.alt ?? `Product image ${selectedIndex + 1} of ${images.length}`}
        accessibilityHint="Double tap to view fullscreen">
        <Image
          source={{ uri: currentImage.uri }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          accessibilityLabel={currentImage?.alt}
        />
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}
        style={{ flexGrow: 0 }}>
        {images.map((img, i) => (
          <Pressable
            key={i}
            onPress={() => setSelectedIndex(i)}
            style={{
              width: 64,
              height: 64,
              borderRadius: Radius.md,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: i === selectedIndex ? t.primary : t.border,
              backgroundColor: t.cardPressed,
            }}
            accessibilityRole="button"
            accessibilityLabel={`Select image ${i + 1}`}
            accessibilityState={{ selected: i === selectedIndex }}>
            <Image
              source={{ uri: img.uri }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </Pressable>
        ))}
      </ScrollView>

      {images.length > 1 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 6,
          }}
          accessibilityLiveRegion="polite"
          accessibilityLabel={`Image ${selectedIndex + 1} of ${images.length}`}>
          {images.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === selectedIndex ? 20 : 6,
                height: 6,
                borderRadius: Radius.xs,
                backgroundColor: i === selectedIndex ? t.primary : t.surfaceActive,
              }}
            />
          ))}
        </View>
      )}

      <Modal
        visible={fullscreenVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        accessibilityViewIsModal
        accessibilityLabel="Fullscreen product image">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: t.overlayDark,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={closeFullscreen}
          accessibilityRole="button"
          accessibilityLabel="Close fullscreen">
          <Image
            source={{ uri: currentImage?.uri }}
            style={{ width: screenWidth, height: '100%' }}
            contentFit="contain"
          />
          <View
            style={{
              position: 'absolute',
              top: 48,
              right: 16,
            }}>
            <Pressable
              onPress={closeFullscreen}
              hitSlop={12}
              style={{
                width: 40,
                height: 40,
                borderRadius: Radius.full,
                backgroundColor: t.surfaceOverlay,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              accessibilityRole="button"
              accessibilityLabel="Close">
              <X size={20} color={t.text} />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
