import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Button, ConfirmDialog, Input, Modal, Tooltip } from '@/components/ui';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

import { Demo, SectionHeader } from './demo-helpers';

export function OverlaySection() {
  const t = useTheme();
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <SectionHeader title="Overlays" category="Overlay" />

      <Demo title="Modal">
        <Button title="Open Modal" variant="outline" onPress={() => setModalOpen(true)} />
        <Modal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Edit Profile"
          description="Update your personal information."
          actions={
            <>
              <Button title="Cancel" variant="ghost" size="sm" onPress={() => setModalOpen(false)} />
              <Button title="Save" size="sm" onPress={() => setModalOpen(false)} />
            </>
          }>
          <View style={{ gap: 16 }}>
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" placeholder="john@doe.com" />
          </View>
        </Modal>
      </Demo>

      <Demo title="ConfirmDialog">
        <Button title="Delete Account" variant="destructive" onPress={() => setConfirmOpen(true)} />
        <ConfirmDialog
          visible={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => toast.show({ message: 'Confirmed!', variant: 'success' })}
          title="Delete Account?"
          message="This action cannot be undone."
          confirmLabel="Delete"
          destructive
        />
      </Demo>

      <Demo title="Tooltip">
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip content="Helpful tip!">
            <View style={{ backgroundColor: t.surface, paddingHorizontal: 20, paddingVertical: 10, borderRadius: Radius.lg, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>Tap me</Text>
            </View>
          </Tooltip>
          <Tooltip content="Another tooltip" position="bottom">
            <View style={{ backgroundColor: t.surface, paddingHorizontal: 20, paddingVertical: 10, borderRadius: Radius.lg, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>Or me</Text>
            </View>
          </Tooltip>
        </View>
      </Demo>
    </>
  );
}
