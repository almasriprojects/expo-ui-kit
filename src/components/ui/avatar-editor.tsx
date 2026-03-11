import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Camera } from 'lucide-react-native';

import { Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

export type AvatarEditorProps = {
  /** URL of the current avatar image */
  source?: string;
  /** Initials displayed when no image is set */
  initials?: string;
  /** Size preset for the avatar */
  size?: 'md' | 'lg' | 'xl';
  /** Callback invoked when the edit button is pressed */
  onEdit: () => void;
  /** Callback invoked to remove the current photo */
  onRemove?: () => void;
  /** Custom styles for the outer container */
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
          <Camera size={editDim * 0.4} color={t.primaryForeground} />
        </Pressable>
      </View>
      {onRemove && source && (
        <Pressable onPress={onRemove}>
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.error }}>Remove photo</Text>
        </Pressable>
      )}
    </View>
  );
}
