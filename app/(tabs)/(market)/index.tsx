import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Template, categories } from '@/types';
import FloatingButton from '@/components/FloatingButton';
import { useMarket } from '@/contexts/MarketContext';
import { useState } from 'react';

export default function MarketplaceScreen() {
    const { loading, searchQuery, selectedCategory, setSearchQuery, setSelectedCategory, refreshProducts, filteredTemplates } = useMarket();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshProducts();
        setRefreshing(false);
    };

    const newItem = function () {
        router.push('/newitem');
    }

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