import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChatBubbleProps = {
  /** Text content of the message */
  message: string;
  /** Formatted time the message was sent */
  timestamp?: string;
  /** Whether the message was sent by the current user */
  isOwn?: boolean;
  /** Delivery status of the message */
  status?: 'sent' | 'delivered' | 'read';
  /** Avatar element displayed next to incoming messages */
  avatar?: React.ReactNode;
  /** Custom styles for the bubble container */
  style?: ViewStyle;
};

export function ChatBubble({
  message,
  timestamp,
  isOwn = false,
  status,
  avatar,
  style,
}: ChatBubbleProps) {
  const t = useTheme();

  const renderStatusIcon = (s: 'sent' | 'delivered' | 'read') => {
    const color = s === 'read' ? t.readReceipt : t.textOnColorMuted;
    if (s === 'sent') {
      return <Check size={10} color={color} />;
    }
    return (
      <View style={{ flexDirection: 'row', gap: -4 }}>
        <Check size={10} color={color} />
        <Check size={10} color={color} />
      </View>
    );
  };

  return (
    <View
      accessible
      accessibilityLabel={`${isOwn ? 'You' : 'Other'}: ${message}${timestamp ? `, ${timestamp}` : ''}`}
      accessibilityRole="text"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 8,
          justifyContent: isOwn ? 'flex-end' : 'flex-start',
          marginBottom: 4,
        },
        style,
      ]}>
      {!isOwn && avatar && <View>{avatar}</View>}
      <View
        style={{
          maxWidth: '75%',
          backgroundColor: isOwn ? t.primary : t.surface,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: Radius.xl,
          borderBottomRightRadius: isOwn ? Radius.xs : Radius.xl,
          borderBottomLeftRadius: isOwn ? Radius.xl : Radius.xs,
        }}>
        <Text
          style={{
            fontSize: FontSize.md.fontSize,
            color: isOwn ? t.primaryForeground : t.text,
            lineHeight: 21,
          }}>
          {message}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 4,
            marginTop: 4,
          }}>
          {timestamp && (
            <Text
              style={{
                fontSize: FontSize['2xs'].fontSize,
                color: isOwn ? t.textOnColorMuted : t.textTertiary,
              }}>
              {timestamp}
            </Text>
          )}
          {isOwn && status && renderStatusIcon(status)}
        </View>
      </View>
    </View>
  );
}
