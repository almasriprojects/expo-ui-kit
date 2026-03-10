import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import { ThemedText } from '@/components/themed-text';
import {
  Accordion,
  Alert,
  AnimatedCounter,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  Button,
  CalendarStrip,
  Card,
  Checkbox,
  ChecklistItem,
  Chip,
  CircularProgress,
  CodeBlock,
  ColorPicker,
  ConfirmDialog,
  CopyButton,
  CountdownTimer,
  CurrencyInput,
  DataTable,
  DatePicker,
  Divider,
  FileUploadArea,
  FilterBar,
  FloatingLabelInput,
  GradientCard,
  IconButton,
  InfoRow,
  Input,
  LinkText,
  Loading,
  Marquee,
  Modal,
  MultiSelect,
  NumberPad,
  Pagination,
  PasswordInput,
  PhoneInput,
  PinInput,
  Progress,
  QuantityStepper,
  RadioGroup,
  RatingDisplay,
  ReadMoreText,
  SearchBar,
  SegmentedControl,
  Select,
  Separator,
  SkeletonCard,
  SkeletonText,
  Slider,
  Snackbar,
  SplitButton,
  StarRating,
  StatusIndicator,
  StepIndicator,
  Switch,
  Tabs,
  TagInput,
  Textarea,
  TimePicker,
  Timeline,
  ToggleGroup,
  Tooltip,
  VerificationBadge,
} from '@/components/ui';
import { FONT_LIST, FONT_PRESETS, Radius, Shadows, THEME_LIST, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';
import { useThemeMode } from '@/providers/theme-mode-provider';

// ─── Category definitions ────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'forms', label: 'Forms' },
  { key: 'controls', label: 'Controls' },
  { key: 'display', label: 'Display' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'overlay', label: 'Overlay' },
  { key: 'layout', label: 'Layout' },
  { key: 'advanced', label: 'Advanced' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

// ─── Helper components ───────────────────────────────────────────────────────

const modeIcons: Record<string, string> = { system: '⚙️', light: '☀️', dark: '🌙' };
const modeLabels: Record<string, string> = { system: 'Auto', light: 'Light', dark: 'Dark' };

function ThemeToggle() {
  const { themeName, setThemeName } = useThemeMode();
  const t = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
      {THEME_LIST.map((preset) => {
        const isActive = preset.key === themeName;
        return (
          <Pressable
            key={preset.key}
            onPress={() => setThemeName(preset.key)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: Radius.full,
              backgroundColor: isActive ? t.primary : t.card,
              borderWidth: 1,
              borderColor: isActive ? t.primary : t.border,
              ...Shadows.sm,
            }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: Radius.full,
                backgroundColor: preset.preview,
                borderWidth: 1.5,
                borderColor: isActive ? t.primaryForeground : t.border,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: isActive ? t.primaryForeground : t.text,
              }}>
              {preset.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function FontPicker() {
  const { fontPreset, setFontPreset } = useThemeMode();
  const t = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
      {FONT_LIST.map((font) => {
        const isActive = font.key === fontPreset;
        const previewFont = FONT_PRESETS[font.key];
        const fontFamily = resolveFontFamily(previewFont, '600');
        return (
          <Pressable
            key={font.key}
            onPress={() => setFontPreset(font.key)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: Radius.lg,
              backgroundColor: isActive ? t.primary : t.card,
              borderWidth: 1,
              borderColor: isActive ? t.primary : t.border,
              ...Shadows.sm,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: isActive ? t.primaryForeground : t.text,
                fontFamily: fontFamily,
              }}>
              {font.label}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: isActive ? t.primaryForeground : t.textTertiary,
                marginTop: 1,
                fontFamily: resolveFontFamily(previewFont, '400'),
              }}>
              {font.sample}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function CategoryBar({
  active,
  onSelect,
}: {
  active: CategoryKey;
  onSelect: (key: CategoryKey) => void;
}) {
  const t = useTheme();
  const f = useFont();

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: t.border }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingVertical: 14 }}>
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === active;
          return (
            <Pressable
              key={cat.key}
              onPress={() => onSelect(cat.key)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: Radius.full,
                backgroundColor: isActive ? t.primary : t.card,
                borderWidth: isActive ? 0 : 1,
                borderColor: t.border,
                ...(isActive ? Shadows.sm : {}),
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: resolveFontFamily(f, '600'),
                  color: isActive ? t.primaryForeground : t.text,
                }}>
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function SectionHeader({ title, category }: { title: string; category: string }) {
  const t = useTheme();
  const fonts = useFont();
  return (
    <View style={{ marginTop: 28, marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          fontFamily: resolveFontFamily(fonts, '700'),
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          color: t.primary,
          marginBottom: 6,
        }}>
        {category}
      </Text>
      <Text style={{ fontSize: 22, fontWeight: '800', fontFamily: resolveFontFamily(fonts, '700'), color: t.text }}>
        {title}
      </Text>
    </View>
  );
}

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTheme();
  const fonts = useFont();
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          fontFamily: resolveFontFamily(fonts, '700'),
          color: t.text,
          marginBottom: 12,
        }}>
        {title}
      </Text>
      <View
        style={{
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        }}>
        {children}
      </View>
    </View>
  );
}

function Label({ text }: { text: string }) {
  const t = useTheme();
  const fonts = useFont();
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: '600',
        fontFamily: resolveFontFamily(fonts, '600'),
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: t.textSecondary,
      }}>
      {text}
    </Text>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const t = useTheme();
  const toast = useToast();
  const fonts = useFont();
  const { mode, cycle } = useThemeMode();
  const scrollRef = useRef<ScrollView>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const sectionOffsets = useRef<Record<string, number>>({});
  const handleLayout = useCallback(
    (key: string) => (e: { nativeEvent: { layout: { y: number } } }) => {
      sectionOffsets.current[key] = e.nativeEvent.layout.y;
    },
    [],
  );

  const scrollToCategory = useCallback(
    (key: CategoryKey) => {
      setActiveCategory(key);
      if (key === 'all') {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      } else {
        const y = sectionOffsets.current[key];
        if (y != null) {
          scrollRef.current?.scrollTo({ y: y - 20, animated: true });
        }
      }
    },
    [],
  );

  // ── State for interactive demos ──
  const [switchVal, setSwitchVal] = useState(true);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [radio, setRadio] = useState('opt1');
  const [segment, setSegment] = useState(0);
  const [textareaVal, setTextareaVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [chips, setChips] = useState(['React Native', 'Expo', 'NativeWind', 'TypeScript']);
  const [datePicked, setDatePicked] = useState<Date | undefined>();
  const [timePicked, setTimePicked] = useState<{ hours: number; minutes: number } | undefined>();
  const [currencyVal, setCurrencyVal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [starVal, setStarVal] = useState(4);
  const [sliderVal, setSliderVal] = useState(40);
  const [phoneVal, setPhoneVal] = useState('');
  const [numPadVal, setNumPadVal] = useState('');
  const [step, setStep] = useState(1);
  const [toggleVal, setToggleVal] = useState('grid');
  const [filterVal, setFilterVal] = useState('all');
  const [tags, setTags] = useState(['React', 'Expo']);
  const [multiVal, setMultiVal] = useState<string[]>(['react']);
  const [floatingVal, setFloatingVal] = useState('');
  const [selectedColor, setSelectedColor] = useState(t.primary);
  const [calDate, setCalDate] = useState(new Date());
  const [counterVal, setCounterVal] = useState(1284);
  const [currentPage, setCurrentPage] = useState(2);
  const [todo1, setTodo1] = useState(true);
  const [todo2, setTodo2] = useState(false);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current != null) clearTimeout(loadingTimerRef.current);
    };
  }, []);

  return (
    <Screen>
      {/* ── Header ── */}
      <View style={{ backgroundColor: t.background, paddingTop: 8, paddingBottom: 8, gap: 10 }}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '800', fontFamily: resolveFontFamily(fonts, '700'), color: t.text }}>
              UI Kit
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', fontFamily: resolveFontFamily(fonts, '500'), color: t.textSecondary, marginTop: 2 }}>
              143 production-ready components
            </Text>
          </View>
          <Pressable
            onPress={cycle}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: Radius.full,
              backgroundColor: t.card,
              borderWidth: 1,
              borderColor: t.border,
              ...Shadows.sm,
            }}>
            <Text style={{ fontSize: 16 }}>{modeIcons[mode]}</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', fontFamily: resolveFontFamily(fonts, '600'), color: t.text }}>
              {modeLabels[mode]}
            </Text>
          </Pressable>
        </View>
        <ThemeToggle />
        <FontPicker />
      </View>

      {/* ── Category Bar ── */}
      <CategoryBar active={activeCategory} onSelect={scrollToCategory} />

      {/* ── Scrollable Content ── */}
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>

        {/* ━━━ FORMS ━━━ */}
        <View onLayout={handleLayout('forms')}>
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
            <Textarea
              label="Message"
              placeholder="Write something..."
              value={textareaVal}
              onChangeText={setTextareaVal}
              maxLength={200}
              showCount
            />
          </Demo>

          <Demo title="SearchBar">
            <SearchBar
              value={searchVal}
              onChangeText={setSearchVal}
              onClear={() => setSearchVal('')}
              showCancel={searchVal.length > 0}
              onCancel={() => setSearchVal('')}
            />
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
        </View>

        {/* ━━━ CONTROLS ━━━ */}
        <View onLayout={handleLayout('controls')}>
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
            <SegmentedControl
              segments={['Daily', 'Weekly', 'Monthly']}
              selectedIndex={segment}
              onIndexChange={setSegment}
            />
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
                <Chip
                  key={c}
                  label={c}
                  selected={c === 'Expo'}
                  onDelete={() => setChips((p) => p.filter((x) => x !== c))}
                />
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
        </View>

        {/* ━━━ DISPLAY ━━━ */}
        <View onLayout={handleLayout('display')}>
          <SectionHeader title="Data Display" category="Display" />

          <Demo title="Avatar">
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 14 }}>
              <Avatar initials="SM" size="sm" />
              <Avatar initials="MD" size="md" />
              <Avatar source="https://i.pravatar.cc/100?img=1" size="lg" />
              <Avatar source="https://i.pravatar.cc/100?img=2" size="xl" />
            </View>
          </Demo>

          <Demo title="Badge">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              <Badge label="Default" />
              <Badge label="Success" variant="success" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Error" variant="error" />
              <Badge label="Info" variant="info" />
            </View>
          </Demo>

          <Demo title="Progress">
            <View style={{ gap: 14 }}>
              <Progress value={25} showLabel />
              <Progress value={60} variant="success" size="lg" />
              <Progress value={85} variant="warning" size="sm" />
            </View>
          </Demo>

          <Demo title="StepIndicator">
            <StepIndicator steps={['Cart', 'Address', 'Payment', 'Done']} currentStep={step} />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
              <Button title="Back" size="sm" variant="outline" style={{ flex: 1 }}
                onPress={() => setStep((s) => Math.max(0, s - 1))} />
              <Button title="Next" size="sm" style={{ flex: 1 }}
                onPress={() => setStep((s) => Math.min(3, s + 1))} />
            </View>
          </Demo>

          <Demo title="Timeline">
            <Timeline
              items={[
                { title: 'Order placed', description: 'Confirmed', time: '9:00 AM', status: 'completed' },
                { title: 'Processing', description: 'Preparing items', time: '10:30 AM', status: 'completed' },
                { title: 'Shipped', description: 'On its way', time: '2:00 PM', status: 'current' },
                { title: 'Delivered', time: 'Est. tomorrow', status: 'upcoming' },
              ]}
            />
          </Demo>

          <Demo title="DataTable">
            <DataTable
              columns={[
                { key: 'name', header: 'Name', width: 120 },
                { key: 'role', header: 'Role', width: 100 },
                { key: 'status', header: 'Status', width: 80, align: 'center' },
              ]}
              data={[
                { name: 'Alex Chen', role: 'Engineer', status: 'Active' },
                { name: 'Maya Patel', role: 'Designer', status: 'Away' },
                { name: 'James Lee', role: 'PM', status: 'Active' },
              ]}
            />
          </Demo>

          <Demo title="CountdownTimer">
            <CountdownTimer
              label="Flash Sale Ends In"
              targetDate={new Date(Date.now() + 86400000)}
            />
          </Demo>

          <Demo title="Skeleton">
            <SkeletonText lines={3} />
            <View style={{ height: 20 }} />
            <SkeletonCard />
          </Demo>

          <Demo title="Typography">
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 28, fontWeight: '800', color: t.text }}>Heading</Text>
              <Text style={{ fontSize: 20, fontWeight: '600', color: t.text }}>Subtitle</Text>
              <Text style={{ fontSize: 16, fontWeight: '400', color: t.text }}>Body text</Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: t.textSecondary }}>Secondary text</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: t.textTertiary }}>Caption text</Text>
              <ThemedText type="code">{'const x = "monospace"'}</ThemedText>
            </View>
          </Demo>
        </View>

        {/* ━━━ FEEDBACK ━━━ */}
        <View onLayout={handleLayout('feedback')}>
          <SectionHeader title="Feedback" category="Feedback" />

          <Demo title="Alert">
            <View style={{ gap: 12 }}>
              <Alert variant="info" title="Info" message="Informational message." />
              <Alert variant="success" title="Success" message="Operation completed." />
              <Alert variant="warning" title="Warning" message="Review before continuing." />
              <Alert variant="error" title="Error" message="Something went wrong." />
            </View>
          </Demo>

          <Demo title="Toast">
            <View style={{ gap: 10 }}>
              <Button title="Success Toast" size="sm"
                onPress={() => toast.show({ title: 'Saved', message: 'Changes saved!', variant: 'success' })} />
              <Button title="Error Toast" variant="destructive" size="sm"
                onPress={() => toast.show({ title: 'Error', message: 'Something went wrong', variant: 'error' })} />
              <Button title="Info Toast" variant="outline" size="sm"
                onPress={() => toast.show({ title: 'Update', message: 'New version available', variant: 'info' })} />
            </View>
          </Demo>

          <Demo title="Snackbar">
            <Button title="Show Snackbar" variant="secondary" size="sm"
              onPress={() => setSnackVisible(true)} />
          </Demo>

          <Demo title="Loading">
            <Loading size="small" message="Fetching data..." />
          </Demo>
        </View>

        {/* ━━━ OVERLAY ━━━ */}
        <View onLayout={handleLayout('overlay')}>
          <SectionHeader title="Overlays" category="Overlay" />

          <Demo title="Modal">
            <Button title="Open Modal" variant="outline" onPress={() => setModalOpen(true)} />
            <Modal
              visible={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Edit Profile"
              description="Update your personal information."
              actions={
                <>
                  <Button title="Cancel" variant="ghost" size="sm" onPress={() => setModalOpen(false)} />
                  <Button title="Save" size="sm" onPress={() => setModalOpen(false)} />
                </>
              }>
              <View style={{ gap: 16 }}>
                <Input label="Name" placeholder="John Doe" />
                <Input label="Email" placeholder="john@doe.com" />
              </View>
            </Modal>
          </Demo>

          <Demo title="ConfirmDialog">
            <Button title="Delete Account" variant="destructive" onPress={() => setConfirmOpen(true)} />
            <ConfirmDialog
              visible={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={() => toast.show({ message: 'Confirmed!', variant: 'success' })}
              title="Delete Account?"
              message="This action cannot be undone."
              confirmLabel="Delete"
              destructive
            />
          </Demo>

          <Demo title="Tooltip">
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip content="Helpful tip!">
                <View style={{
                  backgroundColor: t.surface,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: Radius.lg,
                  borderWidth: 1,
                  borderColor: t.border,
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>Tap me</Text>
                </View>
              </Tooltip>
              <Tooltip content="Another tooltip" position="bottom">
                <View style={{
                  backgroundColor: t.surface,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: Radius.lg,
                  borderWidth: 1,
                  borderColor: t.border,
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>Or me</Text>
                </View>
              </Tooltip>
            </View>
          </Demo>
        </View>

        {/* ━━━ LAYOUT ━━━ */}
        <View onLayout={handleLayout('layout')}>
          <SectionHeader title="Layout" category="Layout" />

          <Demo title="Divider">
            <Text style={{ fontSize: 14, color: t.text }}>Content above</Text>
            <Divider style={{ marginVertical: 14 }} />
            <Text style={{ fontSize: 14, color: t.text }}>Content below</Text>
          </Demo>

          <Demo title="Separator">
            <Text style={{ fontSize: 14, color: t.text }}>Content above</Text>
            <Separator label="or" style={{ marginVertical: 16 }} />
            <Text style={{ fontSize: 14, color: t.text }}>Content below</Text>
          </Demo>

          <Demo title="Card Variants">
            <View style={{ gap: 16 }}>
              <Card variant="elevated" title="Elevated" subtitle="With shadow and border">
                <Text style={{ fontSize: 14, color: t.textSecondary }}>Default card style.</Text>
              </Card>
              <Card variant="outlined" title="Outlined" subtitle="Border only, transparent background">
                <Text style={{ fontSize: 14, color: t.textSecondary }}>Clean outline style.</Text>
              </Card>
              <Card variant="filled" title="Filled" subtitle="Solid fill, no border">
                <Text style={{ fontSize: 14, color: t.textSecondary }}>Flat filled style.</Text>
              </Card>
            </View>
          </Demo>
        </View>

        {/* ━━━ ADVANCED ━━━ */}
        <View onLayout={handleLayout('advanced')}>
          <SectionHeader title="Advanced Components" category="Advanced" />

          <Demo title="PasswordInput">
            <PasswordInput label="Password" placeholder="Enter password" hint="Min. 8 characters" />
          </Demo>

          <Demo title="FloatingLabelInput">
            <View style={{ gap: 14 }}>
              <FloatingLabelInput label="Email Address" value={floatingVal} onChangeText={setFloatingVal} />
              <FloatingLabelInput label="With Error" value="" error="Required" />
            </View>
          </Demo>

          <Demo title="Select & MultiSelect">
            <View style={{ gap: 14 }}>
              <Select
                label="Role"
                placeholder="Select role"
                value=""
                onValueChange={() => {}}
                options={[
                  { label: 'Developer', value: 'dev' },
                  { label: 'Designer', value: 'design' },
                  { label: 'Manager', value: 'mgr' },
                ]}
              />
              <MultiSelect
                label="Skills"
                placeholder="Select skills"
                values={multiVal}
                onValuesChange={(v) => setMultiVal(v as string[])}
                options={[
                  { label: 'React', value: 'react' },
                  { label: 'TypeScript', value: 'ts' },
                  { label: 'Node.js', value: 'node' },
                ]}
              />
            </View>
          </Demo>

          <Demo title="TagInput">
            <TagInput tags={tags} onTagsChange={setTags} placeholder="Add tag..." />
          </Demo>

          <Demo title="PinInput">
            <View style={{ alignItems: 'center' }}>
              <PinInput length={4} onComplete={() => {}} secure />
            </View>
          </Demo>

          <Demo title="ColorPicker">
            <ColorPicker
              colors={['#2563eb', '#8b5cf6', '#ef4444', '#22c55e', '#f59e0b', '#ec4899']}
              value={selectedColor}
              onValueChange={setSelectedColor}
            />
          </Demo>

          <Demo title="SplitButton">
            <SplitButton
              title="Save"
              onPress={() => {}}
              options={[
                { label: 'Save as Draft', onPress: () => {} },
                { label: 'Save & Publish', onPress: () => {} },
              ]}
            />
          </Demo>

          <Demo title="FileUploadArea">
            <FileUploadArea onPress={() => {}} hint="PNG, JPG, PDF up to 10MB" />
          </Demo>

          <Demo title="ToggleGroup & FilterBar">
            <View style={{ gap: 14 }}>
              <ToggleGroup
                options={[
                  { label: '☰', value: 'list' },
                  { label: '▦', value: 'grid' },
                  { label: '▣', value: 'card' },
                ]}
                value={toggleVal}
                onValueChange={(v) => setToggleVal(v as string)}
              />
              <FilterBar
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Archived', value: 'archived' },
                ]}
                value={filterVal}
                onValueChange={setFilterVal}
              />
            </View>
          </Demo>

          <Demo title="CalendarStrip">
            <CalendarStrip
              selectedDate={calDate}
              onDateSelect={setCalDate}
              markedDates={['2026-03-11', '2026-03-14']}
            />
          </Demo>

          <Demo title="CircularProgress & AnimatedCounter">
            <View style={{ alignItems: 'center', gap: 16 }}>
              <CircularProgress progress={72} size={90} label="Score" />
              <AnimatedCounter value={counterVal} prefix="$" />
              <Button title="Update" size="sm" variant="outline"
                onPress={() => setCounterVal((v) => v + Math.floor(Math.random() * 500))} />
            </View>
          </Demo>

          <Demo title="Pagination">
            <Pagination current={currentPage} total={8} onPageChange={setCurrentPage} />
          </Demo>

          <Demo title="StatusIndicator & VerificationBadge">
            <View style={{ gap: 14 }}>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <StatusIndicator status="online" label="Online" />
                <StatusIndicator status="offline" label="Offline" />
                <StatusIndicator status="busy" label="Busy" />
              </View>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <VerificationBadge variant="verified" />
                <VerificationBadge variant="official" />
                <VerificationBadge variant="premium" label="Premium" />
              </View>
            </View>
          </Demo>

          <Demo title="AvatarGroup & InfoRow">
            <View style={{ gap: 14 }}>
              <AvatarGroup
                avatars={[{ initials: 'A' }, { initials: 'B' }, { initials: 'C' }, { initials: 'D' }, { initials: 'E' }]}
                max={3}
              />
              <InfoRow label="Version" value="1.0.0" />
              <InfoRow label="Status" value="Active" valueColor={t.success} />
            </View>
          </Demo>

          <Demo title="RatingDisplay">
            <View style={{ gap: 10 }}>
              <RatingDisplay rating={4.8} reviews={342} variant="stars" />
              <RatingDisplay rating={4.8} reviews={342} variant="badge" />
              <RatingDisplay rating={4.8} variant="compact" />
            </View>
          </Demo>

          <Demo title="Banner & Marquee">
            <View style={{ gap: 12 }}>
              <Banner variant="info" message="New update available" title="Update" />
              <Banner variant="warning" message="Your trial expires in 3 days" />
              <Marquee text="🔥 Flash Sale — 50% off all premium plans! Limited time offer!" speed={50} />
            </View>
          </Demo>

          <Demo title="GradientCard">
            <GradientCard
              colors={[t.primary, t.purple]}
              title="Pro Plan"
              subtitle="Unlock all features"
            />
          </Demo>

          <Demo title="ReadMoreText">
            <ReadMoreText
              text="React Native lets you build mobile apps using only JavaScript. It uses the same design as React, letting you compose a rich mobile UI from declarative components. With React Native, you don't build a mobile web app, an HTML5 app, or a hybrid app."
              numberOfLines={2}
            />
          </Demo>

          <Demo title="CodeBlock">
            <CodeBlock
              language="tsx"
              showLineNumbers
              code={`const t = useTheme();
return <Text style={{ color: t.text }}>Hello</Text>;`}
            />
          </Demo>

          <Demo title="CopyButton & LinkText">
            <View style={{ gap: 12 }}>
              <CopyButton text="npm install @my-expo/ui" variant="field" />
              <LinkText href="https://expo.dev">Visit Expo →</LinkText>
            </View>
          </Demo>

          <Demo title="ChecklistItem">
            <View style={{ gap: 4 }}>
              <ChecklistItem title="Setup project" checked={todo1} onToggle={setTodo1} priority="high" />
              <ChecklistItem title="Build components" checked={todo2} onToggle={setTodo2} priority="medium" />
            </View>
          </Demo>
        </View>

        {/* ── Footer ── */}
        <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: t.textTertiary }}>
            Swipe to Apps tab for domain templates
          </Text>
          <Text style={{ fontSize: 12, color: t.textTertiary, marginTop: 4 }}>
            143 components · 10 app templates
          </Text>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackVisible}
        message="Item added to cart"
        actionLabel="UNDO"
        onAction={() => setSnackVisible(false)}
        onDismiss={() => setSnackVisible(false)}
      />
    </Screen>
  );
}
