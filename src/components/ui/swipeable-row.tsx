import React, { type ReactNode, useRef } from 'react';
import { Animated, Pressable, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type SwipeAction = {
  label: string;
  color: string;
  onPress: () => void;
  icon?: string;
};

type SwipeableRowProps = ViewProps & {
  children: ReactNode;
  rightActions?: SwipeAction[];
  leftActions?: SwipeAction[];
};

export function SwipeableRow({
  children,
  rightActions = [],
  leftActions = [],
  ...props
}: SwipeableRowProps) {
  const theme = useTheme();
  const pan = useRef(new Animated.Value(0)).current;
  const startX = useRef(0);

  const rightWidth = rightActions.length * 72;
  const leftWidth = leftActions.length * 72;

  const onTouchStart = (e: { nativeEvent: { pageX: number } }) => {
    startX.current = e.nativeEvent.pageX;
  };

  const onTouchMove = (e: { nativeEvent: { pageX: number } }) => {
    const dx = e.nativeEvent.pageX - startX.current;
    const clamped = Math.max(-rightWidth, Math.min(leftWidth, dx));
    pan.setValue(clamped);
  };

  const onTouchEnd = () => {
    const toValue = 0;
    Animated.spring(pan, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 10,
    }).start();
  };

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
      {actions.map((action, i) => (
        <Pressable
          key={i}
          onPress={() => {
            action.onPress();
            Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
          }}
          style={{
            width: 72,
            backgroundColor: action.color,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {action.icon && (
            <ThemedText style={{ fontSize: 18, color: theme.primaryForeground, marginBottom: 2 }}>
              {action.icon}
            </ThemedText>
          )}
          <ThemedText style={{ color: theme.primaryForeground, fontSize: 11, fontWeight: '600' }}>
            {action.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={{ overflow: 'hidden' }} {...props}>
      {leftActions.length > 0 && renderActions(leftActions, 'left')}
      {rightActions.length > 0 && renderActions(rightActions, 'right')}
      <Animated.View
        style={{ transform: [{ translateX: pan }] }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        {children}
      </Animated.View>
    </View>
  );
}
