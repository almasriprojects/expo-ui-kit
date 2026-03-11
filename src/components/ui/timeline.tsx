import React, { type ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { Check } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TimelineItem = {
  /** Title text for the timeline event */
  title: string;
  /** Optional description for the event */
  description?: string;
  /** Timestamp string for the event */
  time?: string;
  /** Custom icon element for the timeline dot */
  icon?: ReactNode;
  /** Status of the timeline event */
  status?: 'completed' | 'current' | 'upcoming';
};

export type TimelineProps = ViewProps & {
  /** Array of timeline events to display */
  items: TimelineItem[];
};

export function Timeline({ items, ...props }: TimelineProps) {
  const theme = useTheme();

  const statusConfig = {
    completed: { bg: theme.success, border: theme.success, line: theme.success },
    current: { bg: theme.primaryPressed, border: theme.primaryPressed, line: theme.surfaceActive },
    upcoming: { bg: 'transparent', border: theme.surfaceActive, line: theme.surfaceActive },
  };

  return (
    <View {...props}>
      {items.map((item, i) => {
        const status = item.status ?? (i === 0 ? 'completed' : 'upcoming');
        const config = statusConfig[status];
        const isLast = i === items.length - 1;

        return (
          <View key={i} style={{ flexDirection: 'row', minHeight: 60 }}>
            {/* Line + dot */}
            <View style={{ width: 32, alignItems: 'center' }}>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: Radius.md,
                  backgroundColor: config.bg,
                  borderWidth: 2,
                  borderColor: config.border,
                  zIndex: 1,
                  marginTop: 4,
                }}>
                {status === 'completed' && (
                  <Check size={8} color={theme.primaryForeground} strokeWidth={3} />
                )}
              </View>
              {!isLast && (
                <View
                  style={{
                    flex: 1,
                    width: 2,
                    backgroundColor: config.line,
                    marginTop: -1,
                  }}
                />
              )}
            </View>

            {/* Content */}
            <View style={{ flex: 1, paddingBottom: isLast ? 0 : 20, paddingLeft: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text
                  style={{
                    fontSize: FontSize.md.fontSize,
                    fontWeight: status === 'upcoming' ? '400' : '600',
                    opacity: status === 'upcoming' ? 0.6 : 1,
                    flex: 1,
                    color: theme.text,
                  }}>
                  {item.title}
                </Text>
                {item.time && (
                  <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, marginLeft: 8 }}>
                    {item.time}
                  </ThemedText>
                )}
              </View>
              {item.description && (
                <ThemedText
                  style={{
                    fontSize: FontSize.sm.fontSize,
                    color: theme.textSecondary,
                    marginTop: 4,
                    opacity: status === 'upcoming' ? 0.5 : 1,
                  }}>
                  {item.description}
                </ThemedText>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
