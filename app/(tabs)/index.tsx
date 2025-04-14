import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function WelcomePage() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/react-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Welcome to SpeedyCard</Text>
                <Text style={styles.subtitle}>Your Digital Card Solution</Text>

                <Text style={styles.description}>
                    Create, manage, and share your digital business cards with ease.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    content: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        color: '#666666',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
