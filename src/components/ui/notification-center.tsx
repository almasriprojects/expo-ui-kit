import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { X } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { IconButton } from './icon-button';
import { SwipeableRow } from './swipeable-row';

export type NotificationItem = {
  /** Unique identifier for the notification */
  key: string;
  /** Title text of the notification */
  title: string;
  /** Body message of the notification */
  message: string;
  /** Formatted timestamp string */
  time: string;
  /** Whether the notification has been read */
  read: boolean;
  /** Category used for filtering notifications */
  category?: string;
  /** Emoji icon displayed alongside the notification */
  icon?: string;
};

export type NotificationCenterProps = {
  /** Array of notification items to display */
  notifications: NotificationItem[];
  /** Category names used for tab-based filtering */
  categories?: string[];
  /** Callback invoked when a notification is pressed */
  onNotificationPress?: (key: string) => void;
  /** Callback invoked when a notification is dismissed */
  onDismiss?: (key: string) => void;
};

export function NotificationCenter({
  notifications,
  categories = [],
  onNotificationPress,
  onDismiss,
}: NotificationCenterProps) {
  const t = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const tabs = useMemo(() => ['All', ...categories], [categories]);

  const filteredNotifications = useMemo(() => {
    if (selectedCategory === 'All') return notifications;
    return notifications.filter((n) => n.category === selectedCategory);
  }, [notifications, selectedCategory]);

  const renderNotification = ({ item }: { item: NotificationItem }) => {
    const content = (
      <Pressable
        onPress={() => onNotificationPress?.(item.key)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title} ${item.message}`}
        accessibilityState={{ selected: !item.read }}
        style={{
          flexDirection: 'row',
          padding: 14,
          gap: 12,
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          borderLeftWidth: item.read ? 0 : 4,
          borderLeftColor: item.read ? 'transparent' : t.primarySoft,
        }}>
        {item.icon ? (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: Radius['2xl'],
              backgroundColor: t.cardPressed,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: FontSize.xl.fontSize }}>{item.icon}</Text>
          </View>
        ) : null}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
                fontWeight: item.read ? '400' : '700',
                flex: 1,
                marginRight: 8,
                color: t.text,
              }}
              numberOfLines={1}>
              {item.title}
            </Text>
            <ThemedText style={{ fontSize: FontSize.xs.fontSize, color: t.textSecondary }}>
              {item.time}
            </ThemedText>
          </View>
          <ThemedText
            style={{
              fontSize: FontSize.sm.fontSize,
              color: t.textSecondary,
              marginTop: 3,
              lineHeight: 18,
            }}
            numberOfLines={2}>
            {item.message}
          </ThemedText>
        </View>
        <IconButton
          icon={<X size={16} color={t.textSecondary} />}
          onPress={() => onDismiss?.(item.key)}
          accessibilityLabel="Dismiss notification"
          variant="ghost"
          size="sm"
        />
      </Pressable>
    );

    if (onDismiss) {
      return (
        <SwipeableRow
          rightActions={[
            {
              label: 'Dismiss',
              color: t.error,
              onPress: () => onDismiss(item.key),
              icon: X,
            },
          ]}>
          <View style={{ paddingVertical: 4, paddingHorizontal: 6 }}>
            {content}
          </View>
        </SwipeableRow>
      );
    }

    return (
      <View style={{ paddingVertical: 4, paddingHorizontal: 6 }}>{content}</View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 6,
          paddingBottom: 12,
        }}>
        {tabs.map((tab) => {
          const selected = selectedCategory === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setSelectedCategory(tab)}
              accessibilityRole="tab"
              accessibilityLabel={tab}
              accessibilityState={{ selected }}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: Radius.lg,
                backgroundColor: selected ? t.primarySoft : t.surface,
              }}>
              <ThemedText
                style={{
                  fontSize: FontSize.md.fontSize,
                  fontWeight: selected ? '600' : '400',
                  color: selected ? t.primary : t.textSecondary,
                }}>
                {tab}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.key}
        renderItem={renderNotification}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: 'center' }}>
            <ThemedText style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>
              No notifications
            </ThemedText>
          </View>
        }
        accessibilityLabel="Notification list"
      />
    </View>
  );
}
