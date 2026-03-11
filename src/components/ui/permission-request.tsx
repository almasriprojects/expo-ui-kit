import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PermissionRequestProps = {
  /** Emoji icon displayed at the top of the request */
  icon: string;
  /** Title of the permission being requested */
  title: string;
  /** Description explaining why the permission is needed */
  description: string;
  /** Callback invoked when the user grants the permission */
  onAllow: () => void;
  /** Callback invoked when the user denies the permission */
  onDeny: () => void;
  /** Label text for the allow button */
  allowLabel?: string;
  /** Label text for the deny button */
  denyLabel?: string;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

export function PermissionRequest({
  icon,
  title,
  description,
  onAllow,
  onDeny,
  allowLabel = 'Allow',
  denyLabel = 'Not Now',
  style,
}: PermissionRequestProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 24,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.md,
        },
        style,
      ]}
      accessibilityRole="summary"
      accessibilityLabel={`${title}. ${description}`}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: Radius.full,
          backgroundColor: t.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: FontSize['3xl'].fontSize }}>{icon}</Text>
      </View>
      <Text
        style={{
          fontSize: FontSize.xl.fontSize,
          fontWeight: '700',
          color: t.text,
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: FontSize.md.fontSize,
          color: t.textSecondary,
          textAlign: 'center',
          lineHeight: 20,
          marginBottom: 20,
        }}
      >
        {description}
      </Text>
      <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
        <Pressable
          onPress={onDeny}
          style={{
            flex: 1,
            paddingVertical: 14,
            borderRadius: Radius.lg,
            backgroundColor: 'transparent',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: t.border,
          }}
          accessibilityRole="button"
          accessibilityLabel={denyLabel}
        >
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.textSecondary }}>
            {denyLabel}
          </Text>
        </Pressable>
        <Pressable
          onPress={onAllow}
          style={{
            flex: 1,
            paddingVertical: 14,
            borderRadius: Radius.lg,
            backgroundColor: t.primary,
            alignItems: 'center',
            ...Shadows.sm,
          }}
          accessibilityRole="button"
          accessibilityLabel={allowLabel}
        >
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.primaryForeground }}>
            {allowLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
