import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

import { FontSize, Fonts, Radius, Shadows } from '@/constants/theme';

export type ErrorBoundaryProps = {
  /** Child components to wrap with the error boundary */
  children: ReactNode;
  /** Custom fallback UI rendered when an error is caught */
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#0f0f0f',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
          }}>
          <View
            style={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: '#1a1a1a',
              borderRadius: Radius['2xl'],
              padding: 28,
              ...Shadows.xl,
            }}>
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
              <AlertTriangle size={40} color="#ef4444" />
            </View>
            <Text
              style={{
                fontSize: FontSize.xl.fontSize,
                fontWeight: '700',
                color: '#fff',
                textAlign: 'center',
                marginBottom: 8,
              }}>
              Something went wrong
            </Text>
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
                color: '#999',
                textAlign: 'center',
                marginBottom: 20,
                lineHeight: 20,
              }}>
              The app hit an unexpected error. You can try again or restart the app.
            </Text>

            {this.state.error && (
              <ScrollView
                style={{
                  maxHeight: 120,
                  backgroundColor: '#111',
                  borderRadius: Radius.lg,
                  padding: 12,
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: FontSize.sm.fontSize,
                    color: '#ef4444',
                    fontFamily: Fonts?.mono ?? 'monospace',
                  }}>
                  {this.state.error.message}
                </Text>
              </ScrollView>
            )}

            <Pressable
              onPress={this.reset}
              accessibilityRole="button"
              accessibilityLabel="Try again"
              style={{
                backgroundColor: '#fff',
                borderRadius: Radius.lg,
                paddingVertical: 14,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: '#000' }}>
                Try Again
              </Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}
