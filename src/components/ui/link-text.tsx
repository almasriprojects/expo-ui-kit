import React from 'react';
import { Linking, Pressable, Text, type TextStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type LinkTextProps = {
  children: string;
  href?: string;
  onPress?: () => void;
  style?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = { sm: 12, md: 14, lg: 16 };

export function LinkText({ children, href, onPress, style, size = 'md' }: LinkTextProps) {
  const t = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      Linking.openURL(href);
    }
  };

  return (
    <Pressable onPress={handlePress} hitSlop={4}>
      <Text
        style={[
          {
            fontSize: sizes[size],
            color: t.linkText,
            fontWeight: '500',
            textDecorationLine: 'underline',
          },
          style,
        ]}>
        {children}
      </Text>
    </Pressable>
  );
}
