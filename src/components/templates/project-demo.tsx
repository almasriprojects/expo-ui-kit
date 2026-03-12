import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FolderKanban, Rocket } from 'lucide-react-native';

import {
  AvatarGroup,
  BoardColumn,
  CalendarStrip,
  Card,
  ChecklistItem,
  Divider,
  FilterBar,
  KanbanCard,
  ProgressCard,
  SearchBar,
  StatusIndicator,
  StepIndicator,
  TagInput,
  Timeline,
} from '@/components/ui';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ProjectDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [calDate, setCalDate] = useState(new Date());
  const [tags, setTags] = useState(['Design', 'Frontend']);
  const [tasks, setTasks] = useState([
    { title: 'Setup design tokens', done: true },
    { title: 'Build component library', done: true },
    { title: 'Create app templates', done: false },
    { title: 'Write documentation', done: false },
  ]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: Spacing[5],
        paddingBottom: Spacing[10],
        gap: Spacing[5],
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[2] }}>
          <FolderKanban size={24} color={t.primary} />
          <Text
            style={{
              ...FontSize['2xl'],
              fontWeight: '700',
              color: t.text,
            }}
          >
            Workspace
          </Text>
        </View>
        <AvatarGroup
          avatars={[
            { initials: 'S' },
            { initials: 'A' },
            { initials: 'M' },
            { initials: 'J' },
            { initials: 'L' },
          ]}
          max={4}
        />
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search tasks, projects..."
      />

      <FilterBar
        options={[
          { label: 'All', value: 'all' },
          { label: 'My Tasks', value: 'mine' },
          { label: 'In Progress', value: 'progress' },
          { label: 'Completed', value: 'done' },
        ]}
        value={filter}
        onValueChange={setFilter}
      />

      {/* Sprint progress */}
      <ProgressCard
        title="Sprint 12 — Component Library"
        subtitle="8 of 14 tasks completed"
        progress={57}
        icon={<Rocket size={20} color={t.primary} />}
        completedLabel="57% done"
        totalLabel="3 days left"
      />

      <StepIndicator
        steps={['Planning', 'Design', 'Development', 'Testing', 'Launch']}
        currentStep={2}
      />

      {/* Board */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        Board
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: Spacing[3.5] }}
      >
        <BoardColumn title="To Do" count={3} color={t.primary} onAdd={() => {}}>
          <KanbanCard
            title="Design login screen"
            labels={[{ text: 'Design', color: t.purple }]}
            priority="high"
            assignee="Sarah"
            dueDate="Mar 12"
            comments={3}
          />
          <KanbanCard
            title="API integration"
            labels={[{ text: 'Backend', color: t.statusDone }]}
            priority="medium"
            dueDate="Mar 15"
            subtasks={{ done: 2, total: 5 }}
          />
        </BoardColumn>
        <BoardColumn title="In Progress" count={2} color={t.warning} onAdd={() => {}}>
          <KanbanCard
            title="Build navigation"
            description="Implement tab & stack navigation with Expo Router"
            labels={[{ text: 'Frontend', color: t.primary }]}
            priority="high"
            assignee="Alex"
            subtasks={{ done: 4, total: 6 }}
            attachments={2}
          />
          <KanbanCard
            title="User profile screen"
            labels={[{ text: 'UI', color: t.orange }]}
            priority="low"
            assignee="Mike"
            comments={5}
          />
        </BoardColumn>
        <BoardColumn title="Done" count={4} color={t.success}>
          <KanbanCard
            title="Setup project"
            labels={[{ text: 'Setup', color: t.textSecondary }]}
            assignee="John"
            subtasks={{ done: 3, total: 3 }}
          />
        </BoardColumn>
      </ScrollView>

      {/* Schedule */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        Schedule
      </Text>
      <CalendarStrip
        selectedDate={calDate}
        onDateSelect={setCalDate}
        markedDates={['2026-03-10', '2026-03-12', '2026-03-15']}
      />

      {/* Today's Tasks */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        {"Today's Tasks"}
      </Text>
      <Card>
        {tasks.map((task, i) => (
          <View key={i}>
            <ChecklistItem
              title={task.title}
              checked={task.done}
              onToggle={(checked) =>
                setTasks((prev) =>
                  prev.map((t, j) => (j === i ? { ...t, done: checked } : t))
                )
              }
              priority={i === 2 ? 'high' : i === 3 ? 'medium' : undefined}
            />
            {i < tasks.length - 1 && <Divider />}
          </View>
        ))}
      </Card>

      <TagInput tags={tags} onTagsChange={setTags} placeholder="Add label..." />

      {/* Team */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        Team
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
        <AvatarGroup
          avatars={[
            { initials: 'S' },
            { initials: 'A' },
            { initials: 'M' },
            { initials: 'J' },
            { initials: 'L' },
          ]}
          max={4}
        />
        <View style={{ flexDirection: 'row', gap: Spacing[2] }}>
          <StatusIndicator status="online" label="3 online" />
        </View>
      </View>

      {/* Activity */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        Activity
      </Text>
      <Timeline
        items={[
          { title: 'Sarah completed "Design tokens"', time: '2h ago' },
          { title: 'Alex moved "Navigation" to In Progress', time: '4h ago' },
          { title: 'Mike commented on "Profile screen"', time: '6h ago' },
          { title: 'Sprint 12 started', time: 'Yesterday' },
        ]}
      />
    </ScrollView>
  );
}
