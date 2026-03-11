import React, { useEffect } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Volume2 } from 'lucide-react-native';

import { FontSize, Spacing, Animation } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CallStatus = 'ringing' | 'connected' | 'ended';

export type CallScreenProps = {
  /** Name of the person being called */
  callerName: string;
  /** Avatar URI of the caller */
  callerAvatar?: string;
  /** Call duration in seconds (for connected state) */
  duration?: number;
  /** Whether this is a video call */
  isVideo?: boolean;
  /** Whether the microphone is muted */
  isMuted?: boolean;
  /** Whether speaker is enabled */
  isSpeaker?: boolean;
  /** Toggle microphone callback */
  onToggleMute: () => void;
  /** Toggle speaker callback */
  onToggleSpeaker: () => void;
  /** Toggle video callback */
  onToggleVideo?: () => void;
  /** Hang up the call */
  onHangUp: () => void;
  /** Current call status */
  status?: CallStatus;
  /** Optional container style */
  style?: ViewStyle;
};

const AVATAR_SIZE = 120;
const ACTION_SIZE = 56;

function formatDuration(d: number): string {
  return (
    Math.floor(d / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    (d % 60).toString().padStart(2, '0')
  );
}

function getStatusLabel(status: CallStatus): string {
  switch (status) {
    case 'ringing':
      return 'Ringing...';
    case 'connected':
      return 'Connected';
    case 'ended':
      return 'Call ended';
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function CallScreen({
  callerName,
  callerAvatar,
  duration = 0,
  isVideo = false,
  isMuted = false,
  isSpeaker = false,
  onToggleMute,
  onToggleSpeaker,
  onToggleVideo,
  onHangUp,
  status = 'ringing',
  style,
}: CallScreenProps) {
  const t = useTheme();

  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(1);

  useEffect(() => {
    if (status === 'ringing') {
      ringScale.value = withRepeat(
        withTiming(1.3, { duration: Animation.duration.slower }),
        -1,
        false,
      );
      ringOpacity.value = withRepeat(
        withTiming(0, { duration: Animation.duration.slower }),
        -1,
        false,
      );
    } else {
      ringScale.value = 1;
      ringOpacity.value = 0;
    }
  }, [status, ringScale, ringOpacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <View
      accessible
      accessibilityLabel={`Call with ${callerName}, ${getStatusLabel(status)}`}
      style={[
        {
          flex: 1,
          backgroundColor: t.background,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: Spacing[16],
          paddingHorizontal: Spacing[6],
        },
        style,
      ]}>
      <Text style={{ ...FontSize.sm, color: t.textSecondary }}>{getStatusLabel(status)}</Text>

      <View style={{ alignItems: 'center', gap: Spacing[4] }}>
        <View style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, alignItems: 'center', justifyContent: 'center' }}>
          {status === 'ringing' && (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                  borderWidth: 2,
                  borderColor: t.primary,
                },
                pulseStyle,
              ]}
            />
          )}
          {callerAvatar ? (
            <Animated.Image
              source={{ uri: callerAvatar }}
              style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE / 2,
              }}
              accessibilityLabel={`${callerName}'s avatar`}
            />
          ) : (
            <View
              style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE / 2,
                backgroundColor: t.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ ...FontSize['3xl'], fontWeight: '700', color: t.textSecondary }}>
                {getInitials(callerName)}
              </Text>
            </View>
          )}
        </View>

        <Text style={{ ...FontSize['2xl'], fontWeight: '700', color: t.text }}>{callerName}</Text>
        {status === 'connected' && (
          <Text style={{ ...FontSize.md, color: t.textSecondary, fontVariant: ['tabular-nums'] }}>
            {formatDuration(duration)}
          </Text>
        )}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[5] }}>
        <ActionButton
          icon={isMuted ? <MicOff size={22} color={t.text} /> : <Mic size={22} color={t.text} />}
          active={isMuted}
          onPress={onToggleMute}
          backgroundColor={isMuted ? t.surfaceActive : t.surface}
          label={isMuted ? 'Unmute' : 'Mute'}
        />
        <ActionButton
          icon={<Volume2 size={22} color={t.text} />}
          active={isSpeaker}
          onPress={onToggleSpeaker}
          backgroundColor={isSpeaker ? t.surfaceActive : t.surface}
          label={isSpeaker ? 'Speaker off' : 'Speaker on'}
        />
        {isVideo && onToggleVideo && (
          <ActionButton
            icon={
              isVideo ? (
                <Video size={22} color={t.text} />
              ) : (
                <VideoOff size={22} color={t.text} />
              )
            }
            onPress={onToggleVideo}
            backgroundColor={t.surface}
            label="Toggle video"
          />
        )}
        <ActionButton
          icon={<PhoneOff size={22} color={t.primaryForeground} />}
          onPress={onHangUp}
          backgroundColor={t.error}
          label="Hang up"
        />
      </View>
    </View>
  );
}

type ActionButtonProps = {
  icon: React.ReactNode;
  onPress: () => void;
  backgroundColor: string;
  label: string;
  active?: boolean;
};

function ActionButton({ icon, onPress, backgroundColor, label }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={{
        width: ACTION_SIZE,
        height: ACTION_SIZE,
        borderRadius: ACTION_SIZE / 2,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {icon}
    </Pressable>
  );
}
