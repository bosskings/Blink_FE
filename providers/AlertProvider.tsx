import React, { createContext, useContext, useState, useCallback } from 'react';
import { CustomAlert } from '@/components/CustomAlert';

interface AlertOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

interface AlertContextType {
  showAlert: (title: string, message: string, buttons?: { text?: string; onPress?: () => void; style?: string }[]) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<AlertOptions>({ title: '', message: '' });

  const showAlert = useCallback(
    (title: string, message: string, buttons?: { text?: string; onPress?: () => void; style?: string }[]) => {
      let confirmText = 'OK';
      let cancelText = 'Cancel';
      let onConfirm: (() => void) | undefined = undefined;
      let onCancel: (() => void) | undefined = undefined;
      let showCancel = false;

      if (buttons && buttons.length > 0) {
        if (buttons.length === 1) {
          confirmText = buttons[0].text || 'OK';
          onConfirm = buttons[0].onPress;
        } else if (buttons.length >= 2) {
          showCancel = true;
          // Usually buttons[0] is cancel and buttons[1] is confirm
          const cancelBtn = buttons.find(b => b.style === 'cancel') || buttons[0];
          const confirmBtn = buttons.find(b => b.style !== 'cancel') || buttons[1];
          
          cancelText = cancelBtn.text || 'Cancel';
          confirmText = confirmBtn.text || 'OK';
          onConfirm = confirmBtn.onPress;
          onCancel = cancelBtn.onPress;
        }
      }

      setConfig({
        title,
        message,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
        showCancel,
      });
      setVisible(true);
    },
    []
  );

  const handleClose = useCallback(() => {
    setVisible(false);
    if (config.onCancel) {
      config.onCancel();
    }
  }, [config]);

  const handleConfirm = useCallback(() => {
    setVisible(false);
    if (config.onConfirm) {
      config.onConfirm();
    }
  }, [config]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert
        visible={visible}
        title={config.title}
        message={config.message}
        confirmText={config.confirmText}
        cancelText={config.showCancel ? config.cancelText : undefined}
        onClose={handleClose}
        onConfirm={config.showCancel || config.onConfirm ? handleConfirm : undefined}
      />
    </AlertContext.Provider>
  );
};
