import React, { useRef, useState } from 'react';
import { TextInput, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PinInputProps = {
  /** Number of PIN digit boxes */
  length?: number;
  /** Callback invoked with the complete PIN string */
  onComplete: (pin: string) => void;
  /** Whether to mask entered digits */
  secure?: boolean;
  /** Custom styles applied to the container */
  style?: ViewStyle;
  /** Whether to display an error state on the inputs */
  error?: boolean;
};

export function PinInput({
  length = 4,
  onComplete,
  secure = true,
  style,
  error = false,
}: PinInputProps) {
  const t = useTheme();
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<(TextInput | null)[]>(Array(length).fill(null));

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) text = text[text.length - 1];
    if (!/^\d*$/.test(text)) return;

    const next = [...values];
    next[index] = text;
    setValues(next);

    if (text && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    if (next.every((v) => v !== '')) {
      onComplete(next.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
      const next = [...values];
      next[index - 1] = '';
      setValues(next);
    }
  };

  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'center', gap: 12 }, style]}>
      {Array.from({ length }, (_, i) => {
        const filled = values[i] !== '';
        return (
          <View
            key={i}
            style={{
              width: 52,
              height: 60,
              borderRadius: Radius.xl,
              borderWidth: 2,
              borderColor: error ? t.errorBorder : filled ? t.primary : t.border,
              backgroundColor: filled ? t.primarySoft : t.surface,
              alignItems: 'center',
              justifyContent: 'center',
              ...Shadows.sm,
            }}>
            <TextInput
              ref={(r) => { refs.current[i] = r; }}
              value={values[i]}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              secureTextEntry={secure && filled}
              selectTextOnFocus
              style={{
                fontSize: FontSize['2xl'].fontSize,
                fontWeight: '700',
                color: t.text,
                textAlign: 'center',
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        );
      })}
    </View>
  );
}
