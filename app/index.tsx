import { Link } from 'expo-router';
import { Text, View, StyleSheet, Pressable, Image, Modal } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { CameraView, Camera } from 'expo-camera';

export default function Index() {
  const { user, signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, [modalVisible]);

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    if (data.startsWith('speedycard://')) {
      setModalVisible(false);
      
      alert('Valid SpeedyCard QR scanned:\n' + data);
    } else {
      alert('Invalid QR code. Only SpeedyCard QR codes are accepted.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to SpeedyCard</Text>
        <Text style={styles.subtitle}>Your Digital Card Solution</Text>

        <Text style={styles.description}>
          Create, manage, and share your digital business cards with ease.
        </Text>
      </View>
      {!user ? (
        <View style={styles.minicontainer}>
          <Link style={styles.button} href="/(auth)/login">
            Login
          </Link>
          <Link style={styles.button} href="/(auth)/register">
            Register
          </Link>
        </View>
      ) : (
        <View style={styles.minicontainer}>
          <Link style={styles.button} href="/(tabs)">
            Enter into the app
          </Link>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.white}>Scan QR</Text>
          </Pressable>
          <Pressable onPress={signOut} style={styles.button}><Text style={styles.white}>Signout</Text></Pressable>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            transparent={false}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#25292e' }}>
              <Text style={{ color: '#fff', marginBottom: 10 }}>Scan a SpeedyCard QR Code</Text>
              {hasPermission === null ? (
                <Text style={{ color: '#fff' }}>Requesting camera permission...</Text>
              ) : hasPermission === false ? (
                <Text style={{ color: '#fff' }}>No access to camera</Text>
              ) : (
                <CameraView
                  onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                  barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                  }}
                  style={{ width: 300, height: 300 }}
                />
              )}
              {scanned && (
                <Pressable
                  style={[styles.button, { marginTop: 20 }]}
                  onPress={() => setScanned(false)}
                >
                  <Text style={styles.white}>Tap to Scan Again</Text>
                </Pressable>
              )}
              <Pressable
                style={[styles.button, { marginTop: 20 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.white}>Close</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  content: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#e6e6e6',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#1f6feb',
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff'
  },
  minicontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
    width: '80%',
  },
  white: {
    color: '#fff',
  }
});