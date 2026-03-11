import React from 'react';
import { Dimensions, Pressable, View, type ViewStyle } from 'react-native';
import { Maximize, X } from 'lucide-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PipPlayerProps = {
  /** Content to render inside the PiP window */
  children: React.ReactNode;
  /** Whether the PiP window is visible */
  visible: boolean;
  /** Callback to close the PiP window */
  onClose: () => void;
  /** Callback to expand to full screen */
  onExpand?: () => void;
  /** Initial corner position */
  initialPosition?: 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft';
  /** Width of the PiP window */
  width?: number;
  /** Height of the PiP window */
  height?: number;
  /** Optional style */
  style?: ViewStyle;
};

const SPRING_CONFIG = { damping: 20, stiffness: 200 };
const EDGE_PADDING = 16;

function getInitialOffset(
  position: NonNullable<PipPlayerProps['initialPosition']>,
  pipWidth: number,
  pipHeight: number,
) {
  const { width: screenW, height: screenH } = Dimensions.get('window');
  const positions = {
    topLeft: { x: EDGE_PADDING, y: EDGE_PADDING + 60 },
    topRight: { x: screenW - pipWidth - EDGE_PADDING, y: EDGE_PADDING + 60 },
    bottomLeft: { x: EDGE_PADDING, y: screenH - pipHeight - EDGE_PADDING - 80 },
    bottomRight: { x: screenW - pipWidth - EDGE_PADDING, y: screenH - pipHeight - EDGE_PADDING - 80 },
  };
  return positions[position];
}

export function PipPlayer({
  children,
  visible,
  onClose,
  onExpand,
  initialPosition = 'bottomRight',
  width = 180,
  height = 120,
  style,
}: PipPlayerProps) {
  const t = useTheme();

  const initial = getInitialOffset(initialPosition, width, height);
  const translateX = useSharedValue(initial.x);
  const translateY = useSharedValue(initial.y);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = contextX.value + e.translationX;
      translateY.value = contextY.value + e.translationY;
    })
    .onEnd(() => {
      const { width: screenW, height: screenH } = Dimensions.get('window');
      translateX.value = withSpring(
        Math.min(Math.max(EDGE_PADDING, translateX.value), screenW - width - EDGE_PADDING),
        SPRING_CONFIG,
      );
      translateY.value = withSpring(
        Math.min(Math.max(EDGE_PADDING, translateY.value), screenH - height - EDGE_PADDING),
        SPRING_CONFIG,
      );
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  if (!visible) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 1000,
            width,
            height,
            borderRadius: Radius.lg,
            overflow: 'hidden',
            backgroundColor: t.card,
            borderWidth: 1,
            borderColor: t.border,
            ...Shadows.xl,
          },
          animatedStyle,
          style,
        ]}
        accessibilityRole="none"
        accessibilityLabel="Picture in picture player">
        <View style={{ flex: 1 }}>{children}</View>

        <View
          style={{
            position: 'absolute',
            top: Spacing[1],
            right: Spacing[1],
            flexDirection: 'row',
            gap: Spacing[1],
          }}>
          {onExpand && (
            <Pressable
              onPress={onExpand}
              style={({ pressed }) => ({
                width: 28,
                height: 28,
                borderRadius: Radius.sm,
                backgroundColor: t.overlay,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.7 : 1,
              })}
              accessibilityRole="button"
              accessibilityLabel="Expand">
              <Maximize size={14} color={t.textOnColor} />
            </Pressable>
          )}
          <Pressable
            onPress={onClose}
            style={({ pressed }) => ({
              width: 28,
              height: 28,
              borderRadius: Radius.sm,
              backgroundColor: t.overlay,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
            accessibilityRole="button"
            accessibilityLabel="Close">
            <X size={14} color={t.textOnColor} />
          </Pressable>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
