import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Button } from './button';

export type LegalScreenProps = {
  /** Title displayed at the top of the legal document */
  title: string;
  /** Full text content of the legal document */
  content: string;
  /** Callback invoked when the user accepts the legal terms */
  onAccept?: () => void;
  /** Label text for the accept button */
  acceptLabel?: string;
};

export function LegalScreen({
  title,
  content,
  onAccept,
  acceptLabel = 'I Accept',
}: LegalScreenProps) {
  const t = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      accessibilityLabel="Legal document"
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: onAccept ? 100 : 48,
        }}
        accessibilityLabel={title}
      >
        <Text
          style={{
            fontSize: FontSize['2xl'].fontSize,
            fontWeight: '700',
            color: t.text,
            marginBottom: 20,
          }}
          accessibilityRole="header"
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: FontSize.md.fontSize,
            color: t.text,
            lineHeight: 24,
          }}
        >
          {content}
        </Text>
      </ScrollView>

      {onAccept != null && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            paddingBottom: Platform.OS === 'ios' ? 34 : 16,
            backgroundColor: t.background,
            borderTopWidth: 1,
            borderTopColor: t.border,
          }}
        >
          <Button
            title={acceptLabel}
            variant="primary"
            size="lg"
            onPress={onAccept}
            accessibilityLabel={acceptLabel}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
