import { PropsWithChildren, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTheme();
  const rotation = useSharedValue(0);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const toggle = () => {
    setIsOpen((prev) => {
      rotation.value = withTiming(!prev ? 180 : 0, { duration: 250 });
      return !prev;
    });
  };

  return (
    <View>
      <Pressable
        onPress={toggle}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 8,
        }}>
        <Animated.View
          style={[
            {
              width: 24,
              height: 24,
              borderRadius: Radius.full,
              backgroundColor: t.surface,
              justifyContent: 'center',
              alignItems: 'center',
            },
            chevronStyle,
          ]}>
          <Text style={{ fontSize: 12, color: t.textSecondary }}>▾</Text>
        </Animated.View>
        <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>
          {title}
        </Text>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <View
            style={{
              marginTop: 8,
              marginLeft: 34,
              padding: 16,
              borderRadius: Radius.lg,
              backgroundColor: t.card,
              borderWidth: 1,
              borderColor: t.border,
              ...Shadows.sm,
            }}>
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
