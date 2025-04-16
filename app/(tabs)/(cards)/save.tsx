import { View, StyleSheet } from 'react-native';
import { BusinessCardSave } from '@/components/business-card/BusinessCardSave';
import { BusinessCardPreview } from '@/components/business-card/BusinessCardPreview';

export default function SaveScreen() {
  return (
    <View style={styles.container}>
      <BusinessCardPreview />
      <BusinessCardSave />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});