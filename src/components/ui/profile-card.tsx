import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';
import { StatusIndicator } from './status-indicator';

export type ProfileCardProps = {
  /** Display name of the user */
  name: string;
  /** Secondary text displayed below the name */
  subtitle?: string;
  /** URL of the user's avatar image */
  avatar?: string;
  /** Online status indicator for the user */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Array of stat items displayed below the profile info */
  stats?: { label: string; value: string }[];
  /** Callback invoked when the card is pressed */
  onPress?: () => void;
  /** Primary action button displayed at the bottom */
  action?: { label: string; onPress: () => void };
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

export function ProfileCard({
  name,
  subtitle,
  avatar,
  status,
  stats,
  onPress,
  action,
  style,
}: ProfileCardProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View style={{ position: 'relative', marginBottom: 12 }}>
        <Avatar source={avatar} initials={name[0]} size="lg" />
        {status && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderWidth: 2,
              borderColor: t.card,
              borderRadius: Radius.full,
            }}>
            <StatusIndicator status={status} size="sm" />
          </View>
        )}
      </View>

      <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', color: t.text }}>{name}</Text>
      {subtitle && (
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary, marginTop: 2 }}>{subtitle}</Text>
      )}

      {stats && stats.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: t.border,
            gap: 24,
          }}>
          {stats.map((stat, i) => (
            <View key={i} style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', color: t.text }}>{stat.value}</Text>
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 2 }}>{stat.label}</Text>
            </View>
          ))}
        </View>
      )}

      {action && (
        <Pressable
          onPress={action.onPress}
          style={{
            marginTop: 16,
            paddingHorizontal: 24,
            paddingVertical: 10,
            borderRadius: Radius.full,
            backgroundColor: t.primary,
          }}>
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.primaryForeground }}>
            {action.label}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
}
