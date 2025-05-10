import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useCardContext } from '@/contexts/CardContext';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { fontMap, MyCardData } from '@/types';
import { CardEffects } from './effects';

const CARD_ASPECT_RATIO = 1.586; // Standard business card ratio
const CARD_WIDTH = Dimensions.get('window').width - 32;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export default function BusinessCardPreview({ localCardData }: { localCardData?: MyCardData }) {
  // Move all hooks to the top level
  const { isFlipped, toggleFlip, cardData: contextCardData } = useCardContext();

  const cardData = localCardData || contextCardData;

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

  const getAligment = (alignment: 'left' | 'right' | 'center') => {
    if (alignment === 'left') return styles.contentLeft;
    if (alignment === 'right') return styles.contentRight;
    return styles.contentCenter;
  };

  const renderFrontContent = () => {
    switch (cardData.style) {
      case 'minimalist':
        return (
          <>
            {cardData.iprofile ? (
              <View style={styles.minimalistHeader}>
                <Image
                  source={{ uri: cardData.iprofile }}
                  style={styles.minimalistProfile}
                />
              </View>
            ) : null}
            <View style={styles.minimalistInfo}>
              <Text style={[styles.name, { fontFamily: fontMap[cardData.font], color: cardData.color }, styles.minimalistText]}>{cardData.tname}</Text>
              <Text style={[styles.title, { fontFamily: fontMap[cardData.font], color: cardData.color }, styles.minimalistText]}>{cardData.tjob}</Text>
              <Text style={[styles.company, { fontFamily: fontMap[cardData.font], color: cardData.color }, styles.minimalistText]}>{cardData.tbusiness}</Text>
            </View>
          </>
        );
      case 'modern':
        return (
          <>
            <View style={styles.modernHeader}>
              <Text style={[styles.modernName, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>
                {cardData.tname}
              </Text>
              {cardData.iprofile ? (
                <Image
                  source={{ uri: cardData.iprofile }}
                  style={styles.modernProfile}
                />
              ) : null}
            </View>
            <View style={styles.modernInfo}>
              <Text style={[styles.modernTitle, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.tjob}</Text>
              <Text style={[styles.modernCompany, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.tbusiness}</Text>
            </View>
          </>
        );
      default:
        return (
          <View style={styles.defaultContent}>
            {cardData.iprofile ? (
              <Image
                source={{ uri: cardData.iprofile }}
                style={styles.profileImage}
              />
            ) : null}
            <Text style={[styles.name, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.tname}</Text>
            <Text style={[styles.title, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.tjob}</Text>
            <Text style={[styles.company, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.tbusiness}</Text>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity onPress={toggleFlip} style={styles.container}>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <CardEffects effect={cardData.effect}>
          <View style={[styles.cardContent, { backgroundColor: cardData.bgcolor }]}>
            {renderFrontContent()}
          </View>
        </CardEffects>
      </Animated.View>

      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <CardEffects effect={cardData.effect}>
          <View style={[styles.cardContent, { backgroundColor: cardData.bgcolor }, getAligment(cardData.align || 'center')]}>
            {cardData.ilogo ? (
              <View>
                <Image
                  source={{ uri: cardData.ilogo }}
                  style={styles.logo}
                />
              </View>
            ) : null}
            <Text style={[styles.contactInfo, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.temail}</Text>
            <Text style={[styles.contactInfo, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.tphone}</Text>
            <Text style={[styles.contactInfo, { fontFamily: fontMap[cardData.font], color: cardData.color }]}>{cardData.twebsite}</Text>
          </View>
        </CardEffects>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 14,
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
    transform: 'rotateY(180deg)',
  },
  cardContent: {
    flex: 1,
    padding: 24,
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
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  company: {
    fontSize: 18,
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 8,
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
  minimalistContent: {
    padding: 32,
    flexDirection: 'column',
    alignItems: 'flex-end', // Changed to align content to the right
  },
  minimalistHeader: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'flex-end', // Changed to align profile image to the right
  },
  minimalistProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  minimalistInfo: {
    alignItems: 'flex-end', // Changed to align text to the right
    width: '100%',
  },
  minimalistText: {
    textAlign: 'right', // Added to ensure text alignment is right
  },
  // Default style updates
  defaultContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  // Modern style updates
  modernContent: {
    padding: 24,
    flex: 1,
  },
  modernHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  modernProfile: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  modernInfo: {
    alignItems: 'flex-start',
    width: '100%',
  },
  modernName: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  modernTitle: {
    fontSize: 18,
    marginBottom: 8,
    opacity: 0.9,
  },
  modernCompany: {
    fontSize: 16,
    opacity: 0.8,
  },
});