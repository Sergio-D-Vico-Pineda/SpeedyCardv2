import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

const colorOptions = [
  '#1a365d', // Navy Blue
  '#2a4365', // Dark Blue
  '#2b6cb0', // Blue
  '#3182ce', // Medium Blue
  '#4299e1', // Light Blue
  '#63b3ed', // Sky Blue
  '#744210', // Brown
  '#975a16', // Dark Amber
  '#b7791f', // Amber
  '#d69e2e', // Yellow
  '#2f855a', // Dark Green
  '#38a169', // Green
  '#48bb78', // Light Green
  '#68d391', // Pale Green
  '#9b2c2c', // Dark Red
  '#c53030', // Red
  '#e53e3e', // Light Red
  '#fc8181', // Pale Red
  '#6b46c1', // Purple
  '#805ad5', // Medium Purple
  '#9f7aea', // Light Purple
  '#d53f8c', // Pink
  '#000000', // Black
  '#1a202c', // Dark Gray
  '#4a5568', // Gray
  '#718096', // Medium Gray
  '#a0aec0', // Light Gray
  '#e2e8f0', // Pale Gray
  '#ffffff', // White
];

export function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleColorSelect = (selectedColor: string) => {
    onColorChange(selectedColor);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Color</Text>
      <TouchableOpacity
        style={styles.colorPreview}
        onPress={() => setModalVisible(true)}
      >
        <View style={[styles.colorSwatch, { backgroundColor: color }]} />
        <Text style={styles.colorValue}>{color}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Color</Text>
            <ScrollView style={styles.colorGrid}>
              <View style={styles.colorList}>
                {colorOptions.map((colorOption) => (
                  <TouchableOpacity
                    key={colorOption}
                    style={[styles.colorOption, { backgroundColor: colorOption }]}
                    onPress={() => handleColorSelect(colorOption)}
                  >
                    {colorOption === color && <View style={styles.selectedIndicator} />}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
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
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorValue: {
    fontSize: 14,
    color: '#666',
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
  colorGrid: {
    maxHeight: 300,
    width: '100%',
  },
  colorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorOption: {
    width: 40,
    height: 40,
    margin: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#333',
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