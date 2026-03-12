import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Activity, Dumbbell, Droplets, Flame, Flower2, Target } from 'lucide-react-native';

import {
  ActivityRing,
  CalendarStrip,
  Card,
  ChecklistItem,
  CircularProgress,
  CountdownTimer,
  Divider,
  MediaControls,
  Progress,
  ProgressCard,
  Slider,
  StatCard,
  StreakCounter,
  WorkoutCard,
} from '@/components/ui';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function FitnessDemo() {
  const t = useTheme();
  const [calDate, setCalDate] = useState(new Date());
  const [water, setWater] = useState(5);
  const [playing, setPlaying] = useState(false);

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
        <Text
          style={{
            ...FontSize['2xl'],
            fontWeight: '700',
            color: t.text,
          }}
        >
          Hey, John
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: Spacing[1],
            backgroundColor: t.primarySoft,
            paddingHorizontal: Spacing[2.5],
            paddingVertical: Spacing[1],
            borderRadius: Radius.full,
          }}
        >
          <Flame size={16} color={t.orange} />
          <Text
            style={{
              ...FontSize.sm,
              fontWeight: '700',
              color: t.orange,
            }}
          >
            12
          </Text>
        </View>
      </View>

      {/* Activity Rings */}
      <View style={{ alignItems: 'center' }}>
        <ActivityRing
          size={160}
          strokeWidth={12}
          rings={[
            { progress: 78, color: t.error, label: 'Move' },
            { progress: 55, color: t.success, label: 'Exercise' },
            { progress: 92, color: t.primary, label: 'Stand' },
          ]}
        />
      </View>

      {/* Stats row */}
      <View style={{ flexDirection: 'row', gap: Spacing[2.5] }}>
        <StatCard title="Steps" value="8,432" subtitle="Goal: 10,000" style={{ flex: 1 }} />
        <StatCard title="Calories" value="486" subtitle="Goal: 650" style={{ flex: 1 }} />
        <StatCard title="Distance" value="5.2 km" subtitle="Goal: 8 km" style={{ flex: 1 }} />
      </View>

      <StreakCounter count={12} weekdays={[true, true, true, true, true, false, false]} />

      {/* This Week */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        This Week
      </Text>
      <CalendarStrip
        selectedDate={calDate}
        onDateSelect={setCalDate}
        markedDates={['2026-03-09', '2026-03-10', '2026-03-11', '2026-03-13']}
      />

      {/* Workouts */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        Workouts
      </Text>
      <WorkoutCard
        name="Morning HIIT"
        category="Cardio"
        duration="30 min"
        calories="320 cal"
        exercises={8}
        difficulty="intermediate"
        completed
        icon={<Activity size={22} color={t.success} />}
      />
      <WorkoutCard
        name="Upper Body Strength"
        category="Strength"
        duration="45 min"
        calories="280 cal"
        exercises={12}
        difficulty="advanced"
        icon={<Dumbbell size={22} color={t.primary} />}
      />
      <WorkoutCard
        name="Evening Yoga"
        category="Flexibility"
        duration="20 min"
        calories="90 cal"
        exercises={6}
        difficulty="beginner"
        icon={<Flower2 size={22} color={t.primary} />}
      />

      <ProgressCard
        title="Weekly Workout Goal"
        subtitle="4 of 5 workouts completed"
        progress={80}
        icon={<Target size={20} color={t.primary} />}
        completedLabel="80% complete"
        totalLabel="1 remaining"
      />

      {/* Hydration */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        Hydration
      </Text>
      <Card>
        <View style={{ gap: Spacing[3] }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[1.5] }}>
              <Droplets size={15} color={t.primary} />
              <Text
                style={{
                  ...FontSize.md,
                  fontWeight: '600',
                  color: t.text,
                }}
              >
                Water
              </Text>
            </View>
            <Text
              style={{
                ...FontSize.sm,
                fontWeight: '700',
                color: t.primary,
              }}
            >
              {water} / 8 glasses
            </Text>
          </View>
          <Progress value={(water / 8) * 100} />
          <Slider value={water} onValueChange={setWater} min={0} max={8} step={1} />
        </View>
      </Card>

      {/* Active Workout */}
      <Card>
        <View style={{ alignItems: 'center', gap: Spacing[3] }}>
          <CircularProgress progress={65} size={100} label="Progress" />
          <CountdownTimer
            targetDate={new Date(Date.now() + 5 * 60 * 1000)}
            label="Rest Timer"
            variant="compact"
          />
        </View>
      </Card>

      <MediaControls
        title="High Energy Mix"
        artist="Workout Playlist"
        isPlaying={playing}
        onPlayPause={() => setPlaying(!playing)}
        currentTime={84}
        duration={242}
      />

      {/* Daily Goals */}
      <Text
        style={{
          ...FontSize.lg,
          fontWeight: '600',
          color: t.text,
          marginTop: Spacing[1],
        }}
      >
        Daily Goals
      </Text>
      <Card>
        <ChecklistItem title="30 min workout" checked onToggle={() => {}} priority="high" />
        <Divider />
        <ChecklistItem
          title="8 glasses of water"
          checked={water >= 8}
          onToggle={() => {}}
          priority="medium"
        />
        <Divider />
        <ChecklistItem title="10,000 steps" checked={false} onToggle={() => {}} priority="low" />
        <Divider />
        <ChecklistItem title="8 hours sleep" checked onToggle={() => {}} />
      </Card>
    </ScrollView>
  );
}
