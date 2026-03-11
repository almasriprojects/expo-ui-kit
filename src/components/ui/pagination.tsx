import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PaginationProps = {
  /** Total number of pages */
  total: number;
  /** Zero-based index of the current page */
  current: number;
  /** Callback invoked when a page is selected */
  onPageChange: (page: number) => void;
  /** Visual variant of the pagination control */
  variant?: 'dots' | 'numbers';
  /** Custom styles applied to the pagination container */
  style?: ViewStyle;
};

export function Pagination({
  total,
  current,
  onPageChange,
  variant = 'dots',
  style,
}: PaginationProps) {
  const t = useTheme();

  if (variant === 'dots') {
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, style]}>
        {Array.from({ length: total }, (_, i) => {
          const active = i === current;
          return (
            <Pressable
              key={i}
              onPress={() => onPageChange(i)}
              style={{
                width: active ? 24 : 8,
                height: 8,
                borderRadius: Radius.full,
                backgroundColor: active ? t.primary : t.surfaceActive,
              }}
            />
          );
        })}
      </View>
    );
  }

  const maxVisible = 5;
  let start = Math.max(0, current - Math.floor(maxVisible / 2));
  const end = Math.min(total, start + maxVisible);
  if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

  const pages = Array.from({ length: end - start }, (_, i) => start + i);

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }, style]}>
      <Pressable
        onPress={() => current > 0 && onPageChange(current - 1)}
        disabled={current === 0}
        style={{
          width: 36,
          height: 36,
          borderRadius: Radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: current === 0 ? 0.3 : 1,
        }}>
        <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text }}>‹</Text>
      </Pressable>

      {start > 0 && (
        <>
          <PageButton page={0} active={false} onPress={() => onPageChange(0)} />
          {start > 1 && <Text style={{ color: t.textTertiary, fontSize: FontSize.md.fontSize }}>…</Text>}
        </>
      )}

      {pages.map((page) => (
        <PageButton
          key={page}
          page={page}
          active={page === current}
          onPress={() => onPageChange(page)}
        />
      ))}

      {end < total && (
        <>
          {end < total - 1 && <Text style={{ color: t.textTertiary, fontSize: FontSize.md.fontSize }}>…</Text>}
          <PageButton page={total - 1} active={false} onPress={() => onPageChange(total - 1)} />
        </>
      )}

      <Pressable
        onPress={() => current < total - 1 && onPageChange(current + 1)}
        disabled={current === total - 1}
        style={{
          width: 36,
          height: 36,
          borderRadius: Radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: current === total - 1 ? 0.3 : 1,
        }}>
        <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text }}>›</Text>
      </Pressable>
    </View>
  );
}

function PageButton({ page, active, onPress }: { page: number; active: boolean; onPress: () => void }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 36,
        height: 36,
        borderRadius: Radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? t.primary : 'transparent',
      }}>
      <Text
        style={{
          fontSize: FontSize.md.fontSize,
          fontWeight: active ? '700' : '500',
          color: active ? t.primaryForeground : t.text,
        }}>
        {page + 1}
      </Text>
    </Pressable>
  );
}
