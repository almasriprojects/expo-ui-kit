import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';

import { Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CoachMarkTarget = {
  /** X coordinate of the target element */
  x: number;
  /** Y coordinate of the target element */
  y: number;
  /** Width of the target element */
  width: number;
  /** Height of the target element */
  height: number;
};

export type CoachMarkProps = {
  /** Controls the visibility of the coach mark */
  visible: boolean;
  /** Position and dimensions of the highlighted target */
  target: CoachMarkTarget;
  /** Tooltip heading text */
  title: string;
  /** Tooltip body text */
  description: string;
  /** Current step number in the tour */
  step?: number;
  /** Total number of steps in the tour */
  totalSteps?: number;
  /** Callback invoked to advance to the next step */
  onNext?: () => void;
  /** Callback invoked to dismiss the coach mark */
  onDismiss?: () => void;
};

export function CoachMark({
  visible,
  target,
  title,
  description,
  step,
  totalSteps,
  onNext,
  onDismiss,
}: CoachMarkProps) {
  const t = useTheme();
  const { height: screenHeight } = Dimensions.get('window');

  if (!visible) return null;

  const { x, y, width, height } = target;
  const padding = 8;

  const tooltipAbove = y > screenHeight / 2;
  const tooltipY = tooltipAbove ? y - 120 : y + height + padding + 16;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      accessibilityViewIsModal
      accessibilityLabel={`Coach mark: ${title}. ${description}`}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={onDismiss}
        accessible={false}
      >
        <View style={{ flex: 1, backgroundColor: t.overlay }}>
          {/* Top overlay */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: y - padding,
              backgroundColor: t.overlay,
            }}
          />
          {/* Bottom overlay */}
          <View
            style={{
              position: 'absolute',
              top: y + height + padding,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: t.overlay,
            }}
          />
          {/* Left overlay */}
          <View
            style={{
              position: 'absolute',
              top: y - padding,
              left: 0,
              width: x - padding,
              height: height + padding * 2,
              backgroundColor: t.overlay,
            }}
          />
          {/* Right overlay */}
          <View
            style={{
              position: 'absolute',
              top: y - padding,
              left: x + width + padding,
              right: 0,
              height: height + padding * 2,
              backgroundColor: t.overlay,
            }}
          />

          {/* Tooltip */}
          <View
            style={{
              position: 'absolute',
              left: 24,
              right: 24,
              top: tooltipY,
              backgroundColor: t.card,
              borderRadius: Radius.xl,
              padding: 20,
              borderWidth: 1,
              borderColor: t.border,
              ...Shadows.lg,
            }}
          >
            {totalSteps != null && step != null && (
              <Text
                style={{
                  fontSize: FontSize.sm.fontSize,
                  fontWeight: '600',
                  color: t.textSecondary,
                  marginBottom: 8,
                }}
              >
                Step {step} of {totalSteps}
              </Text>
            )}
            <Text
              style={{
                fontSize: FontSize.lg.fontSize,
                fontWeight: '700',
                color: t.text,
                marginBottom: 8,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: FontSize.md.fontSize,
                color: t.textSecondary,
                lineHeight: 20,
                marginBottom: 16,
              }}
            >
              {description}
            </Text>
            <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'flex-end' }}>
              {onDismiss && (
                <Pressable
                  onPress={onDismiss}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: Radius.lg,
                    backgroundColor: t.surface,
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Dismiss coach mark"
                >
                  <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.textSecondary }}>
                    Dismiss
                  </Text>
                </Pressable>
              )}
              {onNext && (
                <Pressable
                  onPress={onNext}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: Radius.lg,
                    backgroundColor: t.primary,
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Next"
                >
                  <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.primaryForeground }}>
                    Next
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
