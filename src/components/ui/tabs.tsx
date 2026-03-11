import React, { useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Tab = {
  /** Unique key identifier for the tab */
  key: string;
  /** Label text displayed on the tab */
  label: string;
  /** Content rendered when the tab is active */
  content: React.ReactNode;
};

export type TabsProps = ViewProps & {
  /** Array of tab definitions */
  tabs: Tab[];
  /** Key of the initially active tab */
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
          padding: Spacing[1],
        }}
        accessibilityRole="tablist">
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveKey(tab.key)}
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: active }}
              style={[
                {
                  flex: 1,
                  paddingVertical: Spacing[2],
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
                  fontSize: FontSize.md.fontSize,
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
        <Animated.View key={activeKey} entering={FadeIn.duration(150)} style={{ marginTop: Spacing[4] }}>
          {activeTab.content}
        </Animated.View>
      )}
    </View>
  );
}
