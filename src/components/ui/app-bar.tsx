import React, { useState } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

export type AppBarProps = ViewProps & {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightActions?: React.ReactNode;
  transparent?: boolean;
};

export function AppBar({
  title,
  subtitle,
  onBack,
  rightActions,
  transparent = false,
  style,
  ...props
}: AppBarProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [pressed, setPressed] = useState(false);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: insets.top + 12,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: transparent ? 'transparent' : t.background,
          borderBottomWidth: transparent ? 0 : 1,
          borderBottomColor: t.border,
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 }}>
        {onBack && (
          <Pressable
            onPress={onBack}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            hitSlop={12}
            style={{
              marginRight: 12,
              padding: 4,
              opacity: pressed ? 0.7 : 1,
            }}
            accessibilityRole="button"
            accessibilityLabel="Go back">
            <ArrowLeft size={24} color={t.text} />
          </Pressable>
        )}
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '600',
              color: t.text,
            }}
            numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontSize: 13,
                color: t.textSecondary,
                marginTop: 2,
              }}
              numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightActions && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {rightActions}
        </View>
      )}
    </View>
  );
}
