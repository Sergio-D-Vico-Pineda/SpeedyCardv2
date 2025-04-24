import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { useCardContext } from '@/contexts/CardContext';
import { useCards } from '@/hooks/useCards';
import { defaultCardData } from '@/types';
import { documentDirectory, writeAsStringAsync } from 'expo-file-system';
import { isAvailableAsync, shareAsync } from 'expo-sharing';

export default function BusinessCardSave() {
  const { cardData, updateCardData } = useCardContext();
  const { saveCardToFirestore } = useCards();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveCardinLocal = async () => {
    setError(null);
    try {
      setSaving(true);
      // Save card data to local storage
      const fileName = `card_${Date.now()}.json`;
      const filePath = `${documentDirectory}${fileName}`;
      await writeAsStringAsync(filePath, JSON.stringify(cardData));

      // Share the card
      if (await isAvailableAsync()) {
        await shareAsync(filePath);
      }
    } catch (error) {
      console.error('Error saving card:', error);
      setError((error as Error).message || String(error));
    } finally {
      setSaving(false);
    }
  };

  const saveInFirestore = async () => {
    setError(null);
    try {
      console.log('Saving card...');
      setSaving(true);
      await saveCardToFirestore(cardData);
      updateCardData(defaultCardData);
    } catch (error) {
      console.error('Error saving card in Firestore:', error);
      setError((error as Error).message || String(error));
    } finally {
      if (!error) {
        console.log('Card saved successfully.');
      }
      setSaving(false);
    }
  };

  const shareCard = async () => {
    try {
      const result = await Share.share({
        message: `${cardData.tname}\n${cardData.tjob}\n${cardData.tbusiness}\n${cardData.temail}\n${cardData.tphone}\n${cardData.twebsite}`,
        title: 'Business Card',
      });
    } catch (error) {
      console.error('Error sharing card:', error);
    }
  };

  const shareCardUrl = async () => {
    try {
      // const url = await generateCardUrl(cardData);
      await Share.share({
        message: 'to be done',
        title: 'Business Card URL',
      });
    } catch (error) {
      console.error('Error sharing card URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={saveCardinLocal}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Saving...' : 'Save Card'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={saveInFirestore}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? 'Saving...' : 'Save Card to Firestore'}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[styles.button, styles.shareButton]}
        onPress={shareCard}
      >
        <Text style={styles.buttonText}>Share Card</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        style={[styles.button, styles.urlButton]}
        onPress={shareCardUrl}
      >
        <Text style={styles.buttonText}>Share URL</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#4299e1',
  },
  shareButton: {
    backgroundColor: '#48bb78',
  },
  urlButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});