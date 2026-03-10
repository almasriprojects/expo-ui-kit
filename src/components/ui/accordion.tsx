import React, { useState } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AccordionItem = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = ViewProps & {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const t = useTheme();
  const rotation = useSharedValue(isOpen ? 1 : 0);

  React.useEffect(() => {
    rotation.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
  }, [isOpen, rotation]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  return (
    <View
      style={{
        backgroundColor: t.card,
        borderRadius: Radius.xl,
        borderWidth: 1,
        borderColor: t.border,
        overflow: 'hidden',
        ...Shadows.sm,
      }}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        accessibilityState={{ expanded: isOpen }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 15,
            fontWeight: '600',
            color: t.text,
          }}>
          {item.title}
        </Text>
        <Animated.View style={chevronStyle}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: t.textSecondary,
            }}>
            ▾
          </Text>
        </Animated.View>
      </Pressable>

      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}>
          <View
            style={{
              height: 1,
              backgroundColor: t.border,
              marginHorizontal: 20,
            }}
          />
          <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
            {typeof item.content === 'string' ? (
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 22,
                  color: t.textSecondary,
                }}>
                {item.content}
              </Text>
            ) : (
              item.content
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

export function Accordion({
  items,
  allowMultiple = false,
  style,
  ...props
}: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <View
      style={[{ gap: 10 }, typeof style === 'object' ? style : undefined]}
      {...props}>
      {items.map((item) => (
        <AccordionRow
          key={item.key}
          item={item}
          isOpen={openKeys.has(item.key)}
          onToggle={() => toggle(item.key)}
        />
      ))}
    </View>
  );
}
