import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export function Sparkle() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800 }),
        withTiming(0.8, { duration: 800 })
      ),
      -1,
      true
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.4, { duration: 800 })
      ),
      -1,
      true
    );

    return () => {
      scale.value = 0;
      opacity.value = 0;
    };
  }, []);

  const sparkleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sparkle, sparkleStyle]}>
        <LinearGradient
          colors={['rgba(255, 215, 0, 0)', 'rgba(255, 215, 0, 0.1)', 'rgba(255, 215, 0, 0.6)', 'rgba(255, 215, 0, 1)']}
          style={styles.gradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  sparkle: {
    position: 'absolute',
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 45,
    right: -30,
    bottom: -30,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
});