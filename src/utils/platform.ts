import { Platform, Dimensions } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const isNative = isIOS || isAndroid;

export function getScreenDimensions() {
  return Dimensions.get('window');
}

export function isSmallScreen(): boolean {
  const { width } = getScreenDimensions();
  return width < 375;
}

export function isTablet(): boolean {
  const { width } = getScreenDimensions();
  return width >= 768;
}
