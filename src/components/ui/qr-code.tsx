import React from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type QRCodeProps = {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
};

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function generateGrid(value: string, moduleCount: number): boolean[][] {
  const grid: boolean[][] = [];
  const seed = simpleHash(value);

  for (let y = 0; y < moduleCount; y++) {
    grid[y] = [];
    for (let x = 0; x < moduleCount; x++) {
      const idx = (y * moduleCount + x) * 31 + seed;
      const v = (idx * 17 + 13) % 100;
      grid[y][x] = v < 50;
    }
  }

  const size = Math.floor(moduleCount / 3);
  for (let i = 0; i < size; i++) {
    grid[i][i] = true;
    grid[i][moduleCount - 1 - i] = true;
    grid[moduleCount - 1 - i][i] = true;
    grid[moduleCount - 1 - i][moduleCount - 1 - i] = true;
  }

  return grid;
}

export function QRCode({
  value,
  size = 200,
  color,
  backgroundColor,
}: QRCodeProps) {
  const t = useTheme();
  const fg = color ?? t.text;
  const bg = backgroundColor ?? t.background;

  const moduleCount = 21;
  const grid = generateGrid(value, moduleCount);
  const moduleSize = size / moduleCount;

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        borderRadius: Radius.md,
        overflow: 'hidden',
      }}
      accessibilityRole="image"
      accessibilityLabel={`QR code for ${value}`}>
      <Svg width={size} height={size}>
        <Rect x={0} y={0} width={size} height={size} fill={bg} />
        {grid.map((row, y) =>
          row.map((filled, x) =>
            filled ? (
              <Rect
                key={`${y}-${x}`}
                x={x * moduleSize}
                y={y * moduleSize}
                width={moduleSize}
                height={moduleSize}
                fill={fg}
              />
            ) : null,
          ),
        )}
      </Svg>
    </View>
  );
}
