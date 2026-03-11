import React, { type ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TooltipProps = {
  /** Text content displayed inside the tooltip */
  content: string;
  /** Element that triggers the tooltip on press */
  children: ReactNode;
  /** Position of the tooltip relative to the trigger */
  position?: 'top' | 'bottom';
};

export function Tooltip({
  content,
  children,
  position = 'top',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const t = useTheme();

  return (
    <View style={{ position: 'relative' }}>
      <Pressable
        onLongPress={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
        onPress={() => setVisible((v) => !v)}>
        {children}
      </Pressable>
      {visible && (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}
          accessibilityRole="text"
          accessibilityLabel={content}
          style={{
            position: 'absolute',
            zIndex: 50,
            paddingHorizontal: Spacing[3],
            paddingVertical: Spacing[2],
            borderRadius: Radius.md,
            backgroundColor: t.text,
            alignSelf: 'center',
            ...(position === 'top' ? { bottom: '100%', marginBottom: Spacing[2] } : { top: '100%', marginTop: Spacing[2] }),
            ...Shadows.md,
          }}>
          <ThemedText
            style={{
              fontSize: FontSize.sm.fontSize,
              color: t.textInverse,
              textAlign: 'center',
            }}>
            {content}
          </ThemedText>
        </Animated.View>
      )}
    </View>
  );
}
