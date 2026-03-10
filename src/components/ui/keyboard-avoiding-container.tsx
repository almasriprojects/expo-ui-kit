import React, { type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  type KeyboardAvoidingViewProps,
} from 'react-native';

type KeyboardAvoidingContainerProps = KeyboardAvoidingViewProps & {
  children: ReactNode;
};

export function KeyboardAvoidingContainer({
  children,
  style,
  ...props
}: KeyboardAvoidingContainerProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[{ flex: 1 }, typeof style === 'object' ? style : undefined]}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
}
