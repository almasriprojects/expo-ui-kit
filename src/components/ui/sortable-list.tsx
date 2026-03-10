import React, { type ReactNode, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SortableListItem = {
  key: string;
  label: string;
};

export type SortableListProps = {
  data: SortableListItem[];
  onReorder: (data: SortableListItem[]) => void;
  renderItem?: (item: SortableListItem) => ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function SortableList({
  data,
  onReorder,
  renderItem,
  accessibilityLabel,
  accessibilityHint,
}: SortableListProps) {
  const t = useTheme();
  const [order, setOrder] = useState<SortableListItem[]>(data);
  const [grabbedKey, setGrabbedKey] = useState<string | null>(null);

  useEffect(() => {
    setOrder(data);
  }, [data]);

  const handleLongPress = (key: string) => {
    setGrabbedKey(key);
  };

  const handlePress = (targetKey: string) => {
    if (!grabbedKey || grabbedKey === targetKey) {
      if (grabbedKey) setGrabbedKey(null);
      return;
    }
    const fromIdx = order.findIndex((i) => i.key === grabbedKey);
    const toIdx = order.findIndex((i) => i.key === targetKey);
    if (fromIdx === -1 || toIdx === -1) {
      setGrabbedKey(null);
      return;
    }
    const next = [...order];
    const [removed] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, removed);
    setOrder(next);
    onReorder(next);
    setGrabbedKey(null);
  };

  const sortedData = order.length > 0 ? order : data;

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `Sortable list with ${sortedData.length} items`}
      accessibilityHint={accessibilityHint ?? 'Long press an item to grab, then tap another to reorder'}>
      <View style={{ gap: 8 }}>
        {sortedData.map((item) => (
          <Pressable
            key={item.key}
            onLongPress={() => handleLongPress(item.key)}
            onPress={() => handlePress(item.key)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: grabbedKey === item.key ? t.primarySoft : t.surface,
              borderRadius: Radius.md,
              padding: 12,
              borderWidth: 1,
              borderColor: grabbedKey === item.key ? t.primary : t.border,
              opacity: pressed ? 0.9 : 1,
            })}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityHint="Long press to reorder">
            <Text
              style={{
                fontSize: 18,
                color: t.textSecondary,
                marginRight: 12,
              }}
              accessibilityElementsHidden>
              ≡
            </Text>
            {renderItem ? (
              renderItem(item)
            ) : (
              <Text style={{ fontSize: 15, color: t.text, flex: 1 }}>{item.label}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
