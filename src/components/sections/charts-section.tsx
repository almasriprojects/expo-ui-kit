import React, { useMemo } from 'react';
import { View } from 'react-native';

import {
  AreaChart,
  BarChart,
  DonutChart,
  Gauge,
  HeatmapCalendar,
  HorizontalBarChart,
  LineChart,
  PieChart,
  Sparkline,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

import { Demo, SectionHeader } from './demo-helpers';

const BAR_CHART_DATA = [
  { label: 'Mon', value: 40 },
  { label: 'Tue', value: 65 },
  { label: 'Wed', value: 35 },
  { label: 'Thu', value: 80 },
  { label: 'Fri', value: 55 },
];

const LINE_CHART_DATA = [20, 45, 28, 80, 55, 43, 70];
const LINE_CHART_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const AREA_CHART_DATA = [10, 35, 25, 60, 45, 30, 55];

const SPARKLINE_DATA_1 = [12, 45, 28, 60, 38, 52, 40];
const SPARKLINE_DATA_2 = [80, 55, 70, 45, 65, 50, 72];
const SPARKLINE_DATA_3 = [30, 42, 35, 48, 40, 55, 45];

const HORIZONTAL_BAR_DATA = [
  { label: 'Product A', value: 85 },
  { label: 'Product B', value: 62 },
  { label: 'Product C', value: 93 },
  { label: 'Product D', value: 48 },
];

function useHeatmapData(): Record<string, number> {
  return useMemo(() => {
    const data: Record<string, number> = {};
    const start = new Date();
    start.setDate(start.getDate() - 12 * 7);
    for (let i = 0; i < 12 * 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      data[key] = Math.floor(Math.random() * 5);
    }
    return data;
  }, []);
}

export function ChartsSection() {
  const t = useTheme();
  const heatmapData = useHeatmapData();

  const pieData = useMemo(
    () => [
      { label: 'A', value: 30, color: t.primary },
      { label: 'B', value: 25, color: t.success },
      { label: 'C', value: 25, color: t.warning },
      { label: 'D', value: 20, color: t.error },
    ],
    [t.primary, t.success, t.warning, t.error]
  );

  const donutData = useMemo(
    () => [
      { label: 'A', value: 35, color: t.primary },
      { label: 'B', value: 28, color: t.success },
      { label: 'C', value: 22, color: t.warning },
      { label: 'D', value: 15, color: t.error },
    ],
    [t.primary, t.success, t.warning, t.error]
  );

  return (
    <>
      <SectionHeader title="Charts & Data Viz" category="Charts" />

      <Demo title="BarChart">
        <BarChart data={BAR_CHART_DATA} />
      </Demo>

      <Demo title="LineChart">
        <LineChart
          data={LINE_CHART_DATA}
          labels={LINE_CHART_LABELS}
          showDots
          showGrid
        />
      </Demo>

      <Demo title="AreaChart">
        <AreaChart data={AREA_CHART_DATA} height={180} />
      </Demo>

      <Demo title="PieChart">
        <PieChart data={pieData} />
      </Demo>

      <Demo title="DonutChart">
        <DonutChart
          data={donutData}
          centerLabel="Total"
          centerValue="1,240"
        />
      </Demo>

      <Demo title="Sparkline">
        <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
          <Sparkline data={SPARKLINE_DATA_1} width={80} height={30} />
          <Sparkline data={SPARKLINE_DATA_2} width={80} height={30} />
          <Sparkline data={SPARKLINE_DATA_3} width={80} height={30} />
        </View>
      </Demo>

      <Demo title="Gauge">
        <Gauge value={72} label="Performance" />
      </Demo>

      <Demo title="HorizontalBarChart">
        <HorizontalBarChart data={HORIZONTAL_BAR_DATA} />
      </Demo>

      <Demo title="HeatmapCalendar">
        <HeatmapCalendar data={heatmapData} weeks={12} />
      </Demo>
    </>
  );
}
