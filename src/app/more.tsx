import React from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import {
  BookOpen,
  Building,
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

const PADDING = Spacing[5];
const GAP = Spacing[3];
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - PADDING * 2 - GAP) / 2;

export default function MoreScreen() {
  const t = useTheme();
  const f = useFont();
  const router = useRouter();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: PADDING,
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

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP }}>
          {MORE_APPS.map((app) => {
            const Icon = app.icon;
            return (
              <Pressable
                key={app.key}
                onPress={() => router.push(`/demo/${app.key}`)}
                accessibilityRole="button"
                accessibilityLabel={`${app.label} demo`}
                style={({ pressed }) => ({
                  width: CARD_WIDTH,
                  backgroundColor: t.card,
                  borderRadius: Radius.xl,
                  padding: Spacing[4],
                  borderWidth: 1,
                  borderColor: pressed ? t.primary : t.border,
                  opacity: pressed ? 0.9 : 1,
                  ...Shadows.sm,
                })}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: Spacing[3],
                  }}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: Radius.lg,
                      backgroundColor: t.primarySoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon size={20} color={t.primary} />
                  </View>
                  <ChevronRight size={16} color={t.textTertiary} />
                </View>
                <Text
                  style={{
                    ...FontSize.md,
                    fontWeight: '700',
                    fontFamily: resolveFontFamily(f, '700'),
                    color: t.text,
                    marginBottom: Spacing[0.5],
                  }}
                  numberOfLines={1}>
                  {app.label}
                </Text>
                <Text
                  style={{
                    ...FontSize.xs,
                    color: t.textSecondary,
                    fontFamily: resolveFontFamily(f, '400'),
                    lineHeight: 16,
                  }}
                  numberOfLines={2}>
                  {app.desc}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}
