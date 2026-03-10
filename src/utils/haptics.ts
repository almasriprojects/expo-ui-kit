import { Platform } from 'react-native';

export async function lightHaptic() {
  if (Platform.OS === 'web') return;

  const Haptics = await import('expo-haptics');
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export async function mediumHaptic() {
  if (Platform.OS === 'web') return;

  const Haptics = await import('expo-haptics');
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

export async function successHaptic() {
  if (Platform.OS === 'web') return;

  const Haptics = await import('expo-haptics');
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

export async function errorHaptic() {
  if (Platform.OS === 'web') return;

  const Haptics = await import('expo-haptics');
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}
