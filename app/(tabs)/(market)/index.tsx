import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, RefreshControl, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Template, categories } from '@/types';
import { useMarketContext } from '@/contexts/MarketContext';
import { Price } from '@/components/Price';
import FloatingButton from '@/components/FloatingButton';

export default function MarketplaceScreen() {
    const { loading, searchQuery, selectedCategory, setSearchQuery, setSelectedCategory, refreshAll, filteredTemplates, ownedTemplates } = useMarketContext();
    const [visible, setVisible] = useState(false);

    const onRefresh = async () => {
        console.log('refreshin market');
        await refreshAll();
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
                {ownedTemplates.includes(template.id) ? (
                    <Text style={styles.ownedLabel}>Already Owned</Text>
                ) : (
                    <Text style={styles.templatePrice}>
                        <Price value={template.price} />
                    </Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title} onPress={() => setVisible(!visible)}>Marketplace</Text>
                {Platform.OS === 'web' && (
                    <TouchableOpacity
                        onPress={onRefresh}
                    >
                        <Text style={styles.refreshBtn}>
                            Refresh
                        </Text>
                    </TouchableOpacity>
                )}
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
            {loading ? (
                <View style={styles.emptyState}>
                    <Text>Loading products...</Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.grid}>
                        {filteredTemplates.map(template => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                    </View>
                </ScrollView>
            )
            }
            {visible ? (
                <FloatingButton onPressAction={newItem} />
            ) : null
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
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
        flex: 1,
        padding: 16,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    ownedLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00bf00',
    },
    refreshBtn: {
        color: '#4299e1',
        fontWeight: '500'
    }
});