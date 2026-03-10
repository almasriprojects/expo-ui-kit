import React, { useCallback, useState } from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type ReadMoreTextProps = {
  text: string;
  numberOfLines?: number;
  showMoreLabel?: string;
  showLessLabel?: string;
  textStyle?: TextStyle;
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
        style={[{ fontSize: 14, lineHeight: 21, color: t.text }, textStyle]}>
        {text}
      </Text>
      {needsToggle && (
        <Text
          style={{
            fontSize: 13,
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
