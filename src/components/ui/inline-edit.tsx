import React, { useState } from 'react';
import { Pressable, Text, TextInput, type TextStyle, type ViewProps } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InlineEditProps = ViewProps & {
  /** Current text value */
  value: string;
  /** Callback fired with the new value when editing completes */
  onSave: (value: string) => void;
  /** Placeholder text shown when value is empty */
  placeholder?: string;
  /** Custom text styles for the display and input */
  textStyle?: TextStyle;
};

export function InlineEdit({
  value,
  onSave,
  placeholder = 'Tap to edit',
  textStyle,
  style,
  ...props
}: InlineEditProps) {
  const t = useTheme();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleStartEdit = () => {
    setDraft(value);
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    onSave(draft);
  };

  const handleBlur = () => {
    handleSave();
  };

  const handleSubmit = () => {
    handleSave();
  };

  if (editing) {
    return (
      <TextInput
        value={draft}
        onChangeText={setDraft}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmit}
        placeholder={placeholder}
        placeholderTextColor={t.textTertiary}
        autoFocus
        selectTextOnFocus
        accessibilityLabel="Edit text"
        accessibilityHint="Press enter or tap outside to save"
        style={[
          {
            fontSize: FontSize.lg.fontSize,
            color: t.text,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: Radius.sm,
            backgroundColor: t.surface,
            borderWidth: 1,
            borderColor: t.border,
            minHeight: 36,
          },
          textStyle,
        ]}
      />
    );
  }

  return (
    <Pressable
      onPress={handleStartEdit}
      accessibilityRole="button"
      accessibilityLabel="Edit"
      accessibilityHint="Double tap to edit"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: Radius.sm,
          minHeight: 36,
        },
        style,
      ]}
      {...props}>
      <Text
        style={[
          { fontSize: FontSize.lg.fontSize, color: value ? t.text : t.textTertiary },
          textStyle,
        ]}
        numberOfLines={1}>
        {value || placeholder}
      </Text>
      <Text style={{ fontSize: FontSize.md.fontSize, color: t.textTertiary }}>✎</Text>
    </Pressable>
  );
}
