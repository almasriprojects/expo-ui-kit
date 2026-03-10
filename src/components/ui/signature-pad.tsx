import React, { useCallback, useRef, useState } from 'react';
import { View, type ViewProps } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { Button } from './button';

export type SignaturePadProps = ViewProps & {
  onSave?: (paths: string) => void;
  onClear?: () => void;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
};

export function SignaturePad({
  onSave,
  onClear,
  height = 200,
  strokeColor,
  strokeWidth = 2,
  style,
  ...props
}: SignaturePadProps) {
  const t = useTheme();
  const color = strokeColor ?? t.text;
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const currentPathRef = useRef<string>('');

  const addPoint = useCallback((x: number, y: number, isStart: boolean) => {
    const point = `${x} ${y}`;
    const next = isStart ? `M ${point}` : `${currentPathRef.current} L ${point}`;
    currentPathRef.current = next;
    setCurrentPath(next);
  }, []);

  const finishPath = useCallback(() => {
    const path = currentPathRef.current;
    if (path) {
      setPaths((prev) => [...prev, path]);
    }
    currentPathRef.current = '';
    setCurrentPath('');
  }, []);

  const startPath = useCallback((x: number, y: number) => {
    addPoint(x, y, true);
  }, [addPoint]);

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      runOnJS(startPath)(e.x, e.y);
    })
    .onUpdate((e) => {
      runOnJS(addPoint)(e.x, e.y, false);
    })
    .onEnd(() => {
      runOnJS(finishPath)();
    });

  const handleClear = useCallback(() => {
    setPaths([]);
    setCurrentPath('');
    onClear?.();
  }, [onClear]);

  const handleSave = useCallback(() => {
    const allPaths = currentPath ? [...paths, currentPath] : paths;
    const pathsStr = allPaths.join(' ');
    onSave?.(pathsStr);
  }, [paths, currentPath, onSave]);

  const allPaths = currentPath ? [...paths, currentPath] : paths;
  const hasContent = allPaths.length > 0 || currentPath.length > 0;

  return (
    <View style={[{ gap: 12 }, style]} {...props}>
      <GestureHandlerRootView>
        <GestureDetector gesture={panGesture}>
          <View
            accessibilityRole="none"
            accessibilityLabel="Signature drawing area"
            style={{
              height,
              borderRadius: Radius.lg,
              borderWidth: 1.5,
              borderColor: t.border,
              backgroundColor: t.surface,
              overflow: 'hidden',
              ...Shadows.sm,
            }}>
            <Svg
              width="100%"
              height={height}
              style={{ backgroundColor: 'transparent' }}>
              {allPaths.map((pathStr, i) => (
                <Path
                  key={i}
                  d={pathStr}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </Svg>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button
          title="Clear"
          variant="outline"
          size="sm"
          onPress={handleClear}
          accessibilityLabel="Clear signature"
        />
        <Button
          title="Save"
          variant="primary"
          size="sm"
          onPress={handleSave}
          disabled={!hasContent}
          accessibilityLabel="Save signature"
        />
      </View>
    </View>
  );
}
