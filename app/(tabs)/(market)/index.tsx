import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaselogic';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Template } from '@/types';

const mockTemplates: Template[] = [
    {
        id: '1',
        name: 'Modern Minimalist',
        description: 'Clean and professional design with emphasis on typography',
        category: 'Professional',
        price: 10.99,
        style: 'Minimalist',
        isavailable: true
    },
    {
        id: '2',
        name: 'Creative Portfolio',
        description: 'Bold and artistic layout perfect for creative professionals',
        category: 'Creative',
        price: 15.99,
        style: 'Modern',
        isavailable: true
    },
    {
        id: '3',
        name: 'Corporate Executive',
        description: 'Traditional business card design with a contemporary twist',
        category: 'Business',
        price: 20.99,
        style: 'Classic',
        isavailable: true
    },
    {
        id: '4',
        name: 'Dynamic Fade',
        description: 'Elegant fade-in animations and smooth transitions between elements',
        category: 'Effects',
        price: 24.99,
        style: 'Animated',
        isavailable: true
    }
];

export default function MarketplaceScreen() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Professional', 'Creative', 'Business', 'Effects'];

    useEffect(() => {
        fetchTemplates();
        /* fetchProducts(); */
    }, []);

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const fetchProducts = async () => {
        try {
            const productsRef = collection(db, 'products');
            const productsSnapshot = await getDocs(productsRef);
            const productsList = productsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Template[];
            setTemplates(productsList);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTemplates = async () => {
        try {
            // Using mock data instead of Firebase for now
            setTemplates(mockTemplates);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const TemplateCard = ({ template }: { template: Template }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/template/${template.id}`)}
        >
            <LinearGradient
                colors={['#ffffff', '#f8f9fa']}
                style={styles.cardContent}
            >
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
                <Text style={styles.templatePrice}>${template.price}</Text>
                <Text style={styles.templateStyle}>{template.style}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading products...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Card Extras</Text>
            </View>
            <View style={styles.subheader}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.grid}>
                {filteredTemplates.map(template => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    grid: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    },
    cardContent: {
        padding: 16,
        height: 160,
    },
    templateName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    templateDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    templatePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    templateStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4299e1',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    subheader: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchBar: {
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: '#f7fafc',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    categoryContainer: {
        flexDirection: 'row',
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f7fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    categoryButtonActive: {
        backgroundColor: '#4299e1',
        borderColor: '#4299e1',
    },
    categoryText: {
        color: '#4a5568',
        fontWeight: '500',
    },
    categoryTextActive: {
        color: '#ffffff',
    },
});