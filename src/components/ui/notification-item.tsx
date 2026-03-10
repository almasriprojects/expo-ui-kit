import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type NotificationItemProps = Omit<PressableProps, 'style'> & {
  style?: ViewStyle;
  title: string;
  message: string;
  time: string;
  icon?: ReactNode;
  iconBg?: string;
  read?: boolean;
  avatar?: string;
};

export function NotificationItem({
  title,
  message,
  time,
  icon,
  iconBg,
  read = false,
  style,
  ...props
}: NotificationItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={[
        {
          flexDirection: 'row',
          padding: 14,
          gap: 12,
          backgroundColor: read ? 'transparent' : theme.card,
          borderRadius: 14,
        },
        style,
      ]}
      {...props}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: iconBg ?? theme.cardPressed,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon ?? <Text style={{ fontSize: 16, color: theme.text }}>🔔</Text>}
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text
            style={{ fontSize: 14, fontWeight: read ? '400' : '600', flex: 1, marginRight: 8, color: theme.text }}
            numberOfLines={1}>
            {title}
          </Text>
          <ThemedText style={{ fontSize: 11, color: theme.textSecondary }}>
            {time}
          </ThemedText>
        </View>
        <ThemedText
          style={{ fontSize: 13, color: theme.textSecondary, marginTop: 3, lineHeight: 18 }}
          numberOfLines={2}>
          {message}
        </ThemedText>
      </View>
      {!read && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.primaryPressed,
            marginTop: 6,
          }}
        />
      )}
    </Pressable>
  );
}
