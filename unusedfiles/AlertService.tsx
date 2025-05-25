import { Platform, Alert as RNAlert } from 'react-native';
import { useState, createContext, useContext, ReactNode } from 'react';

// Types for alert options
export type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

export type AlertOptions = {
  title: string;
  message?: string;
  buttons?: AlertButton[];
};

// Context for web alert
type AlertContextType = {
  showAlert: (title: string, message?: string, buttons?: AlertButton[]) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({ title: '', message: '', buttons: [] });

  const showAlert = (title: string, message?: string, buttons?: AlertButton[]) => {
    setAlertOptions({ title, message, buttons });
    setVisible(true);
  };

  const handleButtonPress = (button: AlertButton) => {
    setVisible(false);
    if (button.onPress) button.onPress();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {Platform.OS === 'web' && visible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'white',
            borderRadius: 12,
            minWidth: 300,
            maxWidth: 400,
            padding: 24,
            boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
            textAlign: 'center',
          }}>
            <h3 style={{ margin: 0 }}>{alertOptions.title}</h3>
            {alertOptions.message && <p style={{ margin: '16px 0' }}>{alertOptions.message}</p>}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
              {alertOptions.buttons && alertOptions.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleButtonPress(btn)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: 'none',
                    background: btn.style === 'destructive' ? '#FF3B30' : btn.style === 'cancel' ? '#ccc' : '#007AFF',
                    color: btn.style === 'cancel' ? '#333' : '#fff',
                    fontWeight: btn.style === 'destructive' ? 'bold' : 'normal',
                    cursor: 'pointer',
                  }}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

// Unified alert function
export function alert(title: string, message?: string, buttons?: AlertButton[]) {
  if (Platform.OS === 'web') {
    // On web, must use context
    throw new Error('On web, useAlert().showAlert instead of alert() directly.');
  } else {
    RNAlert.alert(title, message, buttons?.map(btn => ({
      text: btn.text,
      onPress: btn.onPress,
      style: btn.style,
    })));
  }
}