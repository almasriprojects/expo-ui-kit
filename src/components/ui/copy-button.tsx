import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check, Copy } from 'lucide-react-native';

import { Fonts, Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CopyButtonProps = {
  /** Text content to copy to clipboard */
  text: string;
  /** Optional label displayed on the button */
  label?: string;
  /** Visual variant of the copy button */
  variant?: 'button' | 'inline' | 'field';
  /** Custom styles applied to the container */
  style?: ViewStyle;
};

export function CopyButton({
  text,
  label,
  variant = 'button',
  style,
}: CopyButtonProps) {
  const t = useTheme();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (timerRef.current != null) clearTimeout(timerRef.current);
    await Clipboard.setStringAsync(text);
    setCopied(true);
    timerRef.current = setTimeout(() => {
      setCopied(false);
      timerRef.current = null;
    }, 2000);
  };

  if (variant === 'field') {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: t.surface,
            borderRadius: Radius.lg,
            borderWidth: 1,
            borderColor: t.border,
            overflow: 'hidden',
          },
          style,
        ]}>
        <Text
          style={{
            flex: 1,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: FontSize.md.fontSize,
            color: t.text,
            fontFamily: Fonts?.mono ?? 'monospace',
          }}
          numberOfLines={1}>
          {text}
        </Text>
        <Pressable
          onPress={handleCopy}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderLeftWidth: 1,
            borderLeftColor: t.border,
            backgroundColor: copied ? t.successSoft : t.surface,
          }}>
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: copied ? t.success : t.primary }}>
            {copied ? 'Copied!' : 'Copy'}
          </Text>
        </Pressable>
      </View>
    );
  }

  if (variant === 'inline') {
    return (
      <Pressable onPress={handleCopy} style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.text }}>{text}</Text>
        {copied ? (
          <Check size={12} color={t.success} strokeWidth={3} />
        ) : (
          <Copy size={12} color={t.primary} />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handleCopy}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: Radius.lg,
          backgroundColor: copied ? t.successSoft : t.surface,
          borderWidth: 1,
          borderColor: copied ? t.success : t.border,
        },
        style,
      ]}>
      {copied ? (
        <Check size={14} color={t.success} strokeWidth={3} />
      ) : (
        <Copy size={14} color={t.text} />
      )}
      <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: copied ? t.success : t.text }}>
        {copied ? 'Copied!' : label ?? 'Copy'}
      </Text>
    </Pressable>
  );
}
