import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

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
  Separator,
  StatusIndicator,
  StepIndicator,
  TagInput,
  Timeline,
} from '@/components/ui';
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
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search tasks, projects..." />

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

      <Separator label="Sprint Progress" />
      <View style={{ gap: 10 }}>
        <ProgressCard
          title="Sprint 12 — Component Library"
          subtitle="8 of 14 tasks completed"
          progress={57}
          icon="🚀"
          completedLabel="57% done"
          totalLabel="3 days left"
        />
      </View>

      <StepIndicator
        steps={['Planning', 'Design', 'Development', 'Testing', 'Launch']}
        currentStep={2}
      />

      <Separator label="Kanban Board" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14 }}>
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

      <Separator label="Calendar" />
      <CalendarStrip
        selectedDate={calDate}
        onDateSelect={setCalDate}
        markedDates={['2026-03-10', '2026-03-12', '2026-03-15']}
      />

      <Separator label="Today's Tasks" />
      <Card>
        {tasks.map((task, i) => (
          <View key={i}>
            <ChecklistItem
              title={task.title}
              checked={task.done}
              onToggle={(checked) =>
                setTasks((prev) => prev.map((t, j) => (j === i ? { ...t, done: checked } : t)))
              }
              priority={i === 2 ? 'high' : i === 3 ? 'medium' : undefined}
            />
            {i < tasks.length - 1 && <Divider />}
          </View>
        ))}
      </Card>

      <Separator label="Labels" />
      <TagInput tags={tags} onTagsChange={setTags} placeholder="Add label..." />

      <Separator label="Team" />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <AvatarGroup
          avatars={[{ initials: 'S' }, { initials: 'A' }, { initials: 'M' }, { initials: 'J' }, { initials: 'L' }]}
          max={4}
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatusIndicator status="online" label="3 online" />
        </View>
      </View>

      <Separator label="Activity" />
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
