import { Link } from 'expo-router';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/react-logo.png')}
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
          <Link style={styles.button} href="/view?userid=sb1OHT4sN1aacyLzvCk7nXZhBLb2&card=1">
            View a card
          </Link>
          <Pressable onPress={signOut} style={styles.button}><Text style={styles.white}>Signout</Text></Pressable>
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