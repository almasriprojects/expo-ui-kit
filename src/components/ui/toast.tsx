import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastData = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
};

type ToastContextValue = {
  show: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const counter = useRef(0);
  const timerIdsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const timers = timerIdsRef.current;
    return () => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, []);

  const show = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    const timerId = setTimeout(() => {
      timerIdsRef.current.delete(id);
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
    timerIdsRef.current.set(id, timerId);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <ToastOverlay toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastOverlay({ toasts, onDismiss }: { toasts: ToastData[]; onDismiss: (id: number) => void }) {
  const insets = useSafeAreaInsets();
  const t = useTheme();

  const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  const colors: Record<ToastType, { bg: string; accent: string }> = {
    success: { bg: t.successSoft, accent: t.success },
    error: { bg: t.errorSoft, accent: t.error },
    warning: { bg: t.warningSoft, accent: t.warning },
    info: { bg: t.primarySoft, accent: t.primary },
  };

  if (toasts.length === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: insets.top + 8,
        left: 16,
        right: 16,
        zIndex: 9999,
        gap: 8,
      }}
      pointerEvents="box-none">
      {toasts.map((toast) => {
        const c = colors[toast.type];
        return (
          <Animated.View
            key={toast.id}
            entering={FadeInUp.duration(300)}
            exiting={FadeOutUp.duration(200)}>
            <Pressable
              onPress={() => onDismiss(toast.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: Radius.xl,
                backgroundColor: t.card,
                borderLeftWidth: 4,
                borderLeftColor: c.accent,
                ...Shadows.lg,
              }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: Radius.full,
                  backgroundColor: c.bg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: c.accent }}>
                  {icons[toast.type]}
                </Text>
              </View>
              <Text style={{ flex: 1, fontSize: 14, fontWeight: '500', color: t.text, lineHeight: 20 }}>
                {toast.message}
              </Text>
              <Text style={{ fontSize: 16, color: t.textTertiary }}>✕</Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}
