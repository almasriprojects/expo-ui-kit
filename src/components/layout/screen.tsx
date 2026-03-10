import React, { type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  type ScrollViewProps,
  View,
  type ViewStyle,
} from 'react-native';
import { type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

type ScreenProps = {
  children: ReactNode;
  /**
   * Safe area edges to apply. Defaults to `['top']` because the tab bar
   * already accounts for the bottom safe area. Pass `['top', 'bottom']` for
   * screens rendered outside a tab navigator (e.g. modals, stacks).
   */
  edges?: Edge[];
  /** Extra style applied to the outermost container. */
  style?: ViewStyle;
};

function useEdgeInsets(edges: Edge[]) {
  const insets = useSafeAreaInsets();
  return {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };
}

/**
 * Root wrapper for every screen. Fills the screen with the theme background
 * colour (including behind the status bar) and applies the correct safe-area
 * insets so content never sits under the notch or home indicator.
 */
export function Screen({ children, edges = ['top'], style }: ScreenProps) {
  const theme = useTheme();
  const edgeInsets = useEdgeInsets(edges);

  return (
    <View style={[{ flex: 1, backgroundColor: theme.background }, edgeInsets, style]}>
      {children}
    </View>
  );
}

type ScreenScrollViewProps = ScreenProps & {
  /** Style merged into ScrollView's `contentContainerStyle`. */
  contentContainerStyle?: ViewStyle;
  /** Props forwarded to the inner ScrollView. */
  scrollViewProps?: Omit<ScrollViewProps, 'contentContainerStyle'>;
  /** Avoid keyboard automatically. Defaults to `true` on iOS. */
  keyboardAvoiding?: boolean;
};

/**
 * Screen variant that wraps children in a themed, safe-area-aware ScrollView
 * with keyboard avoidance. Use this for the majority of tab screens.
 */
export function ScreenScrollView({
  children,
  edges = ['top'],
  style,
  contentContainerStyle,
  scrollViewProps,
  keyboardAvoiding = Platform.OS === 'ios',
}: ScreenScrollViewProps) {
  const theme = useTheme();
  const edgeInsets = useEdgeInsets(edges);

  const content = (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        { paddingHorizontal: 20, paddingBottom: 24 },
        contentContainerStyle,
      ]}
      {...scrollViewProps}>
      {children}
    </ScrollView>
  );

  return (
    <View style={[{ flex: 1, backgroundColor: theme.background }, edgeInsets, style]}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );
}
