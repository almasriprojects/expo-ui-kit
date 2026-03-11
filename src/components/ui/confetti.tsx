import { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';

export type ConfettiProps = {
  /** Whether the confetti animation is active */
  active: boolean;
  /** Number of confetti particles */
  count?: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Array of colors used for the confetti particles */
  colors?: string[];
};

const DEFAULT_COUNT = 40;
const DEFAULT_DURATION = 1500;

type ParticleConfig = {
  id: number;
  angle: number;
  distance: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  isCircle: boolean;
};

function createParticles(
  count: number,
  colors: string[],
  durationScale: number
): ParticleConfig[] {
  const particles: ParticleConfig[] = [];
  for (let i = 0; i < count; i++) {
    const duration = (800 + Math.random() * 700) * durationScale;
    particles.push({
      id: i,
      angle: Math.random() * Math.PI * 2,
      distance: 80 + Math.random() * 120,
      delay: Math.random() * 200,
      duration,
      color: colors[i % colors.length],
      size: 4 + Math.random() * 6,
      isCircle: Math.random() > 0.5,
    });
  }
  return particles;
}

function ConfettiParticle({
  config,
  active,
  screenCenter,
}: {
  config: ParticleConfig;
  active: boolean;
  screenCenter: { x: number; y: number };
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    if (active) {
      const endX = Math.cos(config.angle) * config.distance;
      const endY = Math.sin(config.angle) * config.distance - 50;

      translateX.value = 0;
      translateY.value = 0;
      opacity.value = 0;
      rotate.value = 0;

      translateX.value = withDelay(
        config.delay,
        withTiming(endX, { duration: config.duration })
      );
      translateY.value = withDelay(
        config.delay,
        withTiming(endY, { duration: config.duration })
      );
      opacity.value = withDelay(
        config.delay,
        withSequence(
          withTiming(1, { duration: 50 }),
          withDelay(config.duration - 200, withTiming(0, { duration: 200 }))
        )
      );
      rotate.value = withDelay(
        config.delay,
        withTiming(360 + Math.random() * 360, { duration: config.duration })
      );
    }
  }, [active, config, translateX, translateY, opacity, rotate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        animatedStyle,
        {
          left: screenCenter.x - config.size / 2,
          top: screenCenter.y - config.size / 2,
          width: config.size,
          height: config.size,
          backgroundColor: config.color,
          borderRadius: config.isCircle ? config.size / 2 : 2,
        },
      ]}
    />
  );
}

export function Confetti({
  active,
  count = DEFAULT_COUNT,
  duration = DEFAULT_DURATION,
  colors: customColors,
}: ConfettiProps) {
  const t = useTheme();
  const defaultColors = useMemo(
    () => [t.primary, t.success, t.warning, t.error, t.purple],
    [t.primary, t.success, t.warning, t.error, t.purple]
  );
  const colors = customColors ?? defaultColors;

  const { width, height } = Dimensions.get('window');
  const screenCenter = useMemo(
    () => ({ x: width / 2, y: height / 2 }),
    [width, height]
  );

  const durationScale = duration / DEFAULT_DURATION;
  const particles = useMemo(
    () => createParticles(count, colors, durationScale),
    [count, colors, durationScale]
  );

  if (!active) return null;

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {particles.map((config) => (
        <ConfettiParticle
          key={config.id}
          config={config}
          active={active}
          screenCenter={screenCenter}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
  },
});
