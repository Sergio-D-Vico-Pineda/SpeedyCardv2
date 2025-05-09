import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Template } from '@/types';
import { collection, getDocs } from 'firebase/firestore';
import { router } from 'expo-router';
import { db } from '@/firebaselogic';
import { useMarketContext } from '@/contexts/MarketContext';
import { Price } from '@/components/Price';

export default function TemplateDetailsScreen() {
    const params = useSearchParams();
    const id = params.get('id');
    const [template, setTemplate] = useState<Template>();
    const { ownedTemplates } = useMarketContext();
    const isOwned = ownedTemplates.includes(template?.id || '');

    useEffect(() => {
        const fetchTemplateDetails = async () => {
            if (!id) return;

            try {
                const categoriesRef = collection(db, 'categories');
                const snapshot = await getDocs(categoriesRef);

                for (const doc of snapshot.docs) {
                    const items = doc.data().items || [];
                    const foundTemplate = items.find((item: any) =>
                        item.name.toLowerCase().replace(/\s+/g, '-') === id
                    );

                    if (foundTemplate) {
                        setTemplate({
                            id: foundTemplate.name.toLowerCase().replace(/\s+/g, '-'),
                            name: foundTemplate.name,
                            price: foundTemplate.price,
                            description: foundTemplate.description,
                            features: foundTemplate.features,
                            category: doc.id,
                            isavailable: foundTemplate.isavailable
                        });
                        break;
                    }
                }
            } catch (error) {
                console.error('Error fetching template details:', error);
            }
        };

        fetchTemplateDetails();
    }, [id]);

    const handlePurchase = () => {
        if (isOwned) {
            alert(`You already own the template: ${template?.name}`);
            return;
        }
        // Implement purchase logic here
        alert(`Processing purchase for ${template?.name}`);
    };

    if (!template) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={24} color="#4299e1" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Loading...</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text>Loading...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={24} color="#4299e1" />
                </TouchableOpacity>
                <Text style={styles.title}>{template.name}</Text>
            </View>
            <LinearGradient
                colors={['#ffffff', '#f8f9fa']}
                style={styles.previewCard}
            >
                <Text style={styles.templateName}>Effect {template.name}</Text>
            </LinearGradient>

            <View style={styles.detailsSection}>
                <Text style={styles.description}>{template.description}</Text>

                <Text style={styles.price}><Price value={template.price} /></Text>

                <Text style={styles.featuresTitle}>Features</Text>
                <View style={styles.featuresList}>
                    {template.features?.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <Text style={styles.featureText}>• {feature}</Text>
                        </View>
                    ))}
                </View>

                {isOwned ? (
                    <Text style={styles.ownedLabel}>This item is already purchased</Text>
                ) : (
                    <TouchableOpacity
                        style={styles.purchaseButton}
                        onPress={handlePurchase}
                    >
                        <Text style={styles.purchaseButtonText}>Purchase Template</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
        elevation: 3,
    },
    backButton: {
        marginRight: 12,
    },
    backButtonText: {
        fontSize: 16,
        color: '#4299e1',
        fontWeight: '500',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
        flex: 1,
    },
    previewCard: {
        height: 200,
        margin: 16,
        borderRadius: 12,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
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
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    purchaseButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    ownedLabel: {
        textAlign: 'center',
        fontSize: 18,
        color: '#38a169',
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});