import React, { useState } from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  Accordion,
  Checkbox,
  Chip,
  QuantityStepper,
  RadioGroup,
  SegmentedControl,
  Slider,
  StarRating,
  Switch,
  Tabs,
} from '@/components/ui';

import { Demo, SectionHeader } from './demo-helpers';

export function ControlsSection() {
  const [switchVal, setSwitchVal] = useState(true);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [radio, setRadio] = useState('opt1');
  const [segment, setSegment] = useState(0);
  const [sliderVal, setSliderVal] = useState(40);
  const [quantity, setQuantity] = useState(1);
  const [starVal, setStarVal] = useState(4);
  const [chips, setChips] = useState(['React Native', 'Expo', 'NativeWind', 'TypeScript']);

  return (
    <>
      <SectionHeader title="Controls" category="Controls" />

      <Demo title="Switch">
        <View style={{ gap: 14 }}>
          <Switch value={switchVal} onValueChange={setSwitchVal} label="Notifications" />
          <Switch value={false} onValueChange={() => {}} label="Disabled" disabled />
        </View>
      </Demo>

      <Demo title="Checkbox">
        <View style={{ gap: 14 }}>
          <Checkbox checked={check1} onCheckedChange={setCheck1} label="Accept terms" />
          <Checkbox checked={check2} onCheckedChange={setCheck2} label="Newsletter opt-in" />
        </View>
      </Demo>

      <Demo title="RadioGroup">
        <RadioGroup
          options={[
            { label: 'Option A', value: 'opt1' },
            { label: 'Option B', value: 'opt2' },
            { label: 'Option C', value: 'opt3' },
          ]}
          value={radio}
          onValueChange={setRadio}
        />
      </Demo>

      <Demo title="SegmentedControl">
        <SegmentedControl segments={['Daily', 'Weekly', 'Monthly']} selectedIndex={segment} onIndexChange={setSegment} />
      </Demo>

      <Demo title="Tabs">
        <Tabs
          tabs={[
            { key: 't1', label: 'Overview', content: <ThemedText style={{ fontSize: 14 }}>Overview content goes here.</ThemedText> },
            { key: 't2', label: 'Details', content: <ThemedText style={{ fontSize: 14 }}>Details content goes here.</ThemedText> },
            { key: 't3', label: 'Reviews', content: <ThemedText style={{ fontSize: 14 }}>Reviews content goes here.</ThemedText> },
          ]}
        />
      </Demo>

      <Demo title="Slider">
        <Slider label="Volume" value={sliderVal} onValueChange={setSliderVal} showValue />
      </Demo>

      <Demo title="QuantityStepper & StarRating">
        <View style={{ gap: 20 }}>
          <QuantityStepper label="Quantity" value={quantity} onValueChange={setQuantity} />
          <StarRating label="Rating" value={starVal} onValueChange={setStarVal} showLabel />
        </View>
      </Demo>

      <Demo title="Chip">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {chips.map((c) => (
            <Chip key={c} label={c} selected={c === 'Expo'} onDelete={() => setChips((p) => p.filter((x) => x !== c))} />
          ))}
          <Chip label="+ Add" onPress={() => setChips((p) => [...p, `Tag ${p.length + 1}`])} />
        </View>
      </Demo>

      <Demo title="Accordion">
        <Accordion
          items={[
            { key: '1', title: 'What is NativeWind?', content: 'NativeWind brings Tailwind CSS to React Native.' },
            { key: '2', title: 'How many components?', content: '143 components, all token-based.' },
            { key: '3', title: 'Dark mode support?', content: 'Every component adapts to light & dark mode.' },
          ]}
        />
      </Demo>
    </>
  );
}
