import { Link } from 'expo-router';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import ScanQRModal from '@/modals/scanqr';

export default function Index() {
  const { user, signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to SpeedyCard</Text>
        <Text style={styles.subtitle}>Your Digital Card Solution</Text>
        <Text style={styles.description}>Create, manage, and share your digital business cards with ease.</Text>
      </View>
      <View style={styles.minicontainer}>
        {!user ? (
          <>
            <Link style={styles.button} href="/(auth)/login">
              Login
            </Link>
            <Link style={styles.button} href="/(auth)/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link style={styles.button} href="/(tabs)">
              Enter into the app
            </Link>
            <Pressable onPress={signOut} style={styles.button}>
              <Text style={styles.white}>Signout</Text>
            </Pressable>
          </>
        )}
        <Pressable
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.white}>Scan QR</Text>
        </Pressable>
        <Link style={styles.button} href="/view?userid=sb1OHT4sN1aacyLzvCk7nXZhBLb2&card=1">
          View a card
        </Link>
        <ScanQRModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
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
    color: '#fff',
  },
  content: {
    flex: 0.55,
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
    color: '#fff',
  },
  minicontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 12,
    width: '80%',
  },
  white: {
    color: '#fff',
  }
});