import React, { type ReactNode } from 'react';
import { Linking, View } from 'react-native';
import { Smartphone } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';

import { Button } from './button';
import { ThemedText } from '@/components/themed-text';
import { FontSize } from '@/constants/theme';

export type UpdateRequiredScreenProps = {
  /** Title text displayed on the update screen */
  title?: string;
  /** Descriptive message explaining the required update */
  message?: string;
  /** URL to open the app store for updating */
  updateUrl?: string;
  /** Callback invoked when the update button is pressed */
  onUpdate?: () => void;
  /** Custom icon element replacing the default icon */
  icon?: ReactNode;
};

export function UpdateRequiredScreen({
  title = 'Update Required',
  message = 'A new version of the app is available. Please update to continue.',
  updateUrl,
  onUpdate,
  icon,
}: UpdateRequiredScreenProps) {
  const t = useTheme();

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate();
    } else if (updateUrl) {
      Linking.openURL(updateUrl);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        backgroundColor: t.background,
      }}
      accessibilityLabel={title}
      accessibilityRole="summary">
      <View style={{ marginBottom: 24 }}>
        {icon ?? <Smartphone size={64} color={t.primary} />}
      </View>
      <ThemedText
        style={{
          fontSize: FontSize['2xl'].fontSize,
          fontWeight: '700',
          color: t.text,
          textAlign: 'center',
          marginBottom: 12,
        }}>
        {title}
      </ThemedText>
      <ThemedText
        style={{
          fontSize: FontSize.lg.fontSize,
          color: t.textSecondary,
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 32,
        }}>
        {message}
      </ThemedText>
      <Button
        title="Update Now"
        onPress={handleUpdate}
        accessibilityLabel="Update now"
      />
    </View>
  );
}
