import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform, Pressable } from 'react-native';
import FloatingButton from '@/components/FloatingButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Trash, Share2, QrCode, RefreshCw } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useSavedCards } from '@/hooks/useSavedCards';
import { MyCardData } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import ScanQRModal from '@/modals/scanqr';

export default function SavedCardsScreen() {
    const { userData } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const { savedCards, loading, error, refreshing, handleRefresh, fetchSavedCards, removeSavedCard } = useSavedCards();

    function handleShare(index: number) {
        // const url = userData ? `speedycard://cards/${userData.uid}/${index}` : 'Something wrong with the user';
        const url = 'this is not ok'
        console.log(url);
    }

    function handleLongPress(card: MyCardData, index: number, event: any) {
        if (Platform.OS === 'web') {
            const dropdownContent = document.createElement('div');
            dropdownContent.style.position = 'fixed';
            dropdownContent.style.backgroundColor = 'white';
            dropdownContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            dropdownContent.style.borderRadius = '8px';
            dropdownContent.style.padding = '8px 0';
            dropdownContent.style.zIndex = '1000';

            const menuItems = [
                { text: 'Share', onClick: () => handleShare(index), color: '#34C759' },
                { text: 'Delete', onClick: () => removeSavedCard(index), color: '#FF3B30' }
            ];

            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.style.padding = '8px 16px';
                menuItem.style.cursor = 'pointer';
                menuItem.style.color = item.color;
                menuItem.textContent = item.text;
                menuItem.style.fontSize = '14px';

                menuItem.addEventListener('mouseenter', () => {
                    menuItem.style.backgroundColor = '#f5f5f5';
                });
                menuItem.addEventListener('mouseleave', () => {
                    menuItem.style.backgroundColor = 'transparent';
                });
                menuItem.addEventListener('click', () => {
                    item.onClick();
                    document.body.removeChild(dropdownContent);
                });

                dropdownContent.appendChild(menuItem);
            });

            document.body.appendChild(dropdownContent);

            const mouseEvent = event.nativeEvent;
            dropdownContent.style.left = `${mouseEvent.pageX}px`;
            dropdownContent.style.top = `${mouseEvent.pageY}px`;

            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 0);

            const handleClickOutside = (event: MouseEvent) => {
                if (!dropdownContent.contains(event.target as Node)) {
                    document.body.removeChild(dropdownContent);
                    document.removeEventListener('click', handleClickOutside);
                }
            };
        } else {
            Alert.alert(
                'Card Options',
                'What would you like to do with this card?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Share',
                        onPress: () => handleShare(index),
                        style: 'default'
                    },
                    {
                        text: 'Delete',
                        onPress: () => removeSavedCard(index),
                        style: 'destructive'
                    }
                ]
            );
        }
    }

    useEffect(() => {
        fetchSavedCards();
    }, [fetchSavedCards]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Saved Cards</Text>
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
                {Platform.OS === 'web' && (
                    <Pressable
                        style={[styles.refreshButton, refreshing && styles.refreshing]}
                        onPress={handleRefresh}
                        disabled={refreshing}
                    >
                        <RefreshCw size={24} color={'#007AFF'} />
                    </Pressable>
                )}
            </View>

            <FlatList
                style={styles.list}
                data={savedCards}
                refreshing={refreshing}
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
                        onLongPress={(event) => handleLongPress(item, index, event)}
                        delayLongPress={500}
                    >
                        <View style={styles.cardItem}>
                            <View>
                                {item.tname && <Text style={styles.cardTitle}>{item.tname}</Text>}
                                {item.tbusiness && <Text style={styles.cardDetails}>{item.tbusiness}</Text>}
                            </View>
                            <View style={styles.cardActions}>
                                {item && <Text style={[styles.cardIndex, styles.cardDetails]}>{index}</Text>}
                                <Pressable onPress={() => handleShare(index)}>
                                    <Share2 color="#34C759" size={26} />
                                </Pressable>
                                {Platform.OS === 'web' && (
                                    <Pressable onPress={() => removeSavedCard(index)}>
                                        <Trash color="#FF3B30" size={22} />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <ScanQRModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            {savedCards.length > 0 && (
                <FloatingButton onPressAction={() => setModalVisible(true)} />
            )}
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