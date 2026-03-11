import React from 'react';
import { Pressable, Text, TextInput, View, type ViewProps } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type RichTextEditorProps = ViewProps & {
  /** Current rich text content (markdown-style) */
  value: string;
  /** Callback invoked when the text content changes */
  onChangeText: (text: string) => void;
  /** Placeholder text shown when the editor is empty */
  placeholder?: string;
  /** Minimum height of the text editing area in pixels */
  minHeight?: number;
};

type FormatType = 'bold' | 'italic' | 'list';

function wrapWithFormat(text: string, selection: { start: number; end: number }, format: FormatType): string {
  const before = text.slice(0, selection.start);
  const selected = text.slice(selection.start, selection.end);
  const after = text.slice(selection.end);

  const markers: Record<FormatType, [string, string]> = {
    bold: ['**', '**'],
    italic: ['_', '_'],
    list: ['\n• ', ''],
  };
  const [open, close] = markers[format];
  return before + open + selected + close + after;
}

export function RichTextEditor({
  value,
  onChangeText,
  placeholder,
  minHeight = 120,
  style,
  ...props
}: RichTextEditorProps) {
  const t = useTheme();
  const inputRef = React.useRef<TextInput>(null);
  const selectionRef = React.useRef({ start: 0, end: 0 });

  const applyFormat = (format: FormatType) => {
    const { start, end } = selectionRef.current;
    const newText = wrapWithFormat(value, { start, end }, format);
    onChangeText(newText);
  };

  return (
    <View style={[{ gap: 8 }, style]} {...props}>
      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          paddingVertical: 6,
          paddingHorizontal: 8,
          backgroundColor: t.surface,
          borderRadius: Radius.md,
          borderWidth: 1,
          borderColor: t.border,
        }}>
        <ToolbarButton
          label="B"
          onPress={() => applyFormat('bold')}
          theme={t}
          accessibilityLabel="Bold"
        />
        <ToolbarButton
          label="I"
          onPress={() => applyFormat('italic')}
          theme={t}
          accessibilityLabel="Italic"
        />
        <ToolbarButton
          label="•"
          onPress={() => applyFormat('list')}
          theme={t}
          accessibilityLabel="List"
        />
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        onSelectionChange={(e) => {
          selectionRef.current = e.nativeEvent.selection;
        }}
        placeholder={placeholder}
        placeholderTextColor={t.textTertiary}
        multiline
        textAlignVertical="top"
        accessibilityLabel="Rich text editor"
        accessibilityHint="Use toolbar for bold, italic, and list formatting"
        style={{
          minHeight,
          padding: 14,
          borderRadius: Radius.lg,
          fontSize: FontSize.lg.fontSize,
          backgroundColor: t.surface,
          color: t.text,
          borderWidth: 1.5,
          borderColor: t.border,
        }}
      />
    </View>
  );
}

function ToolbarButton({
  label,
  onPress,
  theme,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 36,
        height: 36,
        borderRadius: Radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? theme.surfacePressed : 'transparent',
      })}>
      <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: theme.text }}>
        {label}
      </Text>
    </Pressable>
  );
}
