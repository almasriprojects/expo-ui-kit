import React, {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ToastVariant = 'default' | 'success' | 'error' | 'info' | 'warning';

type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
  title?: string;
};

type ToastOptions = {
  message: string;
  title?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastContextType = {
  show: (options: ToastOptions) => void;
};

export const ToastContext = createContext<ToastContextType>({
  show: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const t = useTheme();
  const timerIdsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const timers = timerIdsRef.current;
    return () => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, []);

  const fgColor = t.primaryForeground;
  const variantConfig: Record<ToastVariant, { bg: string; icon: ReactNode }> = {
    default: { bg: t.snackbar, icon: <Info size={14} color={fgColor} /> },
    success: { bg: t.success, icon: <CheckCircle size={14} color={fgColor} /> },
    error: { bg: t.error, icon: <AlertCircle size={14} color={fgColor} /> },
    info: { bg: t.primaryPressed, icon: <Info size={14} color={fgColor} /> },
    warning: { bg: t.warning, icon: <AlertTriangle size={14} color={fgColor} /> },
  };

  const show = useCallback((options: ToastOptions) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    const toast: Toast = {
      id,
      message: options.message,
      title: options.title,
      variant: options.variant ?? 'default',
    };
    setToasts((prev) => [...prev, toast]);

    const timerId = setTimeout(() => {
      timerIdsRef.current.delete(id);
      setToasts((prev) => prev.filter((ti) => ti.id !== id));
    }, options.duration ?? 3000);
    timerIdsRef.current.set(id, timerId);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((ti) => ti.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          top: insets.top + 12,
          left: 16,
          right: 16,
          zIndex: 9999,
          alignItems: 'center',
        }}>
        {toasts.map((toast) => {
          const config = variantConfig[toast.variant];
          return (
            <Animated.View
              key={toast.id}
              entering={FadeInUp.duration(300).springify()}
              exiting={FadeOutUp.duration(200)}
              layout={LinearTransition}
              style={{
                width: Math.min(screenWidth - 32, 500),
                marginBottom: 8,
              }}>
              <Pressable
                accessibilityRole="alert"
                accessibilityLabel={toast.message}
                onPress={() => dismiss(toast.id)}
                style={{
                  backgroundColor: config.bg,
                  borderRadius: Radius.xl,
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  ...Shadows.lg,
                }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: Radius.full,
                    backgroundColor: t.surfaceOnColorStrong,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {config.icon}
                </View>
                <View style={{ flex: 1 }}>
                  {toast.title && (
                    <ThemedText
                      style={{
                        color: t.primaryForeground,
                        fontSize: 14,
                        fontWeight: '600',
                        marginBottom: 2,
                      }}>
                      {toast.title}
                    </ThemedText>
                  )}
                  <ThemedText
                    style={{
                      color: t.primaryForeground,
                      fontSize: 13,
                      fontWeight: '500',
                      opacity: toast.title ? 0.9 : 1,
                    }}>
                    {toast.message}
                  </ThemedText>
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </ToastContext.Provider>
  );
}
