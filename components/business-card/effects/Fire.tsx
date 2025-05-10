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

const NUM_PARTICLES = 20;

export function Fire() {
    const particles = Array.from({ length: NUM_PARTICLES }, (_, i) => {
        const translateY = useSharedValue(0);
        const translateX = useSharedValue(0);
        const scale = useSharedValue(1);
        const opacity = useSharedValue(0.8);

        useEffect(() => {
            const delay = i * 100;
            const startX = Math.random() * 40 - 20;

            translateY.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(-50, { duration: 1000 }),
                        withTiming(-100, { duration: 1000 })
                    ),
                    -1
                )
            );

            translateX.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(startX - 5, { duration: 1000 }),
                        withTiming(startX + 5, { duration: 1000 })
                    ),
                    -1
                )
            );

            scale.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(0.8, { duration: 1000 }),
                        withTiming(0.4, { duration: 1000 })
                    ),
                    -1
                )
            );

            opacity.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(0.8, { duration: 500 }),
                        withTiming(0, { duration: 500 })
                    ),
                    -1
                )
            );
        }, []);

        const particleStyle = useAnimatedStyle(() => ({
            transform: [
                { translateY: translateY.value },
                { translateX: translateX.value },
                { scale: scale.value },
            ],
            opacity: opacity.value,
        }));

        return (
            <Animated.View key={i} style={[styles.particle, particleStyle]} />
        );
    });

    return (
        <View style={styles.container}>
            {particles}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    particle: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: '#FF4500',
        borderRadius: 5,
        bottom: -5,
    },
});