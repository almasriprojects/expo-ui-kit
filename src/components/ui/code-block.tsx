import React from 'react';
import { ScrollView, Text, View, type ViewStyle } from 'react-native';

import { Fonts, Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CopyButton } from './copy-button';

export type CodeBlockProps = {
  /** Source code string to display */
  code: string;
  /** Programming language label */
  language?: string;
  /** Whether to display line numbers */
  showLineNumbers?: boolean;
  /** Whether to show the copy-to-clipboard button */
  showCopy?: boolean;
  /** Custom styles for the outer container */
  style?: ViewStyle;
};

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  showCopy = true,
  style,
}: CodeBlockProps) {
  const t = useTheme();
  const lines = code.split('\n');

  return (
    <View
      style={[
        {
          borderRadius: Radius.xl,
          backgroundColor: t.codeBackground,
          overflow: 'hidden',
          ...Shadows.sm,
        },
        style,
      ]}>
      {(language || showCopy) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 14,
            paddingVertical: 8,
            backgroundColor: t.surfaceOnColorMuted,
            borderBottomWidth: 1,
            borderBottomColor: t.borderOnColor,
          }}>
          <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '500', color: t.codeLabelText, textTransform: 'uppercase' }}>
            {language ?? ''}
          </Text>
          {showCopy && <CopyButton text={code} variant="inline" />}
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ padding: 14, flexDirection: 'row' }}>
          {showLineNumbers && (
            <View style={{ marginRight: 14, alignItems: 'flex-end' }}>
              {lines.map((_, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: FontSize.sm.fontSize,
                    lineHeight: 20,
                    fontFamily: Fonts?.mono ?? 'monospace',
                    color: t.codeLineNumber,
                  }}>
                  {i + 1}
                </Text>
              ))}
            </View>
          )}
          <View>
            {lines.map((line, i) => (
              <Text
                key={i}
                style={{
                  fontSize: FontSize.sm.fontSize,
                  lineHeight: 20,
                  fontFamily: Fonts?.mono ?? 'monospace',
                  color: t.codeText,
                }}>
                {line || ' '}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
