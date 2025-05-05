import { FC } from 'react';
import { Platform, Alert, Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AlertAction {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface CrossPlatformAlertProps {
  visible: boolean;
  title: string;
  message: string;
  actions?: AlertAction[];
  onRequestClose?: () => void;
}

const CrossPlatformAlert: FC<CrossPlatformAlertProps> = ({
  visible,
  title,
  message,
  actions = [{ text: 'OK', style: 'default' }],
  onRequestClose,
}) => {
  if (Platform.OS !== 'web' && visible) {
    // For native, show native alert and hide the modal
    Alert.alert(
      title,
      message,
      actions.map(a => ({
        text: a.text,
        onPress: a.onPress,
        style: a.style,
      }))
    );
    if (onRequestClose) onRequestClose();
    return null;
  }

  // For web, render a modal
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
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
                <Text style={[styles.buttonText, action.style === 'destructive' && { color: '#FF3B30' }]}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
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