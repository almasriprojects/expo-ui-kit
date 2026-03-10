import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

type ConversationItemProps = {
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
  muted?: boolean;
  typing?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export function ConversationItem({
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
          <Text style={{ fontSize: 15, fontWeight: hasUnread ? '700' : '500', color: t.text }}>
            {name}
          </Text>
          <Text style={{ fontSize: 11, color: hasUnread ? t.primary : t.textTertiary }}>
            {time}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 13,
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
              <Text style={{ fontSize: 11, fontWeight: '700', color: t.textOnColor }}>
                {unread > 99 ? '99+' : unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
