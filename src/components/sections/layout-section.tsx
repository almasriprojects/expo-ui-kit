import React from 'react';
import { Text, View } from 'react-native';

import { Card, Divider, Separator, SplitScreen } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

import { Demo, SectionHeader } from './demo-helpers';

export function LayoutSection() {
  const t = useTheme();

  return (
    <>
      <SectionHeader title="Layout" category="Layout" />

      <Demo title="Divider">
        <Text style={{ fontSize: 14, color: t.text }}>Content above</Text>
        <Divider style={{ marginVertical: 14 }} />
        <Text style={{ fontSize: 14, color: t.text }}>Content below</Text>
      </Demo>

      <Demo title="Separator">
        <Text style={{ fontSize: 14, color: t.text }}>Content above</Text>
        <Separator label="or" style={{ marginVertical: 16 }} />
        <Text style={{ fontSize: 14, color: t.text }}>Content below</Text>
      </Demo>

      <Demo title="Card Variants">
        <View style={{ gap: 16 }}>
          <Card variant="elevated" title="Elevated" subtitle="With shadow and border">
            <Text style={{ fontSize: 14, color: t.textSecondary }}>Default card style.</Text>
          </Card>
          <Card variant="outlined" title="Outlined" subtitle="Border only, transparent background">
            <Text style={{ fontSize: 14, color: t.textSecondary }}>Clean outline style.</Text>
          </Card>
          <Card variant="filled" title="Filled" subtitle="Solid fill, no border">
            <Text style={{ fontSize: 14, color: t.textSecondary }}>Flat filled style.</Text>
          </Card>
        </View>
      </Demo>

      <Demo title="SplitScreen">
        <SplitScreen
          left={
            <View style={{ padding: 16, backgroundColor: t.primarySoft, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: t.text, fontWeight: '600' }}>Left Pane</Text>
            </View>
          }
          right={
            <View style={{ padding: 16, backgroundColor: t.surface, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: t.text, fontWeight: '600' }}>Right Pane</Text>
            </View>
          }
          ratio={0.4}
          gap={8}
          style={{ height: 120, borderRadius: 12, overflow: 'hidden' }}
        />
      </Demo>
    </>
  );
}
