import { View, StyleSheet } from 'react-native';
import { BusinessCardPreview } from '@/components/business-card/BusinessCardPreview';

export default function PreviewScreen() {
  return (
    <View style={styles.container}>
      <BusinessCardPreview />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});