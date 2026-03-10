import React, { useEffect, type ReactNode } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SheetProps = {
  visible: boolean;
  onClose: () => void;
  snapPoints?: number[];
  children?: ReactNode;
  title?: string;
};

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
};

const DISMISS_THRESHOLD = 80;

export function Sheet({
  visible,
  onClose,
  snapPoints = [0.5, 0.9],
  children,
  title,
}: SheetProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');

  const sortedSnaps = [...snapPoints].sort((a, b) => a - b);
  const snapTranslateY = sortedSnaps.map((s) => screenHeight * (1 - s));

  const initialSnapY = snapTranslateY[0] ?? 0;
  const translateY = useSharedValue(initialSnapY);
  const contextY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(initialSnapY, SPRING_CONFIG);
    }
  }, [visible, initialSnapY, translateY]);

  const handleClose = () => {
    onClose();
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((e) => {
      const next = contextY.value + e.translationY;
      translateY.value = Math.max(0, next);
    })
    .onEnd((e) => {
      const current = translateY.value;
      const maxSnap = Math.max(...snapTranslateY);
      const minSnap = Math.min(...snapTranslateY);

      if (current > maxSnap + DISMISS_THRESHOLD || e.velocityY > 500) {
        translateY.value = withSpring(screenHeight, SPRING_CONFIG, () => {
          runOnJS(handleClose)();
        });
        return;
      }

      let nearest = minSnap;
      let minDist = Math.abs(current - minSnap);
      for (const snap of snapTranslateY) {
        const d = Math.abs(current - snap);
        if (d < minDist) {
          minDist = d;
          nearest = snap;
        }
      }
      translateY.value = withSpring(nearest, SPRING_CONFIG);
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      accessibilityViewIsModal
      accessibilityLabel={title ?? 'Bottom sheet'}>
      <View style={{ flex: 1 }}>
        {/* Backdrop - behind sheet, closes on tap */}
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: t.overlay,
          }}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Close sheet"
        />

        {/* Sheet - on top, draggable */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
              },
              sheetStyle,
            ]}>
            <View
              style={{
                flex: 1,
                backgroundColor: t.card,
                borderTopLeftRadius: Radius['3xl'],
                borderTopRightRadius: Radius['3xl'],
                paddingBottom: insets.bottom + 16,
                ...Shadows.xl,
              }}>
              {/* Drag handle */}
              <View
                style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 8 }}
                accessibilityRole="adjustable"
                accessibilityLabel="Drag handle to resize sheet">
                <View
                  style={{
                    width: 40,
                    height: 5,
                    borderRadius: Radius.full,
                    backgroundColor: t.surfaceActive,
                  }}
                />
              </View>

              {title && (
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    paddingHorizontal: 24,
                    paddingBottom: 20,
                    color: t.text,
                  }}>
                  {title}
                </Text>
              )}

              <ScrollView
                style={{ paddingHorizontal: 24 }}
                contentContainerStyle={{ paddingBottom: 8 }}
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled">
                {children}
              </ScrollView>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
}
