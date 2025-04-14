import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home screen</Text>
      <Link style={styles.button} href="/(cards)">
        Enter into the app
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    padding: 10,
    backgroundColor: '#1f6feb',
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
  },
});