import React from 'react';
import { View, type ViewProps } from 'react-native';

import { Input } from './input';

export type AddressValue = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type AddressInputProps = ViewProps & {
  value?: Partial<AddressValue>;
  onChange: (address: AddressValue) => void;
};

const defaultAddress: AddressValue = {
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};

export function AddressInput({
  value,
  onChange,
  style,
  ...props
}: AddressInputProps) {
  const address = { ...defaultAddress, ...value };

  const update = (field: keyof AddressValue) => (text: string) => {
    onChange({ ...address, [field]: text });
  };

  return (
    <View style={[{ gap: 14 }, style]} {...props}>
      <Input
        label="Street"
        value={address.street}
        onChangeText={update('street')}
        placeholder="Street address"
        accessibilityLabel="Street address"
      />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Input
            label="City"
            value={address.city}
            onChangeText={update('city')}
            placeholder="City"
            accessibilityLabel="City"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="State"
            value={address.state}
            onChangeText={update('state')}
            placeholder="State"
            accessibilityLabel="State"
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Input
            label="ZIP"
            value={address.zip}
            onChangeText={update('zip')}
            placeholder="ZIP code"
            keyboardType="number-pad"
            accessibilityLabel="ZIP code"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Country"
            value={address.country}
            onChangeText={update('country')}
            placeholder="Country"
            accessibilityLabel="Country"
          />
        </View>
      </View>
    </View>
  );
}
