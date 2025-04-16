import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useCardContext } from './CardContext';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const CARD_ASPECT_RATIO = 1.586; // Standard business card ratio
const CARD_WIDTH = Dimensions.get('window').width - 32;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export function BusinessCardPreview() {
  const { cardData, isFlipped, toggleFlip } = useCardContext();

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: withSpring(isFlipped ? '180deg' : '0deg') },
    ],
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: withSpring(isFlipped ? '0deg' : '180deg') },
    ],
  }));

  const getTextStyle = (alignment: 'left' | 'right' | 'center') => {
    if (alignment === 'left') return styles.textLeft;
    if (alignment === 'right') return styles.textRight;
    return styles.textCenter;
  };

  const getAligment = (alignment: 'left' | 'right' | 'center') => {
    if (alignment === 'left') return styles.contentLeft;
    if (alignment === 'right') return styles.contentRight;
    return styles.contentCenter;
  };

  return (
    <TouchableOpacity onPress={toggleFlip} style={styles.container}>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <View style={[styles.cardContent, { backgroundColor: cardData.primaryColor }, getAligment(cardData.textAlignment || 'center')]}>
          {cardData.profileImage && (
            <Image
              source={{ uri: cardData.profileImage }}
              style={[styles.profileImage, getTextStyle(cardData.textAlignment || 'center')]}
            />
          )}
          <Text style={[styles.name, { fontFamily: cardData.font }, getTextStyle(cardData.textAlignment || 'center')]}>
            {cardData.name}
          </Text>
          <Text style={[styles.title, { fontFamily: cardData.font }, getTextStyle(cardData.textAlignment || 'center')]}>
            {cardData.title}
          </Text>
          <Text style={[styles.company, { fontFamily: cardData.font }, getTextStyle(cardData.textAlignment || 'center')]}>
            {cardData.company}
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <View style={[styles.cardContent, { backgroundColor: cardData.primaryColor }, getAligment(cardData.textAlignment || 'center')]}>
          {cardData.logo && (
            <Image
              source={{ uri: cardData.logo }}
              style={styles.logo}
            />
          )}
          <Text style={[styles.contactInfo, { fontFamily: cardData.font }]}>
            {cardData.email}
          </Text>
          <Text style={[styles.contactInfo, { fontFamily: cardData.font }]}>
            {cardData.phone}
          </Text>
          <Text style={[styles.contactInfo, { fontFamily: cardData.font }]}>
            {cardData.website}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 24,
    alignSelf: 'center',
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
    borderRadius: 8,
    elevation: 5,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
  },
  cardContent: {
    flex: 1,
    padding: 24,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    color: '#fff',
  },
  company: {
    fontSize: 18,
    marginBottom: 16,
    color: '#fff',
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 8,
    color: '#fff',
  },
  textLeft: {
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  textCenter: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  textRight: {
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  contentLeft: {
    alignItems: 'flex-start',
  },
  contentCenter: {
    alignItems: 'center',
  },
  contentRight: {
    alignItems: 'flex-end',
  },
});