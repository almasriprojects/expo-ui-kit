import React, { useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = ViewProps & {
  tabs: Tab[];
  defaultTab?: string;
};

export function Tabs({ tabs, defaultTab, ...props }: TabsProps) {
  const [activeKey, setActiveKey] = useState(defaultTab ?? tabs[0]?.key ?? '');
  const activeTab = tabs.find((t) => t.key === activeKey);
  const theme = useTheme();

  return (
    <View {...props}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.surface,
          borderRadius: Radius.xl,
          padding: 4,
        }}>
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveKey(tab.key)}
              style={[
                {
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: Radius.md,
                  alignItems: 'center',
                },
                active && {
                  backgroundColor: theme.segmentActive,
                  ...Shadows.sm,
                },
              ]}>
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: theme.text,
                  opacity: active ? 1 : 0.55,
                }}>
                {tab.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
      {activeTab && (
        <Animated.View key={activeKey} entering={FadeIn.duration(150)} style={{ marginTop: 16 }}>
          {activeTab.content}
        </Animated.View>
      )}
    </View>
  );
}
