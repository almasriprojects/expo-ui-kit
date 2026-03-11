import React, { useCallback, useMemo } from 'react';
import { Linking, Text, View, type TextStyle, type ViewStyle } from 'react-native';

import { FontSize, Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MarkdownRendererProps = {
  /** Markdown content string to render */
  content: string;
  /** Optional container style */
  style?: ViewStyle;
};

type InlineSegment =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; label: string; url: string };

function parseInline(raw: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > last) {
      segments.push({ type: 'text', text: raw.slice(last, match.index) });
    }
    if (match[1] != null) segments.push({ type: 'bold', text: match[1] });
    else if (match[2] != null) segments.push({ type: 'italic', text: match[2] });
    else if (match[3] != null) segments.push({ type: 'code', text: match[3] });
    else if (match[4] != null && match[5] != null)
      segments.push({ type: 'link', label: match[4], url: match[5] });
    last = match.index + match[0].length;
  }

  if (last < raw.length) {
    segments.push({ type: 'text', text: raw.slice(last) });
  }
  return segments;
}

function InlineText({
  segments,
  baseStyle,
  codeStyle,
  linkColor,
}: {
  segments: InlineSegment[];
  baseStyle: TextStyle;
  codeStyle: TextStyle;
  linkColor: string;
}) {
  return (
    <Text style={baseStyle}>
      {segments.map((seg, i) => {
        switch (seg.type) {
          case 'bold':
            return (
              <Text key={i} style={{ fontWeight: '700' }}>
                {seg.text}
              </Text>
            );
          case 'italic':
            return (
              <Text key={i} style={{ fontStyle: 'italic' }}>
                {seg.text}
              </Text>
            );
          case 'code':
            return (
              <Text key={i} style={codeStyle}>
                {seg.text}
              </Text>
            );
          case 'link':
            return (
              <Text
                key={i}
                style={{ color: linkColor, textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL(seg.url)}>
                {seg.label}
              </Text>
            );
          default:
            return <Text key={i}>{seg.text}</Text>;
        }
      })}
    </Text>
  );
}

export function MarkdownRenderer({ content, style }: MarkdownRendererProps) {
  const t = useTheme();
  const monoFont = Fonts?.mono ?? 'monospace';

  const renderInline = useCallback(
    (raw: string, extraStyle?: TextStyle) => {
      const baseStyle: TextStyle = { color: t.text, ...FontSize.md, ...extraStyle };
      const codeStyle: TextStyle = {
        fontFamily: monoFont,
        backgroundColor: t.surface,
        color: t.text,
        ...FontSize.sm,
      };
      return (
        <InlineText
          segments={parseInline(raw)}
          baseStyle={baseStyle}
          codeStyle={codeStyle}
          linkColor={t.primary}
        />
      );
    },
    [t, monoFont],
  );

  const elements = useMemo(() => {
    const lines = content.split('\n');
    const nodes: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++;
        nodes.push(
          <View
            key={nodes.length}
            style={{
              backgroundColor: t.surface,
              borderRadius: 6,
              padding: Spacing[3],
              marginBottom: Spacing[2],
            }}>
            <Text
              style={{
                fontFamily: monoFont,
                color: t.text,
                ...FontSize.sm,
              }}>
              {codeLines.join('\n')}
            </Text>
          </View>,
        );
        continue;
      }

      if (line.startsWith('### ')) {
        nodes.push(
          <React.Fragment key={nodes.length}>
            {renderInline(line.slice(4), {
              ...FontSize.xl,
              fontWeight: '600',
              marginBottom: Spacing[1],
            })}
          </React.Fragment>,
        );
      } else if (line.startsWith('## ')) {
        nodes.push(
          <React.Fragment key={nodes.length}>
            {renderInline(line.slice(3), {
              ...FontSize['2xl'],
              fontWeight: '700',
              marginBottom: Spacing[1],
            })}
          </React.Fragment>,
        );
      } else if (line.startsWith('# ')) {
        nodes.push(
          <React.Fragment key={nodes.length}>
            {renderInline(line.slice(2), {
              ...FontSize['3xl'],
              fontWeight: '800',
              marginBottom: Spacing[1],
            })}
          </React.Fragment>,
        );
      } else if (line.startsWith('> ')) {
        nodes.push(
          <View
            key={nodes.length}
            style={{
              borderLeftWidth: 3,
              borderLeftColor: t.primary,
              paddingLeft: Spacing[3],
              paddingVertical: Spacing[1],
              backgroundColor: t.surface,
              borderRadius: 4,
              marginBottom: Spacing[2],
            }}>
            {renderInline(line.slice(2), { fontStyle: 'italic' })}
          </View>,
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        nodes.push(
          <View
            key={nodes.length}
            style={{
              flexDirection: 'row',
              paddingLeft: Spacing[3],
              marginBottom: Spacing[1],
            }}>
            <Text style={{ color: t.text, marginRight: Spacing[2], ...FontSize.md }}>
              {'\u2022'}
            </Text>
            <View style={{ flex: 1 }}>{renderInline(line.slice(2))}</View>
          </View>,
        );
      } else if (/^\d+\.\s/.test(line)) {
        const dotIdx = line.indexOf('. ');
        const num = line.slice(0, dotIdx + 1);
        nodes.push(
          <View
            key={nodes.length}
            style={{
              flexDirection: 'row',
              paddingLeft: Spacing[3],
              marginBottom: Spacing[1],
            }}>
            <Text style={{ color: t.textSecondary, marginRight: Spacing[2], ...FontSize.md }}>
              {num}
            </Text>
            <View style={{ flex: 1 }}>{renderInline(line.slice(dotIdx + 2))}</View>
          </View>,
        );
      } else if (line.trim() === '') {
        nodes.push(<View key={nodes.length} style={{ height: Spacing[2] }} />);
      } else {
        nodes.push(
          <React.Fragment key={nodes.length}>
            {renderInline(line, { marginBottom: Spacing[1] })}
          </React.Fragment>,
        );
      }

      i++;
    }

    return nodes;
  }, [content, t, monoFont, renderInline]);

  return <View style={style}>{elements}</View>;
}
