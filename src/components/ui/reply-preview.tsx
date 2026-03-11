import React from 'react';
import { Image, Pressable, Text, View, type ViewStyle } from 'react-native';
import { X } from 'lucide-react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ReplyPreviewProps = {
  /** Name of the original message sender */
  sender: string;
  /** Truncated text of the original message */
  message: string;
  /** Optional thumbnail URI for media attachments */
  mediaThumbnail?: string;
  /** Callback to dismiss the reply preview */
  onClose: () => void;
  /** Custom accent color for the left bar indicator */
  accentColor?: string;
  /** Optional container style override */
  style?: ViewStyle;
};

export function ReplyPreview({
  sender,
  message,
  mediaThumbnail,
  onClose,
  accentColor,
  style,
}: ReplyPreviewProps) {
  const t = useTheme();
  const barColor = accentColor ?? t.primary;

  return (
    <View
      accessible
      accessibilityLabel={`Replying to ${sender}: ${message}`}
      accessibilityRole="summary"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: t.surface,
          borderRadius: Radius.md,
          overflow: 'hidden',
        },
        style,
      ]}>
      <View style={{ width: 3, alignSelf: 'stretch', backgroundColor: barColor }} />

      <View
        style={{
          flex: 1,
          paddingVertical: Spacing[2],
          paddingHorizontal: Spacing[3],
          gap: 2,
        }}>
        <Text
          numberOfLines={1}
          style={{
            ...FontSize.sm,
            fontWeight: '600',
            color: barColor,
          }}>
          {sender}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...FontSize.sm,
            color: t.textSecondary,
          }}>
          {message}
        </Text>
      </View>

      {mediaThumbnail && (
        <Image
          source={{ uri: mediaThumbnail }}
          style={{
            width: 40,
            height: 40,
            borderRadius: Radius.xs,
            marginRight: Spacing[2],
          }}
          accessibilityLabel="Media attachment thumbnail"
        />
      )}

      <Pressable
        onPress={onClose}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Dismiss reply"
        style={{ paddingHorizontal: Spacing[3] }}>
        <X size={18} color={t.textTertiary} />
      </Pressable>
    </View>
  );
}
