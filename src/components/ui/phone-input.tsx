import React, { forwardRef, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, type TextInputProps, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius } from '@/constants/theme';

type Country = {
  name: string;
  code: string;
  dial: string;
  flag: string;
};

const COUNTRIES: Country[] = [
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', dial: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷' },
  { name: 'India', code: 'IN', dial: '+91', flag: '🇮🇳' },
  { name: 'Japan', code: 'JP', dial: '+81', flag: '🇯🇵' },
  { name: 'China', code: 'CN', dial: '+86', flag: '🇨🇳' },
  { name: 'Brazil', code: 'BR', dial: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: 'MX', dial: '+52', flag: '🇲🇽' },
  { name: 'UAE', code: 'AE', dial: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966', flag: '🇸🇦' },
  { name: 'South Korea', code: 'KR', dial: '+82', flag: '🇰🇷' },
  { name: 'Italy', code: 'IT', dial: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', dial: '+34', flag: '🇪🇸' },
  { name: 'Netherlands', code: 'NL', dial: '+31', flag: '🇳🇱' },
  { name: 'Turkey', code: 'TR', dial: '+90', flag: '🇹🇷' },
  { name: 'Singapore', code: 'SG', dial: '+65', flag: '🇸🇬' },
  { name: 'Egypt', code: 'EG', dial: '+20', flag: '🇪🇬' },
];

type PhoneInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  value: string;
  onValueChange: (value: string, country: Country) => void;
  label?: string;
  error?: string;
  defaultCountry?: string;
};

export const PhoneInput = forwardRef<TextInput, PhoneInputProps>(
  ({ value, onValueChange, label, error, defaultCountry = 'US', ...props }, ref) => {
    const theme = useTheme();
    const [country, setCountry] = useState(
      COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0]
    );
    const [showPicker, setShowPicker] = useState(false);

    const formatPhone = (raw: string) => {
      const digits = raw.replace(/[^0-9]/g, '');
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    };

    return (
      <View>
        {label && (
          <ThemedText style={{ fontSize: 14, fontWeight: '600', color: theme.text, marginBottom: 6 }}>
            {label}
          </ThemedText>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surface,
            borderRadius: Radius.lg,
            borderWidth: 1.5,
            borderColor: error ? theme.errorBorder : theme.border,
            minHeight: 48,
          }}>
          <Pressable
            onPress={() => setShowPicker(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderRightWidth: 1,
              borderRightColor: theme.border,
              gap: 4,
            }}>
            <Text style={{ fontSize: 18, color: theme.text }}>{country.flag}</Text>
            <ChevronDown size={13} color={theme.textSecondary} />
          </Pressable>
          <ThemedText style={{ paddingLeft: 10, color: theme.textSecondary, fontSize: 14 }}>
            {country.dial}
          </ThemedText>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={(text) => {
              const formatted = formatPhone(text);
              onValueChange(formatted, country);
            }}
            placeholder="(555) 123-4567"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
            maxLength={14}
            style={{
              flex: 1,
              paddingHorizontal: 8,
              paddingVertical: 12,
              fontSize: 15,
              color: theme.text,
            }}
            {...props}
          />
        </View>
        {error && (
          <ThemedText style={{ fontSize: 12, color: theme.error, marginTop: 4, fontWeight: '500' }}>
            {error}
          </ThemedText>
        )}

        <Modal visible={showPicker} transparent animationType="slide">
          <Pressable
            style={{ flex: 1, backgroundColor: theme.overlay, justifyContent: 'flex-end' }}
            onPress={() => setShowPicker(false)}>
            <View
              style={{
                backgroundColor: theme.background,
                borderTopLeftRadius: Radius['2xl'],
                borderTopRightRadius: Radius['2xl'],
                maxHeight: '60%',
                paddingTop: 12,
              }}>
              <View style={{ alignItems: 'center', paddingBottom: 8 }}>
                <View
                  style={{
                    width: 40,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: theme.surfaceActive,
                  }}
                />
              </View>
              <ScrollView>
                {COUNTRIES.map((c) => (
                  <Pressable
                    key={c.code}
                    onPress={() => {
                      setCountry(c);
                      setShowPicker(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 14,
                      gap: 12,
                      backgroundColor:
                        c.code === country.code ? theme.primarySoft : 'transparent',
                    }}>
                    <Text style={{ fontSize: 20, color: theme.text }}>{c.flag}</Text>
                    <ThemedText style={{ flex: 1, fontSize: 15, color: theme.text }}>{c.name}</ThemedText>
                    <ThemedText style={{ fontSize: 14, color: theme.textSecondary }}>
                      {c.dial}
                    </ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
