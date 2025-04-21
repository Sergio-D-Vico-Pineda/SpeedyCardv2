import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useCardContext } from '@/contexts/CardContext';
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
  const { cardData } = useCardContext();
  const previewBgColor = isColorDark(cardData.bgcolor) ? '' : '#000';

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
  cardpreview: {
    width: '100%',
    borderRadius: 12,
  }
});