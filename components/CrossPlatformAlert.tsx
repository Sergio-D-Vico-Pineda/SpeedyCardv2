import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FC } from 'react';

interface AlertAction {
  text: string;
  onPress?: () => void;
  color?: string;
}

interface CrossPlatformAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  qrCode?: string;
  actions?: AlertAction[];
  onRequestClose?: () => void;
  children?: React.ReactNode;
}

const CrossPlatformAlert: FC<CrossPlatformAlertProps> = ({
  visible,
  title,
  message,
  qrCode,
  actions = [{ text: 'Cancel', color: '#FF3B30' }],
  onRequestClose,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onRequestClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.container}
        >
          <Text style={styles.title}>{title}</Text>
          {qrCode &&
            <QRCode value={qrCode} size={120} />
          }
          {message && <Text style={styles.message}>{message}</Text>}
          {children}
          <View style={styles.actions}>
            {actions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.button}
                onPress={() => {
                  if (action.onPress) action.onPress();
                  if (onRequestClose) onRequestClose();
                }}
              >
                <Text style={[styles.buttonText, { color: action.color }]}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    width: 'auto',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 5,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    // margin: 8,
    // minWidth: 80,
    // width: 'auto',
    // alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007AFF',
  },
});

export default CrossPlatformAlert;