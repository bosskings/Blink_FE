import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { CustomAlert } from '@/components/CustomAlert';

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe('CustomAlert', () => {
  it('does not render when visible is false', async () => {
    await render(
      <CustomAlert visible={false} title="Test Title" message="Test Message" onClose={jest.fn()} />
    );
    expect(screen.queryByText('Test Title')).toBeNull();
  });

  it('renders title and message when visible is true', async () => {
    await render(
      <CustomAlert visible={true} title="Test Title" message="Test Message" onClose={jest.fn()} />
    );
    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Test Message')).toBeTruthy();
  });

  it('calls onClose when close button (OK) is pressed', async () => {
    const mockOnClose = jest.fn();
    await render(
      <CustomAlert visible={true} title="Test Title" message="Test Message" onClose={mockOnClose} />
    );
    
    fireEvent.press(screen.getByText('OK'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm and onClose when confirm button is pressed', async () => {
    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();
    
    await render(
      <CustomAlert 
        visible={true} 
        title="Test" 
        message="Message" 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
        confirmText="Yes"
        cancelText="No"
      />
    );
    
    fireEvent.press(screen.getByText('Yes'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    fireEvent.press(screen.getByText('No'));
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });
});
