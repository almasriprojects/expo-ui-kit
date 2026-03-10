import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';
import { Button } from './button';

export type ProfileHeaderStats = {
  label: string;
  value: string | number;
};

export type ProfileHeaderProps = {
  name: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  stats?: ProfileHeaderStats[];
  onEditPress?: () => void;
  onFollowPress?: () => void;
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
            fontSize: 22,
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
              fontSize: 15,
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
                <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }}>
                  {stat.value}
                </Text>
                <Text style={{ fontSize: 13, color: t.textSecondary }}>{stat.label}</Text>
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
