import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { fonts } from '@/types'; // Import your font options from FontOptions.tsx or where they are defined

interface FontPickerProps {
  font: string;
  onFontChange: (font: string) => void;
}

export default function FontPicker({ font, onFontChange }: FontPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleFontSelect = (selectedFont: string) => {
    onFontChange(selectedFont);
    setModalVisible(false);
  };

  const renderFontItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.fontItem, font === item && styles.selectedFont]}
      onPress={() => handleFontSelect(item)}
    >
      <Text style={[styles.fontText, { fontFamily: item }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Font</Text>
      <TouchableOpacity
        style={styles.fontPreview}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.fontPreviewText, { fontFamily: font }]}>{font}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Font</Text>
            <FlatList
              data={fonts}
              renderItem={renderFontItem}
              keyExtractor={(item) => item}
              style={styles.fontList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  fontPreview: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  fontPreviewText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  fontList: {
    width: '100%',
    maxHeight: 300,
  },
  fontItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  selectedFont: {
    backgroundColor: '#e6f7ff',
  },
  fontText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4299e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});