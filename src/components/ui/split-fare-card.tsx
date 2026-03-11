import React from 'react';
import { Image, Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check, UserPlus } from 'lucide-react-native';

import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FareParticipant = {
  /** Participant's display name */
  name: string;
  /** Optional avatar URI */
  avatar?: string;
  /** Their share amount */
  amount: number;
  /** Whether they have paid their share */
  paid?: boolean;
};

export type SplitFareCardProps = {
  /** Total fare amount */
  total: number;
  /** Currency symbol */
  currency?: string;
  /** List of participants splitting the fare */
  participants: FareParticipant[];
  /** Callback to invite more participants */
  onInvite?: () => void;
  /** Optional container style */
  style?: ViewStyle;
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function SplitFareCard({
  total,
  currency = '$',
  participants,
  onInvite,
  style,
}: SplitFareCardProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: Spacing[5],
          ...Shadows.md,
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: Spacing[4],
        }}>
        <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text }}>
          Split Fare
        </Text>
        <Text style={{ fontSize: FontSize['2xl'].fontSize, fontWeight: '700', color: t.primary }}>
          {currency}
          {total.toFixed(2)}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: t.border,
          marginBottom: Spacing[4],
        }}
      />

      {participants.map((p, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: Spacing[3],
            marginBottom: i < participants.length - 1 ? Spacing[3] : 0,
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: Radius.full,
              backgroundColor: t.surface,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            {p.avatar ? (
              <Image
                source={{ uri: p.avatar }}
                style={{ width: 32, height: 32 }}
                resizeMode="cover"
              />
            ) : (
              <Text
                style={{
                  fontSize: FontSize['2xs'].fontSize,
                  fontWeight: '600',
                  color: t.textSecondary,
                }}>
                {getInitials(p.name)}
              </Text>
            )}
          </View>

          <Text
            style={{
              flex: 1,
              fontSize: FontSize.md.fontSize,
              color: t.text,
            }}
            numberOfLines={1}>
            {p.name}
          </Text>

          <Text
            style={{
              fontSize: FontSize.md.fontSize,
              fontWeight: '600',
              color: t.text,
              marginRight: Spacing[2],
            }}>
            {currency}
            {p.amount.toFixed(2)}
          </Text>

          {p.paid ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: t.successSoft,
                paddingHorizontal: Spacing[2],
                paddingVertical: 2,
                borderRadius: Radius.sm,
              }}>
              <Check size={12} color={t.success} />
              <Text style={{ fontSize: FontSize['2xs'].fontSize, fontWeight: '600', color: t.success }}>
                Paid
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: t.surface,
                paddingHorizontal: Spacing[2],
                paddingVertical: 2,
                borderRadius: Radius.sm,
              }}>
              <Text
                style={{
                  fontSize: FontSize['2xs'].fontSize,
                  fontWeight: '500',
                  color: t.textSecondary,
                }}>
                Pending
              </Text>
            </View>
          )}
        </View>
      ))}

      {onInvite && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: t.border,
              marginTop: Spacing[4],
              marginBottom: Spacing[3],
            }}
          />
          <Pressable
            onPress={onInvite}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: Spacing[2],
              paddingVertical: Spacing[2],
              backgroundColor: t.primarySoft,
              borderRadius: Radius.lg,
            }}>
            <UserPlus size={18} color={t.primary} />
            <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.primary }}>
              Invite
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
