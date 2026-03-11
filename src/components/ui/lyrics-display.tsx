import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Pressable, ScrollView, View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LyricLine = {
  /** Timestamp in seconds when this line starts */
  time: number;
  /** Lyric text content */
  text: string;
};

export type LyricsDisplayProps = {
  /** Array of timed lyric lines */
  lines: LyricLine[];
  /** Current playback time in seconds */
  currentTime: number;
  /** Callback to seek to a specific lyric line's time */
  onSeek?: (time: number) => void;
  /** Maximum height of the lyrics container */
  maxHeight?: number;
  /** Optional container style */
  style?: ViewStyle;
};

export function LyricsDisplay({
  lines,
  currentTime,
  onSeek,
  maxHeight = 300,
  style,
}: LyricsDisplayProps) {
  const t = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const lineRefs = useRef<Record<number, number>>({});

  const activeIndex = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].time <= currentTime) idx = i;
      else break;
    }
    return idx;
  }, [lines, currentTime]);

  useEffect(() => {
    if (activeIndex >= 0 && scrollRef.current) {
      const y = lineRefs.current[activeIndex];
      if (y != null) {
        scrollRef.current.scrollTo({ y: Math.max(0, y - 60), animated: true });
      }
    }
  }, [activeIndex]);

  const handleLayout = useCallback((index: number, y: number) => {
    lineRefs.current[index] = y;
  }, []);

  return (
    <View
      style={[
        {
          maxHeight,
          backgroundColor: t.surface,
          borderRadius: Radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel="Lyrics display">
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: Spacing[4] }}>
        {lines.map((line, index) => {
          const isActive = index === activeIndex;
          return (
            <Pressable
              key={`${index}-${line.time}`}
              onPress={() => onSeek?.(line.time)}
              onLayout={(e) => handleLayout(index, e.nativeEvent.layout.y)}
              style={({ pressed }) => ({
                paddingVertical: Spacing[2],
                opacity: pressed ? 0.8 : 1,
              })}
              accessibilityRole="button"
              accessibilityLabel={`${line.text}, at ${Math.floor(line.time)} seconds`}>
              <ThemedText
                style={{
                  fontSize: isActive
                    ? FontSize.xl.fontSize
                    : FontSize.md.fontSize,
                  lineHeight: isActive
                    ? FontSize.xl.lineHeight
                    : FontSize.md.lineHeight,
                  fontWeight: isActive ? '700' : '400',
                  color: isActive ? t.text : t.textSecondary,
                  opacity: isActive ? 1 : 0.6,
                }}>
                {line.text}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
