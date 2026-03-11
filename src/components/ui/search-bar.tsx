import React, { forwardRef } from 'react';
import { Pressable, TextInput, type TextInputProps, View } from 'react-native';
import { Search, X } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SearchBarProps = TextInputProps & {
  /** Callback invoked when the clear button is pressed */
  onClear?: () => void;
  /** Whether to show a cancel button beside the search input */
  showCancel?: boolean;
  /** Callback invoked when the cancel button is pressed */
  onCancel?: () => void;
};

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ value, onClear, showCancel, onCancel, style, ...props }, ref) => {
    const t = useTheme();

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: t.surface,
            borderRadius: Radius.xl,
            paddingHorizontal: Spacing[3],
            paddingVertical: Spacing[2.5],
            gap: Spacing[2],
          }}>
          <Search size={16} color={t.textSecondary} />
          <TextInput
            ref={ref}
            value={value}
            placeholderTextColor={t.textTertiary}
            placeholder="Search..."
            style={[
              { flex: 1, fontSize: FontSize.lg.fontSize, color: t.text },
              typeof style === 'object' ? style : undefined,
            ]}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            {...props}
          />
          {value && value.length > 0 && onClear && (
            <Pressable onPress={onClear} hitSlop={8}>
              <X size={14} color={t.textSecondary} />
            </Pressable>
          )}
        </View>
        {showCancel && (
          <Pressable onPress={onCancel}>
            <ThemedText style={{ fontSize: FontSize.md.fontSize, color: t.primary }}>Cancel</ThemedText>
          </Pressable>
        )}
      </View>
    );
  }
);

SearchBar.displayName = 'SearchBar';
