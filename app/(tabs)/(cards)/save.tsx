import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useCardContext } from '@/contexts/CardContext';
import { useEffect } from 'react';
import { useCards } from '@/hooks/useCards';
import BusinessCardSave from '@/components/business-card/BusinessCardSave';
import BusinessCardPreview from '@/components/business-card/BusinessCardPreview';

const isColorDark = (hex: string): boolean => {
  let c = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  if (c.length === 3) {
    c = c.split('').map(ch => ch + ch).join('');
  }
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness < 186;
};

export default function SaveScreen() {
  const { cardData, changeDatainCard } = useCardContext();
  const previewBgColor = isColorDark(cardData.bgcolor) ? '' : '#000';
  const { cstyles, fetchStyles } = useCards();

  useEffect(() => {
    fetchStyles();
  }, [fetchStyles]);

  return (
    <SafeAreaView style={styles.topcontainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{cardData.index === undefined ? 'New' : `Editing ${cardData.index}`}</Text>
      </View>
      <View style={styles.container}>
        {
          cardData.tname ? (
            <>
              <View style={[styles.cardpreview, { backgroundColor: previewBgColor }]}>
                <BusinessCardPreview />
              </View>
              <BusinessCardSave />
              <Text style={styles.subtitle}>
                Choose a template
              </Text>
              <ScrollView horizontal contentContainerStyle={styles.contenttemplatecontainer} style={styles.templateContainer}>
                {cstyles.map((template) => (
                  <TouchableOpacity
                    key={template.id}
                    style={styles.templateButton}
                    onPress={() => changeDatainCard('style', template.id)}
                  >
                    <View
                      style={[
                        styles.templatePreview,
                        { backgroundColor: template.layout.bgcolor },
                      ]}
                    >
                      <Text style={styles.templateName}>
                        {template.id}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            <Text>
              Please type your name at least
            </Text>
          )
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topcontainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 6,
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
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardpreview: {
    width: '103%',
    /* borderRadius: 12, */
  },
  contenttemplatecontainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateContainer: {
    marginTop: 8,
    flexGrow: 0,
    width: '90%'
  },
  templateButton: {
    marginBottom: 16,
  },
  templatePreview: {
    width: 160,
    aspectRatio: 16 / 9,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});