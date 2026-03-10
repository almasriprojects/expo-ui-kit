import React, { useCallback, useEffect } from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ImageViewerProps = {
  visible: boolean;
  onClose: () => void;
  uri: string;
  caption?: string;
};

const SPRING_CONFIG = { damping: 20, stiffness: 300 };
const DISMISS_THRESHOLD = 80;
const ZOOM_2X = 2;

export function ImageViewer({
  visible,
  onClose,
  uri,
  caption,
}: ImageViewerProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      scale.value = 1;
      savedScale.value = 1;
      translateX.value = 0;
      translateY.value = 0;
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    }
  }, [visible, scale, savedScale, translateX, translateY, savedTranslateX, savedTranslateY]);

  const toggleZoom = useCallback(() => {
    if (scale.value < 1.5) {
      scale.value = withSpring(ZOOM_2X, SPRING_CONFIG);
      savedScale.value = ZOOM_2X;
    } else {
      scale.value = withSpring(1, SPRING_CONFIG);
      savedScale.value = 1;
      translateX.value = withSpring(0, SPRING_CONFIG);
      translateY.value = withSpring(0, SPRING_CONFIG);
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    }
  }, [scale, savedScale, translateX, translateY, savedTranslateX, savedTranslateY]);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1, SPRING_CONFIG);
        savedScale.value = 1;
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        savedScale.value = scale.value;
      }
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      } else if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (scale.value <= 1 && translateY.value > DISMISS_THRESHOLD) {
        runOnJS(handleClose)();
      } else if (scale.value <= 1) {
        translateY.value = withSpring(0, SPRING_CONFIG);
      } else {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(toggleZoom)();
    });

  const composed = Gesture.Simultaneous(
    pinchGesture,
    Gesture.Race(panGesture, doubleTapGesture),
  );

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      accessibilityViewIsModal
      accessibilityLabel="Image viewer">
      <GestureDetector gesture={composed}>
        <View
          style={{
            flex: 1,
            backgroundColor: t.overlayDark,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={[
              {
                width: screenWidth,
                height: screenHeight,
                justifyContent: 'center',
                alignItems: 'center',
              },
              imageAnimatedStyle,
            ]}>
            <Image
              source={{ uri }}
              style={{ width: screenWidth, height: screenHeight }}
              contentFit="contain"
            />
          </Animated.View>

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              paddingTop: insets.top + 8,
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Pressable
              onPress={handleClose}
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
              accessibilityLabel="Close image viewer">
              <Text style={{ fontSize: 20, color: t.text, fontWeight: '600' }}>
                ×
              </Text>
            </Pressable>
          </View>

          {caption && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 24,
                paddingBottom: Math.max(insets.bottom, 24),
                paddingTop: 16,
                backgroundColor: 'transparent',
              }}>
              <ThemedText
                style={{
                  fontSize: 14,
                  color: t.textOnColorSecondary,
                  textAlign: 'center',
                }}>
                {caption}
              </ThemedText>
            </View>
          )}
        </View>
      </GestureDetector>
    </Modal>
  );
}
