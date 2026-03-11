import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, View, type ViewStyle } from 'react-native';
import { FlipHorizontal, FlipVertical, RotateCw, Sliders } from 'lucide-react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ImageEdits = {
  /** Rotation angle in degrees */
  rotation: number;
  /** Whether image is flipped horizontally */
  flipH: boolean;
  /** Whether image is flipped vertically */
  flipV: boolean;
  /** Selected filter name */
  filter: string;
};

export type ImageEditorProps = {
  /** URI of the image to edit */
  imageUri: string;
  /** Callback when edits are saved */
  onSave?: (edits: ImageEdits) => void;
  /** Callback when editing is cancelled */
  onCancel?: () => void;
  /** Optional container style */
  style?: ViewStyle;
};

const FILTERS = ['Original', 'Warm', 'Cool', 'B&W', 'Vivid', 'Vintage'];

const AnimatedImage = Animated.createAnimatedComponent(Image);

export function ImageEditor({
  imageUri,
  onSave,
  onCancel,
  style,
}: ImageEditorProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [filter, setFilter] = useState('Original');
  const [showFilters, setShowFilters] = useState(true);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleSave = useCallback(() => {
    onSave?.({ rotation, flipH, flipV, filter });
  }, [onSave, rotation, flipH, flipV, filter]);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation}deg` },
      { scaleX: flipH ? -1 : 1 },
      { scaleY: flipV ? -1 : 1 },
    ],
  }));

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: '#000',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Spacing[4],
          height: 52,
        }}>
        <Pressable
          onPress={onCancel}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          accessibilityRole="button"
          accessibilityLabel="Cancel editing">
          <ThemedText
            style={{
              fontSize: FontSize.md.fontSize,
              color: '#fff',
            }}>
            Cancel
          </ThemedText>
        </Pressable>

        <ThemedText
          style={{
            fontSize: FontSize.lg.fontSize,
            fontWeight: '600',
            color: '#fff',
          }}>
          Edit
        </ThemedText>

        <Pressable
          onPress={handleSave}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          accessibilityRole="button"
          accessibilityLabel="Save edits">
          <ThemedText
            style={{
              fontSize: FontSize.md.fontSize,
              fontWeight: '600',
              color: t.primary,
            }}>
            Save
          </ThemedText>
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Spacing[4],
        }}>
        <AnimatedImage
          source={{ uri: imageUri }}
          style={[
            {
              width: '100%',
              aspectRatio: 1,
              borderRadius: Radius.md,
            },
            imageStyle,
          ]}
          contentFit="contain"
          accessibilityLabel="Image being edited"
        />
      </View>

      <View style={{ paddingBottom: Spacing[4] }}>
        {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Spacing[4],
              gap: Spacing[2],
              paddingBottom: Spacing[3],
            }}>
            {FILTERS.map((f) => {
              const isSelected = filter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  style={({ pressed }) => ({
                    paddingHorizontal: Spacing[4],
                    paddingVertical: Spacing[2],
                    borderRadius: Radius.full,
                    backgroundColor: isSelected ? t.primary : 'rgba(255,255,255,0.15)',
                    opacity: pressed ? 0.8 : 1,
                  })}
                  accessibilityRole="button"
                  accessibilityLabel={`${f} filter`}
                  accessibilityState={{ selected: isSelected }}>
                  <ThemedText
                    style={{
                      fontSize: FontSize.sm.fontSize,
                      fontWeight: isSelected ? '600' : '400',
                      color: isSelected ? t.primaryForeground : '#fff',
                    }}>
                    {f}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: Spacing[6],
            paddingHorizontal: Spacing[4],
          }}>
          <ToolButton
            icon={<RotateCw size={22} color="#fff" />}
            label="Rotate"
            onPress={handleRotate}
          />
          <ToolButton
            icon={<FlipHorizontal size={22} color={flipH ? t.primary : '#fff'} />}
            label="Flip horizontal"
            onPress={() => setFlipH((v) => !v)}
          />
          <ToolButton
            icon={<FlipVertical size={22} color={flipV ? t.primary : '#fff'} />}
            label="Flip vertical"
            onPress={() => setFlipV((v) => !v)}
          />
          <ToolButton
            icon={<Sliders size={22} color={showFilters ? t.primary : '#fff'} />}
            label="Filters"
            onPress={() => setShowFilters((v) => !v)}
          />
        </View>
      </View>
    </View>
  );
}

function ToolButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 48,
        height: 48,
        borderRadius: Radius.full,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
      })}
      accessibilityRole="button"
      accessibilityLabel={label}>
      {icon}
    </Pressable>
  );
}
