import React, { type ReactNode } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ScrollAreaProps = ScrollViewProps & {
  /** Content rendered inside the scrollable area */
  children: ReactNode;
  /** Maximum height constraint for the scroll area */
  maxHeight?: number;
};

export function ScrollArea({ children, maxHeight, style, ...props }: ScrollAreaProps) {
  const t = useTheme();
  return (
    <ScrollView
      style={[{ maxHeight, backgroundColor: t.background, borderRadius: Radius.lg }, style]}
      showsVerticalScrollIndicator
      indicatorStyle="default"
      {...props}>
      {children}
    </ScrollView>
  );
}
