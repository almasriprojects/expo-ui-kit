import React, { useState } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { FontSize, Spacing } from '@/constants/theme';

export type AppBarProps = ViewProps & {
  /** Primary title displayed in the app bar */
  title: string;
  /** Secondary text shown below the title */
  subtitle?: string;
  /** Callback invoked when the back button is pressed */
  onBack?: () => void;
  /** Content rendered on the right side of the bar */
  rightActions?: React.ReactNode;
  /** Whether the app bar background is transparent */
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
          paddingTop: insets.top + Spacing[3],
          paddingBottom: Spacing[3],
          paddingHorizontal: Spacing[4],
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
              marginRight: Spacing[3],
              padding: Spacing[1],
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
              fontSize: FontSize.lg.fontSize,
              fontWeight: '600',
              color: t.text,
            }}
            numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontSize: FontSize.sm.fontSize,
                color: t.textSecondary,
                marginTop: Spacing[0.5],
              }}
              numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightActions && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[2] }}>
          {rightActions}
        </View>
      )}
    </View>
  );
}
