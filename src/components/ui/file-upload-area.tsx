import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FileUploadAreaProps = {
  onPress: () => void;
  label?: string;
  hint?: string;
  icon?: string;
  fileName?: string;
  fileSize?: string;
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function FileUploadArea({
  onPress,
  label = 'Upload File',
  hint = 'Tap to browse or drag & drop',
  icon = '📂',
  fileName,
  fileSize,
  error,
  disabled = false,
  style,
}: FileUploadAreaProps) {
  const t = useTheme();
  const hasFile = !!fileName;

  if (hasFile) {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 14,
            borderRadius: Radius.xl,
            backgroundColor: t.surface,
            borderWidth: 1,
            borderColor: t.border,
          },
          style,
        ]}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: Radius.lg,
            backgroundColor: t.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 20 }}>📎</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }} numberOfLines={1}>
            {fileName}
          </Text>
          {fileSize && (
            <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{fileSize}</Text>
          )}
        </View>
        <Pressable onPress={onPress}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.error }}>Remove</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={{
          borderWidth: 2,
          borderColor: error ? t.error : t.border,
          borderStyle: 'dashed',
          borderRadius: Radius.xl,
          paddingVertical: 32,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.surface,
          opacity: disabled ? 0.5 : 1,
        }}>
        <Text style={{ fontSize: 32, marginBottom: 8 }}>{icon}</Text>
        <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>{label}</Text>
        <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 4, textAlign: 'center' }}>
          {hint}
        </Text>
      </Pressable>
      {error && (
        <Text style={{ fontSize: 12, color: t.error, marginTop: 6, fontWeight: '500' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
