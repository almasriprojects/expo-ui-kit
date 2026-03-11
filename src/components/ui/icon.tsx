import { useTheme } from '@/hooks/use-theme';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  AtSign,
  Bath,
  Bed,
  Bell,
  Bold,
  BookOpen,
  Calendar,
  Camera,
  Car,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Coffee,
  Copy,
  CreditCard,
  Crown,
  Download,
  Droplets,
  Dumbbell,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileText,
  Film,
  Filter,
  Flag,
  Flame,
  Flower2,
  Folder,
  Globe,
  GripVertical,
  Hash,
  Heart,
  Home,
  Image,
  Info,
  Italic,
  Landmark,
  Leaf,
  Link,
  List,
  Loader,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Maximize,
  Menu,
  MessageCircle,
  Mic,
  Minimize,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Music,
  Navigation,
  Paperclip,
  PartyPopper,
  Pause,
  Pencil,
  Phone,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  Ruler,
  Search,
  Send,
  Settings,
  Share2,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  SkipBack,
  SkipForward,
  Slash,
  Smartphone,
  Star,
  Sun,
  Target,
  Trash2,
  Upload,
  User,
  UtensilsCrossed,
  Volume2,
  Wifi,
  WifiOff,
  X,
  type LucideProps,
} from 'lucide-react-native';
import React from 'react';

export type IconName =
  | 'activity'
  | 'alert-circle'
  | 'alert-triangle'
  | 'arrow-down'
  | 'arrow-down-left'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-up-right'
  | 'at-sign'
  | 'bath'
  | 'bed'
  | 'bell'
  | 'bold'
  | 'book-open'
  | 'calendar'
  | 'camera'
  | 'car'
  | 'check'
  | 'check-circle'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'clock'
  | 'coffee'
  | 'copy'
  | 'credit-card'
  | 'crown'
  | 'download'
  | 'droplets'
  | 'dumbbell'
  | 'edit'
  | 'external-link'
  | 'eye'
  | 'eye-off'
  | 'file'
  | 'file-text'
  | 'film'
  | 'filter'
  | 'flag'
  | 'flame'
  | 'flower'
  | 'folder'
  | 'globe'
  | 'grip-vertical'
  | 'hash'
  | 'heart'
  | 'home'
  | 'image'
  | 'info'
  | 'italic'
  | 'landmark'
  | 'leaf'
  | 'link'
  | 'list'
  | 'loader'
  | 'lock'
  | 'log-out'
  | 'mail'
  | 'map-pin'
  | 'maximize'
  | 'menu'
  | 'message-circle'
  | 'mic'
  | 'minimize'
  | 'minus'
  | 'moon'
  | 'more-horizontal'
  | 'more-vertical'
  | 'music'
  | 'navigation'
  | 'paperclip'
  | 'party-popper'
  | 'pause'
  | 'pencil'
  | 'phone'
  | 'play'
  | 'plus'
  | 'refresh'
  | 'rocket'
  | 'ruler'
  | 'search'
  | 'send'
  | 'settings'
  | 'share'
  | 'shirt'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'skip-back'
  | 'skip-forward'
  | 'slash'
  | 'smartphone'
  | 'star'
  | 'sun'
  | 'target'
  | 'trash'
  | 'upload'
  | 'user'
  | 'utensils-crossed'
  | 'volume'
  | 'wifi'
  | 'wifi-off'
  | 'x';

const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
  activity: Activity,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'arrow-down': ArrowDown,
  'arrow-down-left': ArrowDownLeft,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-up-right': ArrowUpRight,
  'at-sign': AtSign,
  bath: Bath,
  bed: Bed,
  bell: Bell,
  bold: Bold,
  'book-open': BookOpen,
  calendar: Calendar,
  camera: Camera,
  car: Car,
  check: Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  clock: Clock,
  coffee: Coffee,
  copy: Copy,
  'credit-card': CreditCard,
  crown: Crown,
  download: Download,
  droplets: Droplets,
  dumbbell: Dumbbell,
  edit: Edit2,
  'external-link': ExternalLink,
  eye: Eye,
  'eye-off': EyeOff,
  file: File,
  'file-text': FileText,
  film: Film,
  filter: Filter,
  flag: Flag,
  flame: Flame,
  flower: Flower2,
  folder: Folder,
  globe: Globe,
  'grip-vertical': GripVertical,
  hash: Hash,
  heart: Heart,
  home: Home,
  image: Image,
  info: Info,
  italic: Italic,
  landmark: Landmark,
  leaf: Leaf,
  link: Link,
  list: List,
  loader: Loader,
  lock: Lock,
  'log-out': LogOut,
  mail: Mail,
  'map-pin': MapPin,
  maximize: Maximize,
  menu: Menu,
  'message-circle': MessageCircle,
  mic: Mic,
  minimize: Minimize,
  minus: Minus,
  moon: Moon,
  'more-horizontal': MoreHorizontal,
  'more-vertical': MoreVertical,
  music: Music,
  navigation: Navigation,
  paperclip: Paperclip,
  'party-popper': PartyPopper,
  pause: Pause,
  pencil: Pencil,
  phone: Phone,
  play: Play,
  plus: Plus,
  refresh: RefreshCw,
  rocket: Rocket,
  ruler: Ruler,
  search: Search,
  send: Send,
  settings: Settings,
  share: Share2,
  shirt: Shirt,
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  'skip-back': SkipBack,
  'skip-forward': SkipForward,
  slash: Slash,
  smartphone: Smartphone,
  star: Star,
  sun: Sun,
  target: Target,
  trash: Trash2,
  upload: Upload,
  user: User,
  'utensils-crossed': UtensilsCrossed,
  volume: Volume2,
  wifi: Wifi,
  'wifi-off': WifiOff,
  x: X,
};

export type IconProps = {
  /** Name of the Lucide icon to render */
  name: IconName;
  /** Icon size in pixels */
  size?: number;
  /** Icon stroke color */
  color?: string;
  /** Icon stroke width */
  strokeWidth?: number;
};

export function Icon({ name, size = 20, color, strokeWidth = 1.75 }: IconProps) {
  const t = useTheme();
  const LucideIcon = iconMap[name];
  return <LucideIcon size={size} color={color ?? t.text} strokeWidth={strokeWidth} />;
}
