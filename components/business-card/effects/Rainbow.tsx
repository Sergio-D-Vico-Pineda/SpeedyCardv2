import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withTiming,
    useSharedValue,
    withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export function Rainbow() {
    const rotation = useSharedValue(0);
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 6000 }),
            -1
        );

        opacity.value = withRepeat(
            withSequence(
                withTiming(0.5, { duration: 2000 }),
                withTiming(0.3, { duration: 2000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
        opacity: opacity.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.gradientContainer, animatedStyle]}>
                <LinearGradient
                    colors={[
                        '#FF0000',
                        '#FF7F00',
                        '#FFFF00',
                        '#00FF00',
                        '#0000FF',
                        '#4B0082',
                        '#8B00FF',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
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
    gradientContainer: {
        position: 'absolute',
        width: '200%',
        height: '200%',
        top: '-50%',
        left: '-50%',
    },
    gradient: {
        flex: 1,
    },
});