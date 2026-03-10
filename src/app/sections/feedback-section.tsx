import React from 'react';
import { View } from 'react-native';

import { Alert, Button, Loading } from '@/components/ui';
import { useToast } from '@/hooks/use-toast';

import { Demo, SectionHeader } from './demo-helpers';

export function FeedbackSection() {
  const toast = useToast();

  return (
    <>
      <SectionHeader title="Feedback" category="Feedback" />

      <Demo title="Alert">
        <View style={{ gap: 12 }}>
          <Alert variant="info" title="Info" message="Informational message." />
          <Alert variant="success" title="Success" message="Operation completed." />
          <Alert variant="warning" title="Warning" message="Review before continuing." />
          <Alert variant="error" title="Error" message="Something went wrong." />
        </View>
      </Demo>

      <Demo title="Toast">
        <View style={{ gap: 10 }}>
          <Button title="Success Toast" size="sm" onPress={() => toast.show({ title: 'Saved', message: 'Changes saved!', variant: 'success' })} />
          <Button title="Error Toast" variant="destructive" size="sm" onPress={() => toast.show({ title: 'Error', message: 'Something went wrong', variant: 'error' })} />
          <Button title="Info Toast" variant="outline" size="sm" onPress={() => toast.show({ title: 'Update', message: 'New version available', variant: 'info' })} />
        </View>
      </Demo>

      <Demo title="Loading">
        <Loading size="small" message="Fetching data..." />
      </Demo>
    </>
  );
}
