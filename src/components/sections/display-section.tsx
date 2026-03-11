import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  Avatar,
  Badge,
  Button,
  CountdownTimer,
  DataTable,
  MarkdownRenderer,
  Progress,
  SkeletonCard,
  SkeletonText,
  StepIndicator,
  StreamingText,
  Timeline,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

import { Demo, SectionHeader } from './demo-helpers';

export function DisplaySection() {
  const t = useTheme();
  const [step, setStep] = useState(1);

  return (
    <>
      <SectionHeader title="Data Display" category="Display" />

      <Demo title="Avatar">
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 14 }}>
          <Avatar initials="SM" size="sm" />
          <Avatar initials="MD" size="md" />
          <Avatar source="https://i.pravatar.cc/100?img=1" size="lg" />
          <Avatar source="https://i.pravatar.cc/100?img=2" size="xl" />
        </View>
      </Demo>

      <Demo title="Badge">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          <Badge label="Default" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
          <Badge label="Info" variant="info" />
        </View>
      </Demo>

      <Demo title="Progress">
        <View style={{ gap: 14 }}>
          <Progress value={25} showLabel />
          <Progress value={60} variant="success" size="lg" />
          <Progress value={85} variant="warning" size="sm" />
        </View>
      </Demo>

      <Demo title="StepIndicator">
        <StepIndicator steps={['Cart', 'Address', 'Payment', 'Done']} currentStep={step} />
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
          <Button title="Back" size="sm" variant="outline" style={{ flex: 1 }} onPress={() => setStep((s) => Math.max(0, s - 1))} />
          <Button title="Next" size="sm" style={{ flex: 1 }} onPress={() => setStep((s) => Math.min(3, s + 1))} />
        </View>
      </Demo>

      <Demo title="Timeline">
        <Timeline
          items={[
            { title: 'Order placed', description: 'Confirmed', time: '9:00 AM', status: 'completed' },
            { title: 'Processing', description: 'Preparing items', time: '10:30 AM', status: 'completed' },
            { title: 'Shipped', description: 'On its way', time: '2:00 PM', status: 'current' },
            { title: 'Delivered', time: 'Est. tomorrow', status: 'upcoming' },
          ]}
        />
      </Demo>

      <Demo title="DataTable">
        <DataTable
          columns={[
            { key: 'name', header: 'Name', width: 120 },
            { key: 'role', header: 'Role', width: 100 },
            { key: 'status', header: 'Status', width: 80, align: 'center' },
          ]}
          data={[
            { name: 'Alex Chen', role: 'Engineer', status: 'Active' },
            { name: 'Maya Patel', role: 'Designer', status: 'Away' },
            { name: 'James Lee', role: 'PM', status: 'Active' },
          ]}
        />
      </Demo>

      <Demo title="CountdownTimer">
        <CountdownTimer label="Flash Sale Ends In" targetDate={new Date(Date.now() + 86400000)} />
      </Demo>

      <Demo title="Skeleton">
        <SkeletonText lines={3} />
        <View style={{ height: 20 }} />
        <SkeletonCard />
      </Demo>

      <Demo title="Typography">
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: t.text }}>Heading</Text>
          <Text style={{ fontSize: 20, fontWeight: '600', color: t.text }}>Subtitle</Text>
          <Text style={{ fontSize: 16, fontWeight: '400', color: t.text }}>Body text</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: t.textSecondary }}>Secondary text</Text>
          <Text style={{ fontSize: 12, fontWeight: '400', color: t.textTertiary }}>Caption text</Text>
          <ThemedText type="code">{'const x = "monospace"'}</ThemedText>
        </View>
      </Demo>

      <Demo title="MarkdownRenderer">
        <MarkdownRenderer content={`# Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n\n- First item\n- Second item\n- Third item\n\n> This is a blockquote\n\n\`\`\`\nconst x = 42;\n\`\`\`\n\nVisit [Expo](https://expo.dev) for more.`} />
      </Demo>

      <Demo title="StreamingText">
        <StreamingText
          text="Hello! I'm an AI assistant. I can help you build amazing React Native apps with Expo. Let me know what you'd like to create today."
          speed={25}
          cursor
        />
      </Demo>
    </>
  );
}
