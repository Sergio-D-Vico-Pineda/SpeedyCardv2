# Commands
npx expo prebuild --clean

# Accounts
- scarpy@gmail.com
- scarpy1@gmail.com
- servicpin2@alu.edu.gva.es

# Packages
i could remove the following packages:
- expo-sharing | removed

# Plans
- Free
 - Up to 3 cards
 - Up to 5 saved cards
- Pro
 - Up to 10 cards
 - Up to 15 saved cards
- Premium
 - Up to 20 cards
 - Up to 25 saved cards
- Ultimate
 - Unlimited cards
 - Unlimited saved cards

 // Using expo-image-picker or expo-media-library as an example
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

async function requestMediaPermissions() {
  // For Media Library (broader access)
  const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
  if (mediaLibraryStatus !== 'granted') {
    alert('Sorry, we need media library permissions to make this work!');
    return false;
  }

  // For Image Picker (access to gallery/camera)
  const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (cameraRollStatus !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
    return false;
  }
  return true;
}

async function openImagePicker() {
  const hasPermissions = await requestMediaPermissions();
  if (!hasPermissions) return;

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
    // Use the image URI
  }
}