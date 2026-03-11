// ── Icon System ──
export { Icon } from './icon';
export type { IconName, IconProps } from './icon';

// ── Accessibility ──
export { VisuallyHidden } from './visually-hidden';
export type { VisuallyHiddenProps } from './visually-hidden';
export { ScreenReaderAnnounce } from './screen-reader-announce';
export type { ScreenReaderAnnounceProps } from './screen-reader-announce';
export { ReducedMotionWrapper } from './reduced-motion-wrapper';
export type { ReducedMotionWrapperProps } from './reduced-motion-wrapper';

// ── Error Handling ──
export { ErrorBoundary } from './error-boundary';

// ── Media ──
export { QRCode } from './qr-code';
export type { QRCodeProps } from './qr-code';
export { AudioPlayer } from './audio-player';
export type { AudioPlayerProps } from './audio-player';
export { VideoPlayer } from './video-player';
export type { VideoPlayerProps } from './video-player';

// ── Status & Notifications ──
export { NotificationCenter } from './notification-center';
export type { NotificationCenterProps, NotificationItem as NotificationCenterItem } from './notification-center';
export { BadgeCounter } from './badge-counter';
export type { BadgeCounterProps } from './badge-counter';
export { ConnectionStatus } from './connection-status';
export type { ConnectionStatusProps } from './connection-status';
export { MaintenanceScreen } from './maintenance-screen';
export type { MaintenanceScreenProps } from './maintenance-screen';
export { UpdateRequiredScreen } from './update-required-screen';
export type { UpdateRequiredScreenProps } from './update-required-screen';
export { SuccessScreen } from './success-screen';
export type { SuccessScreenProps } from './success-screen';
export { ErrorScreen } from './error-screen';
export type { ErrorScreenProps } from './error-screen';

// ── Core UI ──
export { Sheet } from './sheet';
export { CommandPalette } from './command-palette';
export { Carousel } from './carousel';
export { ImageViewer } from './image-viewer';
export { BottomNavigation } from './bottom-navigation';
export { AppBar } from './app-bar';

// ── Core Form & Input ──
export { Button } from './button';
export { SplitButton } from './split-button';
export { Input } from './input';
export { FloatingLabelInput } from './floating-label-input';
export { PasswordInput } from './password-input';
export { Textarea } from './textarea';
export { Switch } from './switch';
export { Checkbox } from './checkbox';
export { RadioGroup } from './radio-group';
export { Select } from './select';
export { Dropdown } from './dropdown';
export { MultiSelect } from './multi-select';
export { TagInput } from './tag-input';
export { DatePicker } from './date-picker';
export { TimePicker } from './time-picker';
export { CurrencyInput } from './currency-input';
export { QuantityStepper } from './quantity-stepper';
export { NumberPad } from './number-pad';
export { StarRating } from './star-rating';
export { PhoneInput } from './phone-input';
export { OTPInput } from './otp-input';
export { PinInput } from './pin-input';
export { SearchBar } from './search-bar';
export { ToggleGroup } from './toggle-group';
export { FilterBar } from './filter-bar';
export { ColorPicker } from './color-picker';
export { RangeSlider } from './range-slider';
export { FileUploadArea } from './file-upload-area';
export { Autocomplete } from './autocomplete';
export { DateRangePicker } from './date-range-picker';

// ── Advanced Inputs ──
export { SignaturePad } from './signature-pad';
export type { SignaturePadProps } from './signature-pad';
export { ImagePickerButton } from './image-picker-button';
export type { ImagePickerButtonProps } from './image-picker-button';
export { FilePickerButton } from './file-picker-button';
export type { FilePickerButtonProps, FilePickerFile } from './file-picker-button';
export { RichTextEditor } from './rich-text-editor';
export type { RichTextEditorProps } from './rich-text-editor';
export { MaskedInput } from './masked-input';
export type { MaskedInputProps } from './masked-input';
export { CreditCardInput } from './credit-card-input';
export type { CreditCardInputProps, CreditCardData } from './credit-card-input';
export { AddressInput } from './address-input';
export type { AddressInputProps, AddressValue } from './address-input';
export { MultiStepForm } from './multi-step-form';
export type { MultiStepFormProps, MultiStepFormStep } from './multi-step-form';
export { CheckboxGroup } from './checkbox-group';
export type { CheckboxGroupProps, CheckboxGroupOption } from './checkbox-group';
export { InlineEdit } from './inline-edit';
export type { InlineEditProps } from './inline-edit';

// ── Form Helpers ──
export { Form, FormField, useForm } from './form';

// ── Overlay & Feedback ──
export { Modal } from './modal';
export { BottomSheet } from './bottom-sheet';
export { ActionSheet } from './action-sheet';
export { ConfirmDialog } from './confirm-dialog';
export { Drawer } from './drawer';
export { DropdownMenu } from './dropdown-menu';
export { Alert } from './alert';
export { InlineNotification } from './inline-notification';
export { Banner } from './banner';
export { Popover } from './popover';
export { Snackbar } from './snackbar';
export { Tooltip } from './tooltip';
export { ContextMenu } from './context-menu';

// ── Transitions & Animation ──
export { FadeTransition } from './fade-transition';
export type { FadeTransitionProps } from './fade-transition';
export { SlideTransition } from './slide-transition';
export type { SlideTransitionProps, SlideDirection } from './slide-transition';
export { CollapseTransition } from './collapse-transition';
export type { CollapseTransitionProps } from './collapse-transition';
export { ScaleTransition } from './scale-transition';
export type { ScaleTransitionProps } from './scale-transition';
export { Confetti } from './confetti';
export type { ConfettiProps } from './confetti';

// ── Utility ──
export { Label } from './label';
export type { LabelProps } from './label';
export { Portal } from './portal';
export type { PortalProps } from './portal';
export { ScrollArea } from './scroll-area';
export type { ScrollAreaProps } from './scroll-area';
export { Toggle } from './toggle';
export type { ToggleProps } from './toggle';

// ── Layout Primitives ──
export { Stack, VStack, HStack } from './stack';
export type { StackProps } from './stack';
export { Box } from './box';
export type { BoxProps } from './box';
export { Center } from './center';
export type { CenterProps } from './center';
export { Spacer } from './spacer';
export type { SpacerProps } from './spacer';
export { Wrap } from './wrap';
export type { WrapProps } from './wrap';

// ── Navigation & Layout ──
export { SidebarMenu } from './sidebar-menu';
export type { SidebarMenuProps, SidebarMenuItem } from './sidebar-menu';
export { FloatingHeader } from './floating-header';
export type { FloatingHeaderProps } from './floating-header';
export { ParallaxScrollView } from './parallax-scroll-view';
export type { ParallaxScrollViewProps } from './parallax-scroll-view';
export { StickyHeaderList } from './sticky-header-list';
export type { StickyHeaderListProps, StickyHeaderSection } from './sticky-header-list';
export { SwipeableTabView } from './swipeable-tab-view';
export type { SwipeableTabViewProps, SwipeableTab } from './swipeable-tab-view';
export { MasonryGrid } from './masonry-grid';
export type { MasonryGridProps, MasonryGridItem } from './masonry-grid';
export { ResponsiveGrid } from './responsive-grid';
export type { ResponsiveGridProps } from './responsive-grid';
export { Tabs } from './tabs';
export { Accordion } from './accordion';
export { SegmentedControl } from './segmented-control';
export { StepIndicator } from './step-indicator';
export { VerticalStepper } from './vertical-stepper';
export { Header } from './header';
export { Collapsible } from './collapsible';
export { KeyboardAvoidingContainer } from './keyboard-avoiding-container';
export { Pagination } from './pagination';
export { AspectRatio } from './aspect-ratio';
export { OnboardingScreen } from './onboarding-screen';
export { BottomBar } from './bottom-bar';
export { CalendarStrip } from './calendar-strip';
export { Breadcrumb } from './breadcrumb';
export { TreeView } from './tree-view';
export { BackButton } from './back-button';
export type { BackButtonProps } from './back-button';

// ── Data Display ──
export { Card } from './card';
export { GradientCard } from './gradient-card';
export { Avatar } from './avatar';
export { AvatarGroup } from './avatar-group';
export { Badge } from './badge';
export { Divider } from './divider';
export { Separator } from './separator';
export { Progress } from './progress';
export { CircularProgress } from './circular-progress';
export { Skeleton, SkeletonText, SkeletonCard } from './skeleton';
export { SkeletonAvatar, SkeletonImage } from './skeleton-avatar';
export { ListItem } from './list-item';
export { InfoRow } from './info-row';
export { Slider } from './slider';
export { IconButton } from './icon-button';
export { Chip } from './chip';
export { FAB } from './fab';
export { SpeedDial } from './speed-dial';
export { Loading } from './loading';
export { EmptyState } from './empty-state';
export { DataTable } from './data-table';
export { Timeline } from './timeline';
export { CountdownTimer } from './countdown-timer';
export { CountdownBadge } from './countdown-badge';
export { PriceTag } from './price-tag';
export { StatCard } from './stat-card';
export { ImageCarousel } from './image-carousel';
export { StatusIndicator } from './status-indicator';
export { LinkText } from './link-text';
export { RatingDisplay } from './rating-display';
export { CopyButton } from './copy-button';
export { AudioWaveform } from './audio-waveform';
export { ReadMoreText } from './read-more-text';
export { Marquee } from './marquee';
export { AnimatedCounter } from './animated-counter';
export { VerificationBadge } from './verification-badge';
export { CodeBlock } from './code-block';
export { ChecklistItem } from './checklist-item';
export { VideoThumbnail } from './video-thumbnail';
export { NetworkBanner } from './network-banner';
export { DescriptionList } from './description-list';
export type { DescriptionListProps } from './description-list';
export { Highlight } from './highlight';
export type { HighlightProps } from './highlight';
export { Kbd } from './kbd';
export type { KbdProps } from './kbd';
export { Statistic } from './statistic';
export type { StatisticProps } from './statistic';
export { CurrencyDisplay } from './currency-display';
export type { CurrencyDisplayProps } from './currency-display';
export { ComparisonTable } from './comparison-table';
export type { ComparisonTableProps } from './comparison-table';

// ── Domain: E-Commerce / Marketplace ──
export { ProductCard } from './product-card';
export { CartItem } from './cart-item';
export { CategoryCard } from './category-card';
export { ReviewCard } from './review-card';
export { OrderSummary } from './order-summary';
export { PricingCard } from './pricing-card';
export { MenuItemCard } from './menu-item-card';
export { RestaurantCard } from './restaurant-card';
export { InventoryBadge } from './inventory-badge';
export type { InventoryBadgeProps } from './inventory-badge';

// ── E-Commerce ──
export { ProductGallery } from './product-gallery';
export type { ProductGalleryProps, ProductGalleryImage } from './product-gallery';
export { SizeSelector } from './size-selector';
export type { SizeSelectorProps, SizeOption } from './size-selector';
export { ColorSwatchSelector } from './color-swatch-selector';
export type {
  ColorSwatchSelectorProps,
  ColorSwatchOption,
} from './color-swatch-selector';
export { CouponCard } from './coupon-card';
export type { CouponCardProps } from './coupon-card';
export { Receipt } from './receipt';
export type { ReceiptProps, ReceiptItem } from './receipt';
export { TipSelector } from './tip-selector';
export type { TipSelectorProps } from './tip-selector';
export { SubscriptionCard } from './subscription-card';
export type { SubscriptionCardProps } from './subscription-card';

// ── Social & Communication ──
export { ReactionBar } from './reaction-bar';
export type { ReactionBarProps, ReactionItem } from './reaction-bar';
export { ShareSheet } from './share-sheet';
export type { ShareSheetProps, ShareOption } from './share-sheet';
export { MentionInput } from './mention-input';
export type { MentionInputProps, MentionUser } from './mention-input';
export { ReadReceipt } from './read-receipt';
export type { ReadReceiptProps, ReadReceiptStatus } from './read-receipt';
export { VoiceMessageBubble } from './voice-message-bubble';
export type { VoiceMessageBubbleProps } from './voice-message-bubble';
export { Poll } from './poll';
export type { PollProps, PollOption } from './poll';
export { EmojiPicker } from './emoji-picker';
export type { EmojiPickerProps, EmojiCategory } from './emoji-picker';
export { ActivityFeed } from './activity-feed';
export type { ActivityFeedProps, ActivityFeedItem } from './activity-feed';

// ── Domain: Social / Profile ──
export { ProfileCard } from './profile-card';
export { SocialButton } from './social-button';
export { FeatureCard } from './feature-card';
export { ChatBubble } from './chat-bubble';
export { TypingIndicator } from './typing-indicator';
export { MessageInput } from './message-input';
export { StoryCircle } from './story-circle';
export { CommentCard } from './comment-card';
export { WishlistButton } from './wishlist-button';
export { AvatarEditor } from './avatar-editor';
export { ContactCard } from './contact-card';
export { PostCard } from './post-card';
export { FollowButton } from './follow-button';
export { ConversationItem } from './conversation-item';

// ── Domain: Financial / Banking ──
export { BankCardDisplay } from './bank-card-display';
export { TransactionItem } from './transaction-item';
export { BalanceCard } from './balance-card';
export { BudgetProgress } from './budget-progress';

// ── Domain: Booking / Travel ──
export { BookingCard } from './booking-card';
export { AddressCard } from './address-card';
export { PaymentMethodCard } from './payment-method-card';
export { NotificationItem } from './notification-item';
export { MapCard } from './map-card';
export { ShippingTracker } from './shipping-tracker';
export { PromoCodeInput } from './promo-code-input';
export { EventCard } from './event-card';
export { PermissionCard } from './permission-card';
export { RoomCard } from './room-card';
export { GuestSelector } from './guest-selector';

// ── Domain: Swipeable ──
export { SwipeableRow } from './swipeable-row';
export { SwipeCards } from './swipe-cards';

// ── Domain: Auth ──
export { BiometricButton } from './biometric-button';

// ── Onboarding ──
export { WalkthroughSlides } from './walkthrough-slides';
export type { WalkthroughSlidesProps, WalkthroughSlide } from './walkthrough-slides';
export { CoachMark } from './coach-mark';
export type { CoachMarkProps, CoachMarkTarget } from './coach-mark';
export { PermissionRequest } from './permission-request';
export type { PermissionRequestProps } from './permission-request';
export { WelcomeScreen } from './welcome-screen';
export type { WelcomeScreenProps } from './welcome-screen';

// ── Domain: Media ──
export { MediaControls } from './media-controls';

// ── Domain: Fitness / Health ──
export { ActivityRing } from './activity-ring';
export { ProgressCard } from './progress-card';
export { WorkoutCard } from './workout-card';
export { StreakCounter } from './streak-counter';

// ── Domain: Education ──
export { QuizOption } from './quiz-option';
export { LessonCard } from './lesson-card';
export { FlashCard } from './flash-card';

// ── Domain: Project Management ──
export { KanbanCard } from './kanban-card';
export { BoardColumn } from './board-column';

// ── Domain: Real Estate ──
export { PropertyCard } from './property-card';
export { MortgageSlider } from './mortgage-slider';

// ── Settings & Account ──
export { SettingsScreen } from './settings-screen';
export type { SettingsScreenProps, SettingsSection, SettingsItem } from './settings-screen';
export { ProfileHeader } from './profile-header';
export type { ProfileHeaderProps, ProfileHeaderStats } from './profile-header';
export { LanguageSelector } from './language-selector';
export type { LanguageSelectorProps, LanguageOption } from './language-selector';
export { DeleteAccountFlow } from './delete-account-flow';
export type { DeleteAccountFlowProps } from './delete-account-flow';
export { AboutScreen } from './about-screen';
export type { AboutScreenProps, AboutScreenLink } from './about-screen';
export { LegalScreen } from './legal-screen';
export type { LegalScreenProps } from './legal-screen';

// ── Maps & Location ──
export { MapMarker } from './map-marker';
export type { MapMarkerProps } from './map-marker';
export { LocationSearch } from './location-search';
export type { LocationSearchProps, LocationSearchSuggestion } from './location-search';
export { RouteSummary } from './route-summary';
export type { RouteSummaryProps, RouteMode } from './route-summary';
export { NearbyList } from './nearby-list';
export type { NearbyListProps, NearbyPlace } from './nearby-list';

// ── Data & Charts ──
export { AreaChart } from './area-chart';
export type { AreaChartProps } from './area-chart';
export { BarChart } from './bar-chart';
export type { BarChartDataItem, BarChartProps } from './bar-chart';
export { DonutChart } from './donut-chart';
export type { DonutChartDataItem, DonutChartProps } from './donut-chart';
export { Gauge } from './gauge';
export type { GaugeProps } from './gauge';
export { HorizontalBarChart } from './horizontal-bar-chart';
export type { HorizontalBarChartDataItem, HorizontalBarChartProps } from './horizontal-bar-chart';
export { LineChart } from './line-chart';
export type { LineChartProps } from './line-chart';
export { PieChart } from './pie-chart';
export type { PieChartDataItem, PieChartProps } from './pie-chart';
export { Sparkline } from './sparkline';
export type { SparklineProps } from './sparkline';
export { HeatmapCalendar } from './heatmap-calendar';
export type { HeatmapCalendarProps } from './heatmap-calendar';
export { KanbanBoard } from './kanban-board';
export type { KanbanBoardProps, KanbanColumn, KanbanItem } from './kanban-board';
export { SortableList } from './sortable-list';
export type { SortableListProps, SortableListItem } from './sortable-list';
export { InfiniteScrollList } from './infinite-scroll-list';
export type { InfiniteScrollListProps } from './infinite-scroll-list';
export { PullToRefresh } from './pull-to-refresh';
export type { PullToRefreshProps } from './pull-to-refresh';
export { ThemedSectionList } from './themed-section-list';
export type { ThemedSectionListProps, ThemedSection } from './themed-section-list';
