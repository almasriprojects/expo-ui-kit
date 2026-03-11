import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';
import { Bell } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type NotificationItemProps = Omit<PressableProps, 'style'> & {
  /** Custom styles applied to the notification container */
  style?: ViewStyle;
  /** Title text of the notification */
  title: string;
  /** Body message of the notification */
  message: string;
  /** Formatted timestamp string */
  time: string;
  /** Custom icon rendered in the leading circle */
  icon?: ReactNode;
  /** Background color for the icon circle */
  iconBg?: string;
  /** Whether the notification has been read */
  read?: boolean;
  /** URL of the sender's avatar image */
  avatar?: string;
};

function NotificationItemBase({
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
          borderRadius: Radius.xl,
        },
        style,
      ]}
      {...props}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: Radius['2xl'],
          backgroundColor: iconBg ?? theme.cardPressed,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon ?? <Bell size={16} color={theme.text} />}
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text
            style={{ fontSize: FontSize.md.fontSize, fontWeight: read ? '400' : '600', flex: 1, marginRight: 8, color: theme.text }}
            numberOfLines={1}>
            {title}
          </Text>
          <ThemedText style={{ fontSize: FontSize.xs.fontSize, color: theme.textSecondary }}>
            {time}
          </ThemedText>
        </View>
        <ThemedText
          style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, marginTop: 3, lineHeight: 18 }}
          numberOfLines={2}>
          {message}
        </ThemedText>
      </View>
      {!read && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: Radius.xs,
            backgroundColor: theme.primaryPressed,
            marginTop: 6,
          }}
        />
      )}
    </Pressable>
  );
}

export const NotificationItem = React.memo(NotificationItemBase);
