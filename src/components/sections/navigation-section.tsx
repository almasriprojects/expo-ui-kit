import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Bell, Home, Search, Settings, User } from 'lucide-react-native';

import {
  AppBar,
  BottomNavigation,
  Button,
  Carousel,
  CommandPalette,
  Dropdown,
  InlineNotification,
  Sheet,
  SkeletonAvatar,
  SkeletonImage,
  VerticalStepper,
} from '@/components/ui';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { Demo, SectionHeader } from './demo-helpers';

export function NavigationSection() {
  const t = useTheme();
  const { width: screenWidth } = Dimensions.get('window');

  const [activeKey, setActiveKey] = useState('home');
  const [dropdownValue, setDropdownValue] = useState('');
  const [sheetVisible, setSheetVisible] = useState(false);
  const [commandVisible, setCommandVisible] = useState(false);

  const carouselItems = [
    <View
      key="0"
      style={{
        width: screenWidth,
        height: 150,
        backgroundColor: t.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Radius.lg,
      }}>
      <Text style={{ color: t.primaryForeground, fontSize: 16, fontWeight: '600' }}>Slide 1</Text>
    </View>,
    <View
      key="1"
      style={{
        width: screenWidth,
        height: 150,
        backgroundColor: t.success,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Radius.lg,
      }}>
      <Text style={{ color: t.primaryForeground, fontSize: 16, fontWeight: '600' }}>Slide 2</Text>
    </View>,
    <View
      key="2"
      style={{
        width: screenWidth,
        height: 150,
        backgroundColor: t.warning,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Radius.lg,
      }}>
      <Text style={{ color: t.primaryForeground, fontSize: 16, fontWeight: '600' }}>Slide 3</Text>
    </View>,
  ];

  const commandItems = [
    { key: '1', label: 'New File', icon: 'doc', group: 'Actions', onSelect: () => {} },
    { key: '2', label: 'Settings', icon: 'gearshape', group: 'Actions', onSelect: () => {} },
    { key: '3', label: 'Search', icon: 'magnifyingglass', group: 'Navigation', onSelect: () => {} },
  ];

  return (
    <>
      <SectionHeader title="Navigation & Core UI" category="Navigation" />

      <Demo title="AppBar">
        <AppBar
          title="My Screen"
          subtitle="Dashboard"
          onBack={() => {}}
          rightActions={<Settings size={20} color={t.text} />}
        />
      </Demo>

      <Demo title="BottomNavigation">
        <BottomNavigation
          tabs={[
            { key: 'home', label: 'Home', icon: Home },
            { key: 'search', label: 'Search', icon: Search },
            { key: 'alerts', label: 'Alerts', icon: Bell, badge: 3 },
            { key: 'profile', label: 'Profile', icon: User },
          ]}
          activeKey={activeKey}
          onTabPress={setActiveKey}
        />
      </Demo>

      <Demo title="Dropdown">
        <Dropdown
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' },
          ]}
          value={dropdownValue}
          onValueChange={setDropdownValue}
        />
      </Demo>

      <Demo title="VerticalStepper">
        <VerticalStepper
          steps={[
            { title: 'Step 1', description: 'Description for step one' },
            { title: 'Step 2', description: 'Description for step two' },
            { title: 'Step 3', description: 'Description for step three' },
          ]}
          currentStep={1}
        />
      </Demo>

      <Demo title="Carousel">
        <View style={{ marginHorizontal: -20 }}>
          <Carousel data={carouselItems} height={150} showDots />
        </View>
      </Demo>

      <Demo title="Sheet">
        <Button title="Open Sheet" variant="outline" onPress={() => setSheetVisible(true)} />
        <Sheet
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
          title="Sheet Title">
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 15, color: t.text }}>Some content inside the sheet.</Text>
            <Button title="Close" onPress={() => setSheetVisible(false)} />
          </View>
        </Sheet>
      </Demo>

      <Demo title="CommandPalette">
        <Button title="Open Command Palette" variant="outline" onPress={() => setCommandVisible(true)} />
        <CommandPalette
          visible={commandVisible}
          onClose={() => setCommandVisible(false)}
          items={commandItems}
        />
      </Demo>

      <Demo title="InlineNotification">
        <View style={{ gap: 12 }}>
          <InlineNotification variant="info" message="This is an info message." />
          <InlineNotification variant="success" message="This is a success message." />
          <InlineNotification variant="warning" message="This is a warning message." />
          <InlineNotification variant="error" message="This is an error message." />
        </View>
      </Demo>

      <Demo title="SkeletonAvatar / SkeletonImage">
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
          <SkeletonAvatar size={48} />
          <View style={{ flex: 1 }}>
            <SkeletonImage width="100%" height={100} />
          </View>
        </View>
      </Demo>
    </>
  );
}
