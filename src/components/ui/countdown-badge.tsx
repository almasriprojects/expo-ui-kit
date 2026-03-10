import React, { useEffect, useState } from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CountdownBadgeProps = {
  targetDate: Date;
  label?: string;
  variant?: 'pill' | 'card';
  onComplete?: () => void;
  style?: ViewStyle;
};

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, expired: diff <= 0 };
}

export function CountdownBadge({
  targetDate,
  label,
  variant = 'pill',
  onComplete,
  style,
}: CountdownBadgeProps) {
  const t = useTheme();
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft(targetDate);
      setTime(next);
      if (next.expired) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (variant === 'card') {
    const units = [
      { value: time.days, label: 'Days' },
      { value: time.hours, label: 'Hrs' },
      { value: time.minutes, label: 'Min' },
      { value: time.seconds, label: 'Sec' },
    ];

    return (
      <View style={style}>
        {label && (
          <Text style={{ fontSize: 14, fontWeight: '600', color: t.text, marginBottom: 12, textAlign: 'center' }}>
            {label}
          </Text>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
          {units.map((unit) => (
            <View
              key={unit.label}
              style={{
                backgroundColor: t.surface,
                borderRadius: Radius.lg,
                paddingVertical: 10,
                paddingHorizontal: 14,
                alignItems: 'center',
                minWidth: 56,
              }}>
              <Text style={{ fontSize: 22, fontWeight: '800', color: t.text }}>
                {String(unit.value).padStart(2, '0')}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: '600', color: t.textSecondary, marginTop: 2 }}>
                {unit.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  const parts: string[] = [];
  if (time.days > 0) parts.push(`${time.days}d`);
  parts.push(`${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          backgroundColor: t.errorSoft,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: Radius.full,
          alignSelf: 'flex-start',
        },
        style,
      ]}>
      <Text style={{ fontSize: 12, color: t.error }}>🔥</Text>
      {label && (
        <Text style={{ fontSize: 12, fontWeight: '600', color: t.error }}>{label}</Text>
      )}
      <Text style={{ fontSize: 13, fontWeight: '700', color: t.error, fontVariant: ['tabular-nums'] }}>
        {parts.join(' ')}
      </Text>
    </View>
  );
}
