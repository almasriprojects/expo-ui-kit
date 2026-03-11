import React, { type ReactNode } from 'react';
import { Modal, View } from 'react-native';

export type PortalProps = {
  /** Content rendered inside the portal overlay */
  children: ReactNode;
  /** Whether the portal is visible */
  visible?: boolean;
};

export function Portal({ children, visible = true }: PortalProps) {
  if (!visible) return null;
  return (
    <Modal transparent visible animationType="none">
      <View style={{ flex: 1 }}>{children}</View>
    </Modal>
  );
}
