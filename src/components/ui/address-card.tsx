import React from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AddressCardProps = Omit<PressableProps, 'style'> & {
  style?: ViewStyle;
  label: string;
  name: string;
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  isDefault?: boolean;
  selected?: boolean;
  onEdit?: () => void;
};

export function AddressCard({
  label,
  name,
  street,
  city,
  state,
  zip,
  country,
  phone,
  isDefault,
  selected = false,
  onEdit,
  style,
  ...props
}: AddressCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={[
        {
          backgroundColor: theme.card,
          borderRadius: Radius.xl,
          padding: 16,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? theme.primaryPressed : theme.cardPressed,
        },
        style,
      ]}
      {...props}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text }}>{label}</Text>
          {isDefault && (
            <View
              style={{
                backgroundColor: theme.primarySoft,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: Radius.sm,
              }}>
              <ThemedText style={{ fontSize: 10, color: theme.primaryPressed, fontWeight: '600' }}>
                Default
              </ThemedText>
            </View>
          )}
        </View>
        {onEdit && (
          <Pressable onPress={onEdit} hitSlop={8}>
            <ThemedText style={{ fontSize: 13, color: theme.primaryPressed, fontWeight: '500' }}>
              Edit
            </ThemedText>
          </Pressable>
        )}
      </View>

      <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 2, color: theme.text }}>{name}</Text>
      <ThemedText style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 20 }}>
        {street}{'\n'}
        {city}{state ? `, ${state}` : ''} {zip}{'\n'}
        {country}
      </ThemedText>
      {phone && (
        <ThemedText style={{ fontSize: 13, color: theme.textSecondary, marginTop: 4 }}>
          {phone}
        </ThemedText>
      )}
    </Pressable>
  );
}
