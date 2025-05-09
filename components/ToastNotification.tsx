import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { FC, useEffect, useRef } from 'react';
import { X } from 'lucide-react-native';
import { useToast } from '@/contexts/ToastContext';

interface ToastNotificationProps {
    position?: 'top' | 'bottom';
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ToastNotification: FC<ToastNotificationProps> = ({ position = 'bottom' }) => {
    const { visible, message, type, hideToast } = useToast();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Auto dismiss after 5 seconds
            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    hideToast();
                });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [visible, fadeAnim, hideToast]);

    if (!visible) return null;

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return '#4CAF50';
            case 'error':
                return '#F44336';
            default:
                return '#2196F3';
        }
    };

    return (
        <View
            pointerEvents="box-none"
            style={[
                styles.container,
                position === 'bottom' ? styles.bottomContainer : styles.topContainer
            ]}
        >
            <Animated.View
                style={[
                    styles.toast,
                    { backgroundColor: getBackgroundColor() },
                    { opacity: fadeAnim },
                    {
                        transform: [{
                            translateY: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [position === 'bottom' ? 20 : -20, 0]
                            })
                        }]
                    }
                ]}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity onPress={hideToast} style={styles.dismissButton}>
                        <Text style={styles.dismissButtonText}><X color={"black"} size={14} /></Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999
    },
    topContainer: {
        top: 50,
        // top: SCREEN_HEIGHT * 0.1,
    },
    bottomContainer: {
        bottom: 100,
        // bottom: SCREEN_HEIGHT * 0.1,
    },
    toast: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 200,
        maxWidth: '80%',
        boxShadow: '0 2px 3.84px rgba(0, 0, 0, 0.25)',
        elevation: 5,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    message: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
        marginRight: 8,
    },
    dismissButton: {
        padding: 4,
    },
    dismissButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ToastNotification;