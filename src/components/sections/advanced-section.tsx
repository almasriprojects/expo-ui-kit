import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Copy, Pencil, Share2, Trash2 } from 'lucide-react-native';

import {
  AnimatedCounter,
  Autocomplete,
  AvatarGroup,
  Banner,
  Breadcrumb,
  Button,
  CalendarStrip,
  ChecklistItem,
  CircularProgress,
  CodeBlock,
  ColorPicker,
  ContextMenu,
  CopyButton,
  DateRangePicker,
  FileUploadArea,
  FilterBar,
  FloatingLabelInput,
  GradientCard,
  InfoRow,
  LinkText,
  Marquee,
  MultiSelect,
  Pagination,
  PinInput,
  RatingDisplay,
  ReadMoreText,
  Select,
  SplitButton,
  StatusIndicator,
  TagInput,
  ToggleGroup,
  TreeView,
  VerificationBadge,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

import { Demo, SectionHeader } from './demo-helpers';

export function AdvancedSection() {
  const t = useTheme();
  const toast = useToast();

  const [floatingVal, setFloatingVal] = useState('');
  const [multiVal, setMultiVal] = useState<string[]>(['react']);
  const [tags, setTags] = useState(['React', 'Expo']);
  const [selectedColor, setSelectedColor] = useState(t.primary);
  const [toggleVal, setToggleVal] = useState('grid');
  const [filterVal, setFilterVal] = useState('all');
  const [calDate, setCalDate] = useState(new Date());
  const [counterVal, setCounterVal] = useState(1284);
  const [currentPage, setCurrentPage] = useState(2);
  const [todo1, setTodo1] = useState(true);
  const [todo2, setTodo2] = useState(false);
  const [autoVal, setAutoVal] = useState('');
  const [rangeStart, setRangeStart] = useState<Date | undefined>();
  const [rangeEnd, setRangeEnd] = useState<Date | undefined>();

  return (
    <>
      <SectionHeader title="Advanced Components" category="Advanced" />

      <Demo title="FloatingLabelInput">
        <View style={{ gap: 14 }}>
          <FloatingLabelInput label="Email Address" value={floatingVal} onChangeText={setFloatingVal} />
          <FloatingLabelInput label="With Error" value="" error="Required" />
        </View>
      </Demo>

      <Demo title="Select & MultiSelect">
        <View style={{ gap: 14 }}>
          <Select
            label="Role"
            placeholder="Select role"
            value=""
            onValueChange={() => {}}
            options={[
              { label: 'Developer', value: 'dev' },
              { label: 'Designer', value: 'design' },
              { label: 'Manager', value: 'mgr' },
            ]}
          />
          <MultiSelect
            label="Skills"
            placeholder="Select skills"
            values={multiVal}
            onValuesChange={(v) => setMultiVal(v as string[])}
            options={[
              { label: 'React', value: 'react' },
              { label: 'TypeScript', value: 'ts' },
              { label: 'Node.js', value: 'node' },
            ]}
          />
        </View>
      </Demo>

      <Demo title="TagInput">
        <TagInput tags={tags} onTagsChange={setTags} placeholder="Add tag..." />
      </Demo>

      <Demo title="PinInput">
        <View style={{ alignItems: 'center' }}>
          <PinInput length={4} onComplete={() => {}} secure />
        </View>
      </Demo>

      <Demo title="ColorPicker">
        <ColorPicker
          colors={['#2563eb', '#8b5cf6', '#ef4444', '#22c55e', '#f59e0b', '#ec4899']}
          value={selectedColor}
          onValueChange={setSelectedColor}
        />
      </Demo>

      <Demo title="SplitButton">
        <SplitButton
          title="Save"
          onPress={() => {}}
          options={[
            { label: 'Save as Draft', onPress: () => {} },
            { label: 'Save & Publish', onPress: () => {} },
          ]}
        />
      </Demo>

      <Demo title="FileUploadArea">
        <FileUploadArea onPress={() => {}} hint="PNG, JPG, PDF up to 10MB" />
      </Demo>

      <Demo title="ToggleGroup & FilterBar">
        <View style={{ gap: 14 }}>
          <ToggleGroup
            options={[
              { label: '☰', value: 'list' },
              { label: '▦', value: 'grid' },
              { label: '▣', value: 'card' },
            ]}
            value={toggleVal}
            onValueChange={(v) => setToggleVal(v as string)}
          />
          <FilterBar
            options={[
              { label: 'All', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Archived', value: 'archived' },
            ]}
            value={filterVal}
            onValueChange={setFilterVal}
          />
        </View>
      </Demo>

      <Demo title="CalendarStrip">
        <CalendarStrip selectedDate={calDate} onDateSelect={setCalDate} markedDates={['2026-03-11', '2026-03-14']} />
      </Demo>

      <Demo title="CircularProgress & AnimatedCounter">
        <View style={{ alignItems: 'center', gap: 16 }}>
          <CircularProgress progress={72} size={90} label="Score" />
          <AnimatedCounter value={counterVal} prefix="$" />
          <Button title="Update" size="sm" variant="outline" onPress={() => setCounterVal((v) => v + Math.floor(Math.random() * 500))} />
        </View>
      </Demo>

      <Demo title="Pagination">
        <Pagination current={currentPage} total={8} onPageChange={setCurrentPage} />
      </Demo>

      <Demo title="StatusIndicator & VerificationBadge">
        <View style={{ gap: 14 }}>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <StatusIndicator status="online" label="Online" />
            <StatusIndicator status="offline" label="Offline" />
            <StatusIndicator status="busy" label="Busy" />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <VerificationBadge variant="verified" />
            <VerificationBadge variant="official" />
            <VerificationBadge variant="premium" label="Premium" />
          </View>
        </View>
      </Demo>

      <Demo title="AvatarGroup & InfoRow">
        <View style={{ gap: 14 }}>
          <AvatarGroup avatars={[{ initials: 'A' }, { initials: 'B' }, { initials: 'C' }, { initials: 'D' }, { initials: 'E' }]} max={3} />
          <InfoRow label="Version" value="1.0.0" />
          <InfoRow label="Status" value="Active" valueColor={t.success} />
        </View>
      </Demo>

      <Demo title="RatingDisplay">
        <View style={{ gap: 10 }}>
          <RatingDisplay rating={4.8} reviews={342} variant="stars" />
          <RatingDisplay rating={4.8} reviews={342} variant="badge" />
          <RatingDisplay rating={4.8} variant="compact" />
        </View>
      </Demo>

      <Demo title="Banner & Marquee">
        <View style={{ gap: 12 }}>
          <Banner variant="info" message="New update available" title="Update" />
          <Banner variant="warning" message="Your trial expires in 3 days" />
          <Marquee text="Flash Sale — 50% off all premium plans! Limited time offer!" speed={50} />
        </View>
      </Demo>

      <Demo title="GradientCard">
        <GradientCard colors={[t.primary, t.purple]} title="Pro Plan" subtitle="Unlock all features" />
      </Demo>

      <Demo title="ReadMoreText">
        <ReadMoreText
          text="React Native lets you build mobile apps using only JavaScript. It uses the same design as React, letting you compose a rich mobile UI from declarative components. With React Native, you don't build a mobile web app, an HTML5 app, or a hybrid app."
          numberOfLines={2}
        />
      </Demo>

      <Demo title="CodeBlock">
        <CodeBlock
          language="tsx"
          showLineNumbers
          code={`const t = useTheme();
return <Text style={{ color: t.text }}>Hello</Text>;`}
        />
      </Demo>

      <Demo title="CopyButton & LinkText">
        <View style={{ gap: 12 }}>
          <CopyButton text="npm install @my-expo/ui" variant="field" />
          <LinkText href="https://expo.dev">Visit Expo</LinkText>
        </View>
      </Demo>

      <Demo title="ChecklistItem">
        <View style={{ gap: 4 }}>
          <ChecklistItem title="Setup project" checked={todo1} onToggle={setTodo1} priority="high" />
          <ChecklistItem title="Build components" checked={todo2} onToggle={setTodo2} priority="medium" />
        </View>
      </Demo>

      <Demo title="Autocomplete">
        <Autocomplete
          label="Country"
          placeholder="Search countries..."
          options={[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'United Arab Emirates', value: 'ae' },
            { label: 'Canada', value: 'ca' },
            { label: 'Germany', value: 'de' },
            { label: 'France', value: 'fr' },
            { label: 'Japan', value: 'jp' },
            { label: 'Australia', value: 'au' },
          ]}
          value={autoVal}
          onValueChange={setAutoVal}
        />
      </Demo>

      <Demo title="DateRangePicker">
        <DateRangePicker
          label="Trip Dates"
          startDate={rangeStart}
          endDate={rangeEnd}
          onRangeChange={(start, end) => {
            setRangeStart(start);
            setRangeEnd(end);
          }}
          minDate={new Date()}
        />
      </Demo>

      <Demo title="TreeView">
        <TreeView
          data={[
            {
              key: 'src',
              label: 'src',
              icon: '📁',
              children: [
                {
                  key: 'components',
                  label: 'components',
                  icon: '📁',
                  children: [
                    { key: 'button', label: 'Button.tsx', icon: '📄' },
                    { key: 'input', label: 'Input.tsx', icon: '📄' },
                    { key: 'modal', label: 'Modal.tsx', icon: '📄' },
                  ],
                },
                {
                  key: 'hooks',
                  label: 'hooks',
                  icon: '📁',
                  children: [
                    { key: 'useTheme', label: 'useTheme.ts', icon: '📄' },
                    { key: 'useFont', label: 'useFont.ts', icon: '📄' },
                  ],
                },
                { key: 'index', label: 'index.ts', icon: '📄' },
              ],
            },
            { key: 'readme', label: 'README.md', icon: '📝' },
            { key: 'pkg', label: 'package.json', icon: '📦' },
          ]}
          defaultExpanded={['src']}
          onNodePress={(node) => toast.show({ message: `Opened ${node.label}`, variant: 'info' })}
        />
      </Demo>

      <Demo title="ContextMenu">
        <ContextMenu
          items={[
            { key: 'copy', label: 'Copy', icon: Copy },
            { key: 'edit', label: 'Edit', icon: Pencil },
            { key: 'share', label: 'Share', icon: Share2 },
            { key: 'delete', label: 'Delete', icon: Trash2, destructive: true },
          ]}
          onItemPress={(item) => toast.show({ message: `${item.label} pressed`, variant: 'info' })}>
          <View
            style={{
              backgroundColor: t.surface,
              padding: 20,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: t.border,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>Long press me</Text>
            <Text style={{ fontSize: 12, color: t.textTertiary, marginTop: 4 }}>Hold to see the context menu</Text>
          </View>
        </ContextMenu>
      </Demo>

      <Demo title="Breadcrumb">
        <Breadcrumb
          items={[
            { label: 'Home', onPress: () => {} },
            { label: 'Components', onPress: () => {} },
            { label: 'Advanced', onPress: () => {} },
            { label: 'Breadcrumb' },
          ]}
        />
      </Demo>
    </>
  );
}
