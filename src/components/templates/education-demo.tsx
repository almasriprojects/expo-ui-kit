import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BookOpen, GraduationCap, Smartphone } from 'lucide-react-native';

import {
  Card,
  CodeBlock,
  FilterBar,
  FlashCard,
  LessonCard,
  ProgressCard,
  QuizOption,
  ReadMoreText,
  SearchBar,
  StatCard,
  StepIndicator,
  VideoThumbnail,
} from '@/components/ui';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function EducationDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [quizAnswer, setQuizAnswer] = useState(-1);
  const [quizRevealed, setQuizRevealed] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ padding: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[5] }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ ...FontSize.sm, color: t.textSecondary }}>Good morning</Text>
          <Text style={{ ...FontSize['2xl'], fontWeight: '700', color: t.text }}>Welcome back, John</Text>
        </View>
        <View style={{ width: 44, height: 44, borderRadius: Radius.full, backgroundColor: t.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
          <GraduationCap size={24} color={t.primary} />
        </View>
      </View>

      <SearchBar value={search} onChangeText={setSearch} placeholder="Search courses..." />

      <FilterBar
        options={[
          { label: 'All', value: 'all' },
          { label: 'In Progress', value: 'progress' },
          { label: 'Completed', value: 'done' },
          { label: 'Bookmarked', value: 'saved' },
        ]}
        value={filter}
        onValueChange={setFilter}
      />

      <View style={{ flexDirection: 'row', gap: Spacing[2.5] }}>
        <StatCard title="Courses" value="3" subtitle="In progress" style={{ flex: 1 }} />
        <StatCard title="Hours" value="42" subtitle="Total learned" style={{ flex: 1 }} />
        <StatCard title="Streak" value="12" subtitle="Days" style={{ flex: 1 }} />
      </View>

      <Text style={{ ...FontSize.xl, fontWeight: '700', color: t.text }}>Continue Learning</Text>
      <ProgressCard
        title="React Native Masterclass"
        subtitle="12 of 24 lessons · 6h remaining"
        progress={50}
        icon={<Smartphone size={20} color={t.primary} />}
        completedLabel="50% complete"
      />
      <ProgressCard
        title="TypeScript Deep Dive"
        subtitle="18 of 20 lessons · 1h remaining"
        progress={90}
        icon={<BookOpen size={20} color={t.primary} />}
        completedLabel="Almost done!"
      />

      <Text style={{ ...FontSize.xl, fontWeight: '700', color: t.text }}>Course Content</Text>
      <StepIndicator
        steps={['Basics', 'Components', 'State', 'Navigation', 'APIs']}
        currentStep={2}
      />

      <View style={{ gap: Spacing[2] }}>
        <LessonCard title="Introduction to React Native" subtitle="What and why" duration="8 min" completed lessonNumber={1} />
        <LessonCard title="Setting Up Your Environment" subtitle="Expo, Node.js, IDE" duration="12 min" completed lessonNumber={2} />
        <LessonCard title="Your First Component" subtitle="JSX, props, styling" duration="15 min" current progress={45} lessonNumber={3} />
        <LessonCard title="State & Lifecycle" subtitle="useState, useEffect" duration="20 min" lessonNumber={4} />
        <LessonCard title="Navigation" subtitle="Expo Router, tabs, stacks" duration="18 min" locked lessonNumber={5} />
      </View>

      <VideoThumbnail
        title="Understanding React Hooks — A Complete Guide"
        duration="15:42"
        views="12K views"
        channel="React Academy"
      />

      <Card>
        <ReadMoreText
          text="This comprehensive course covers everything you need to know about building mobile applications with React Native and Expo. From basic component creation to advanced state management, navigation patterns, API integration, and deployment. You'll build 3 real-world projects throughout the course and learn industry best practices used by top companies."
          numberOfLines={3}
        />
      </Card>

      <Text style={{ ...FontSize.xl, fontWeight: '700', color: t.text }}>Quiz</Text>
      <Card>
        <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text, marginBottom: Spacing[1] }}>
          Lesson 3 Quiz
        </Text>
        <Text style={{ ...FontSize.sm, color: t.textSecondary, marginBottom: Spacing[3.5] }}>
          Which hook is used to manage state in functional components?
        </Text>
        <View style={{ gap: Spacing[2] }}>
          {['useEffect', 'useState', 'useRef', 'useMemo'].map((opt, i) => (
            <QuizOption
              key={opt}
              label={opt}
              index={i}
              selected={quizAnswer === i}
              correct={quizRevealed && i === 1 ? true : undefined}
              incorrect={quizRevealed && quizAnswer === i && i !== 1 ? true : undefined}
              disabled={quizRevealed}
              onPress={() => { setQuizAnswer(i); setQuizRevealed(true); }}
            />
          ))}
        </View>
      </Card>

      <FlashCard
        front="What is JSX?"
        back="JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript files."
        category="Basics"
        difficulty="easy"
      />

      <Text style={{ ...FontSize.xl, fontWeight: '700', color: t.text }}>Code Lab</Text>
      <CodeBlock
        language="tsx"
        showLineNumbers
        code={`function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <Button
      title={\`Count: \${count}\`}
      onPress={() => setCount(c => c + 1)}
    />
  );
}`}
      />
    </ScrollView>
  );
}
