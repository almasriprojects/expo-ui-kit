import React from 'react';
import { Image } from 'expo-image';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ActivityFeedItem = {
  key: string;
  avatar?: string;
  title: string;
  subtitle?: string;
  time: string;
  icon?: string;
};

export type ActivityFeedProps = {
  items: ActivityFeedItem[];
  onItemPress?: (key: string) => void;
  style?: ViewStyle;
};

export function ActivityFeed({
  items,
  onItemPress,
  style,
}: ActivityFeedProps) {
  const t = useTheme();

  return (
    <View style={[{ gap: 0 }, style]} accessibilityRole="list">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;

        return (
          <Pressable
            key={item.key}
            onPress={() => onItemPress?.(item.key)}
            style={{
              flexDirection: 'row',
              paddingVertical: 12,
              paddingLeft: 0,
            }}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}${item.subtitle ? `, ${item.subtitle}` : ''}`}
            accessibilityHint={item.time}>
            {/* Timeline line + avatar */}
            <View style={{ width: 48, alignItems: 'center' }}>
              {item.avatar ? (
                <Image
                  source={{ uri: item.avatar }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: Radius.full,
                  }}
                  contentFit="cover"
                />
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: Radius.full,
                    backgroundColor: t.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.icon ? (
                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: t.primaryForeground,
                      }}>
                      {item.title.charAt(0).toUpperCase()}
                    </Text>
                  )}
                </View>
              )}
              {!isLast && (
                <View
                  style={{
                    flex: 1,
                    width: 2,
                    backgroundColor: t.border,
                    marginTop: 8,
                    minHeight: 24,
                  }}
                />
              )}
            </View>

            {/* Content */}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: t.text,
                    flex: 1,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: t.textTertiary,
                    marginLeft: 8,
                  }}>
                  {item.time}
                </Text>
              </View>
              {item.subtitle && (
                <Text
                  style={{
                    fontSize: 13,
                    color: t.textSecondary,
                    marginTop: 2,
                  }}>
                  {item.subtitle}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
