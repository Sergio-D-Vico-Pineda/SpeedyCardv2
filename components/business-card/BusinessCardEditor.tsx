import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MyCardData } from '@/types';
import { ColorPicker } from './ColorPicker';
import { FontPicker } from './FontPicker';
import { ImageUploader } from './ImageUploader';
import { useCardContext } from '@/contexts/CardContext';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react-native';

export function BusinessCardEditor(filleddata: MyCardData | Object | null = null) {
  const { cardData, updateCardData } = useCardContext();

  const handleChange = (field: keyof MyCardData, value: string) => {
    updateCardData({ ...cardData, [field]: value });
  };

  const alignmentOptions = [
    { value: 'left', icon: AlignLeft, label: 'Left' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'right', icon: AlignRight, label: 'Right' },
  ] as const;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          value={cardData.tname}
          onChangeText={(value) => handleChange('tname', value)}
          placeholder="Full Name"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          value={cardData.tjob}
          onChangeText={(value) => handleChange('tjob', value)}
          placeholder="Job Title"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          value={cardData.tbusiness}
          onChangeText={(value) => handleChange('tbusiness', value)}
          placeholder="Company"
          placeholderTextColor="#666"
        />
      </View>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          value={cardData.temail}
          onChangeText={(value) => handleChange('temail', value)}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          value={cardData.tphone}
          onChangeText={(value) => handleChange('tphone', value)}
          placeholder="Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          value={cardData.twebsite}
          onChangeText={(value) => handleChange('twebsite', value)}
          placeholder="Website"
          keyboardType="url"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Alignment</Text>
        <View style={styles.alignmentContainer}>
          {alignmentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.alignmentButton,
                  cardData.align === option.value && styles.alignmentButtonActive,
                ]}
                onPress={() => handleChange('align', option.value)}
              >
                <Text>
                  <Icon
                    size={24}
                    color={cardData.align === option.value ? '#fff' : '#000'}
                  />
                </Text>
                <Text
                  style={[
                    styles.alignmentText,
                    cardData.align === option.value && styles.alignmentTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <ColorPicker
          color={cardData.bgcolor}
          onColorChange={(color: string) => handleChange('bgcolor', color)}
        />
        <FontPicker
          font={cardData.font}
          onFontChange={(font: string) => handleChange('font', font)}
        />
        <ImageUploader
          onImageSelect={(uri: string) => handleChange('ilogo', uri)}
          onProfileImageSelect={(uri: string) => handleChange('iprofile', uri)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  alignmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  alignmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  alignmentButtonActive: {
    backgroundColor: '#1a365d',
  },
  alignmentText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  alignmentTextActive: {
    color: '#fff',
  },
});