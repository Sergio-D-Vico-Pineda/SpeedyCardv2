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
  message: string;
  qrCode?: string;
  actions?: AlertAction[];
  onRequestClose?: () => void;
}

const CrossPlatformAlert: FC<CrossPlatformAlertProps> = ({
  visible,
  title,
  message,
  qrCode,
  actions = [{ text: 'Cancel', color: '#FF3B30' }],
  onRequestClose,
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
          <Text style={styles.message}>{message}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    minWidth: 280,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 5,
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
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default CrossPlatformAlert;