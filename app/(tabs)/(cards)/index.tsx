import { useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { defaultCardData } from '@/types';
import { AlignLeft, AlignCenter, AlignRight, Plus, RotateCcw } from 'lucide-react-native';
import { useCardContext } from '@/contexts/CardContext';
import { useCards } from '@/hooks/useCards';
import ColorPicker from '@/components/business-card/ColorPicker';
import FontPicker from '@/components/business-card/FontPicker';
import EffectPicker from '@/components/business-card/EffectPicker';
import ImageUploader from '@/components/business-card/ImageUploader';

export default function EditScreen() {
  const { cardData, updateCardData, changeDatainCard } = useCardContext();
  const { effects, fetchEffects } = useCards();
  const nameInputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      if (nameInputRef.current && cardData.tname === '') {
        nameInputRef.current.focus();
      }
      fetchEffects();
    }, [cardData.tname, fetchEffects])
  );

  const handleReset = () => {
    updateCardData(defaultCardData);
  };

  const alignmentOptions = [
    { value: 'left', icon: AlignLeft, label: 'Left' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'right', icon: AlignRight, label: 'Right' },
  ] as const;

  return (
    <SafeAreaView style={styles.topcontainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{cardData.index === undefined ? 'New Card' : `Editing Card ${cardData.index}`}</Text>
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
          <Text style={styles.sectionTitle}>Front</Text>
          <TextInput
            ref={nameInputRef}
            style={styles.input}
            value={cardData.tname}
            onChangeText={(value) => changeDatainCard('tname', value)}
            placeholder="Full Name"
            placeholderTextColor="red"
          />
          <TextInput
            style={styles.input}
            value={cardData.tjob}
            onChangeText={(value) => changeDatainCard('tjob', value)}
            placeholder="Job Title"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={cardData.tbusiness}
            onChangeText={(value) => changeDatainCard('tbusiness', value)}
            placeholder="Company"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Back</Text>
          <TextInput
            style={styles.input}
            value={cardData.temail}
            onChangeText={(value) => changeDatainCard('temail', value)}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={cardData.tphone}
            onChangeText={(value) => changeDatainCard('tphone', value)}
            placeholder="Phone"
            keyboardType="phone-pad"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            value={cardData.twebsite}
            onChangeText={(value) => changeDatainCard('twebsite', value)}
            placeholder="Website"
            keyboardType="url"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Back Alignment</Text>
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
                  onPress={() => changeDatainCard('align', option.value)}
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

        <View style={styles.section2}>
          <ColorPicker
            color={cardData.bgcolor}
            onColorChange={(color: string) => changeDatainCard('bgcolor', color)}
          />
          <ColorPicker
            font={true}
            color={cardData.color}
            onColorChange={(color: string) => changeDatainCard('color', color)}
          />
        </View>

        <View style={styles.section}>
          <FontPicker
            font={cardData.font}
            onFontChange={(font: string) => changeDatainCard('font', font)}
          />
          <ImageUploader
            onImageSelect={(uri: string) => changeDatainCard('ilogo', uri)}
            onProfileImageSelect={(uri: string) => changeDatainCard('iprofile', uri)}
          />
          {effects.length > 0 && (
            <EffectPicker
              effect={cardData.effect}
              onEffectChange={(effect: string | undefined) => changeDatainCard('effect', effect)}
              effectList={effects}
            />
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
  section2: {
    columnGap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: 16,
    // marginBottom: 5,
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