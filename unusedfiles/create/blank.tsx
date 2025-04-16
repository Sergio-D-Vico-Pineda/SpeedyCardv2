import { View, Text, StyleSheet } from 'react-native';

export default function BlankCardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create a card from scratch</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
});