import React, { forwardRef } from 'react';
import { Pressable, TextInput, type TextInputProps, View } from 'react-native';
import { Search, X } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchBarProps = TextInputProps & {
  onClear?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
};

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ value, onClear, showCancel, onCancel, style, ...props }, ref) => {
    const t = useTheme();

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: t.surface,
            borderRadius: Radius.xl,
            paddingHorizontal: 12,
            paddingVertical: 10,
            gap: 8,
          }}>
          <Search size={16} color={t.textSecondary} />
          <TextInput
            ref={ref}
            value={value}
            placeholderTextColor={t.textTertiary}
            placeholder="Search..."
            style={[
              { flex: 1, fontSize: 16, color: t.text },
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
            <ThemedText style={{ fontSize: 14, color: t.primary }}>Cancel</ThemedText>
          </Pressable>
        )}
      </View>
    );
  }
);

SearchBar.displayName = 'SearchBar';
