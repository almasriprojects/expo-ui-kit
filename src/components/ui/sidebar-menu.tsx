import { SymbolView } from 'expo-symbols';
import React, { type ReactNode } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Animation, FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SidebarMenuItem = {
  /** Unique key for the menu item */
  key: string;
  /** Display label for the menu item */
  label: string;
  /** SF Symbol name for the menu icon */
  icon?: string;
  /** Callback invoked when the item is pressed */
  onPress: () => void;
  /** Badge count displayed on the item */
  badge?: number;
};

export type SidebarMenuProps = {
  /** Whether the sidebar is visible */
  visible: boolean;
  /** Callback invoked when the sidebar is dismissed */
  onClose: () => void;
  /** Custom content rendered at the top of the sidebar */
  header?: ReactNode;
  /** Custom content rendered at the bottom of the sidebar */
  footer?: ReactNode;
  /** Array of menu items to display */
  items: SidebarMenuItem[];
  /** Key of the currently active menu item */
  activeKey?: string;
  /** Accessibility label for the sidebar container */
  accessibilityLabel?: string;
  /** Accessibility hint for the sidebar container */
  accessibilityHint?: string;
};

export function SidebarMenu({
  visible,
  onClose,
  header,
  footer,
  items,
  activeKey,
  accessibilityLabel,
  accessibilityHint,
}: SidebarMenuProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const screenW = Dimensions.get('window').width;
  const drawerW = Math.min(screenW * 0.82, 320);
  const translateX = useSharedValue(-drawerW);

  React.useEffect(() => {
    translateX.value = withTiming(visible ? 0 : -drawerW, {
      duration: Animation.duration.normal,
    });
  }, [visible, drawerW, translateX]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(visible ? 1 : 0, { duration: Animation.duration.normal }),
    pointerEvents: visible ? 'auto' : 'none',
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      accessibilityViewIsModal
      accessibilityLabel={accessibilityLabel ?? 'Sidebar menu'}
      accessibilityHint={accessibilityHint}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
              backgroundColor: t.overlay,
            },
            overlayStyle,
          ]}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: drawerW,
              backgroundColor: t.card,
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 16,
              ...Shadows.xl,
            },
            drawerStyle,
          ]}
        >
          {header && (
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: t.border,
              }}
            >
              {header}
            </View>
          )}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 12 }}
            showsVerticalScrollIndicator={false}
            accessibilityLabel="Menu items"
          >
            {items.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => {
                    item.onPress();
                    onClose();
                  }}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    borderRadius: Radius.md,
                    gap: 12,
                    backgroundColor: isActive
                      ? t.primarySoft
                      : pressed
                        ? t.surface
                        : 'transparent',
                  })}
                  accessibilityRole="menuitem"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: isActive }}
                  accessibilityHint={item.badge != null ? `${item.badge} notifications` : undefined}
                >
                  {item.icon ? (
                    <SymbolView
                      name={item.icon as any}
                      size={20}
                      tintColor={isActive ? t.primary : t.textSecondary}
                    />
                  ) : null}
                  <Text
                    style={{
                      flex: 1,
                      fontSize: FontSize.lg.fontSize,
                      fontWeight: isActive ? '600' : '500',
                      color: isActive ? t.primary : t.text,
                    }}
                  >
                    {item.label}
                  </Text>
                  {item.badge != null && item.badge > 0 ? (
                    <View
                      style={{
                        backgroundColor: t.error,
                        minWidth: 20,
                        height: 20,
                        borderRadius: Radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FontSize.sm.fontSize,
                          fontWeight: '600',
                          color: t.textOnColor,
                        }}
                      >
                        {item.badge > 99 ? '99+' : item.badge}
                      </Text>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
          {footer && (
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor: t.border,
              }}
            >
              {footer}
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
