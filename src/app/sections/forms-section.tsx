import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import {
  Button,
  CurrencyInput,
  DatePicker,
  IconButton,
  Input,
  NumberPad,
  PasswordInput,
  PhoneInput,
  SearchBar,
  Textarea,
  TimePicker,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

import { Demo, Label, SectionHeader } from './demo-helpers';

export function FormsSection() {
  const t = useTheme();
  const toast = useToast();

  const [textareaVal, setTextareaVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [datePicked, setDatePicked] = useState<Date | undefined>();
  const [timePicked, setTimePicked] = useState<{ hours: number; minutes: number } | undefined>();
  const [currencyVal, setCurrencyVal] = useState(0);
  const [phoneVal, setPhoneVal] = useState('');
  const [numPadVal, setNumPadVal] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current != null) clearTimeout(loadingTimerRef.current);
    };
  }, []);

  return (
    <>
      <SectionHeader title="Forms & Input" category="Forms" />

      <Demo title="Button">
        <Label text="Variants" />
        <View style={{ gap: 10 }}>
          <Button title="Primary" variant="primary" />
          <Button title="Secondary" variant="secondary" />
          <Button title="Outline" variant="outline" />
          <Button title="Ghost" variant="ghost" />
          <Button title="Destructive" variant="destructive" />
        </View>
        <View style={{ height: 1, backgroundColor: t.border, marginVertical: 20 }} />
        <Label text="Sizes" />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title="Small" size="sm" style={{ flex: 1 }} />
          <Button title="Medium" size="md" style={{ flex: 1 }} />
          <Button title="Large" size="lg" style={{ flex: 1 }} />
        </View>
        <View style={{ gap: 10, marginTop: 12 }}>
          <Button
            title={loadingBtn ? 'Saving...' : 'Tap for loading'}
            loading={loadingBtn}
            onPress={() => {
              if (loadingTimerRef.current != null) clearTimeout(loadingTimerRef.current);
              setLoadingBtn(true);
              loadingTimerRef.current = setTimeout(() => {
                setLoadingBtn(false);
                loadingTimerRef.current = null;
              }, 2000);
            }}
          />
          <Button title="Disabled" disabled />
        </View>
      </Demo>

      <Demo title="IconButton">
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <IconButton icon={<Text style={{ fontSize: 18, color: t.text }}>+</Text>} variant="default" />
          <IconButton icon={<Text style={{ fontSize: 18, color: t.primaryForeground }}>✎</Text>} variant="primary" />
          <IconButton icon={<Text style={{ fontSize: 18, color: t.text }}>⋯</Text>} variant="outline" />
          <IconButton icon={<Text style={{ fontSize: 18, color: t.text }}>♡</Text>} variant="ghost" size="lg" />
        </View>
      </Demo>

      <Demo title="Input">
        <View style={{ gap: 16 }}>
          <Input label="Email" placeholder="you@example.com" />
          <Input label="Password" placeholder="Enter password" secureTextEntry />
          <Input label="With error" placeholder="Required" error="This field is required" />
        </View>
      </Demo>

      <Demo title="Textarea">
        <Textarea label="Message" placeholder="Write something..." value={textareaVal} onChangeText={setTextareaVal} maxLength={200} showCount />
      </Demo>

      <Demo title="SearchBar">
        <SearchBar value={searchVal} onChangeText={setSearchVal} onClear={() => setSearchVal('')} showCancel={searchVal.length > 0} onCancel={() => setSearchVal('')} />
      </Demo>

      <Demo title="DatePicker & TimePicker">
        <View style={{ gap: 16 }}>
          <DatePicker label="Date" value={datePicked} onValueChange={setDatePicked} />
          <TimePicker label="Time" value={timePicked} onValueChange={setTimePicked} />
        </View>
      </Demo>

      <Demo title="Currency & Phone Input">
        <View style={{ gap: 16 }}>
          <CurrencyInput label="Amount" value={currencyVal} onValueChange={setCurrencyVal} />
          <PhoneInput label="Phone" value={phoneVal} onValueChange={(v) => setPhoneVal(v)} />
        </View>
      </Demo>

      <Demo title="NumberPad">
        <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '700', marginBottom: 16, color: t.text }}>
          {numPadVal || '0'}
        </Text>
        <NumberPad
          onKeyPress={(k) => setNumPadVal((v) => v + k)}
          onDelete={() => setNumPadVal((v) => v.slice(0, -1))}
          onConfirm={() => {
            toast.show({ message: `Entered: ${numPadVal}`, variant: 'info' });
            setNumPadVal('');
          }}
          confirmLabel="Enter"
        />
      </Demo>

      <Demo title="PasswordInput">
        <PasswordInput label="Password" placeholder="Enter password" hint="Min. 8 characters" />
      </Demo>
    </>
  );
}
