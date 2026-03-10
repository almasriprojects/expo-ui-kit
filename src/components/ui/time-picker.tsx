import React, { useState } from 'react';
import { Modal, Pressable, View, type ViewProps } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TimePickerProps = ViewProps & {
  value?: { hours: number; minutes: number };
  onValueChange: (time: { hours: number; minutes: number }) => void;
  label?: string;
  placeholder?: string;
  is24Hour?: boolean;
};

export function TimePicker({
  value,
  onValueChange,
  label,
  placeholder = 'Select time...',
  is24Hour = false,
  style,
  ...props
}: TimePickerProps) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const [tempHours, setTempHours] = useState(value?.hours ?? 9);
  const [tempMinutes, setTempMinutes] = useState(value?.minutes ?? 0);
  const [isPM, setIsPM] = useState((value?.hours ?? 9) >= 12);

  const formatTime = (h: number, m: number) => {
    if (is24Hour) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const displayHours = is24Hour ? tempHours : tempHours % 12 || 12;

  const adjustHours = (delta: number) => {
    const max = is24Hour ? 23 : 12;
    const min = is24Hour ? 0 : 1;
    let next = displayHours + delta;
    if (next > max) next = min;
    if (next < min) next = max;
    if (!is24Hour) {
      setTempHours(isPM ? (next === 12 ? 12 : next) : (next === 12 ? 0 : next));
    } else {
      setTempHours(next);
    }
  };

  const adjustMinutes = (delta: number) => {
    let next = tempMinutes + delta;
    if (next >= 60) next = 0;
    if (next < 0) next = 55;
    setTempMinutes(next);
  };

  const confirm = () => {
    onValueChange({ hours: tempHours, minutes: tempMinutes });
    setOpen(false);
  };

  return (
    <View style={typeof style === 'object' ? style : undefined} {...props}>
      {label && (
        <ThemedText style={{ fontSize: 14, fontWeight: '600', color: t.text, marginBottom: 6 }}>
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
            fontSize: 15,
            color: value ? t.text : t.textTertiary,
          }}>
          {value ? formatTime(value.hours, value.minutes) : placeholder}
        </ThemedText>
        <ThemedText style={{ fontSize: 16 }}>🕐</ThemedText>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: t.overlay,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setOpen(false)}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: t.card,
              borderRadius: Radius['2xl'],
              padding: 24,
              width: 280,
              alignItems: 'center',
              ...Shadows.xl,
            }}>
            <ThemedText style={{ fontSize: 16, fontWeight: '700', marginBottom: 20, color: t.text }}>
              Select Time
            </ThemedText>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {/* Hours */}
              <View style={{ alignItems: 'center' }}>
                <Pressable onPress={() => adjustHours(1)} hitSlop={8} style={{ padding: 8 }}>
                  <ChevronUp size={20} color={t.text} />
                </Pressable>
                <View
                  style={{
                    backgroundColor: t.surface,
                    borderRadius: Radius.lg,
                    width: 64,
                    height: 64,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: t.border,
                  }}>
                  <ThemedText style={{ fontSize: 28, fontWeight: '700', color: t.text }}>
                    {displayHours.toString().padStart(2, '0')}
                  </ThemedText>
                </View>
                <Pressable onPress={() => adjustHours(-1)} hitSlop={8} style={{ padding: 8 }}>
                  <ChevronDown size={20} color={t.text} />
                </Pressable>
              </View>

              <ThemedText style={{ fontSize: 28, fontWeight: '700', color: t.text }}>:</ThemedText>

              {/* Minutes */}
              <View style={{ alignItems: 'center' }}>
                <Pressable onPress={() => adjustMinutes(5)} hitSlop={8} style={{ padding: 8 }}>
                  <ChevronUp size={20} color={t.text} />
                </Pressable>
                <View
                  style={{
                    backgroundColor: t.surface,
                    borderRadius: Radius.lg,
                    width: 64,
                    height: 64,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: t.border,
                  }}>
                  <ThemedText style={{ fontSize: 28, fontWeight: '700', color: t.text }}>
                    {tempMinutes.toString().padStart(2, '0')}
                  </ThemedText>
                </View>
                <Pressable onPress={() => adjustMinutes(-5)} hitSlop={8} style={{ padding: 8 }}>
                  <ChevronDown size={20} color={t.text} />
                </Pressable>
              </View>

              {/* AM/PM */}
              {!is24Hour && (
                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                  <Pressable
                    onPress={() => {
                      setIsPM(false);
                      setTempHours(tempHours >= 12 ? tempHours - 12 : tempHours);
                    }}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: Radius.md,
                      backgroundColor: !isPM ? t.primary : t.surface,
                      borderWidth: isPM ? 1 : 0,
                      borderColor: t.border,
                      marginBottom: 4,
                    }}>
                    <ThemedText
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: !isPM ? t.primaryForeground : t.textSecondary,
                      }}>
                      AM
                    </ThemedText>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setIsPM(true);
                      setTempHours(tempHours < 12 ? tempHours + 12 : tempHours);
                    }}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: Radius.md,
                      backgroundColor: isPM ? t.primary : t.surface,
                      borderWidth: !isPM ? 1 : 0,
                      borderColor: t.border,
                    }}>
                    <ThemedText
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: isPM ? t.primaryForeground : t.textSecondary,
                      }}>
                      PM
                    </ThemedText>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Actions */}
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                marginTop: 24,
                width: '100%',
              }}>
              <Pressable
                onPress={() => setOpen(false)}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: Radius.lg,
                  backgroundColor: t.surface,
                  borderWidth: 1,
                  borderColor: t.border,
                  alignItems: 'center',
                }}>
                <ThemedText style={{ fontWeight: '600', fontSize: 14, color: t.text }}>
                  Cancel
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={confirm}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: Radius.lg,
                  backgroundColor: t.primary,
                  alignItems: 'center',
                }}>
                <ThemedText style={{ color: t.primaryForeground, fontWeight: '600', fontSize: 14 }}>
                  Confirm
                </ThemedText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
