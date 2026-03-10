import React, { useCallback, useState } from 'react';
import { Text, TextInput, View, type ViewProps } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MaskedInputProps = ViewProps & {
  mask: string;
  value: string;
  onChangeText: (raw: string, formatted: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
};

function applyMask(mask: string, raw: string): string {
  let result = '';
  let rawIdx = 0;
  for (let i = 0; i < mask.length && rawIdx < raw.length; i++) {
    if (mask[i] === '#') {
      result += raw[rawIdx];
      rawIdx++;
    } else {
      result += mask[i];
    }
  }
  return result;
}

export function MaskedInput({
  mask,
  value,
  onChangeText,
  label,
  error,
  placeholder,
  style,
  ...props
}: MaskedInputProps) {
  const t = useTheme();
  const raw = value.replace(/\D/g, '');
  const [displayValue, setDisplayValue] = useState(applyMask(mask, raw));

  const handleChange = useCallback(
    (text: string) => {
      const newRaw = text.replace(/\D/g, '');
      const formatted = applyMask(mask, newRaw);
      setDisplayValue(formatted);
      onChangeText(newRaw, formatted);
    },
    [mask, onChangeText],
  );

  React.useEffect(() => {
    const newFormatted = applyMask(mask, value.replace(/\D/g, ''));
    setDisplayValue(newFormatted);
  }, [mask, value]);

  return (
    <View style={[{ gap: 6 }, style]} {...props}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>
          {label}
        </Text>
      )}
      <TextInput
        value={displayValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={t.textTertiary}
        keyboardType="number-pad"
        accessibilityLabel={label ?? placeholder}
        accessibilityHint={error}
        aria-invalid={!!error}
        style={{
          minHeight: 48,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: Radius.lg,
          fontSize: 16,
          backgroundColor: t.surface,
          color: t.text,
          borderWidth: 1.5,
          borderColor: error ? t.errorBorder : t.border,
        }}
      />
      {error && (
        <Text style={{ fontSize: 12, color: t.error, fontWeight: '500' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
