import { useTheme } from '@/hooks/use-theme';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bold,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileText,
  Filter,
  Flag,
  Folder,
  Globe,
  GripVertical,
  Hash,
  Heart,
  Home,
  Image,
  Info,
  Italic,
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
  MoreHorizontal,
  MoreVertical,
  Music,
  Navigation,
  Pause,
  Pencil,
  Phone,
  Play,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Share2,
  ShoppingCart,
  SkipBack,
  SkipForward,
  Slash,
  Star,
  Trash2,
  Upload,
  User,
  Volume2,
  Wifi,
  WifiOff,
  X,
  type LucideProps,
} from 'lucide-react-native';
import React from 'react';

export type IconName =
  | 'alert-circle'
  | 'alert-triangle'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'bell'
  | 'bold'
  | 'calendar'
  | 'camera'
  | 'check'
  | 'check-circle'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'clock'
  | 'copy'
  | 'credit-card'
  | 'download'
  | 'edit'
  | 'external-link'
  | 'eye'
  | 'eye-off'
  | 'file'
  | 'file-text'
  | 'filter'
  | 'flag'
  | 'folder'
  | 'globe'
  | 'grip-vertical'
  | 'hash'
  | 'heart'
  | 'home'
  | 'image'
  | 'info'
  | 'italic'
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
  | 'more-horizontal'
  | 'more-vertical'
  | 'music'
  | 'navigation'
  | 'pause'
  | 'pencil'
  | 'phone'
  | 'play'
  | 'plus'
  | 'refresh'
  | 'search'
  | 'send'
  | 'settings'
  | 'share'
  | 'shopping-cart'
  | 'skip-back'
  | 'skip-forward'
  | 'slash'
  | 'star'
  | 'trash'
  | 'upload'
  | 'user'
  | 'volume'
  | 'wifi'
  | 'wifi-off'
  | 'x';

const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  bell: Bell,
  bold: Bold,
  calendar: Calendar,
  camera: Camera,
  check: Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  clock: Clock,
  copy: Copy,
  'credit-card': CreditCard,
  download: Download,
  edit: Edit2,
  'external-link': ExternalLink,
  eye: Eye,
  'eye-off': EyeOff,
  file: File,
  'file-text': FileText,
  filter: Filter,
  flag: Flag,
  folder: Folder,
  globe: Globe,
  'grip-vertical': GripVertical,
  hash: Hash,
  heart: Heart,
  home: Home,
  image: Image,
  info: Info,
  italic: Italic,
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
  'more-horizontal': MoreHorizontal,
  'more-vertical': MoreVertical,
  music: Music,
  navigation: Navigation,
  pause: Pause,
  pencil: Pencil,
  phone: Phone,
  play: Play,
  plus: Plus,
  refresh: RefreshCw,
  search: Search,
  send: Send,
  settings: Settings,
  share: Share2,
  'shopping-cart': ShoppingCart,
  'skip-back': SkipBack,
  'skip-forward': SkipForward,
  slash: Slash,
  star: Star,
  trash: Trash2,
  upload: Upload,
  user: User,
  volume: Volume2,
  wifi: Wifi,
  'wifi-off': WifiOff,
  x: X,
};

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function Icon({ name, size = 20, color, strokeWidth = 1.75 }: IconProps) {
  const t = useTheme();
  const LucideIcon = iconMap[name];
  return <LucideIcon size={size} color={color ?? t.text} strokeWidth={strokeWidth} />;
}
