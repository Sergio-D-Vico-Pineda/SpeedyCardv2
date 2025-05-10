import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';

const NUM_SPARKLES = 12;

export function Sparkle() {
  const sparkles = Array.from({ length: NUM_SPARKLES }, (_, i) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const rotate = useSharedValue(0);

    useEffect(() => {
      const delay = i * 300;
      const randomX = Math.random() * 300 - 150;
      const randomY = Math.random() * 300 - 150;

      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0, { duration: 400 })
          ),
          -1
        )
      );

      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0, { duration: 400 })
          ),
          -1
        )
      );

      rotate.value = withDelay(
        delay,
        withRepeat(
          withTiming(360, { duration: 1000 }),
          -1
        )
      );

      return () => {
        scale.value = 0;
        opacity.value = 0;
        rotate.value = 0;
      };
    }, []);

    const sparkleStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
        { translateX: Math.random() * 300 - 150 },
        { translateY: Math.random() * 300 - 150 },
      ],
      opacity: opacity.value,
    }));

    return (
      <Animated.View key={i} style={[styles.sparkle, sparkleStyle]} />
    );
  });

  return (
    <View style={styles.container}>
      {sparkles}
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
    width: 10,
    height: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
});