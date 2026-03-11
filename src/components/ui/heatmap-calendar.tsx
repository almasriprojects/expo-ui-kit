import React from 'react';
import { Text, View } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HeatmapCalendarProps = {
  /** Map of date strings (YYYY-MM-DD) to activity values */
  data: Record<string, number>;
  /** Reference date to calculate the calendar range from */
  startDate?: Date;
  /** Number of weeks to display */
  weeks?: number;
  /** Array of colors from lowest to highest activity */
  colorScale?: string[];
  /** Accessibility label for the calendar container */
  accessibilityLabel?: string;
  /** Accessibility hint for the calendar container */
  accessibilityHint?: string;
};

const DAY_LABELS = ['', 'M', '', 'W', '', 'F', ''];

export function HeatmapCalendar({
  data,
  startDate = new Date(),
  weeks = 30,
  colorScale,
  accessibilityLabel,
  accessibilityHint,
}: HeatmapCalendarProps) {
  const t = useTheme();
  const defaultScale = [t.surface, t.surfaceActive, t.primary];
  const scale = colorScale ?? defaultScale;

  const cellSize = 12;
  const gap = 3;
  const labelWidth = 16;
  const monthHeight = 14;

  const totalDays = weeks * 7;
  const maxVal = Math.max(...Object.values(data), 1);

  const getDateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const getColor = (val: number) => {
    if (val <= 0) return scale[0];
    const idx = Math.min(scale.length - 1, Math.ceil((val / maxVal) * scale.length));
    return scale[idx];
  };

  const start = new Date(startDate);
  start.setDate(start.getDate() - totalDays);

  const dayLabels = (
    <View style={{ width: labelWidth, marginTop: monthHeight + gap, gap }}>
      {DAY_LABELS.map((l, i) => (
        <View key={i} style={{ height: cellSize, justifyContent: 'center' }}>
          {l ? (
            <Text style={{ fontSize: FontSize['2xs'].fontSize, color: t.textTertiary }}>{l}</Text>
          ) : (
            <View />
          )}
        </View>
      ))}
    </View>
  );

  const grid: { date: Date; val: number }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: { date: Date; val: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const key = getDateKey(date);
      col.push({ date, val: data[key] ?? 0 });
    }
    grid.push(col);
  }

  const monthLabels: { month: string; col: number }[] = [];
  let lastMonth = '';
  grid.forEach((col, colIdx) => {
    const first = col[0];
    const m = first.date.toLocaleDateString('en', { month: 'short' });
    if (m !== lastMonth) {
      monthLabels.push({ month: m, col: colIdx });
      lastMonth = m;
    }
  });

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Contribution heatmap calendar'}
      accessibilityHint={accessibilityHint}
      style={{ flexDirection: 'row' }}>
      <View style={{ marginBottom: monthHeight + gap }}>{dayLabels}</View>
      <View>
        <View style={{ flexDirection: 'row', marginBottom: gap, marginLeft: gap }}>
          {monthLabels.map(({ month, col }) => (
            <View
              key={month}
              style={{
                position: 'absolute',
                left: col * (cellSize + gap),
                width: 40,
              }}>
              <Text style={{ fontSize: FontSize['2xs'].fontSize, color: t.textTertiary }}>{month}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap }}>
          {grid.map((col, colIdx) => (
            <View key={colIdx} style={{ gap }}>
              {col.map((cell, rowIdx) => (
                <View
                  key={`${colIdx}-${rowIdx}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderRadius: Radius.xs,
                    backgroundColor: getColor(cell.val),
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
