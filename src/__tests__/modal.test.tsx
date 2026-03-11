import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Modal } from '@/components/ui/modal';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    textSecondary: '#666',
    overlay: 'rgba(0,0,0,0.5)',
    background: '#fff',
  }),
}));

jest.mock('@/hooks/use-font', () => ({
  useFont: () => ({}),
}));

describe('Modal', () => {
  const onClose = jest.fn();

  it('renders when visible', () => {
    const { getByText } = render(
      <Modal visible onClose={onClose} title="Test Modal">
        <Text>Modal body</Text>
      </Modal>
    );
    expect(getByText('Test Modal')).toBeTruthy();
    expect(getByText('Modal body')).toBeTruthy();
  });

  it('shows title and description', () => {
    const { getByText } = render(
      <Modal visible onClose={onClose} title="Confirm" description="Are you sure?" />
    );
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Are you sure?')).toBeTruthy();
  });

  it('renders actions', () => {
    const actions = (
      <>
        <Text>Cancel</Text>
        <Text>OK</Text>
      </>
    );
    const { getByText } = render(
      <Modal visible onClose={onClose} title="Dialog" actions={actions} />
    );
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('OK')).toBeTruthy();
  });
});
