import React, { type ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type TimelineItem = {
  title: string;
  description?: string;
  time?: string;
  icon?: ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
};

type TimelineProps = ViewProps & {
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
                  borderRadius: 7,
                  backgroundColor: config.bg,
                  borderWidth: 2,
                  borderColor: config.border,
                  zIndex: 1,
                  marginTop: 4,
                }}>
                {status === 'completed' && (
                  <ThemedText
                    style={{
                      color: theme.primaryForeground,
                      fontSize: 8,
                      fontWeight: '700',
                      textAlign: 'center',
                      lineHeight: 10,
                    }}>
                    ✓
                  </ThemedText>
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
                    fontSize: 14,
                    fontWeight: status === 'upcoming' ? '400' : '600',
                    opacity: status === 'upcoming' ? 0.6 : 1,
                    flex: 1,
                    color: theme.text,
                  }}>
                  {item.title}
                </Text>
                {item.time && (
                  <ThemedText style={{ fontSize: 12, color: theme.textSecondary, marginLeft: 8 }}>
                    {item.time}
                  </ThemedText>
                )}
              </View>
              {item.description && (
                <ThemedText
                  style={{
                    fontSize: 13,
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
