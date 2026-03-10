import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PermissionRequestProps = {
  icon: string;
  title: string;
  description: string;
  onAllow: () => void;
  onDeny: () => void;
  allowLabel?: string;
  denyLabel?: string;
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
        <Text style={{ fontSize: 28 }}>{icon}</Text>
      </View>
      <Text
        style={{
          fontSize: 18,
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
          fontSize: 14,
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
          <Text style={{ fontSize: 15, fontWeight: '600', color: t.textSecondary }}>
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
          <Text style={{ fontSize: 15, fontWeight: '600', color: t.primaryForeground }}>
            {allowLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
