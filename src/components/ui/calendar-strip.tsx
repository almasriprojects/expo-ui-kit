import React, { useRef } from 'react';
import { Pressable, ScrollView, Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CalendarStripProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  daysToShow?: number;
  startDate?: Date;
  markedDates?: string[];
  style?: ViewStyle;
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function CalendarStrip({
  selectedDate,
  onDateSelect,
  daysToShow = 14,
  startDate,
  markedDates = [],
  style,
}: CalendarStripProps) {
  const t = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const today = new Date();
  const start = startDate ?? new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);

  const dates: Date[] = [];
  for (let i = 0; i < daysToShow; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }

  const markedSet = new Set(markedDates);

  return (
    <View style={style}>
      <Text style={{ fontSize: 16, fontWeight: '700', color: t.text, marginBottom: 12 }}>
        {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
      </Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}>
        {dates.map((date) => {
          const selected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);
          const marked = markedSet.has(toDateKey(date));

          return (
            <Pressable
              key={toDateKey(date)}
              onPress={() => onDateSelect(date)}
              style={{
                width: 50,
                paddingVertical: 10,
                borderRadius: Radius.xl,
                backgroundColor: selected ? t.primary : 'transparent',
                alignItems: 'center',
                gap: 4,
                borderWidth: isToday && !selected ? 1.5 : 0,
                borderColor: t.primary,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '500',
                  color: selected ? t.primaryForeground : t.textSecondary,
                }}>
                {DAY_NAMES[date.getDay()]}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: selected ? t.primaryForeground : t.text,
                }}>
                {date.getDate()}
              </Text>
              {marked && (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: Radius.full,
                    backgroundColor: selected ? t.primaryForeground : t.primary,
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
