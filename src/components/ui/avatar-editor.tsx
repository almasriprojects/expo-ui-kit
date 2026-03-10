import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

type AvatarEditorProps = {
  source?: string;
  initials?: string;
  size?: 'md' | 'lg' | 'xl';
  onEdit: () => void;
  onRemove?: () => void;
  style?: ViewStyle;
};

const dims = { md: 80, lg: 100, xl: 130 };
const editDims = { md: 28, lg: 32, xl: 36 };

export function AvatarEditor({
  source,
  initials,
  size = 'lg',
  onEdit,
  onRemove,
  style,
}: AvatarEditorProps) {
  const t = useTheme();
  const dim = dims[size];
  const editDim = editDims[size];
  const avatarSize = size === 'xl' ? 'xl' : 'lg';

  return (
    <View style={[{ alignItems: 'center', gap: 12 }, style]}>
      <View style={{ width: dim, height: dim }}>
        <Avatar source={source} initials={initials} size={avatarSize} />
        <Pressable
          onPress={onEdit}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: editDim,
            height: editDim,
            borderRadius: Radius.full,
            backgroundColor: t.primary,
            borderWidth: 3,
            borderColor: t.background,
            alignItems: 'center',
            justifyContent: 'center',
            ...Shadows.sm,
          }}>
          <Text style={{ fontSize: editDim * 0.4, color: t.primaryForeground }}>📷</Text>
        </Pressable>
      </View>
      {onRemove && source && (
        <Pressable onPress={onRemove}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.error }}>Remove photo</Text>
        </Pressable>
      )}
    </View>
  );
}
