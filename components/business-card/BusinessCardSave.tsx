import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { useCardContext } from '@/contexts/CardContext';
import { useAuth } from '@/contexts/AuthContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { generateCardUrl } from '@/utils/cardUrl';
import { db } from '@/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { defaultCardData } from '@/types';

export function BusinessCardSave() {
  const { user } = useAuth();
  const { cardData } = useCardContext();
  const [saving, setSaving] = useState(false);

  const saveCard = async () => {
    try {
      setSaving(true);
      // Save card data to local storage
      const fileName = `card_${Date.now()}.json`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(cardData));

      // Share the card
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath);
      }
    } catch (error) {
      console.error('Error saving card:', error);
    } finally {
      setSaving(false);
    }
  };

  const saveInFirestore = async () => {
    const index = Number(cardData.index);
    try {
      setSaving(true);
      if (!user) {
        console.error('User not authenticated');
        return
      }
      /* -------------- */
      const cardsCollection = collection(db, 'users');










      /* -------------- */
      console.log("cardData.index: " + cardData.index)
      delete cardData.index;

      const cardsRef = doc(db, 'cards', user.uid);
      const cardsDoc = await getDoc(cardsRef);
      console.log('-----------------------');
      console.log('Cloud');
      console.log(index);
      if (!isNaN(index)) {
        console.log(cardsDoc.data()?.cards[index]);
      }
      console.log('Local');
      console.log(cardData);
      // await setDoc(doc(db, 'cards', user.uid), defaultCardData);
      // await setDoc(docRef, cardData);
    } catch (error) {
      console.error('Error saving card in Firestore:', error);
    } finally {
      cardData.index = index;
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
      const url = await generateCardUrl(cardData);
      await Share.share({
        message: url,
        title: 'Business Card URL',
      });
    } catch (error) {
      console.error('Error sharing card URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={saveCard}
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
});