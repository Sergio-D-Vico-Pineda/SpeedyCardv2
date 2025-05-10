import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSequence,
    withTiming,
    withRepeat,
    useSharedValue,
    withDelay,
} from 'react-native-reanimated';

const NUM_STARS = 15;

export function Stars() {
    const stars = Array.from({ length: NUM_STARS }, (_, i) => {
        const scale = useSharedValue(0);
        const opacity = useSharedValue(0);
        const translateX = useSharedValue(0);
        const translateY = useSharedValue(0);

        useEffect(() => {
            const delay = i * 200;
            translateX.value = Math.random() * 300 - 150;
            translateY.value = Math.random() * 300 - 150;

            scale.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(1, { duration: 500 }),
                        withTiming(0.5, { duration: 500 }),
                        withTiming(1, { duration: 500 })
                    ),
                    -1,
                    true
                )
            );

            opacity.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(1, { duration: 1000 }),
                        withTiming(0.3, { duration: 1000 })
                    ),
                    -1,
                    true
                )
            );
        }, []);

        const starStyle = useAnimatedStyle(() => ({
            transform: [
                { scale: scale.value },
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
            opacity: opacity.value,
        }));

        return (
            <Animated.View key={i} style={[styles.star, starStyle]} />
        );
    });

    return (
        <View style={styles.container}>
            {stars}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    star: {
        position: 'absolute',
        width: 4,
        height: 4,
        backgroundColor: '#FFD700',
        borderRadius: 2,
    },
});