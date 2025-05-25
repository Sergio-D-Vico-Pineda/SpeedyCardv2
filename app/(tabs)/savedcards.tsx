import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Share2, QrCode } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { useSavedCards } from '@/hooks/useSavedCards';
import { MyCardData, SavedCard } from '@/types';
import { router } from 'expo-router';
import FloatingButton from '@/components/FloatingButton';
import ScanQRModal from '@/modals/scanqr';
import CrossPlatformAlert from '@/components/CrossPlatformAlert';

export default function SavedCardsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const { savedCards, loading, error, handleRefresh, fetchSavedCards, removeSavedCard, fetchDataCard } = useSavedCards();
    const [cardStates, setCardStates] = useState<Record<string, MyCardData>>({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState<{ scard: SavedCard, index: number }>();

    const memoizedFetchCards = useCallback(async () => {
        if (!savedCards.length) return;

        const newCardStates: Record<string, MyCardData> = {};
        const promises = savedCards
            .filter(item => item)
            .map(async item => {
                const cardData = await fetchDataCard(item);
                if (cardData) {
                    newCardStates[`${item.userid}-${item.card}`] = cardData;
                }
            });

        await Promise.all(promises);
        setCardStates(newCardStates);
    }, [savedCards]);

    useEffect(() => {
        memoizedFetchCards();
    }, [memoizedFetchCards]);

    function renderCardItem(item: SavedCard, index: number) {
        if (!item) {
            return null;
        }
        const card = cardStates[`${item.userid}-${item.card}`];

        return (
            <View style={styles.cardItem}>
                <View style={{ width: 200 }}>
                    {card?.tname ? <Text numberOfLines={1} style={styles.cardTitle}>{card.tname}</Text> : null}
                    {card?.tbusiness ? <Text style={styles.cardDetails}>{card.tbusiness}</Text> : null}
                </View>
                <View style={styles.cardActions}>
                    {item ? <Text style={[styles.cardIndex, styles.cardDetails]}>{index}</Text> : null}
                    <Pressable onPress={() => handleShare(item)}>
                        <Share2 color="#34C759" size={26} />
                    </Pressable>
                </View>
            </View>
        );
    }

    function handleShare(card: SavedCard) {
        router.push(`/(tabs)/(share)/?card=${card.card}&userid=${card.userid}&from=saved`);
    }
    /* const menuItems = [
        { text: 'View', onClick: () => router.push(`/view?userid=${card.userid}&card=${card.card}&from=saved`), color: '#007AFF', style: 'default' },
        { text: 'Share', onClick: () => handleShare(index), color: '#34C759', style: 'default' },
        { text: 'Delete', onClick: () => removeSavedCard(index), color: '#FF3B30', style: 'destructive' },
    ]; */

    function handleLongPress(card: SavedCard, index: number, event: any) {
        setSelectedCard({ scard: card, index });
        setAlertVisible(true);
    }

    useEffect(() => {
        fetchSavedCards();
    }, [fetchSavedCards]);

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Saved Cards</Text>
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
                <Text style={styles.title}>Saved Cards</Text>
            </View>

            {loading ? (
                <View style={styles.emptyState}>
                    <Text>Loading cards...</Text>
                </View>
            ) : (
                <FlatList
                    style={styles.list}
                    data={savedCards}
                    refreshing={loading}
                    onRefresh={handleRefresh}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>No Saved Cards</Text>
                            <Text style={styles.emptyText}>Scan a QR code to save a card</Text>
                            <Pressable style={styles.scanButton} onPress={() => setModalVisible(true)}>
                                <QrCode color="#FFFFFF" size={24} />
                                <Text style={styles.buttonText}>Scan QR Code</Text>
                            </Pressable>
                        </View>
                    }
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => router.push(`/view?userid=${item.userid}&card=${item.card}&from=saved`)}
                            onLongPress={(event) => handleLongPress(item, index, event)}
                            delayLongPress={500}
                        >
                            {renderCardItem(item, index)}
                        </TouchableOpacity>
                    )}
                />
            )}
            <ScanQRModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <CrossPlatformAlert
                visible={alertVisible}
                title="Card Actions"
                message='Select an action'
                actions={[
                    { text: 'Share', onPress: () => selectedCard && handleShare(selectedCard.scard), color: '#34C759' },
                    { text: 'Delete', onPress: () => selectedCard && removeSavedCard(selectedCard.index), color: '#FF3B30' },
                    { text: 'Cancel', onPress: () => setAlertVisible(false), color: '#8E8E93' }
                ]}
                onRequestClose={() => setAlertVisible(false)}
            />
            {savedCards.length > 0 ? (
                <FloatingButton onPressAction={() => setModalVisible(true)} />
            ) : null}
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
        marginRight: 8,
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
    scanButton: {
        marginTop: 20,
        backgroundColor: '#4299e1',
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    refreshButton: {
        padding: 4,
        borderRadius: 20,
    },
    refreshing: {
        opacity: 0.5,
    },
});