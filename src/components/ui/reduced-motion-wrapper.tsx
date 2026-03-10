import React, { type ReactNode } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

export type ReducedMotionWrapperProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ReducedMotionWrapper({ children, fallback }: ReducedMotionWrapperProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{fallback ?? children}</>;
  }

  return <>{children}</>;
}
