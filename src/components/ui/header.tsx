import { useRouter } from 'expo-router';
import React, { type ReactNode, useState } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type HeaderProps = ViewProps & {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
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
          paddingVertical: 12,
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
            <Text style={{ fontSize: 24, color: t.text }}>‹</Text>
          </Pressable>
        )}
      </View>
      <Text
        style={{
          fontSize: 16,
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
