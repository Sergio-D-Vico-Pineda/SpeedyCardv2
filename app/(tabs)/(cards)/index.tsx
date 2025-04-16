import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BusinessCardEditor } from '@/components/business-card/BusinessCardEditor';
import { useSearchParams } from 'expo-router/build/hooks';
import type { MyCardData } from '@/types';

export default function EditScreen() {
  const params = useSearchParams();
  const userid = params.get('id');
  const [cardData, setCardData] = useState<MyCardData>();

  useEffect(() => {
    const fetchCardData = async () => {
      if (!userid) return;

      try {
        // const response = await fetch(`https://your-firebase-url.com/cards/${userid}`);
        // const data = await response.json();
        // setCardData(data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, [userid]);

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