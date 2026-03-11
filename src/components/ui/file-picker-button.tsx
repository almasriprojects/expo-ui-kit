import React from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { X } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FilePickerFile = {
  /** File name */
  name: string;
  /** File size in bytes */
  size?: number;
  /** MIME type of the file */
  type?: string;
};

export type FilePickerButtonProps = ViewProps & {
  /** Currently selected file */
  file?: FilePickerFile;
  /** Callback fired when the pick button is pressed */
  onPick: () => void;
  /** Callback fired when the remove button is pressed */
  onRemove?: () => void;
  /** Accepted file types hint text */
  accept?: string;
};

function formatSize(bytes?: number): string {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FilePickerButton({
  file,
  onPick,
  onRemove,
  accept,
  style,
  ...props
}: FilePickerButtonProps) {
  const t = useTheme();

  const handleRemove = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <View style={[{ gap: 8 }, style]} {...props}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={file ? `Change file: ${file.name}` : 'Pick file'}
        accessibilityHint={accept}
        onPress={onPick}
        style={({ pressed }) => ({
          minHeight: 80,
          padding: 16,
          borderRadius: Radius.lg,
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: t.border,
          backgroundColor: t.surface,
          opacity: pressed ? 0.8 : 1,
          ...Shadows.sm,
        })}>
        {file ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text
                numberOfLines={1}
                style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>
                {file.name}
              </Text>
              {(file.size != null || file.type) && (
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary, marginTop: 2 }}>
                  {[file.type, formatSize(file.size)].filter(Boolean).join(' • ')}
                </Text>
              )}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Remove file"
              onPress={handleRemove}
              style={{
                width: 32,
                height: 32,
                borderRadius: Radius.full,
                backgroundColor: t.primarySoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <X size={16} color={t.primary} />
            </Pressable>
          </View>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
            <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary, marginBottom: 4 }}>
              Tap to upload
            </Text>
            {accept && (
              <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary }}>{accept}</Text>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}
