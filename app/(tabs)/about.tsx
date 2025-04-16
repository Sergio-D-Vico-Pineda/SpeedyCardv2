import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

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
                    SpeedyCard is dedicated to providing fast and efficient card management solutions.{'\n'}
                    We strive to make digital card organization simple and accessible for everyone.{'\n'}
                    By going digital, we help reduce paper waste and protect our environment.
                </Text>

                <Text style={styles.sectionTitle}>Contact Us</Text>
                <Text style={styles.text}>
                    Email: servicpin2@alu.edu.gva.es{'\n'}
                    Phone: +34 123 456 789{'\n'}
                    Address: Av. Ciudad León de Nicaragua, 8, 03015 Alicante, Spain
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
