import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CopyButtonProps = {
  text: string;
  label?: string;
  variant?: 'button' | 'inline' | 'field';
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

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            fontSize: 14,
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
          <Text style={{ fontSize: 13, fontWeight: '600', color: copied ? t.success : t.primary }}>
            {copied ? 'Copied!' : 'Copy'}
          </Text>
        </Pressable>
      </View>
    );
  }

  if (variant === 'inline') {
    return (
      <Pressable onPress={handleCopy} style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
        <Text style={{ fontSize: 14, color: t.text }}>{text}</Text>
        <Text style={{ fontSize: 12, color: copied ? t.success : t.primary, fontWeight: '600' }}>
          {copied ? '✓' : '📋'}
        </Text>
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
      <Text style={{ fontSize: 14, fontWeight: '600', color: copied ? t.success : t.text }}>
        {copied ? '✓ Copied!' : label ?? 'Copy'}
      </Text>
    </Pressable>
  );
}
