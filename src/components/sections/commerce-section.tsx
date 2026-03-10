import React, { useState } from 'react';
import { View } from 'react-native';

import {
  ColorSwatchSelector,
  ComparisonTable,
  CouponCard,
  CurrencyDisplay,
  InventoryBadge,
  Receipt,
  SizeSelector,
  SubscriptionCard,
  TipSelector,
} from '@/components/ui';

import { Demo, SectionHeader } from './demo-helpers';

export function CommerceSection() {
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedTip, setSelectedTip] = useState<number | undefined>();

  return (
    <>
      <SectionHeader title="Commerce & Payments" category="Commerce" />

      <Demo title="SizeSelector">
        <SizeSelector
          sizes={[
            { label: 'S', value: 's' },
            { label: 'M', value: 'm', available: true },
            { label: 'L', value: 'l', available: true },
            { label: 'XL', value: 'xl', available: false },
          ]}
          selected={selectedSize}
          onSelect={setSelectedSize}
        />
      </Demo>

      <Demo title="ColorSwatchSelector">
        <ColorSwatchSelector
          colors={[
            { label: 'Red', value: 'red', hex: '#ef4444' },
            { label: 'Blue', value: 'blue', hex: '#3b82f6' },
            { label: 'Green', value: 'green', hex: '#22c55e' },
          ]}
          selected={selectedColor}
          onSelect={setSelectedColor}
        />
      </Demo>

      <Demo title="CouponCard">
        <CouponCard
          code="SAVE20"
          description="20% off your next order"
          discount="20%"
          expiresAt="Dec 31, 2026"
        />
      </Demo>

      <Demo title="Receipt">
        <Receipt
          items={[
            { label: 'Widget Pro', amount: 29.99 },
            { label: 'Service Fee', amount: 4.99 },
          ]}
          subtotal={34.98}
          tax={3.15}
          total={38.13}
          paymentMethod="Visa •••• 4242"
          date="Mar 10, 2026"
        />
      </Demo>

      <Demo title="TipSelector">
        <TipSelector
          subtotal={45}
          selected={selectedTip}
          onTipChange={(pct) => setSelectedTip(pct)}
        />
      </Demo>

      <Demo title="SubscriptionCard">
        <SubscriptionCard
          name="Pro Plan"
          price="$19"
          period="mo"
          features={[
            'Unlimited projects',
            'Priority support',
            'API access',
            'Custom themes',
          ]}
          isPopular
          onSelect={() => {}}
        />
      </Demo>

      <Demo title="InventoryBadge">
        <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
          <InventoryBadge status="in-stock" />
          <InventoryBadge status="low-stock" count={3} />
          <InventoryBadge status="out-of-stock" />
        </View>
      </Demo>

      <Demo title="CurrencyDisplay">
        <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <CurrencyDisplay amount={1234.56} size="sm" />
          <CurrencyDisplay amount={9876.54} size="md" />
          <CurrencyDisplay amount={42000} size="lg" />
        </View>
      </Demo>

      <Demo title="ComparisonTable">
        <ComparisonTable
          columns={[
            { key: 'basic', title: 'Basic' },
            { key: 'pro', title: 'Pro', highlight: true },
            { key: 'enterprise', title: 'Enterprise' },
          ]}
          rows={[
            { feature: 'Storage', values: { basic: '5 GB', pro: '50 GB', enterprise: 'Unlimited' } },
            { feature: 'Support', values: { basic: false, pro: true, enterprise: true } },
            { feature: 'API Access', values: { basic: false, pro: true, enterprise: true } },
            { feature: 'Custom Domain', values: { basic: false, pro: false, enterprise: true } },
          ]}
        />
      </Demo>
    </>
  );
}
