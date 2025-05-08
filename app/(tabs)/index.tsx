import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Trash, Share2, Edit, RefreshCw, Home } from 'lucide-react-native';
import { useEffect } from 'react';
import { useCards } from '@/hooks/useCards';
import { defaultCardData, MyCardData } from '@/types';
import { useCardContext } from '@/contexts/CardContext';
import { useAuth } from '@/contexts/AuthContext';
import FloatingButton from '@/components/FloatingButton';
import CrossPlatformAlert from '@/components/CrossPlatformAlert';

export default function CardsScreen() {
    const { userData } = useAuth();
    const { updateCardData } = useCardContext();
    const { cards, loading, error, fetchCards, handleRefresh, removeCard } = useCards();

    function updateCardAndGotoEdit(card: MyCardData, index: number) {
        card.index = index;
        updateCardData(card);
        router.push(`/(tabs)/(cards)`);
    }

    function handleShare(index: number) {
        router.push(`/(tabs)/(share)/?card=${index}`);
    }

    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState<{ card: MyCardData, index: number } | null>(null);

    function handleLongPress(card: MyCardData, index: number, event: any) {
        setSelectedCard({ card, index });
        setAlertVisible(true);
    }

    useEffect(() => {
        fetchCards();
    }, [fetchCards]);

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

    function newCard(): void {
        updateCardData(defaultCardData);
        router.push(`/(tabs)/(cards)`);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Business Cards</Text>
                {Platform.OS === 'web' && (
                    <>
                        <Pressable onPress={() => {
                            console.log('resetting');
                            router.dismissAll()
                        }}>
                            <Home size={24} color="#007AFF" />
                        </Pressable>
                        <Pressable
                            style={[styles.refreshButton, loading && styles.refreshing]}
                            onPress={handleRefresh}
                            disabled={loading}
                        >
                            <RefreshCw size={24} color={'#007AFF'} />
                        </Pressable>
                    </>
                )}
            </View>

            {loading ? (
                <View style={styles.emptyState}>
                    <Text>Loading cards...</Text>
                </View>
            ) : (
                <FlatList
                    style={styles.list}
                    data={cards}
                    refreshing={loading}
                    onRefresh={handleRefresh}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>No Cards Yet</Text>
                            <Text style={styles.emptyText}>Create your first business card to get started</Text>
                            <Pressable style={styles.createButton} onPress={newCard}>
                                <Plus size={24} color="#FFFFFF" />
                                <Text style={styles.buttonText}>Create New Card</Text>
                            </Pressable>
                        </View>
                    }

                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => router.push(`/view?userid=${userData?.uid}&card=${index}&from=cards`)}
                            onLongPress={(event) => handleLongPress(item, index, event)}
                            delayLongPress={500}
                        >
                            <View style={styles.cardItem}>
                                <View>
                                    {item.tname && <Text style={styles.cardTitle}>{item.tname}</Text>}
                                    {item.tbusiness ? <Text style={styles.cardDetails}>{item.tbusiness}</Text> : null}
                                </View>
                                <View style={styles.cardActions}>
                                    {item && <Text style={[styles.cardIndex, styles.cardDetails]}>{index}</Text>}
                                    <Pressable onPress={() => updateCardAndGotoEdit(item, index)}>
                                        <Edit color="#007AFF" size={24} />
                                    </Pressable>
                                    <Pressable onPress={() => handleShare(index)}>
                                        <Share2 color="#34C759" size={26} />
                                    </Pressable>
                                    {Platform.OS === 'web' && (
                                        <Pressable onPress={() => removeCard(index)}>
                                            <Trash color="#FF3B30" size={22} />
                                        </Pressable>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
            <FloatingButton onPressAction={newCard} />
            <CrossPlatformAlert
                visible={alertVisible}
                title="Card Actions"
                // qrCode={`speedycard://view?userid=${userData?.uid}&card=${selectedCard?.index}`}
                message={selectedCard?.card.tname || 'Select an action'}
                actions={[
                    { text: 'Edit', onPress: () => selectedCard && updateCardAndGotoEdit(selectedCard.card, selectedCard.index), color: '#007AFF' },
                    { text: 'Share', onPress: () => selectedCard && handleShare(selectedCard.index), color: '#34C759' },
                    { text: 'Delete', onPress: () => selectedCard && removeCard(selectedCard.index), color: '#FF3B30' },
                    { text: 'Cancel', onPress: () => setAlertVisible(false), color: '#8E8E93' }
                ]}
                onRequestClose={() => setAlertVisible(false)}
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
        backgroundColor: '#fff',
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
        gap: 15,
        alignItems: 'center',
    },
});
