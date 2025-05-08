import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type BusinessCardProps = {
  orientation: 'landscape' | 'portrait';
  children: React.ReactNode;
  style?: any;
};

export default function BusinessCard({ orientation, children, style }: BusinessCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 32, orientation === 'landscape' ? 350 : 200);
  const cardHeight = orientation === 'landscape' ? cardWidth * 0.571 : cardWidth * 1.75;

  return (
    <View style={[styles.cardContainer, { width: cardWidth, height: cardHeight }, style]}>
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
});