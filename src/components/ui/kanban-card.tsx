import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Calendar, Paperclip, MessageCircle } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

export type KanbanCardProps = {
  /** Card title text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Priority level indicator */
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  /** Colored label tags on the card */
  labels?: { text: string; color: string }[];
  /** Assignee name (first letter used for avatar fallback) */
  assignee?: string;
  /** Assignee avatar image URI */
  assigneeAvatar?: string;
  /** Due date text displayed on the card */
  dueDate?: string;
  /** Number of comments on the card */
  comments?: number;
  /** Number of attachments on the card */
  attachments?: number;
  /** Subtask completion progress */
  subtasks?: { done: number; total: number };
  /** Callback fired when the card is pressed */
  onPress?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

const priorityTokens: Record<string, { token: 'statusLow' | 'statusMedium' | 'statusHigh' | 'statusUrgent'; label: string }> = {
  low: { token: 'statusLow', label: 'Low' },
  medium: { token: 'statusMedium', label: 'Medium' },
  high: { token: 'statusHigh', label: 'High' },
  urgent: { token: 'statusUrgent', label: 'Urgent' },
};

function KanbanCardBase({
  title,
  description,
  priority,
  labels,
  assignee,
  assigneeAvatar,
  dueDate,
  comments = 0,
  attachments = 0,
  subtasks,
  onPress,
  style,
}: KanbanCardProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 14,
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      {labels && labels.length > 0 && (
        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          {labels.map((l, i) => (
            <View
              key={i}
              style={{
                backgroundColor: l.color + '20',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: Radius.sm,
              }}>
              <Text style={{ fontSize: FontSize['2xs'].fontSize, fontWeight: '600', color: l.color }}>{l.text}</Text>
            </View>
          ))}
        </View>
      )}
      <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{title}</Text>
      {description && (
        <Text numberOfLines={2} style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 4, lineHeight: 17 }}>
          {description}
        </Text>
      )}
      {subtasks && (
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              height: 4,
              borderRadius: Radius.full,
              backgroundColor: t.surface,
              overflow: 'hidden',
            }}>
            <View
              style={{
                height: '100%',
                width: `${(subtasks.done / subtasks.total) * 100}%`,
                borderRadius: Radius.full,
                backgroundColor: subtasks.done === subtasks.total ? t.statusDone : t.primary,
              }}
            />
          </View>
          <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary, marginTop: 4 }}>
            {subtasks.done}/{subtasks.total} subtasks
          </Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {priority && (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: Radius.full,
                backgroundColor: t[priorityTokens[priority].token],
              }}
            />
          )}
          {dueDate && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Calendar size={FontSize.xs.fontSize} color={t.textTertiary} />
              <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary }}>{dueDate}</Text>
            </View>
          )}
          {comments > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <MessageCircle size={11} color={t.textTertiary} />
              <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary }}>{comments}</Text>
            </View>
          )}
          {attachments > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Paperclip size={11} color={t.textTertiary} />
              <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary }}>{attachments}</Text>
            </View>
          )}
        </View>
        {assignee && <Avatar source={assigneeAvatar} initials={assignee[0]} size="xs" />}
      </View>
    </Pressable>
  );
}

export const KanbanCard = React.memo(KanbanCardBase);
