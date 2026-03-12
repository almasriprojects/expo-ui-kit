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

const GRID_GAP = 12;
const HORIZONTAL_PAD = 20;

export default function MoreScreen() {
  const t = useTheme();
  const f = useFont();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = (screenWidth - HORIZONTAL_PAD * 2 - GRID_GAP) / 2;

  const rows: (typeof MORE_APPS[number])[][] = [];
  for (let i = 0; i < MORE_APPS.length; i += 2) {
    rows.push(MORE_APPS.slice(i, i + 2) as unknown as (typeof MORE_APPS[number])[]);
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PAD,
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
            marginBottom: Spacing[5],
          }}>
          Real-world demos built with the component library
        </Text>

        {rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: 'row',
              marginBottom: GRID_GAP,
            }}>
            {row.map((app, colIndex) => {
              const Icon = app.icon;
              return (
                <Pressable
                  key={app.key}
                  onPress={() => router.push(`/demo/${app.key}`)}
                  accessibilityRole="button"
                  accessibilityLabel={`${app.label} demo`}
                  style={({ pressed }) => ({
                    width: cardWidth,
                    marginLeft: colIndex === 1 ? GRID_GAP : 0,
                    backgroundColor: pressed ? t.surface : t.card,
                    borderRadius: Radius.xl,
                    padding: Spacing[4],
                    borderWidth: 1,
                    borderColor: pressed ? t.primary : t.border,
                    ...Shadows.sm,
                  })}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: Spacing[2],
                    }}>
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
                    <View style={{ flex: 1 }} />
                    <ChevronRight size={16} color={t.textTertiary} />
                  </View>
                  <Text
                    style={{
                      ...FontSize.sm,
                      fontWeight: '700',
                      fontFamily: resolveFontFamily(f, '700'),
                      color: t.text,
                      marginBottom: 2,
                    }}
                    numberOfLines={1}>
                    {app.label}
                  </Text>
                  <Text
                    style={{
                      ...FontSize['2xs'],
                      color: t.textSecondary,
                      fontFamily: resolveFontFamily(f, '400'),
                    }}
                    numberOfLines={2}>
                    {app.desc}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
