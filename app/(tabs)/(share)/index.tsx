import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Share2, ArrowLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useCards } from '@/hooks/useCards';
import { useAuth } from '@/contexts/AuthContext';
import { MyCardData } from '@/types';
import BusinessCardPreview from '@/components/business-card/BusinessCardPreview';
import QRCode from 'react-native-qrcode-svg';

export default function ShareScreen() {
    const { userData } = useAuth();
    const { card } = useLocalSearchParams();
    const { cards } = useCards();
    const [cardData, setCardData] = useState<MyCardData>();
    const [shareUrl, setShareUrl] = useState<string>('');

    useEffect(() => {
        console.log('ShareScreen: card', card);
        console.log('ShareScreen: cards', cards);
        if (cards && card !== undefined) {
            const index = parseInt(card as string);
            if (!isNaN(index) && index >= 0 && index < cards.length) {
                setCardData(cards[index]);
                if (userData) {
                    setShareUrl(`speedycard://view?userid=${userData.uid}&card=${index}`);
                }
            }
        }

        return () => {
            console.log('a')
            setCardData(undefined);
            setShareUrl('');
        };

    }, [cards, card, userData]);

    const handleShare = () => {
        if (Platform.OS === 'web') {
            alert('Share URL:\n\n' + shareUrl);
        } else {
            // Handle native sharing here when implemented
            alert('Native sharing coming soon!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.dismiss(1)} style={styles.backButton}>
                    <ArrowLeft size={24} color="#007AFF" />
                </Pressable>
                <Text style={styles.title}>Share Card</Text>
                <Pressable onPress={handleShare} style={styles.shareButton}>
                    <Share2 size={24} color="#34C759" />
                </Pressable>
            </View>

            <View style={styles.content}>
                {cardData ? (
                    <>
                        <BusinessCardPreview localCardData={cardData} />
                        <View style={styles.qrContainer}>
                            <QRCode value={shareUrl} size={200} />
                            <Text style={styles.qrDescription}>
                                Scan this QR code to view and save this card
                            </Text>
                        </View>
                    </>
                ) : (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Card not found</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    backButton: {
        padding: 4,
    },
    shareButton: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardPreview: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        width: '100%',
        marginBottom: 30,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 3,
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 15,
    },
    cardInfo: {
        alignItems: 'center',
    },
    cardName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDetail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    qrContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        width: '100%',
    },
    qrTitle: { // not using
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 20,
    },
    qrDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
    },
});