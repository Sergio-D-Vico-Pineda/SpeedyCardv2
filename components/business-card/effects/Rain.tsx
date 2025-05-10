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

const NUM_DROPS = 20;

export function Rain() {
  const drops = Array.from({ length: NUM_DROPS }, (_, i) => {
    const translateY = useSharedValue(-10);
    const translateX = useSharedValue(Math.random() * 300);
    const opacity = useSharedValue(0.7);

    useEffect(() => {
      const delay = i * 200;
      translateY.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(-10, { duration: 0 }),
            withTiming(400, { duration: 2000 })
          ),
          -1
        )
      );

      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(0.7, { duration: 0 }),
            withTiming(0, { duration: 2000 })
          ),
          -1
        )
      );

      return () => {
        translateY.value = -10;
        opacity.value = 0;
      };
    }, []);

    const dropStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
      opacity: opacity.value,
    }));

    return (
      <Animated.View key={i} style={[styles.drop, dropStyle]} />
    );
  });

  return (
    <View style={styles.container}>
      {drops}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  drop: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 1,
  },
});