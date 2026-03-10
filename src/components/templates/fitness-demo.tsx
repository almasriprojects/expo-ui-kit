import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Activity, Dumbbell, Droplets, Flower2, Target } from 'lucide-react-native';

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
  Separator,
  Slider,
  StatCard,
  StreakCounter,
  WorkoutCard,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export function FitnessDemo() {
  const t = useTheme();
  const [calDate, setCalDate] = useState(new Date());
  const [water, setWater] = useState(5);
  const [playing, setPlaying] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}>
      <Separator label="Today's Activity" />
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

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <StatCard title="Steps" value="8,432" subtitle="Goal: 10,000" style={{ flex: 1 }} />
        <StatCard title="Calories" value="486" subtitle="Goal: 650" style={{ flex: 1 }} />
        <StatCard title="Distance" value="5.2 km" subtitle="Goal: 8 km" style={{ flex: 1 }} />
      </View>

      <Separator label="Streak" />
      <StreakCounter count={12} weekdays={[true, true, true, true, true, false, false]} />

      <Separator label="Weekly Schedule" />
      <CalendarStrip
        selectedDate={calDate}
        onDateSelect={setCalDate}
        markedDates={['2026-03-09', '2026-03-10', '2026-03-11', '2026-03-13']}
      />

      <Separator label="Today's Workouts" />
      <WorkoutCard name="Morning HIIT" category="Cardio" duration="30 min" calories="320 cal" exercises={8} difficulty="intermediate" completed icon={<Activity size={22} color={t.success} />} />
      <WorkoutCard name="Upper Body Strength" category="Strength" duration="45 min" calories="280 cal" exercises={12} difficulty="advanced" icon={<Dumbbell size={22} color={t.primary} />} />
      <WorkoutCard name="Evening Yoga" category="Flexibility" duration="20 min" calories="90 cal" exercises={6} difficulty="beginner" icon={<Flower2 size={22} color={t.primary} />} />

      <Separator label="Progress" />
      <ProgressCard
        title="Weekly Workout Goal"
        subtitle="4 of 5 workouts completed"
        progress={80}
        icon={<Target size={20} color={t.primary} />}
        completedLabel="80% complete"
        totalLabel="1 remaining"
      />

      <Separator label="Water Intake" />
      <Card>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Droplets size={15} color={t.primary} />
              <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>Water</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: t.primary }}>{water} / 8 glasses</Text>
          </View>
          <Progress value={(water / 8) * 100} />
          <Slider value={water} onValueChange={setWater} min={0} max={8} step={1} />
        </View>
      </Card>

      <Separator label="Active Workout" />
      <Card>
        <View style={{ alignItems: 'center', gap: 12 }}>
          <CircularProgress progress={65} size={100} label="Progress" />
          <CountdownTimer
            targetDate={new Date(Date.now() + 5 * 60 * 1000)}
            label="Rest Timer"
            variant="compact"
          />
        </View>
      </Card>

      <Separator label="Workout Music" />
      <MediaControls
        title="High Energy Mix"
        artist="Workout Playlist"
        isPlaying={playing}
        onPlayPause={() => setPlaying(!playing)}
        currentTime={84}
        duration={242}
      />

      <Separator label="Daily Goals" />
      <Card>
        <ChecklistItem title="30 min workout" checked onToggle={() => {}} priority="high" />
        <Divider />
        <ChecklistItem title="8 glasses of water" checked={water >= 8} onToggle={() => {}} priority="medium" />
        <Divider />
        <ChecklistItem title="10,000 steps" checked={false} onToggle={() => {}} priority="low" />
        <Divider />
        <ChecklistItem title="8 hours sleep" checked onToggle={() => {}} />
      </Card>
    </ScrollView>
  );
}
