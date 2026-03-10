import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AtSign, Heart, Link, Mail, MessageCircle, MoreHorizontal, User } from 'lucide-react-native';

import {
  ActivityFeed,
  Button,
  EmojiPicker,
  MentionInput,
  Poll,
  ReactionBar,
  ReadReceipt,
  ShareSheet,
  VoiceMessageBubble,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

import { Demo, SectionHeader } from './demo-helpers';

const INITIAL_REACTIONS = [
  { emoji: '👍', count: 12, reacted: true },
  { emoji: '❤️', count: 8, reacted: false },
  { emoji: '😂', count: 5, reacted: false },
  { emoji: '🔥', count: 3, reacted: true },
];

const POLL_OPTIONS = [
  { key: 'react', label: 'React Native', votes: 45 },
  { key: 'flutter', label: 'Flutter', votes: 32 },
  { key: 'swift', label: 'SwiftUI', votes: 18 },
];

const SHARE_OPTIONS_BASE = [
  { key: 'copy', label: 'Copy Link', Icon: Link },
  { key: 'message', label: 'Message', Icon: MessageCircle },
  { key: 'email', label: 'Email', Icon: Mail },
  { key: 'more', label: 'More', Icon: MoreHorizontal },
] as const;

const ACTIVITY_ITEMS_BASE = [
  { key: '1', title: 'New comment', subtitle: 'Alice replied to your post', time: '2m ago', Icon: MessageCircle },
  { key: '2', title: 'Like received', subtitle: 'Bob liked your photo', time: '15m ago', Icon: Heart },
  { key: '3', title: 'Mention', subtitle: 'Charlie mentioned you', time: '1h ago', Icon: AtSign },
  { key: '4', title: 'Follow', subtitle: 'Diana started following you', time: '3h ago', Icon: User },
] as const;

const MENTION_USERS = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

export function SocialSection() {
  const t = useTheme();

  const [reactions, setReactions] = useState(INITIAL_REACTIONS);
  const [selectedKey, setSelectedKey] = useState<string | undefined>();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [shareSheetVisible, setShareSheetVisible] = useState(false);
  const [mentionValue, setMentionValue] = useState('');

  const handleReact = (emoji: string) => {
    setReactions((prev) =>
      prev.map((r) =>
        r.emoji === emoji
          ? {
              ...r,
              reacted: !r.reacted,
              count: r.reacted ? r.count - 1 : r.count + 1,
            }
          : r
      )
    );
  };

  return (
    <>
      <SectionHeader title="Social & Communication" category="Social" />

      <Demo title="ReactionBar">
        <ReactionBar reactions={reactions} onReact={handleReact} />
      </Demo>

      <Demo title="Poll">
        <Poll
          question="What's your favorite framework?"
          options={POLL_OPTIONS}
          totalVotes={95}
          selectedKey={selectedKey}
          onVote={setSelectedKey}
        />
      </Demo>

      <Demo title="ReadReceipt">
        <View style={{ flexDirection: 'row', gap: 24, alignItems: 'flex-end' }}>
          {(['sending', 'sent', 'delivered', 'read'] as const).map((status) => (
            <View key={status} style={{ alignItems: 'center', gap: 8 }}>
              <ReadReceipt status={status} />
              <Text style={{ fontSize: 11, color: t.textSecondary, textTransform: 'capitalize' }}>
                {status}
              </Text>
            </View>
          ))}
        </View>
      </Demo>

      <Demo title="VoiceMessageBubble">
        <View style={{ gap: 12, alignItems: 'flex-end' }}>
          <VoiceMessageBubble isOwn duration={15} />
          <View style={{ alignSelf: 'flex-start' }}>
            <VoiceMessageBubble isOwn={false} duration={32} />
          </View>
        </View>
      </Demo>

      <Demo title="ActivityFeed">
        <ActivityFeed
          items={ACTIVITY_ITEMS_BASE.map(({ Icon, ...rest }) => ({
            ...rest,
            icon: <Icon size={18} color={t.primaryForeground} />,
          }))}
        />
      </Demo>

      <Demo title="EmojiPicker">
        <View style={{ gap: 12 }}>
          <Button
            title={emojiPickerVisible ? 'Hide emoji picker' : 'Show emoji picker'}
            onPress={() => setEmojiPickerVisible((v) => !v)}
          />
          {emojiPickerVisible && (
            <View style={{ maxHeight: 250 }}>
              <EmojiPicker onSelect={() => {}} />
            </View>
          )}
        </View>
      </Demo>

      <Demo title="ShareSheet">
        <Button title="Open share sheet" onPress={() => setShareSheetVisible(true)} />
        <ShareSheet
          visible={shareSheetVisible}
          onClose={() => setShareSheetVisible(false)}
          options={SHARE_OPTIONS_BASE.map(({ Icon, ...rest }) => ({
            ...rest,
            icon: <Icon size={24} color={t.text} />,
          }))}
          onSelect={() => setShareSheetVisible(false)}
        />
      </Demo>

      <Demo title="MentionInput">
        <MentionInput
          value={mentionValue}
          onChangeText={setMentionValue}
          users={MENTION_USERS}
          placeholder="Type @ to mention..."
        />
      </Demo>
    </>
  );
}
