import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';
import { Button } from './button';

export type ProfileHeaderStats = {
  /** Label text for the stat (e.g. "Followers") */
  label: string;
  /** Numeric or string value for the stat */
  value: string | number;
};

export type ProfileHeaderProps = {
  /** Display name of the profile owner */
  name: string;
  /** URL of the user's avatar image */
  avatar?: string;
  /** URL of the cover/banner image */
  coverImage?: string;
  /** Bio text displayed below the name */
  bio?: string;
  /** Array of profile statistics */
  stats?: ProfileHeaderStats[];
  /** Callback invoked when the edit profile button is pressed */
  onEditPress?: () => void;
  /** Callback invoked when the follow/unfollow button is pressed */
  onFollowPress?: () => void;
  /** Whether the current user is following this profile */
  isFollowing?: boolean;
};

const COVER_HEIGHT = 160;
const AVATAR_OVERLAP = 24;

export function ProfileHeader({
  name,
  avatar,
  coverImage,
  bio,
  stats = [],
  onEditPress,
  onFollowPress,
  isFollowing = false,
}: ProfileHeaderProps) {
  const t = useTheme();

  const showEdit = onEditPress != null;
  const showFollow = onFollowPress != null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.background }}
      contentContainerStyle={{ paddingBottom: 24 }}
      accessibilityLabel={`Profile of ${name}`}
    >
      {/* Cover image */}
      <View
        style={{
          height: COVER_HEIGHT,
          backgroundColor: t.surface,
          width: '100%',
        }}
        accessibilityRole="image"
        accessibilityLabel="Cover photo"
      >
        {coverImage ? (
          <Image
            source={{ uri: coverImage }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : null}
      </View>

      {/* Content area */}
      <View style={{ paddingHorizontal: 16, marginTop: -AVATAR_OVERLAP }}>
        {/* Avatar overlapping cover */}
        <View
          style={{
            alignSelf: 'flex-start',
            borderRadius: Radius.full,
            borderWidth: 3,
            borderColor: t.card,
            ...Shadows.md,
          }}
        >
          <Avatar
            source={avatar}
            initials={name.slice(0, 2).toUpperCase()}
            size="xl"
          />
        </View>

        {/* Name */}
        <Text
          style={{
            fontSize: FontSize['2xl'].fontSize,
            fontWeight: '700',
            color: t.text,
            marginTop: 12,
          }}
          accessibilityRole="header"
        >
          {name}
        </Text>

        {/* Bio */}
        {bio != null && bio.length > 0 && (
          <Text
            style={{
              fontSize: FontSize.md.fontSize,
              color: t.textSecondary,
              lineHeight: 22,
              marginTop: 6,
            }}
          >
            {bio}
          </Text>
        )}

        {/* Stats row */}
        {stats.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              gap: 24,
              marginTop: 16,
            }}
            accessibilityRole="summary"
          >
            {stats.map((stat) => (
              <View key={stat.label} accessibilityLabel={`${stat.value} ${stat.label}`}>
                <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text }}>
                  {stat.value}
                </Text>
                <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Edit or Follow button */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          {showEdit && (
            <Button
              title="Edit Profile"
              variant="outline"
              size="md"
              onPress={onEditPress}
              accessibilityLabel="Edit profile"
            />
          )}
          {showFollow && (
            <Button
              title={isFollowing ? 'Following' : 'Follow'}
              variant={isFollowing ? 'secondary' : 'primary'}
              size="md"
              onPress={onFollowPress}
              accessibilityLabel={isFollowing ? 'Unfollow' : 'Follow'}
              accessibilityState={{ selected: isFollowing }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
