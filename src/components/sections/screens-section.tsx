import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import {
  AudioPlayer,
  BackButton,
  Box,
  Button,
  CallScreen,
  CollapseTransition,
  Confetti,
  DescriptionList,
  FadeTransition,
  HStack,
  Highlight,
  ImageEditor,
  Kbd,
  QRCode,
  Statistic,
  VStack,
  VideoPlayer,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

import { Demo, SectionHeader } from './demo-helpers';

export function ScreensSection() {
  const t = useTheme();
  const toast = useToast();

  const [fadeVisible, setFadeVisible] = useState(true);
  const [collapseExpanded, setCollapseExpanded] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const confettiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (confettiTimeoutRef.current != null) clearTimeout(confettiTimeoutRef.current);
    };
  }, []);

  const handleCelebrate = () => {
    if (confettiTimeoutRef.current != null) clearTimeout(confettiTimeoutRef.current);
    setConfettiActive(true);
    confettiTimeoutRef.current = setTimeout(() => {
      setConfettiActive(false);
      confettiTimeoutRef.current = null;
    }, 2000);
  };

  return (
    <>
      <SectionHeader title="Screens, Transitions & More" category="Screens" />

      <Demo title="Statistic">
        <View style={{ flexDirection: 'row', gap: 32, flexWrap: 'wrap' }}>
          <Statistic
            value="12.4K"
            label="Users"
            trend={{ value: 12, direction: 'up' }}
          />
          <Statistic
            value="$8,540"
            label="Revenue"
            trend={{ value: 3, direction: 'down' }}
          />
          <Statistic value="99.9%" label="Uptime" />
        </View>
      </Demo>

      <Demo title="DescriptionList">
        <DescriptionList
          items={[
            { term: 'Name', description: 'John Doe' },
            { term: 'Email', description: 'john@example.com' },
            { term: 'Role', description: 'Admin' },
          ]}
        />
      </Demo>

      <Demo title="Highlight">
        <Highlight
          text="The quick brown fox jumps over the lazy dog"
          highlight="brown fox"
        />
      </Demo>

      <Demo title="Kbd">
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>K</Kbd>
        </View>
      </Demo>

      <Demo title="BackButton">
        <BackButton onPress={() => {}} />
      </Demo>

      <Demo title="QRCode">
        <QRCode value="https://github.com/almasriprojects/expo-ui-kit" size={150} />
      </Demo>

      <Demo title="AudioPlayer">
        <AudioPlayer
          title="Morning Jazz"
          artist="Smooth Beats"
          duration={245}
          currentTime={67}
        />
      </Demo>

      <Demo title="VideoPlayer">
        <VideoPlayer
          title="Product Demo"
          duration={180}
          currentTime={45}
        />
      </Demo>

      <Demo title="FadeTransition">
        <View style={{ gap: 12 }}>
          <Button title={fadeVisible ? 'Hide' : 'Show'} onPress={() => setFadeVisible((v) => !v)} />
          <FadeTransition visible={fadeVisible}>
            <View
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: t.primarySoft,
              }}>
              <Text style={{ color: t.text }}>I fade in and out</Text>
            </View>
          </FadeTransition>
        </View>
      </Demo>

      <Demo title="CollapseTransition">
        <View style={{ gap: 12 }}>
          <Button
            title={collapseExpanded ? 'Collapse' : 'Expand'}
            onPress={() => setCollapseExpanded((v) => !v)}
          />
          <CollapseTransition expanded={collapseExpanded}>
            <Text style={{ color: t.text, lineHeight: 22 }}>
              This is expandable content. When expanded, you can see this full text block. When collapsed, it animates smoothly to zero height.
            </Text>
          </CollapseTransition>
        </View>
      </Demo>

      <Demo title="Confetti">
        <Button title="Celebrate!" onPress={handleCelebrate} />
        <Confetti active={confettiActive} />
      </Demo>

      <Demo title="Stack / HStack / VStack">
        <View style={{ gap: 24 }}>
          <HStack gap={12}>
            <View style={{ width: 60, height: 60, borderRadius: 12, backgroundColor: t.primarySoft }} />
            <View style={{ width: 60, height: 60, borderRadius: 12, backgroundColor: t.successSoft }} />
            <View style={{ width: 60, height: 60, borderRadius: 12, backgroundColor: t.warningSoft }} />
          </HStack>
          <VStack gap={8}>
            <View style={{ height: 40, borderRadius: 8, backgroundColor: t.primarySoft }} />
            <View style={{ height: 40, borderRadius: 8, backgroundColor: t.successSoft }} />
            <View style={{ height: 40, borderRadius: 8, backgroundColor: t.warningSoft }} />
          </VStack>
        </View>
      </Demo>

      <Demo title="Box">
        <Box p={16} rounded="xl" shadow="md" bg="card">
          <Text style={{ color: t.text, fontSize: 14 }}>A Box with padding, rounded corners, shadow, and card background.</Text>
        </Box>
      </Demo>

      <Demo title="CallScreen">
        <View style={{ height: 400, borderRadius: 16, overflow: 'hidden' }}>
          <CallScreen
            callerName="John Doe"
            status="ringing"
            onToggleMute={() => {}}
            onToggleSpeaker={() => {}}
            onHangUp={() => {}}
          />
        </View>
      </Demo>

      <Demo title="ImageEditor">
        <View style={{ height: 450, borderRadius: 16, overflow: 'hidden' }}>
          <ImageEditor
            imageUri="https://picsum.photos/400/300"
            onSave={(edits) => toast.show({ message: `Saved: ${edits.filter}`, variant: 'success' })}
            onCancel={() => {}}
          />
        </View>
      </Demo>
    </>
  );
}
