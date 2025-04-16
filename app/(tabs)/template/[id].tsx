import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Template } from '@/types';

const mockTemplates: Record<string, Template> = {
    '1': {
        id: '1',
        name: 'Modern Minimalist',
        description: 'Clean and professional design with emphasis on typography',
        category: 'Professional',
        price: 10.99,
        style: 'Minimalist',
        isavailable: true,
        features: [
            'Clean typography',
            'Professional layout',
            'Minimalist design',
            'Easy customization'
        ]
    },
    '2': {
        id: '2',
        name: 'Creative Portfolio',
        description: 'Bold and artistic layout perfect for creative professionals',
        category: 'Creative',
        price: 15.99,
        style: 'Modern',
        isavailable: true,
        features: [
            'Bold typography',
            'Artistic elements',
            'Modern layout',
            'Creative freedom'
        ]
    },
    '3': {
        id: '3',
        name: 'Corporate Executive',
        description: 'Traditional business card design with a contemporary twist',
        category: 'Business',
        price: 20.99,
        style: 'Classic',
        isavailable: true,
        features: [
            'Professional design',
            'Traditional elements',
            'Contemporary style',
            'Business-focused'
        ]
    },
    '4': {
        id: '4',
        name: 'Dynamic Fade',
        description: 'Elegant fade-in animations and smooth transitions between elements',
        category: 'Effects',
        price: 24.99,
        style: 'Animated',
        isavailable: true,
        features: [
            'Smooth animations',
            'Elegant transitions',
            'Dynamic elements',
            'Modern effects'
        ]
    }
};

export default function TemplateDetailsScreen() {
    const params = useSearchParams();
    const id = params.get('id');
    const [template, setTemplate] = useState<Template | null>(null);

    useEffect(() => {
        if (id) {
            // In a real app, fetch from Firebase
            setTemplate(mockTemplates[id as keyof typeof mockTemplates]);
        }
    }, [id]);

    const handlePurchase = () => {
        // Implement purchase logic here
        alert(`Processing purchase for ${template?.name}`);
    };

    if (!template) {
        return (
            <View style={styles.container}>
                <Text>Loading template details...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#ffffff', '#f8f9fa']}
                style={styles.previewCard}
            >
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateStyle}>{template.style}</Text>
            </LinearGradient>

            <View style={styles.detailsSection}>
                <Text style={styles.description}>{template.description}</Text>

                <Text style={styles.price}>${template.price}</Text>

                <Text style={styles.featuresTitle}>Features</Text>
                <View style={styles.featuresList}>
                    {template.features?.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <Text style={styles.featureText}>• {feature}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={handlePurchase}
                >
                    <Text style={styles.purchaseButtonText}>Purchase Template</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    previewCard: {
        height: 200,
        margin: 16,
        borderRadius: 12,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    templateName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2d3748',
    },
    templateStyle: {
        fontSize: 16,
        color: '#4299e1',
        fontWeight: '500',
    },
    detailsSection: {
        padding: 16,
    },
    description: {
        fontSize: 16,
        color: '#4a5568',
        marginBottom: 16,
        lineHeight: 24,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 24,
    },
    featuresTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 16,
    },
    featuresList: {
        marginBottom: 24,
    },
    featureItem: {
        marginBottom: 8,
    },
    featureText: {
        fontSize: 16,
        color: '#4a5568',
    },
    purchaseButton: {
        backgroundColor: '#4299e1',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    purchaseButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});