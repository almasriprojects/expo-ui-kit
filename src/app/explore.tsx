import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import { BookingDemo } from '@/components/templates/booking-demo';
import { EducationDemo } from '@/components/templates/education-demo';
import { FinanceDemo } from '@/components/templates/finance-demo';
import { FitnessDemo } from '@/components/templates/fitness-demo';
import { FoodDemo } from '@/components/templates/food-demo';
import { MarketplaceDemo } from '@/components/templates/marketplace-demo';
import { MessagingDemo } from '@/components/templates/messaging-demo';
import { ProjectDemo } from '@/components/templates/project-demo';
import { RealEstateDemo } from '@/components/templates/realestate-demo';
import { SocialDemo } from '@/components/templates/social-demo';
import { Radius, Shadows, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

const APP_TYPES = [
  { key: 'marketplace', label: '🛒 Marketplace', desc: 'Products, cart, checkout' },
  { key: 'finance', label: '💳 Finance', desc: 'Banking, payments, budgets' },
  { key: 'social', label: '📱 Social', desc: 'Feed, profiles, stories' },
  { key: 'messaging', label: '💬 Messaging', desc: 'Chat, calls, contacts' },
  { key: 'food', label: '🍕 Food & Delivery', desc: 'Restaurants, menus, orders' },
  { key: 'booking', label: '🏨 Booking', desc: 'Hotels, travel, events' },
  { key: 'project', label: '📋 Projects', desc: 'Tasks, boards, teams' },
  { key: 'fitness', label: '💪 Fitness', desc: 'Workouts, tracking, goals' },
  { key: 'education', label: '📚 Education', desc: 'Courses, quizzes, progress' },
  { key: 'realestate', label: '🏡 Real Estate', desc: 'Listings, mortgage, tours' },
] as const;

type AppType = (typeof APP_TYPES)[number]['key'];

const DEMOS: Record<AppType, React.ComponentType> = {
  marketplace: MarketplaceDemo,
  finance: FinanceDemo,
  social: SocialDemo,
  messaging: MessagingDemo,
  food: FoodDemo,
  booking: BookingDemo,
  project: ProjectDemo,
  fitness: FitnessDemo,
  education: EducationDemo,
  realestate: RealEstateDemo,
};

export default function ExploreScreen() {
  const t = useTheme();
  const f = useFont();
  const [selected, setSelected] = useState<AppType>('marketplace');
  const scrollRef = useRef<ScrollView>(null);

  const DemoComponent = DEMOS[selected];

  return (
    <Screen>
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
        <Text style={{ fontSize: 26, fontWeight: '800', fontFamily: resolveFontFamily(f, '700'), color: t.text }}>App Templates</Text>
        <Text style={{ fontSize: 13, fontFamily: resolveFontFamily(f, '400'), color: t.textSecondary, marginTop: 4 }}>
          Real-world demos for every app type
        </Text>
      </View>

      <View style={{ height: 48 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, alignItems: 'center' }}>
          {APP_TYPES.map((app) => {
            const isActive = selected === app.key;
            return (
              <Pressable
                key={app.key}
                onPress={() => setSelected(app.key)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: Radius.full,
                  backgroundColor: isActive ? t.primary : t.surface,
                  borderWidth: isActive ? 0 : 1,
                  borderColor: t.border,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    fontFamily: resolveFontFamily(f, '600'),
                    color: isActive ? t.primaryForeground : t.text,
                  }}>
                  {app.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: t.surface,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
        }}>
        <Text style={{ fontSize: 12, color: t.textSecondary }}>
          {APP_TYPES.find((a) => a.key === selected)?.desc}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <DemoComponent />
      </View>
    </Screen>
  );
}
