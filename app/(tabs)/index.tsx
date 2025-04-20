import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Plus, RotateCw, Trash } from 'lucide-react-native';
import { useEffect } from 'react';
import { useCards } from '@/hooks/useCards';
import { MyCardData } from '@/types';
import { useCardContext } from '@/contexts/CardContext';

export default function CardsScreen() {
    const { updateCardData } = useCardContext();
    const { card, loading, error, refreshing, fetchCards, handleRefresh, removeCard } = useCards();

    function updateCardAndGotoEdit(card: MyCardData, index: number) {
        card.index = index;
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
                style={styles.list}
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
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => updateCardAndGotoEdit(item, index)}>
                        <View style={styles.cardItem}>
                            <View>
                                {item.tname && <Text style={styles.cardTitle}>{item.tname}</Text>}
                                {item.tbusiness && <Text style={styles.cardDetails}>{item.tbusiness}</Text>}
                            </View>
                            <View style={styles.cardActions}>
                                {item && <Text style={[styles.cardIndex, styles.cardDetails]}>{index}</Text>}
                                <Pressable onPress={() => removeCard(index)}>
                                    <Trash color="#FF3B30" size={24} />
                                </Pressable>
                            </View>
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
        backgroundColor: '#F2F2F7',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    refreshButton: {
        padding: 4,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    cardDetails: {
        fontSize: 14,
        color: '#666',
    },
    cardIndex: {

    },
    list: {
        flex: 1,
        paddingTop: 14,
        marginHorizontal: 16,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    }
});
