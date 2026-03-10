import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  Avatar,
  AvatarGroup,
  CommentCard,
  Divider,
  FollowButton,
  PostCard,
  ProfileCard,
  SearchBar,
  Separator,
  StatusIndicator,
  StoryCircle,
  VerificationBadge,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export function SocialDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [follow1, setFollow1] = useState(false);
  const [follow2, setFollow2] = useState(true);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search people, posts..." />

      <Separator label="Stories" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        <StoryCircle name="Your Story" isOwn hasStory={false} />
        <StoryCircle name="Sarah" hasStory />
        <StoryCircle name="Alex" hasStory />
        <StoryCircle name="Mike" hasStory seen />
        <StoryCircle name="Luna" hasStory />
        <StoryCircle name="Chris" hasStory seen />
      </ScrollView>

      <Separator label="Feed" />
      <PostCard
        author="Sarah Chen"
        verified
        time="2h ago"
        text="Just shipped our new design system! 140+ components and counting 🚀"
        image
        likes={142}
        comments={23}
        shares={8}
      />

      <PostCard
        author="Alex Kim"
        time="5h ago"
        text="Beautiful sunset from my balcony today 🌅"
        likes={89}
        comments={12}
      />

      <Separator label="Profile" />
      <ProfileCard
        name="Sarah Chen"
        subtitle="Design Engineer"
        stats={[
          { label: 'Posts', value: '234' },
          { label: 'Followers', value: '12.4K' },
          { label: 'Following', value: '842' },
        ]}
        action={{ label: 'Follow', onPress: () => {} }}
      />

      <Separator label="Suggested" />
      {[
        { name: 'Mike Johnson', handle: '@mikej', verified: true, state: follow1, set: setFollow1 },
        { name: 'Luna Park', handle: '@lunapark', verified: false, state: follow2, set: setFollow2 },
      ].map((user) => (
        <View
          key={user.handle}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 10,
          }}>
          <Avatar initials={user.name[0]} size="md" />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{user.name}</Text>
              {user.verified && <VerificationBadge size="sm" />}
            </View>
            <Text style={{ fontSize: 12, color: t.textSecondary }}>{user.handle}</Text>
          </View>
          <FollowButton following={user.state} onToggle={user.set} size="sm" />
        </View>
      ))}

      <Separator label="Comments" />
      <CommentCard
        author="Sarah Chen"
        text="This is amazing! Great work on the component library."
        time="2h ago"
        likes={12}
        liked
        replies={3}
      />
      <Divider style={{ marginVertical: 4 }} />
      <CommentCard
        author="Alex Kim"
        text="Would love to collaborate on this!"
        time="4h ago"
        likes={5}
      />

      <Separator label="Online Friends" />
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <AvatarGroup
          avatars={[
            { initials: 'S' },
            { initials: 'A' },
            { initials: 'M' },
            { initials: 'L' },
          ]}
          max={3}
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatusIndicator status="online" label="4 online" />
        </View>
      </View>
    </ScrollView>
  );
}
