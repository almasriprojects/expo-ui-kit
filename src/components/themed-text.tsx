import { Platform, Text, type TextProps, type TextStyle } from 'react-native';

import { Fonts, resolveFontFamily, type ThemeColor } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

const typeStyles: Record<NonNullable<ThemedTextProps['type']>, TextStyle> = {
  small: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  smallBold: { fontSize: 14, lineHeight: 20, fontWeight: '700' },
  default: { fontSize: 16, lineHeight: 24, fontWeight: '500' },
  title: { fontSize: 48, lineHeight: 52, fontWeight: '600' },
  subtitle: { fontSize: 32, lineHeight: 44, fontWeight: '600' },
  link: { fontSize: 14, lineHeight: 30 },
  linkPrimary: { fontSize: 14, lineHeight: 30 },
  code: {
    fontFamily: Fonts?.mono ?? 'monospace',
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    fontSize: 12,
  },
};

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  className,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const fonts = useFont();

  const baseStyle = typeStyles[type];
  const weight = (baseStyle.fontWeight ?? '400') as '400' | '500' | '600' | '700';

  const fontFamily = type === 'code'
    ? baseStyle.fontFamily
    : resolveFontFamily(fonts, weight);

  const colorStyle = type === 'linkPrimary'
    ? { color: theme.linkText }
    : { color: theme[themeColor ?? 'text'] };

  return (
    <Text
      style={[
        baseStyle,
        colorStyle,
        fontFamily ? { fontFamily } : undefined,
        style,
      ]}
      className={className}
      {...rest}
    />
  );
}
