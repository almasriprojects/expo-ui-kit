import React from 'react';
import { Image } from 'expo-image';
import { Pressable, Text, View, type ViewProps } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ImagePickerButtonProps = ViewProps & {
  uri?: string;
  onPick: (uri: string) => void;
  onRemove?: () => void;
  placeholder?: string;
  size?: number;
};

export function ImagePickerButton({
  uri,
  onPick,
  onRemove,
  placeholder = 'Tap to add image',
  size = 120,
  style,
  ...props
}: ImagePickerButtonProps) {
  const t = useTheme();

  const handlePress = () => {
    onPick('file://placeholder-image');
  };

  const handleRemove = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <View style={[{ alignItems: 'flex-start' }, style]} {...props}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={uri ? 'Change image' : 'Add image'}
        onPress={handlePress}
        style={({ pressed }) => ({
          width: size,
          height: size,
          borderRadius: Radius.lg,
          borderWidth: 1.5,
          borderColor: t.border,
          backgroundColor: t.surface,
          overflow: 'hidden',
          opacity: pressed ? 0.8 : 1,
          ...Shadows.sm,
        })}>
        {uri ? (
          <View style={{ flex: 1, position: 'relative' }}>
            <Image
              source={{ uri }}
              style={{ width: size, height: size }}
              contentFit="cover"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Remove image"
              onPress={handleRemove}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 28,
                height: 28,
                borderRadius: Radius.full,
                backgroundColor: t.overlay,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: t.textOnColor, fontSize: 14, fontWeight: '700' }}>×</Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: t.textTertiary,
                textAlign: 'center',
              }}>
              {placeholder}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
