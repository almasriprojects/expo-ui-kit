import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

export type StoryCircleProps = {
  /** URL of the avatar image */
  source?: string;
  /** Name displayed below the circle */
  name?: string;
  /** Whether the user has an unviewed story */
  hasStory?: boolean;
  /** Whether the story has been seen */
  seen?: boolean;
  /** Whether this is the current user's own story slot */
  isOwn?: boolean;
  /** Callback invoked when the circle is pressed */
  onPress?: () => void;
  /** Size variant of the story circle */
  size?: 'sm' | 'md' | 'lg';
  /** Custom styles applied to the container */
  style?: ViewStyle;
};

const dims = { sm: 52, md: 68, lg: 88 };
const borderW = { sm: 2, md: 2.5, lg: 3 };

export function StoryCircle({
  source,
  name,
  hasStory = true,
  seen = false,
  isOwn = false,
  onPress,
  size = 'md',
  style,
}: StoryCircleProps) {
  const t = useTheme();
  const dim = dims[size];
  const bw = borderW[size];
  const innerDim = dim - bw * 2 - 4;
  const avatarSize = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md';

  const gradientColors = seen
    ? [t.surfaceActive, t.surfaceActive] as [string, string]
    : (typeof t.storyGradient === 'string' ? [t.primary, t.primary] : t.storyGradient) as [string, string, ...string[]];

  return (
    <Pressable
      onPress={onPress}
      style={[{ alignItems: 'center', gap: 4 }, style]}>
      <View
        style={{
          width: dim,
          height: dim,
          borderRadius: Radius.full,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {hasStory ? (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: dim,
              height: dim,
              borderRadius: Radius.full,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: innerDim,
                height: innerDim,
                borderRadius: Radius.full,
                backgroundColor: t.background,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
              }}>
              <Avatar source={source} initials={name?.[0]} size={avatarSize} />
            </View>
          </LinearGradient>
        ) : (
          <View
            style={{
              width: dim,
              height: dim,
              borderRadius: Radius.full,
              borderWidth: 1,
              borderColor: t.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Avatar source={source} initials={name?.[0]} size={avatarSize} />
          </View>
        )}
        {isOwn && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 20,
              height: 20,
              borderRadius: Radius.full,
              backgroundColor: t.primary,
              borderWidth: 2,
              borderColor: t.background,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '700', color: t.primaryForeground }}>+</Text>
          </View>
        )}
      </View>
      {name && (
        <Text
          style={{ fontSize: size === 'sm' ? FontSize['2xs'].fontSize : FontSize.xs.fontSize, color: t.text, textAlign: 'center' }}
          numberOfLines={1}>
          {name}
        </Text>
      )}
    </Pressable>
  );
}
