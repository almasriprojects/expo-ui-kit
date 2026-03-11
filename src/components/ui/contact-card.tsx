import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Mail, MessageCircle, Phone } from 'lucide-react-native';

import { Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

export type ContactCardProps = {
  /** Full name of the contact */
  name: string;
  /** URL of the contact's avatar image */
  avatar?: string;
  /** Phone number of the contact */
  phone?: string;
  /** Email address of the contact */
  email?: string;
  /** Job title or role of the contact */
  role?: string;
  /** Callback invoked when the call action is pressed */
  onCall?: () => void;
  /** Callback invoked when the message action is pressed */
  onMessage?: () => void;
  /** Callback invoked when the email action is pressed */
  onEmail?: () => void;
  /** Custom styles for the card container */
  style?: ViewStyle;
};

function ActionBtn({ icon, label, onPress, color }: { icon: ReactNode; label: string; onPress?: () => void; color: string }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1, alignItems: 'center', gap: 4, paddingVertical: 8 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: Radius.full,
          backgroundColor: color + '15',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon}
      </View>
      <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '500', color: t.textSecondary }}>{label}</Text>
    </Pressable>
  );
}

function ContactCardBase({
  name,
  avatar,
  phone,
  email,
  role,
  onCall,
  onMessage,
  onEmail,
  style,
}: ContactCardProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <Avatar source={avatar} initials={name[0]} size="lg" />
      <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', color: t.text, marginTop: 12 }}>{name}</Text>
      {role && (
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 2 }}>{role}</Text>
      )}
      {phone && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 }}>
          <Phone size={13} color={t.textSecondary} />
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{phone}</Text>
        </View>
      )}
      {email && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <Mail size={13} color={t.textSecondary} />
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{email}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: t.border,
          width: '100%',
        }}>
        {onCall && <ActionBtn icon={<Phone size={18} color={t.success} />} label="Call" onPress={onCall} color={t.success} />}
        {onMessage && <ActionBtn icon={<MessageCircle size={18} color={t.primary} />} label="Message" onPress={onMessage} color={t.primary} />}
        {onEmail && <ActionBtn icon={<Mail size={18} color={t.warning} />} label="Email" onPress={onEmail} color={t.warning} />}
      </View>
    </View>
  );
}

export const ContactCard = React.memo(ContactCardBase);
