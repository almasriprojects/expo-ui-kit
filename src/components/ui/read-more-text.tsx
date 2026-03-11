import React, { useCallback, useState } from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

export type ReadMoreTextProps = {
  /** Text content to display with truncation */
  text: string;
  /** Maximum number of visible lines before truncation */
  numberOfLines?: number;
  /** Label for the "read more" toggle */
  showMoreLabel?: string;
  /** Label for the "show less" toggle */
  showLessLabel?: string;
  /** Custom styles applied to the text element */
  textStyle?: TextStyle;
  /** Custom styles applied to the outer container */
  style?: ViewStyle;
};

export function ReadMoreText({
  text,
  numberOfLines = 3,
  showMoreLabel = 'Read more',
  showLessLabel = 'Show less',
  textStyle,
  style,
}: ReadMoreTextProps) {
  const t = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);

  const onTextLayout = useCallback(
    (e: { nativeEvent: { lines: unknown[] } }) => {
      if (!expanded && e.nativeEvent.lines.length > numberOfLines) {
        setNeedsToggle(true);
      }
    },
    [expanded, numberOfLines],
  );

  return (
    <Pressable onPress={() => needsToggle && setExpanded(!expanded)} style={style}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={expanded ? undefined : numberOfLines}
        style={[{ fontSize: FontSize.md.fontSize, lineHeight: 21, color: t.text }, textStyle]}>
        {text}
      </Text>
      {needsToggle && (
        <Text
          style={{
            fontSize: FontSize.sm.fontSize,
            fontWeight: '600',
            color: t.primary,
            marginTop: 4,
          }}>
          {expanded ? showLessLabel : showMoreLabel}
        </Text>
      )}
    </Pressable>
  );
}
