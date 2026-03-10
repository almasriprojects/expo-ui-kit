import React, { type ReactNode } from 'react';
import { View } from 'react-native';

export type VisuallyHiddenProps = {
  children: ReactNode;
};

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return (
    <View
      accessible={true}
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        overflow: 'hidden',
        opacity: 0,
      }}
      pointerEvents="none">
      {children}
    </View>
  );
}
