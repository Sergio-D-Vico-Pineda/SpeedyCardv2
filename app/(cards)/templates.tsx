import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BusinessCardTemplate } from '@/components/business-card/BusinessCardTemplate';

export default function TemplatesScreen() {
  return (
    <View style={styles.container}>
      <BusinessCardTemplate />
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