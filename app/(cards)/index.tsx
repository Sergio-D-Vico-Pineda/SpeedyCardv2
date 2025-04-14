import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BusinessCardEditor } from '@/components/business-card/BusinessCardEditor';

export default function EditScreen() {
  return (
    <View style={styles.container}>
      <BusinessCardEditor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});