import React, { useState, useMemo, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DateRangePickerProps = {
  /** Label text shown above the picker */
  label?: string;
  /** Start date of the selected range */
  startDate?: Date;
  /** End date of the selected range */
  endDate?: Date;
  /** Callback fired when the date range changes */
  onRangeChange: (start: Date | undefined, end: Date | undefined) => void;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, start: Date | undefined, end: Date | undefined): boolean {
  if (!start || !end) return false;
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return d > s && d < e;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: Date[] = [];
  const startOffset = first.getDay();
  const totalDays = last.getDate();

  for (let i = 0; i < startOffset; i++) {
    days.push(new Date(0));
  }
  for (let d = 1; d <= totalDays; d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export function DateRangePicker({
  label,
  startDate,
  endDate,
  onRangeChange,
  minDate,
  maxDate,
}: DateRangePickerProps) {
  const t = useTheme();
  const [activePill, setActivePill] = useState<'start' | 'end' | null>(null);
  const [viewMonth, setViewMonth] = useState(() => {
    const base = startDate ?? endDate ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => {
    if (activePill === 'start' && startDate) {
      setViewMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
    } else if (activePill === 'end' && (endDate ?? startDate)) {
      const d = endDate ?? startDate!;
      setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  }, [activePill, startDate, endDate]);

  const days = useMemo(
    () => getDaysInMonth(viewMonth.getFullYear(), viewMonth.getMonth()),
    [viewMonth]
  );

  const canGoPrev =
    !minDate ||
    viewMonth.getFullYear() > minDate.getFullYear() ||
    (viewMonth.getFullYear() === minDate.getFullYear() &&
      viewMonth.getMonth() > minDate.getMonth());

  const canGoNext =
    !maxDate ||
    viewMonth.getFullYear() < maxDate.getFullYear() ||
    (viewMonth.getFullYear() === maxDate.getFullYear() &&
      viewMonth.getMonth() < maxDate.getMonth());

  const isDisabled = (date: Date): boolean => {
    if (date.getTime() === 0) return true;
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()))
      return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()))
      return true;
    return false;
  };

  const handleDayPress = (date: Date) => {
    if (date.getTime() === 0 || isDisabled(date)) return;

    if (activePill === 'start') {
      if (endDate && date > endDate) {
        onRangeChange(date, undefined);
      } else {
        onRangeChange(date, endDate);
      }
      setActivePill('end');
    } else if (activePill === 'end') {
      if (startDate) {
        if (date < startDate) {
          onRangeChange(date, startDate);
        } else {
          onRangeChange(startDate, date);
        }
      } else {
        onRangeChange(undefined, date);
      }
      setActivePill(null);
    }
  };

  const handleClear = () => {
    onRangeChange(undefined, undefined);
    setActivePill(null);
  };

  const monthLabel = viewMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <View>
      {label && (
        <Text
          style={{
            ...FontSize.sm,
            fontWeight: '600',
            color: t.text,
            marginBottom: 8,
          }}>
          {label}
        </Text>
      )}

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Pressable
          onPress={() => setActivePill(activePill === 'start' ? null : 'start')}
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: Radius.full,
            backgroundColor: activePill === 'start' ? t.primarySoft : t.surface,
            borderWidth: 1,
            borderColor: activePill === 'start' ? t.primary : t.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FontSize.sm,
              color: startDate ? t.text : t.textSecondary,
              fontWeight: startDate ? '600' : '400',
            }}>
            {startDate ? formatDate(startDate) : 'Start Date'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActivePill(activePill === 'end' ? null : 'end')}
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: Radius.full,
            backgroundColor: activePill === 'end' ? t.primarySoft : t.surface,
            borderWidth: 1,
            borderColor: activePill === 'end' ? t.primary : t.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FontSize.sm,
              color: endDate ? t.text : t.textSecondary,
              fontWeight: endDate ? '600' : '400',
            }}>
            {endDate ? formatDate(endDate) : 'End Date'}
          </Text>
        </Pressable>
      </View>

      {activePill !== null && (
        <View
          style={{
            backgroundColor: t.card,
            borderRadius: Radius.lg,
            padding: 16,
            borderWidth: 1,
            borderColor: t.border,
            ...Shadows.md,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
            <Pressable
              onPress={() => canGoPrev && setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
              hitSlop={12}
              style={{
                padding: 8,
                opacity: canGoPrev ? 1 : 0.4,
              }}>
              <Text style={{ fontSize: FontSize.xl.fontSize, color: t.text, fontWeight: '600' }}>‹</Text>
            </Pressable>

            <Text style={{ ...FontSize.md, fontWeight: '600', color: t.text }}>
              {monthLabel}
            </Text>

            <Pressable
              onPress={() => canGoNext && setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
              hitSlop={12}
              style={{
                padding: 8,
                opacity: canGoNext ? 1 : 0.4,
              }}>
              <Text style={{ fontSize: FontSize.xl.fontSize, color: t.text, fontWeight: '600' }}>›</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            {WEEKDAYS.map((d, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...FontSize.xs,
                    color: t.textSecondary,
                    fontWeight: '600',
                  }}>
                  {d}
                </Text>
              </View>
            ))}
          </View>

          <View>
            {Array.from({ length: Math.ceil(days.length / 7) }, (_, rowIdx) => (
              <View
                key={rowIdx}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 2,
                }}>
                {Array.from({ length: 7 }, (_, colIdx) => {
                  const i = rowIdx * 7 + colIdx;
                  const date = days[i] ?? new Date(0);
                  const isEmpty = date.getTime() === 0;
                  const disabled = !isEmpty && isDisabled(date);
                  const selected =
                    !isEmpty &&
                    ((startDate && isSameDay(date, startDate)) ||
                      (endDate && isSameDay(date, endDate)));
                  const inRange = !isEmpty && isInRange(date, startDate, endDate);

                  return (
                    <Pressable
                      key={i}
                      onPress={() => handleDayPress(date)}
                      disabled={disabled || isEmpty}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {!isEmpty ? (
                        <View
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: Radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: selected
                              ? t.primary
                              : inRange
                                ? t.primarySoft
                                : 'transparent',
                            opacity: disabled ? 0.4 : 1,
                          }}>
                          <Text
                            style={{
                              ...FontSize.sm,
                              color: selected ? t.primaryForeground : t.text,
                              fontWeight: selected ? '600' : '400',
                            }}>
                            {date.getDate()}
                          </Text>
                        </View>
                      ) : (
                        <View style={{ width: 36, height: 36 }} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>

          <Pressable
            onPress={handleClear}
            style={{
              marginTop: 12,
              paddingVertical: 8,
              alignItems: 'center',
              borderRadius: Radius.md,
              backgroundColor: t.surface,
            }}>
            <Text style={{ ...FontSize.sm, color: t.textSecondary, fontWeight: '500' }}>
              Clear
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
