import React from 'react';
import { Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { AuthDemo } from '@/components/templates/auth-demo';
import { BookingDemo } from '@/components/templates/booking-demo';
import { EducationDemo } from '@/components/templates/education-demo';
import { FitnessDemo } from '@/components/templates/fitness-demo';
import { FoodDemo } from '@/components/templates/food-demo';
import { MessagingDemo } from '@/components/templates/messaging-demo';
import { ProjectDemo } from '@/components/templates/project-demo';
import { RealEstateDemo } from '@/components/templates/realestate-demo';
import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const DEMOS: Record<string, { label: string; component: React.ComponentType }> = {
  auth: { label: 'Auth', component: AuthDemo },
  messaging: { label: 'Messaging', component: MessagingDemo },
  food: { label: 'Food & Delivery', component: FoodDemo },
  booking: { label: 'Booking', component: BookingDemo },
  project: { label: 'Projects', component: ProjectDemo },
  fitness: { label: 'Fitness', component: FitnessDemo },
  education: { label: 'Education', component: EducationDemo },
  realestate: { label: 'Real Estate', component: RealEstateDemo },
};

export default function DemoScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const t = useTheme();

  const demo = type ? DEMOS[type] : undefined;

  if (!demo) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: t.background }}>
        <Text style={{ ...FontSize.md, color: t.textSecondary }}>Demo not found</Text>
      </View>
    );
  }

  const DemoComponent = demo.component;

  return (
    <>
      <Stack.Screen options={{ title: demo.label }} />
      <View style={{ flex: 1, backgroundColor: t.background }}>
        <DemoComponent />
      </View>
    </>
  );
}
