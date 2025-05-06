import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { effects } from '@/types';

interface EffectPickerProps {
  effect: string | undefined;
  onEffectChange: (effect: string | undefined) => void;
}

export default function EffectPicker({ effect, onEffectChange }: EffectPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEffectSelect = (selectedEffect: string | undefined) => {
    onEffectChange(selectedEffect);
    setModalVisible(false);
  };

  const renderEffectItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={[styles.effectItem, effect === item && styles.selectedeffect]}
        onPress={() => handleEffectSelect(item)}
      >
        <Text style={styles.effectText}>{item}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card effect</Text>
      <TouchableOpacity
        style={styles.effectPreview}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.effectPreviewText}>{effect || 'No effect'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Effect</Text>
            <TouchableOpacity
              style={[styles.effectItem, !effect && styles.selectedeffect]}
              onPress={() => handleEffectSelect(undefined)}
            >
              <Text style={styles.effectText}>No effect</Text>
            </TouchableOpacity>
            <FlatList
              data={effects}
              renderItem={renderEffectItem}
              keyExtractor={(item) => item}
              style={styles.effectList}
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
  effectPreview: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  effectPreviewText: {
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
  effectList: {
    width: '100%',
    maxHeight: 300,
  },
  effectItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  selectedeffect: {
    backgroundColor: '#e6f7ff',
  },
  effectText: {
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