import React, { useMemo, useState } from 'react';
import { Modal, Pressable, View, type ViewProps } from 'react-native';

import { Calendar } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DatePickerProps = ViewProps & {
  /** Currently selected date */
  value?: Date;
  /** Callback fired when a date is selected */
  onValueChange: (date: Date) => void;
  /** Label text shown above the picker */
  label?: string;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker({
  value,
  onValueChange,
  label,
  placeholder = 'Select date...',
  minDate,
  maxDate,
  style,
  ...props
}: DatePickerProps) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ?? new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array.from({ length: firstDay }, () => 0);
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...dates];
  }, [year, month]);

  const changeMonth = (delta: number) => {
    setViewDate(new Date(year, month + delta, 1));
  };

  const isDisabled = (day: number) => {
    if (!day) return true;
    const d = new Date(year, month, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const isSelected = (day: number) => {
    if (!value || !day) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === month &&
      value.getFullYear() === year
    );
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const now = new Date();
    return now.getDate() === day && now.getMonth() === month && now.getFullYear() === year;
  };

  const formatted = value
    ? `${MONTHS[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`
    : null;

  return (
    <View style={typeof style === 'object' ? style : undefined} {...props}>
      {label && (
        <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text, marginBottom: 6 }}>
          {label}
        </ThemedText>
      )}
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 48,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          borderWidth: 1.5,
          borderColor: t.border,
        }}>
        <ThemedText
          style={{
            fontSize: FontSize.md.fontSize,
            color: formatted ? t.text : t.textTertiary,
          }}>
          {formatted ?? placeholder}
        </ThemedText>
        <Calendar size={FontSize.lg.fontSize} color={t.textSecondary} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: t.overlay,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
          }}
          onPress={() => setOpen(false)}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: t.card,
              borderRadius: Radius['2xl'],
              padding: 20,
              width: '100%',
              maxWidth: 380,
              ...Shadows.xl,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <Pressable onPress={() => changeMonth(-1)} hitSlop={8}>
                <ThemedText style={{ fontSize: FontSize.xl.fontSize, fontWeight: '600', color: t.text }}>‹</ThemedText>
              </Pressable>
              <ThemedText style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text }}>
                {MONTHS[month]} {year}
              </ThemedText>
              <Pressable onPress={() => changeMonth(1)} hitSlop={8}>
                <ThemedText style={{ fontSize: FontSize.xl.fontSize, fontWeight: '600', color: t.text }}>›</ThemedText>
              </Pressable>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {WEEKDAYS.map((d) => (
                <View key={d} style={{ flex: 1, alignItems: 'center' }}>
                  <ThemedText
                    style={{
                      fontSize: FontSize.sm.fontSize,
                      fontWeight: '600',
                      color: t.textSecondary,
                    }}>
                    {d}
                  </ThemedText>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {days.map((day, i) => {
                const disabled = isDisabled(day);
                const selected = isSelected(day);
                const today = isToday(day);
                return (
                  <View
                    key={i}
                    style={{ width: '14.28%', alignItems: 'center', marginBottom: 4 }}>
                    {day > 0 ? (
                      <Pressable
                        onPress={() => {
                          if (!disabled) {
                            onValueChange(new Date(year, month, day));
                            setOpen(false);
                          }
                        }}
                        disabled={disabled}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: Radius['2xl'],
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: selected ? t.primary : 'transparent',
                          borderWidth: today && !selected ? 1.5 : 0,
                          borderColor: t.primary,
                          opacity: disabled ? 0.3 : 1,
                        }}>
                        <ThemedText
                          style={{
                            fontSize: FontSize.md.fontSize,
                            fontWeight: selected || today ? '600' : '400',
                            color: selected ? t.primaryForeground : t.text,
                          }}>
                          {day}
                        </ThemedText>
                      </Pressable>
                    ) : (
                      <View style={{ width: 36, height: 36 }} />
                    )}
                  </View>
                );
              })}
            </View>

            <Pressable
              onPress={() => {
                const today = new Date();
                onValueChange(today);
                setOpen(false);
              }}
              style={{
                alignItems: 'center',
                paddingVertical: 10,
                marginTop: 8,
              }}>
              <ThemedText style={{ color: t.primary, fontWeight: '600', fontSize: FontSize.md.fontSize }}>
                Today
              </ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
