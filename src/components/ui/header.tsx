import { useRouter } from 'expo-router';
import React, { type ReactNode, useState } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';

import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HeaderProps = ViewProps & {
  /** Title text displayed in the center */
  title: string;
  /** Whether to show the back button */
  showBack?: boolean;
  /** Custom back button handler (defaults to router.back) */
  onBack?: () => void;
  /** Element rendered on the right side of the header */
  rightAction?: ReactNode;
};

export function Header({
  title,
  showBack = false,
  onBack,
  rightAction,
  style,
  ...props
}: HeaderProps) {
  const router = useRouter();
  const t = useTheme();
  const [pressed, setPressed] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: Spacing[3],
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      <View style={{ width: 48 }}>
        {showBack && (
          <Pressable
            onPress={handleBack}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={{ opacity: pressed ? 0.7 : 1 }}
            hitSlop={8}>
            <Text style={{ fontSize: FontSize['2xl'].fontSize, color: t.text }}>‹</Text>
          </Pressable>
        )}
      </View>
      <Text
        style={{
          fontSize: FontSize.lg.fontSize,
          fontWeight: '600',
          flex: 1,
          textAlign: 'center',
          color: t.text,
        }}>
        {title}
      </Text>
      <View style={{ width: 48, alignItems: 'flex-end' }}>{rightAction}</View>
    </View>
  );
}
