import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';

export default function About() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/react-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>About SpeedyCard</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Our Mission</Text>
                <Text style={styles.text}>
                    SpeedyCard is dedicated to providing fast and efficient card management solutions.
                    We strive to make digital card organization simple and accessible for everyone.
                </Text>

                <Text style={styles.sectionTitle}>Features</Text>
                <Text style={styles.text}>
                    • Quick card scanning{'\n'}
                    • Secure storage{'\n'}
                    • Easy organization{'\n'}
                    • Cross-platform sync
                </Text>

                <Text style={styles.sectionTitle}>Contact Us</Text>
                <Text style={styles.text}>
                    Email: support@speedycard.com{'\n'}
                    Phone: (555) 123-4567
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        marginBottom: 15,
    },
});
