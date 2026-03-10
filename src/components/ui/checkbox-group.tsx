import React, { useCallback } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { Checkbox } from './checkbox';

export type CheckboxGroupOption = {
  label: string;
  value: string;
};

export type CheckboxGroupProps = ViewProps & {
  label?: string;
  options: CheckboxGroupOption[];
  values: string[];
  onValuesChange: (values: string[]) => void;
  selectAll?: boolean;
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
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>
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
        <Text style={{ fontSize: 12, color: t.error, fontWeight: '500' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
