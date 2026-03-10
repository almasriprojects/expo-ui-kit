import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PermissionCardProps = {
  icon: string;
  title: string;
  description: string;
  granted?: boolean;
  onAllow: () => void;
  onDeny?: () => void;
  style?: ViewStyle;
};

export function PermissionCard({
  icon,
  title,
  description,
  granted,
  onAllow,
  onDeny,
  style,
}: PermissionCardProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: granted ? t.success : t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: Radius.full,
          backgroundColor: granted ? t.successSoft : t.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
        }}>
        <Text style={{ fontSize: 28 }}>{granted ? '✅' : icon}</Text>
      </View>
      <Text style={{ fontSize: 17, fontWeight: '700', color: t.text, textAlign: 'center' }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: t.textSecondary,
          textAlign: 'center',
          marginTop: 6,
          lineHeight: 19,
          paddingHorizontal: 8,
        }}>
        {description}
      </Text>
      {granted ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginTop: 16,
            backgroundColor: t.successSoft,
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: Radius.full,
          }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.success }}>Granted</Text>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 18, width: '100%' }}>
          {onDeny && (
            <Pressable
              onPress={onDeny}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: Radius.lg,
                backgroundColor: t.surface,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: t.textSecondary }}>
                Not Now
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={onAllow}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: Radius.lg,
              backgroundColor: t.primary,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: t.primaryForeground }}>
              Allow
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
