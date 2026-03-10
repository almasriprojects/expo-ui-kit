import { useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';

export type ScreenReaderAnnounceProps = {
  message: string;
  polite?: boolean;
};

export function ScreenReaderAnnounce({ message, polite = false }: ScreenReaderAnnounceProps) {
  useEffect(() => {
    if (message) {
      AccessibilityInfo.announceForAccessibility(message);
    }
  }, [message]);

  return null;
}
