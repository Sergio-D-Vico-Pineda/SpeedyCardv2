import { useEffect, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { defaultCardData, MyCardData } from '@/types';
import { AlignLeft, AlignCenter, AlignRight, Plus, RotateCcw, Home } from 'lucide-react-native';
import { useCardContext } from '@/contexts/CardContext';
import ColorPicker from '@/components/business-card/ColorPicker';
import FontPicker from '@/components/business-card/FontPicker';
import ImageUploader from '@/components/business-card/ImageUploader';
import { Picker } from '@react-native-picker/picker';
import { useCards } from '@/hooks/useCards';

export default function EditScreen() {
  const { userid, card = 0 } = useLocalSearchParams();
  const { cardData, updateCardData } = useCardContext();
  const { effects, fetchEffects, fetchSingleCard } = useCards();
  const nameInputRef = useRef<TextInput>(null);

  // Replace the existing useEffect for focus with useFocusEffect
  useFocusEffect(
    useCallback(() => {
      if (nameInputRef.current && cardData.tname === '') {
        nameInputRef.current.focus();
      }
    }, [cardData.tname])
  );

  // Replace the effects fetching useEffect with this:
  useEffect(() => {
    fetchEffects();
  }, [fetchEffects]);

  /* useEffect(() => {
    const fieldsToCheck: (keyof MyCardData)[] = [
      'tname', 'tjob', 'tbusiness', 'temail', 'tphone', 'twebsite'
    ];

    const anyFilled: boolean = fieldsToCheck.some(
      key => {
        if (cardData[key] && typeof cardData[key] === 'string') {
          return cardData[key].trim().length > 0;
        }
        return false;
      }
    );

    if (anyFilled) {
      // at least one TextInput has content
      console.log('some field is non-empty');
    } else {
      console.log('no fields are non-empty');
    }
  }, [cardData]); */

  const handleChange = (field: keyof MyCardData, value: string) => {
    updateCardData({ ...cardData, [field]: value });
  };

  const handleReset = () => {
    updateCardData(defaultCardData);
  };

  const goback = () => {
    console.log('resetting');
    router.dismissAll()
  };

  const alignmentOptions = [
    { value: 'left', icon: AlignLeft, label: 'Left' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'right', icon: AlignRight, label: 'Right' },
  ] as const;

  return (
    <SafeAreaView style={styles.topcontainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Card editor - {cardData.index === undefined ? 'New' : `Editing ${cardData.index}`}</Text>
        <TouchableOpacity onPress={goback}>
          <Home size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset}>
          {
            cardData.index !== undefined ? (
              <Plus size={24} color="#007AFF" />
            ) : (
              <RotateCcw size={24} color="#007AFF" />
            )
          }
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>'{userid}' - '{card}'</Text>
          <Text style={styles.sectionTitle}>Front</Text>
          <TextInput
            ref={nameInputRef}
            style={styles.input}
            value={cardData.tname}
            onChangeText={(value) => handleChange('tname', value)}
            placeholder="Full Name"
            placeholderTextColor="red"
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
          <Text style={styles.sectionTitle}>Back</Text>
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
          <ColorPicker
            font={true}
            color={cardData.color}
            onColorChange={(color: string) => handleChange('color', color)}
          />
          <FontPicker
            font={cardData.font}
            onFontChange={(font: string) => handleChange('font', font)}
          />
          <ImageUploader
            onImageSelect={(uri: string) => handleChange('ilogo', uri)}
            onProfileImageSelect={(uri: string) => handleChange('iprofile', uri)}
          />
          {effects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Effect</Text>
              <Picker
                selectedValue={cardData.effect || ''}
                onValueChange={(value: string) => handleChange('effect', value)}
              >
                <Picker.Item enabled={false} label="Select an effect" value="" />
                {effects.map(eff => (
                  <Picker.Item key={eff} label={eff} value={eff} />
                ))}
              </Picker>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topcontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    paddingInline: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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