import React, { type ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TooltipProps = {
  content: string;
  children: ReactNode;
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
          style={{
            position: 'absolute',
            zIndex: 50,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: Radius.md,
            backgroundColor: t.text,
            alignSelf: 'center',
            ...(position === 'top' ? { bottom: '100%', marginBottom: 8 } : { top: '100%', marginTop: 8 }),
            ...Shadows.md,
          }}>
          <ThemedText
            style={{
              fontSize: 12,
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
