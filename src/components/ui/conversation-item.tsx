import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

export type ConversationItemProps = {
  /** Name of the conversation participant */
  name: string;
  /** URL of the participant's avatar image */
  avatar?: string;
  /** Preview of the most recent message */
  lastMessage: string;
  /** Formatted timestamp of the last message */
  time: string;
  /** Number of unread messages */
  unread?: number;
  /** Whether the participant is currently online */
  online?: boolean;
  /** Whether notifications are muted for this conversation */
  muted?: boolean;
  /** Whether the participant is currently typing */
  typing?: boolean;
  /** Callback invoked when the conversation is pressed */
  onPress?: () => void;
  /** Custom styles for the item container */
  style?: ViewStyle;
};

function ConversationItemBase({
  name,
  avatar,
  lastMessage,
  time,
  unread = 0,
  online = false,
  muted = false,
  typing = false,
  onPress,
  style,
}: ConversationItemProps) {
  const t = useTheme();
  const hasUnread = unread > 0;

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingVertical: 12,
          paddingHorizontal: 4,
        },
        style,
      ]}>
      <View>
        <Avatar source={avatar} initials={name[0]} size="md" />
        {online && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 14,
              height: 14,
              borderRadius: Radius.full,
              backgroundColor: t.onlineIndicator,
              borderWidth: 2,
              borderColor: t.card,
            }}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: hasUnread ? '700' : '500', color: t.text }}>
            {name}
          </Text>
          <Text style={{ fontSize: FontSize.xs.fontSize, color: hasUnread ? t.primary : t.textTertiary }}>
            {time}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: FontSize.sm.fontSize,
              color: typing ? t.primary : hasUnread ? t.text : t.textSecondary,
              fontWeight: hasUnread ? '500' : '400',
              fontStyle: typing ? 'italic' : 'normal',
              marginRight: 8,
            }}>
            {typing ? 'typing...' : lastMessage}
          </Text>
          {hasUnread && (
            <View
              style={{
                minWidth: 20,
                height: 20,
                borderRadius: Radius.full,
                backgroundColor: muted ? t.textTertiary : t.primary,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 5,
              }}>
              <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '700', color: t.textOnColor }}>
                {unread > 99 ? '99+' : unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export const ConversationItem = React.memo(ConversationItemBase);
