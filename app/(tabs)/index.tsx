import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Plus, RotateCw } from 'lucide-react-native';
import { useEffect } from 'react';
import { useCards } from '@/hooks/useCards';
import { MyCardData } from '@/types';
import { useCardContext } from '@/contexts/CardContext';

export default function CardsScreen() {
    const { updateCardData } = useCardContext();
    const { card, loading, error, refreshing, fetchCards, handleRefresh } = useCards();

    function updateCardAndGotoEdit(card: MyCardData) {
        // console.log(card);
        updateCardData(card);
        router.push(`/(tabs)/(cards)`);
    }

    useEffect(() => {
        fetchCards();
    }, [fetchCards]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Business Cards</Text>
                </View>
                <View style={styles.emptyState}>
                    <Text>Loading cards...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Business Cards</Text>
                </View>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Error: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Business Cards</Text>
                <Pressable
                    style={[styles.refreshButton, refreshing && styles.refreshing]}
                    onPress={handleRefresh}
                    disabled={refreshing}
                >
                    <RotateCw size={24} color="#007AFF" />
                </Pressable>
            </View>

            <FlatList
                data={card}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No Cards Yet</Text>
                        <Text style={styles.emptyText}>Create your first business card to get started</Text>
                        <Link href="/(tabs)/(cards)" asChild>
                            <Pressable style={styles.createButton}>
                                <Plus size={24} color="#FFFFFF" />
                                <Text style={styles.buttonText}>Create New Card</Text>
                            </Pressable>
                        </Link>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => updateCardAndGotoEdit(item)}>
                        <View style={styles.cardItem}>
                            {item.tname && <Text style={styles.cardTitle}>{item.tname}</Text>}
                            {item.tbusiness && <Text style={styles.cardDetails}>{item.tbusiness}</Text>}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    refreshButton: {
        padding: 8,
        borderRadius: 20,
    },
    refreshing: {
        opacity: 0.5,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        gap: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    cardItem: {
        backgroundColor: '#f8f9fa',
        padding: 20,
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    cardDetails: {
        fontSize: 14,
        color: '#666',
    },
});
