import React, { useState, useCallback } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TreeNode = {
  /** Unique key identifier for the node */
  key: string;
  /** Display label for the node */
  label: string;
  /** Emoji icon displayed before the label */
  icon?: string;
  /** Child nodes nested under this node */
  children?: TreeNode[];
};

export type TreeViewProps = {
  /** Array of root-level tree nodes */
  data: TreeNode[];
  /** Keys of nodes that should be expanded by default */
  defaultExpanded?: string[];
  /** Callback invoked when a leaf node is pressed */
  onNodePress?: (node: TreeNode) => void;
  /** Custom styles applied to the tree container */
  style?: ViewStyle;
};

const INDENT = 20;

function TreeNodeRow({
  node,
  depth,
  isExpanded,
  onToggle,
  onPress,
  theme,
}: {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  onToggle: () => void;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>;
}) {
  const hasChildren = Boolean(node.children && node.children.length > 0);

  const handlePress = useCallback(() => {
    if (hasChildren) {
      onToggle();
    } else {
      onPress();
    }
  }, [hasChildren, onToggle, onPress]);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        paddingLeft: 12 + depth * INDENT,
        backgroundColor: pressed ? theme.surfacePressed : 'transparent',
        borderRadius: Radius.sm,
      })}
    >
      <View style={{ width: 20, alignItems: 'center', marginRight: 6 }}>
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown size={14} color={theme.primary} />
          ) : (
            <ChevronRight size={14} color={theme.textSecondary} />
          )
        ) : (
          <Text style={{ fontSize: FontSize['2xs'].fontSize, color: theme.textSecondary }}>•</Text>
        )}
      </View>
      {node.icon != null && (
        <Text style={{ fontSize: FontSize.md.fontSize, marginRight: 6, color: theme.textSecondary }}>
          {node.icon}
        </Text>
      )}
      <Text
        style={{
          fontSize: FontSize.md.fontSize,
          color: theme.text,
          flex: 1,
        }}
        numberOfLines={1}
      >
        {node.label}
      </Text>
    </Pressable>
  );
}

export function TreeView({
  data,
  defaultExpanded = [],
  onNodePress,
  style,
}: TreeViewProps) {
  const t = useTheme();
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded)
  );

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const renderNode = useCallback(
    (node: TreeNode, depth: number) => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isExpanded = expanded.has(node.key);

      return (
        <View key={node.key}>
          <TreeNodeRow
            node={node}
            depth={depth}
            isExpanded={isExpanded}
            onToggle={() => toggle(node.key)}
            onPress={() => onNodePress?.(node)}
            theme={t}
          />
          {hasChildren && isExpanded && (
            <View>
              {node.children!.map((child) => renderNode(child, depth + 1))}
            </View>
          )}
        </View>
      );
    },
    [expanded, toggle, onNodePress, t]
  );

  return (
    <View style={[{ paddingVertical: 4 }, style]}>
      {data.map((node) => renderNode(node, 0))}
    </View>
  );
}
