import React from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AddressCardProps = Omit<PressableProps, 'style'> & {
  /** Custom styles for the card container */
  style?: ViewStyle;
  /** Address category label (e.g. "Home", "Work") */
  label: string;
  /** Full name of the address recipient */
  name: string;
  /** Street address line */
  street: string;
  /** City name */
  city: string;
  /** State or region */
  state?: string;
  /** Postal or ZIP code */
  zip?: string;
  /** Country name */
  country?: string;
  /** Contact phone number */
  phone?: string;
  /** Whether this is the default address */
  isDefault?: boolean;
  /** Whether the card is currently selected */
  selected?: boolean;
  /** Callback invoked when the edit button is pressed */
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
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: theme.text }}>{label}</Text>
          {isDefault && (
            <View
              style={{
                backgroundColor: theme.primarySoft,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: Radius.sm,
              }}>
              <ThemedText style={{ fontSize: FontSize['2xs'].fontSize, color: theme.primaryPressed, fontWeight: '600' }}>
                Default
              </ThemedText>
            </View>
          )}
        </View>
        {onEdit && (
          <Pressable onPress={onEdit} hitSlop={8}>
            <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.primaryPressed, fontWeight: '500' }}>
              Edit
            </ThemedText>
          </Pressable>
        )}
      </View>

      <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', marginBottom: 2, color: theme.text }}>{name}</Text>
      <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, lineHeight: 20 }}>
        {street}{'\n'}
        {city}{state ? `, ${state}` : ''} {zip}{'\n'}
        {country}
      </ThemedText>
      {phone && (
        <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, marginTop: 4 }}>
          {phone}
        </ThemedText>
      )}
    </Pressable>
  );
}
