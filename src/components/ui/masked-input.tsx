import React, { useCallback, useState } from 'react';
import { Text, TextInput, View, type ViewProps } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MaskedInputProps = ViewProps & {
  /** Mask pattern where '#' represents a digit placeholder */
  mask: string;
  /** Current raw (unmasked) input value */
  value: string;
  /** Callback invoked with both the raw and formatted values on change */
  onChangeText: (raw: string, formatted: string) => void;
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Placeholder text shown when the input is empty */
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
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>
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
          fontSize: FontSize.lg.fontSize,
          backgroundColor: t.surface,
          color: t.text,
          borderWidth: 1.5,
          borderColor: error ? t.errorBorder : t.border,
        }}
      />
      {error && (
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.error, fontWeight: '500' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
