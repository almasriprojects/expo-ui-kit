import React, { type ReactNode } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

export type SwipeAction = {
  /** Label text displayed on the action button */
  label: string;
  /** Background color of the action button */
  color: string;
  /** Callback invoked when the action is pressed */
  onPress: () => void;
  /** Icon component rendered inside the action button */
  icon?: React.ComponentType<{ size?: number; color?: string }>;
};

export type SwipeableRowProps = ViewProps & {
  /** Content rendered in the swipeable row */
  children: ReactNode;
  /** Actions revealed when swiping from right to left */
  rightActions?: SwipeAction[];
  /** Actions revealed when swiping from left to right */
  leftActions?: SwipeAction[];
};

const ACTION_WIDTH = 72;
const SPRING_CONFIG = { damping: 20, stiffness: 200 };

export function SwipeableRow({
  children,
  rightActions = [],
  leftActions = [],
  ...props
}: SwipeableRowProps) {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const rightWidth = rightActions.length * ACTION_WIDTH;
  const leftWidth = leftActions.length * ACTION_WIDTH;

  const resetPosition = () => {
    'worklet';
    translateX.value = withSpring(0, SPRING_CONFIG);
  };

  const handleActionPress = (onPress: () => void) => {
    translateX.value = withSpring(0, SPRING_CONFIG);
    onPress();
  };

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      const next = startX.value + e.translationX;
      translateX.value = Math.max(-rightWidth, Math.min(leftWidth, next));
    })
    .onEnd((e) => {
      const threshold = ACTION_WIDTH / 2;
      if (translateX.value < -threshold && rightWidth > 0) {
        translateX.value = withSpring(-rightWidth, SPRING_CONFIG);
      } else if (translateX.value > threshold && leftWidth > 0) {
        translateX.value = withSpring(leftWidth, SPRING_CONFIG);
      } else {
        resetPosition();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderActions = (actions: SwipeAction[], side: 'left' | 'right') => (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side]: 0,
        flexDirection: 'row',
        alignItems: 'stretch',
      }}>
      {actions.map((action, i) => {
        const ActionIcon = action.icon;
        return (
          <Pressable
            key={i}
            onPress={() => handleActionPress(action.onPress)}
            style={{
              width: ACTION_WIDTH,
              backgroundColor: action.color,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {ActionIcon && (
              <View style={{ marginBottom: 2 }}>
                <ActionIcon size={18} color={theme.primaryForeground} />
              </View>
            )}
            <ThemedText style={{ color: theme.primaryForeground, fontSize: FontSize.xs.fontSize, fontWeight: '600' }}>
              {action.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View style={{ overflow: 'hidden' }} {...props}>
      {leftActions.length > 0 && renderActions(leftActions, 'left')}
      {rightActions.length > 0 && renderActions(rightActions, 'right')}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
