import React, { type ReactNode, useState } from 'react';
import { View } from 'react-native';

export type ResponsiveGridProps = {
  children: ReactNode;
  minColumnWidth?: number;
  gap?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function ResponsiveGrid({
  children,
  minColumnWidth = 120,
  gap = 12,
  accessibilityLabel,
  accessibilityHint,
}: ResponsiveGridProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const columns = Math.max(
    1,
    Math.floor((containerWidth + gap) / (minColumnWidth + gap))
  );
  const cellWidth =
    containerWidth > 0
      ? (containerWidth - (columns - 1) * gap) / columns
      : minColumnWidth;

  const childArray = React.Children.toArray(children);

  return (
    <View
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={{ flex: 1 }}
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Responsive grid'}
      accessibilityHint={accessibilityHint}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -gap / 2,
        }}
      >
        {childArray.map((child, index) => (
          <View
            key={index}
            style={{
              width: cellWidth,
              marginHorizontal: gap / 2,
              marginBottom: gap,
            }}
          >
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}
