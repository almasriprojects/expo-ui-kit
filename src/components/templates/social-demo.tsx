import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Heart, Send } from 'lucide-react-native';

import {
  Avatar,
  AvatarGroup,
  CommentCard,
  Divider,
  FollowButton,
  IconButton,
  PostCard,
  ProfileCard,
  StatusIndicator,
  StoryCircle,
  VerificationBadge,
} from '@/components/ui';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function SocialDemo() {
  const t = useTheme();
  const [follow1, setFollow1] = useState(false);
  const [follow2, setFollow2] = useState(true);

  return (
    <ScrollView contentContainerStyle={{ padding: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[5] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...FontSize['2xl'], fontWeight: '800', color: t.text }}>Social</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[2] }}>
          <IconButton icon={<Heart size={22} color={t.text} />} onPress={() => {}} />
          <IconButton icon={<Send size={22} color={t.text} />} onPress={() => {}} />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing[3] }}>
        <StoryCircle name="Your Story" isOwn hasStory={false} />
        <StoryCircle name="Sarah" hasStory />
        <StoryCircle name="Alex" hasStory />
        <StoryCircle name="Mike" hasStory seen />
        <StoryCircle name="Luna" hasStory />
        <StoryCircle name="Chris" hasStory seen />
      </ScrollView>

      <PostCard
        author="Sarah Chen"
        verified
        time="2h ago"
        text="Just shipped our new design system! 140+ components and counting"
        image
        likes={142}
        comments={23}
        shares={8}
      />

      <View style={{ gap: Spacing[3] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...FontSize.md, fontWeight: '700', color: t.text }}>Suggested for you</Text>
          <Text style={{ ...FontSize.sm, color: t.primary }}>See all</Text>
        </View>
        {[
          { name: 'Mike Johnson', handle: '@mikej', verified: true, state: follow1, set: setFollow1 },
          { name: 'Luna Park', handle: '@lunapark', verified: false, state: follow2, set: setFollow2 },
        ].map((user) => (
          <View
            key={user.handle}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: Spacing[3],
              paddingVertical: Spacing[2.5],
            }}>
            <Avatar initials={user.name[0]} size="md" />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[1] }}>
                <Text style={{ ...FontSize.sm, fontWeight: '600', color: t.text }}>{user.name}</Text>
                {user.verified && <VerificationBadge size="sm" />}
              </View>
              <Text style={{ ...FontSize.xs, color: t.textSecondary }}>{user.handle}</Text>
            </View>
            <FollowButton following={user.state} onToggle={user.set} size="sm" />
          </View>
        ))}
      </View>

      <PostCard
        author="Alex Kim"
        time="5h ago"
        text="Beautiful sunset from my balcony today"
        likes={89}
        comments={12}
      />

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

      <Text style={{ ...FontSize.md, fontWeight: '700', color: t.text }}>Comments</Text>
      <CommentCard
        author="Sarah Chen"
        text="This is amazing! Great work on the component library."
        time="2h ago"
        likes={12}
        liked
        replies={3}
      />
      <Divider style={{ marginVertical: Spacing[1] }} />
      <CommentCard
        author="Alex Kim"
        text="Would love to collaborate on this!"
        time="4h ago"
        likes={5}
      />

      <View style={{ gap: Spacing[3] }}>
        <Text style={{ ...FontSize.md, fontWeight: '700', color: t.text }}>Online Friends</Text>
        <View style={{ flexDirection: 'row', gap: Spacing[4], alignItems: 'center' }}>
          <AvatarGroup
            avatars={[
              { initials: 'S' },
              { initials: 'A' },
              { initials: 'M' },
              { initials: 'L' },
            ]}
            max={3}
          />
          <View style={{ flexDirection: 'row', gap: Spacing[2] }}>
            <StatusIndicator status="online" label="4 online" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
