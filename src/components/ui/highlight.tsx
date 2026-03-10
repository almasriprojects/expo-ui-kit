import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type HighlightProps = {
  text: string;
  highlight: string;
  highlightColor?: string;
  caseSensitive?: boolean;
};

export function Highlight({
  text,
  highlight,
  highlightColor,
  caseSensitive = false,
}: HighlightProps) {
  const t = useTheme();
  const bgColor = highlightColor ?? t.primarySoft;

  if (!highlight) {
    return <Text style={{ color: t.text }}>{text}</Text>;
  }

  const search = caseSensitive ? highlight : highlight.toLowerCase();
  const content = caseSensitive ? text : text.toLowerCase();
  const parts: { text: string; highlighted: boolean }[] = [];
  let remaining = text;
  let remainingLower = content;
  let idx = remainingLower.indexOf(search);

  while (idx !== -1) {
    const before = remaining.slice(0, idx);
    const match = remaining.slice(idx, idx + highlight.length);
    if (before) {
      parts.push({ text: before, highlighted: false });
    }
    parts.push({ text: match, highlighted: true });
    remaining = remaining.slice(idx + highlight.length);
    remainingLower = remainingLower.slice(idx + highlight.length);
    idx = remainingLower.indexOf(search);
  }

  if (remaining) {
    parts.push({ text: remaining, highlighted: false });
  }

  return (
    <Text style={{ color: t.text }}>
      {parts.map((part, i) =>
        part.highlighted ? (
          <Text
            key={i}
            style={{
              backgroundColor: bgColor,
              color: t.text,
            }}>
            {part.text}
          </Text>
        ) : (
          <Text key={i}>{part.text}</Text>
        ),
      )}
    </Text>
  );
}
