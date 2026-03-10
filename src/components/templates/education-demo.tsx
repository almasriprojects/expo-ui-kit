import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BookOpen, Smartphone } from 'lucide-react-native';

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
  Separator,
  StatCard,
  StepIndicator,
  VideoThumbnail,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export function EducationDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [quizAnswer, setQuizAnswer] = useState(-1);
  const [quizRevealed, setQuizRevealed] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}>
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

      <Separator label="Your Learning" />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <StatCard title="Courses" value="3" subtitle="In progress" style={{ flex: 1 }} />
        <StatCard title="Hours" value="42" subtitle="Total learned" style={{ flex: 1 }} />
        <StatCard title="Streak" value="12🔥" subtitle="Days" style={{ flex: 1 }} />
      </View>

      <Separator label="Continue Learning" />
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

      <Separator label="Course Content" />
      <StepIndicator
        steps={['Basics', 'Components', 'State', 'Navigation', 'APIs']}
        currentStep={2}
      />

      <View style={{ gap: 8 }}>
        <LessonCard title="Introduction to React Native" subtitle="What and why" duration="8 min" completed lessonNumber={1} />
        <LessonCard title="Setting Up Your Environment" subtitle="Expo, Node.js, IDE" duration="12 min" completed lessonNumber={2} />
        <LessonCard title="Your First Component" subtitle="JSX, props, styling" duration="15 min" current progress={45} lessonNumber={3} />
        <LessonCard title="State & Lifecycle" subtitle="useState, useEffect" duration="20 min" lessonNumber={4} />
        <LessonCard title="Navigation" subtitle="Expo Router, tabs, stacks" duration="18 min" locked lessonNumber={5} />
      </View>

      <Separator label="Video Lesson" />
      <VideoThumbnail
        title="Understanding React Hooks — A Complete Guide"
        duration="15:42"
        views="12K views"
        channel="React Academy"
      />

      <Separator label="Course Description" />
      <Card>
        <ReadMoreText
          text="This comprehensive course covers everything you need to know about building mobile applications with React Native and Expo. From basic component creation to advanced state management, navigation patterns, API integration, and deployment. You'll build 3 real-world projects throughout the course and learn industry best practices used by top companies."
          numberOfLines={3}
        />
      </Card>

      <Separator label="Quiz" />
      <Card>
        <Text style={{ fontSize: 16, fontWeight: '700', color: t.text, marginBottom: 4 }}>
          Lesson 3 Quiz
        </Text>
        <Text style={{ fontSize: 13, color: t.textSecondary, marginBottom: 14 }}>
          Which hook is used to manage state in functional components?
        </Text>
        <View style={{ gap: 8 }}>
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

      <Separator label="Flash Cards" />
      <FlashCard
        front="What is JSX?"
        back="JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript files."
        category="Basics"
        difficulty="easy"
      />

      <Separator label="Code Example" />
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
