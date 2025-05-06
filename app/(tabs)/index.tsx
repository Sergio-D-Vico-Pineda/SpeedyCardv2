import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Trash, Share2, Edit, RefreshCw, Home } from 'lucide-react-native';
import { useEffect } from 'react';
import { useCards } from '@/hooks/useCards';
import { defaultCardData, MyCardData } from '@/types';
import { useCardContext } from '@/contexts/CardContext';
import { useAuth } from '@/contexts/AuthContext';
import FloatingButton from '@/components/FloatingButton';

export default function CardsScreen() {
    const { userData } = useAuth();
    const { updateCardData } = useCardContext();
    const { cards, loading, error, refreshing, fetchCards, handleRefresh, removeCard } = useCards();

    function updateCardAndGotoEdit(card: MyCardData, index: number) {
        card.index = index;
        updateCardData(card);
        router.push(`/(tabs)/(cards)`);
    }

    function handleShare(index: number) {
        const url = userData ? `speedycard://view?userid=${userData.uid}&card=${index}` : 'Something wrong with the user';
        console.log(url);
        alert(url);
    }

    function handleLongPress(card: MyCardData, index: number, event: any) {
        // Create menu items
        const menuItems = [
            { text: 'View', onClick: () => router.push(`/view?userid=${userData?.uid}&card=${index}&from=cards`), color: '#007AFF', style: 'default' },
            { text: 'Edit', onClick: () => updateCardAndGotoEdit(card, index), color: '#007AFF', style: 'default' },
            { text: 'Share', onClick: () => handleShare(index), color: '#34C759', style: 'default' },
            { text: 'Delete', onClick: () => removeCard(index), color: '#FF3B30', style: 'destructive' },
        ];

        if (Platform.OS === 'web') {
            alert('Web not supported yet');
            /* // For web, we'll use a custom dropdown menu
            const dropdownContent = document.createElement('div');
            dropdownContent.style.position = 'fixed';
            dropdownContent.style.backgroundColor = 'white';
            dropdownContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            dropdownContent.style.borderRadius = '8px';
            dropdownContent.style.padding = '8px 0';
            dropdownContent.style.zIndex = '100';


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
                    if (document.body.contains(dropdownContent)) {
                        document.body.removeChild(dropdownContent);
                    }
                });

                dropdownContent.appendChild(menuItem);
            });

            // Position the dropdown near the cursor
            const handleClickOutside = (event: MouseEvent) => {
                if (!dropdownContent.contains(event.target as Node)) {
                    if (document.body.contains(dropdownContent)) {
                        document.body.removeChild(dropdownContent);
                    }
                    document.removeEventListener('click', handleClickOutside);
                }
            };

            // Add to body and position
            document.body.appendChild(dropdownContent);

            // Position dropdown at cursor position using the event parameter
            const mouseEvent = event.nativeEvent;
            dropdownContent.style.left = `${mouseEvent.pageX}px`;
            dropdownContent.style.top = `${mouseEvent.pageY}px`;

            // Close dropdown when clicking outside
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 0);

            setTimeout(() => {
                document.removeEventListener('click', handleClickOutside);
                if (document.body.contains(dropdownContent)) {
                    document.body.removeChild(dropdownContent);
                }
            }, 2000); */
        } else {
            Alert.alert(
                'Card Options',
                'What would you like to do with this card?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    ...menuItems.map(item => ({
                        text: item.text,
                        onPress: item.onClick,
                        style: item.style as 'default' | 'destructive' | 'cancel'
                    }))
                ]
            );
        }
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
                            style={[styles.refreshButton, refreshing && styles.refreshing]}
                            onPress={handleRefresh}
                            disabled={refreshing}
                        >
                            <RefreshCw size={24} color={'#007AFF'} />
                        </Pressable>
                    </>
                )}
            </View>

            <FlatList
                style={styles.list}
                data={cards}
                refreshing={refreshing}
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
            <FloatingButton onPressAction={newCard} />
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
