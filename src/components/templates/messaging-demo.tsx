import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  AudioWaveform,
  ChatBubble,
  ContactCard,
  ConversationItem,
  CopyButton,
  Divider,
  MessageInput,
  SearchBar,
  Separator,
  StoryCircle,
  TypingIndicator,
} from '@/components/ui';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function MessagingDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search conversations..." />

      <Separator label="Active Now" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        <StoryCircle name="Sarah" hasStory={false} size="sm" />
        <StoryCircle name="Alex" hasStory={false} size="sm" />
        <StoryCircle name="Mike" hasStory={false} size="sm" />
        <StoryCircle name="Luna" hasStory={false} size="sm" />
      </ScrollView>

      <Separator label="Conversations" />
      <ConversationItem name="Sarah Chen" lastMessage="Hey! Did you see the new design?" time="2m" unread={3} online />
      <Divider style={{ marginLeft: 56 }} />
      <ConversationItem name="Alex Kim" lastMessage="The meeting is at 3pm tomorrow" time="15m" unread={1} online />
      <Divider style={{ marginLeft: 56 }} />
      <ConversationItem name="Design Team" lastMessage="Mike: I'll push the update tonight" time="1h" typing />
      <Divider style={{ marginLeft: 56 }} />
      <ConversationItem name="Luna Park" lastMessage="Thanks for sharing! 🙏" time="3h" />
      <Divider style={{ marginLeft: 56 }} />
      <ConversationItem name="Chris Taylor" lastMessage="You: Sounds good, let me know!" time="1d" muted />

      <Separator label="Chat View" />
        <View style={{ backgroundColor: t.surface, borderRadius: Radius.xl, padding: 16, gap: 8 }}>
        <ChatBubble message="Hey! How's the component library going?" isOwn={false} timestamp="2:30 PM" />
        <ChatBubble message="Great! We just hit 140+ components 🎉" isOwn timestamp="2:31 PM" status="read" />
        <ChatBubble message="That's incredible! Can you share a preview?" isOwn={false} timestamp="2:32 PM" />
        <ChatBubble message="Sure! Let me record a quick demo for you" isOwn timestamp="2:33 PM" status="delivered" />
        <TypingIndicator />
      </View>

      <Separator label="Voice Message" />
      <AudioWaveform duration="0:42" />

      <Separator label="Share Code" />
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, color: t.text }}>Meeting link:</Text>
        <CopyButton text="https://meet.example.com/abc123" variant="field" />
      </View>

      <Separator label="Contact Info" />
      <ContactCard
        name="Sarah Chen"
        role="Lead Designer"
        phone="+1 (555) 123-4567"
        email="sarah@example.com"
        onCall={() => {}}
        onMessage={() => {}}
        onEmail={() => {}}
      />

      <Separator label="Message Input" />
      <MessageInput onSend={() => {}} onAttach={() => {}} />
    </ScrollView>
  );
}
