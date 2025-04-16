import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageUploaderProps {
  onImageSelect: (uri: string) => void;
  onProfileImageSelect: (uri: string) => void;
}

export function ImageUploader({ onImageSelect, onProfileImageSelect }: ImageUploaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState<'logo' | 'profile'>('logo');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const openImagePicker = async (mode: 'logo' | 'profile') => {
    setCurrentMode(mode);
    setModalVisible(true);
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;

        if (currentMode === 'logo') {
          setLogoImage(selectedImageUri);
          onImageSelect(selectedImageUri);
        } else {
          setProfileImage(selectedImageUri);
          onProfileImageSelect(selectedImageUri);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setModalVisible(false);
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera is required!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;

        if (currentMode === 'logo') {
          setLogoImage(selectedImageUri);
          onImageSelect(selectedImageUri);
        } else {
          setProfileImage(selectedImageUri);
          onProfileImageSelect(selectedImageUri);
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Images</Text>

      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Logo</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => openImagePicker('logo')}
          >
            {logoImage ? (
              <Image source={{ uri: logoImage }} style={styles.previewImage} />
            ) : (
              <Text style={styles.uploadText}>Upload Logo</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Profile Photo</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => openImagePicker('profile')}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.previewImage} />
            ) : (
              <Text style={styles.uploadText}>Upload Photo</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentMode === 'logo' ? 'Upload Logo' : 'Upload Profile Photo'}
            </Text>

            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Text style={styles.modalButtonText}>Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    marginBottom: 12,
    color: '#333',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
  },
  imageLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  imageButton: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadText: {
    color: '#666',
    fontSize: 14,
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
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#4299e1',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cancelButtonText: {
    color: '#4a5568',
    fontWeight: 'bold',
    fontSize: 16,
  },
});