import React, { useState } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Animation, Radius, Shadows, Spacing, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AccordionItem = {
  /** Unique identifier for the accordion item */
  key: string;
  /** Header title displayed in the accordion row */
  title: string;
  /** Content rendered when the accordion item is expanded */
  content: React.ReactNode;
};

export type AccordionProps = ViewProps & {
  /** List of accordion items to render */
  items: AccordionItem[];
  /** Whether multiple items can be open simultaneously */
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
    rotation.value = withTiming(isOpen ? 1 : 0, { duration: Animation.duration.normal });
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
          paddingHorizontal: Spacing[5],
          paddingVertical: Spacing[4],
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: FontSize.md.fontSize,
            fontWeight: '600',
            color: t.text,
          }}>
          {item.title}
        </Text>
        <Animated.View style={chevronStyle}>
          <Text
            style={{
              fontSize: FontSize.xl.fontSize,
              fontWeight: '600',
              color: t.textSecondary,
            }}>
            ▾
          </Text>
        </Animated.View>
      </Pressable>

      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(Animation.duration.fast)}
          exiting={FadeOut.duration(100)}>
          <View
            style={{
              height: 1,
              backgroundColor: t.border,
              marginHorizontal: Spacing[5],
            }}
          />
          <View style={{ paddingHorizontal: Spacing[5], paddingVertical: Spacing[4] }}>
            {typeof item.content === 'string' ? (
              <Text
                style={{
                  fontSize: FontSize.md.fontSize,
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
      style={[{ gap: Spacing[2.5] }, typeof style === 'object' ? style : undefined]}
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
