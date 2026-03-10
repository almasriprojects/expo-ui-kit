import React, { type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

type AspectRatioProps = {
  ratio: number;
  children: ReactNode;
  style?: ViewStyle;
};

export function AspectRatio({ ratio, children, style }: AspectRatioProps) {
  return (
    <View style={[{ width: '100%', aspectRatio: ratio, overflow: 'hidden' }, style]}>
      {children}
    </View>
  );
}
