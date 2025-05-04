import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaselogic';
import { LinearGradient } from 'expo-linear-gradient';
import { Template, templates as mockTemplates, categories } from '@/types';
import FloatingButton from '@/components/FloatingButton';

export default function MarketplaceScreen() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // fetchTemplates();
        fetchProducts();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProducts();
        setRefreshing(false);
    };

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const fetchProducts = async () => {
        try {
            const productsRef = collection(db, 'categories');
            const productsSnapshot = await getDocs(productsRef);
            const productList = productsSnapshot.docs.flatMap(doc =>
                doc.data().items.map((item: any) => ({
                    id: item.name.toLowerCase().replace(/\s+/g, '-'),
                    ...item,
                    category: doc.id
                }))
            );
            setTemplates(productList);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const newItem = function () {
        router.push('/newitem');
    }

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
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#4299e1']}
                        tintColor="#4299e1"
                    />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Marketplace</Text>
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
                        <TouchableOpacity
                            key='All'
                            style={[styles.categoryButton, selectedCategory === 'All' && styles.categoryButtonActive]}
                            onPress={() => setSelectedCategory('All')}
                        >
                            <Text style={[styles.categoryText, selectedCategory === 'All' && styles.categoryTextActive]}>
                                All
                            </Text>
                        </TouchableOpacity>
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category}
                                style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
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
            <FloatingButton onPressAction={newItem} />
        </SafeAreaView>
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