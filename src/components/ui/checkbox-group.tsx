import React, { useCallback } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Checkbox } from './checkbox';
import { FontSize } from '@/constants/theme';

export type CheckboxGroupOption = {
  /** Display text for the option */
  label: string;
  /** Underlying value of the option */
  value: string;
};

export type CheckboxGroupProps = ViewProps & {
  /** Group label displayed above the options */
  label?: string;
  /** Array of checkbox options */
  options: CheckboxGroupOption[];
  /** Currently selected values */
  values: string[];
  /** Callback invoked when selected values change */
  onValuesChange: (values: string[]) => void;
  /** Whether to show a "Select All" checkbox */
  selectAll?: boolean;
  /** Error message displayed below the group */
  error?: string;
};

export function CheckboxGroup({
  label,
  options,
  values,
  onValuesChange,
  selectAll = false,
  error,
  style,
  ...props
}: CheckboxGroupProps) {
  const t = useTheme();

  const toggle = useCallback(
    (value: string) => {
      const next = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      onValuesChange(next);
    },
    [values, onValuesChange],
  );

  const allSelected = options.length > 0 && values.length === options.length;
  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      onValuesChange([]);
    } else {
      onValuesChange(options.map((o) => o.value));
    }
  }, [allSelected, options, onValuesChange]);

  return (
    <View style={[{ gap: 12 }, style]} {...props}>
      {label && (
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>
          {label}
        </Text>
      )}
      {selectAll && options.length > 0 && (
        <Checkbox
          checked={allSelected}
          onCheckedChange={handleSelectAll}
          label="Select All"
          accessibilityLabel="Select all options"
        />
      )}
      <View style={{ gap: 10 }}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            checked={values.includes(opt.value)}
            onCheckedChange={() => toggle(opt.value)}
            label={opt.label}
            accessibilityLabel={opt.label}
          />
        ))}
      </View>
      {error && (
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.error, fontWeight: '500' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
