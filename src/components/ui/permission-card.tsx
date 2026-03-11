import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PermissionCardProps = {
  /** Icon element displayed in the top circle */
  icon: ReactNode;
  /** Title of the permission being requested */
  title: string;
  /** Description explaining why the permission is needed */
  description: string;
  /** Whether the permission has already been granted */
  granted?: boolean;
  /** Callback invoked when the user allows the permission */
  onAllow: () => void;
  /** Callback invoked when the user denies the permission */
  onDeny?: () => void;
  /** Custom styles applied to the card container */
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
        {granted ? <CheckCircle size={28} color={t.success} /> : icon}
      </View>
      <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text, textAlign: 'center' }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: FontSize.sm.fontSize,
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
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.success }}>Granted</Text>
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
              <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.textSecondary }}>
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
            <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.primaryForeground }}>
              Allow
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
