import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
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
import { FontSize, Radius, Shadows, Spacing, resolveFontFamily } from '@/constants/theme';
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

export default function MoreScreen() {
  const t = useTheme();
  const f = useFont();
  const router = useRouter();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing[5],
          paddingTop: Spacing[4],
          paddingBottom: Spacing[16],
        }}>
        <Text
          style={{
            ...FontSize['2xl'],
            fontWeight: '800',
            fontFamily: resolveFontFamily(f, '700'),
            color: t.text,
            marginBottom: Spacing[1],
          }}>
          App Templates
        </Text>
        <Text
          style={{
            ...FontSize.sm,
            fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary,
            marginBottom: Spacing[6],
          }}>
          Real-world demos built with the component library
        </Text>

        <View
          style={{
            backgroundColor: t.card,
            borderRadius: Radius.xl,
            borderWidth: 1,
            borderColor: t.border,
            overflow: 'hidden',
            ...Shadows.sm,
          }}>
          {MORE_APPS.map((app, index) => {
            const Icon = app.icon;
            const isLast = index === MORE_APPS.length - 1;
            return (
              <Pressable
                key={app.key}
                onPress={() => router.push(`/demo/${app.key}`)}
                accessibilityRole="button"
                accessibilityLabel={`${app.label} demo`}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: Spacing[4],
                  paddingHorizontal: Spacing[4],
                  backgroundColor: pressed ? t.surface : 'transparent',
                  borderBottomWidth: isLast ? 0 : 1,
                  borderBottomColor: t.border,
                })}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: Radius.lg,
                    backgroundColor: t.primarySoft,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: Spacing[4],
                  }}>
                  <Icon size={20} color={t.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...FontSize.md,
                      fontWeight: '600',
                      fontFamily: resolveFontFamily(f, '600'),
                      color: t.text,
                      marginBottom: 2,
                    }}
                    numberOfLines={1}>
                    {app.label}
                  </Text>
                  <Text
                    style={{
                      ...FontSize.xs,
                      color: t.textSecondary,
                      fontFamily: resolveFontFamily(f, '400'),
                    }}
                    numberOfLines={1}>
                    {app.desc}
                  </Text>
                </View>

                <ChevronRight size={18} color={t.textTertiary} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}
