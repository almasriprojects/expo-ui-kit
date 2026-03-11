import React, { useEffect, useState } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CountdownTimerProps = ViewProps & {
  /** Target date for the countdown */
  targetDate: Date;
  /** Callback fired when the countdown reaches zero */
  onComplete?: () => void;
  /** Optional label displayed above the timer */
  label?: string;
  /** Visual size variant of the timer */
  variant?: 'default' | 'compact' | 'large';
};

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

export function CountdownTimer({
  targetDate,
  onComplete,
  label,
  variant = 'default',
  ...props
}: CountdownTimerProps) {
  const theme = useTheme();
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft(targetDate);
      setTime(t);
      if (t.total <= 0) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ];

  if (variant === 'compact') {
    const parts = [
      time.days > 0 ? `${time.days}d` : null,
      `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`,
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <View {...props}>
        {label && (
          <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, marginBottom: 4 }}>
            {label}
          </ThemedText>
        )}
        <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', fontVariant: ['tabular-nums'], color: theme.text }}>
          {parts}
        </Text>
      </View>
    );
  }

  const fontSize = variant === 'large' ? 32 : 22;
  const boxSize = variant === 'large' ? 72 : 56;

  return (
    <View {...props}>
      {label && (
        <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, marginBottom: 10, textAlign: 'center' }}>
          {label}
        </ThemedText>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        {units.map((u) => (
          <View key={u.label} style={{ alignItems: 'center' }}>
            <View
              style={{
                width: boxSize,
                height: boxSize,
                borderRadius: Radius.xl,
                backgroundColor: theme.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize,
                  fontWeight: '700',
                  fontVariant: ['tabular-nums'],
                  color: theme.text,
                }}>
                {u.value.toString().padStart(2, '0')}
              </Text>
            </View>
            <ThemedText
              style={{
                fontSize: FontSize['2xs'].fontSize,
                fontWeight: '600',
                color: theme.textSecondary,
                marginTop: 4,
                textTransform: 'uppercase',
              }}>
              {u.label}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}
