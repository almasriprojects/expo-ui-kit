import React from 'react';
import { Text, View } from 'react-native';

import { Radius, Shadows, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

export function SectionHeader({ title, category }: { title: string; category: string }) {
  const t = useTheme();
  const fonts = useFont();
  return (
    <View style={{ marginTop: 28, marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          fontFamily: resolveFontFamily(fonts, '700'),
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          color: t.primary,
          marginBottom: 6,
        }}>
        {category}
      </Text>
      <Text style={{ fontSize: 22, fontWeight: '800', fontFamily: resolveFontFamily(fonts, '700'), color: t.text }}>
        {title}
      </Text>
    </View>
  );
}

export function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTheme();
  const fonts = useFont();
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          fontFamily: resolveFontFamily(fonts, '700'),
          color: t.text,
          marginBottom: 12,
        }}>
        {title}
      </Text>
      <View
        style={{
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        }}>
        {children}
      </View>
    </View>
  );
}

export function Label({ text }: { text: string }) {
  const t = useTheme();
  const fonts = useFont();
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: '600',
        fontFamily: resolveFontFamily(fonts, '600'),
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: t.textSecondary,
      }}>
      {text}
    </Text>
  );
}
