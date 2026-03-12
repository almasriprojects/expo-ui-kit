import React from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  BookOpen,
  Building,
  ChevronRight,
  ClipboardList,
  Dumbbell,
  Home,
  Lock,
  MessageCircle,
  UtensilsCrossed,
} from 'lucide-react-native';

import { Screen } from '@/components/layout';
import { FontSize, Radius, Spacing, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

const MORE_APPS = [
  { key: 'auth', label: 'Auth', icon: Lock, desc: 'Sign in, sign up, forgot password, OTP, reset' },
  { key: 'messaging', label: 'Messaging', icon: MessageCircle, desc: 'Chat, calls, contacts' },
  { key: 'food', label: 'Food & Delivery', icon: UtensilsCrossed, desc: 'Restaurants, menus, orders' },
  { key: 'booking', label: 'Booking', icon: Building, desc: 'Hotels, travel, events' },
  { key: 'project', label: 'Projects', icon: ClipboardList, desc: 'Tasks, boards, teams' },
  { key: 'fitness', label: 'Fitness', icon: Dumbbell, desc: 'Workouts, tracking, goals' },
  { key: 'education', label: 'Education', icon: BookOpen, desc: 'Courses, quizzes, progress' },
  { key: 'realestate', label: 'Real Estate', icon: Home, desc: 'Listings, mortgage, tours' },
] as const;

const GAP = 12;
const PAD = 20;

function AppCard({
  app,
  width,
  t,
  f,
  onPress,
}: {
  app: (typeof MORE_APPS)[number];
  width: number;
  t: ReturnType<typeof useTheme>;
  f: ReturnType<typeof useFont>;
  onPress: () => void;
}) {
  const Icon = app.icon;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${app.label} demo`}>
      <View
        style={{
          width,
          backgroundColor: t.surface,
          borderRadius: Radius.xl,
          padding: 16,
          borderWidth: 1.5,
          borderColor: t.border,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: Radius.md,
              backgroundColor: t.primarySoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon size={18} color={t.primary} />
          </View>
          <ChevronRight size={16} color={t.textTertiary} />
        </View>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: '700',
            fontFamily: resolveFontFamily(f, '700'),
            color: t.text,
            marginBottom: 3,
          }}>
          {app.label}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 12,
            lineHeight: 16,
            color: t.textSecondary,
            fontFamily: resolveFontFamily(f, '400'),
          }}>
          {app.desc}
        </Text>
      </View>
    </Pressable>
  );
}

export default function MoreScreen() {
  const t = useTheme();
  const f = useFont();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = Math.floor((screenWidth - PAD * 2 - GAP) / 2);

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: PAD,
          paddingTop: Spacing[4],
          paddingBottom: Spacing[16],
        }}>
        <Text
          style={{
            ...FontSize['2xl'],
            fontWeight: '800',
            fontFamily: resolveFontFamily(f, '700'),
            color: t.text,
            marginBottom: 4,
          }}>
          App Templates
        </Text>
        <Text
          style={{
            ...FontSize.sm,
            fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary,
            marginBottom: 24,
          }}>
          Real-world demos built with the component library
        </Text>

        {[0, 2, 4, 6].map((startIdx) => (
          <View key={startIdx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: GAP }}>
            <AppCard
              app={MORE_APPS[startIdx]}
              width={cardWidth}
              t={t}
              f={f}
              onPress={() => router.push(`/demo/${MORE_APPS[startIdx].key}`)}
            />
            {MORE_APPS[startIdx + 1] && (
              <AppCard
                app={MORE_APPS[startIdx + 1]}
                width={cardWidth}
                t={t}
                f={f}
                onPress={() => router.push(`/demo/${MORE_APPS[startIdx + 1].key}`)}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
