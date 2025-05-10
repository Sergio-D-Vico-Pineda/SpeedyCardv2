import { useState } from 'react';
import { useCardContext } from '@/contexts/CardContext';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useCards } from '@/hooks/useCards';
import { defaultCardData } from '@/types';

export default function BusinessCardSave() {
  const { cardData, updateCardData } = useCardContext();
  const { saveCardToFirestore } = useCards();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {
        saving ? (
          <View style={[styles.loadingContainer, styles.button]}>
            <ActivityIndicator size="small" color="#ffffff" style={styles.loadingIndicator} />
            <Text style={[styles.buttonText, styles.loadingText]}>Saving...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={saveInFirestore}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              Save Card
            </Text>
          </TouchableOpacity>
        )
      }
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
  loadingContainer: {
    backgroundColor: '#4299e1',
    flexDirection: 'row',
    gap: 8
  },
  loadingIndicator: {
    marginRight: 8
  },
  loadingText: {
    marginLeft: 8
  }
});