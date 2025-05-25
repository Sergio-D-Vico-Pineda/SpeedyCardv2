import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Share2, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { useCards } from '@/hooks/useCards';
import { useAuth } from '@/contexts/AuthContext';
import { MyCardData } from '@/types';
import { Dimensions } from 'react-native';
import BusinessCardPreview from '@/components/business-card/BusinessCardPreview';
import QRCode from 'react-native-qrcode-svg';

const CARD_ASPECT_RATIO = 1.586; // Standard business card ratio
const CARD_WIDTH = Dimensions.get('window').width - 32;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export default function ShareScreen() {
    const { userData } = useAuth();
    const { card, userid = userData?.uid, from } = useLocalSearchParams();
    const { fetchSingleCard } = useCards();
    const [cardData, setCardData] = useState<MyCardData | null>(null);
    const [shareUrl, setShareUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const fetchCard = useCallback(async () => {
        setError(null);
        if (card !== null) {
            const index = parseInt(card as string);
            if (!isNaN(index)) {
                try {
                    const localcard = await fetchSingleCard(userid as string, index);
                    setCardData(localcard);
                    if (userid) {
                        setShareUrl(`speedycard://view?userid=${userid}&card=${index}`);
                    }
                } catch (error) {
                    console.error('Error fetching card:', error);
                    setError(error instanceof Error ? error.message : 'Failed to load card data');
                }
            }
        }
    }, [card, userid]);

    useEffect(() => {
        fetchCard();
        return () => {
            setCardData(null);
            setShareUrl('');
            setError(null);
        };
    }, [fetchCard]);

    const handleShare = () => {
        alert('Share URL:\n\n' + shareUrl);
    };

    const handleBack = () => {
        if (from === 'saved') {
            router.replace('/savedcards')
        } else if (from === 'cards') {
            router.back();
        } else {
            router.replace('/');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={handleBack} style={styles.backButton}>
                    <ArrowLeft size={24} color="#007AFF" />
                </Pressable>
                <Text style={styles.title}>Share Card</Text>
                <Pressable onPress={handleShare} style={styles.shareButton}>
                    <Share2 size={24} color="#34C759" />
                </Pressable>
            </View>

            <View style={styles.content}>
                {error ? (
                    <LinearGradient
                        colors={['#fee2e2', '#fecaca']}
                        style={[styles.previewCard, styles.errorCard]}
                    >
                        <Text style={[styles.templateName, styles.errorText]}>There was a error loading the card</Text>
                    </LinearGradient>
                ) : cardData ? (
                    <BusinessCardPreview localCardData={cardData} />
                ) : (
                    <LinearGradient
                        colors={['#e2e8f0', '#f1f5f9']}
                        style={[styles.previewCard, styles.loadingCard]}
                    >
                        <Text style={[styles.templateName, styles.loadingText]}>Loading Card...</Text>
                        <View style={styles.loadingIndicator} />
                    </LinearGradient>
                )}
                <View style={styles.qrContainer}>
                    {error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorMessage}>{error}</Text>
                        </View>
                    ) : (
                        <>
                            <QRCode value={shareUrl ? shareUrl : undefined} size={200} />
                            <Text style={styles.qrDescription}>
                                Scan this QR code to view and save this card
                            </Text>
                        </>
                    )}
                </View>
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
    qrDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    previewCard: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        margin: 16,
        borderRadius: 12,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    },
    errorCard: {
        borderWidth: 1,
        borderColor: '#dc2626',
    },
    loadingCard: {
        borderWidth: 1,
        borderColor: '#94a3b8',
    },
    errorMessage: {
        color: '#dc2626',
        fontSize: 14,
        textAlign: 'center',
    },
    loadingText: {
        color: '#475569',
        marginBottom: 16,
    },
    loadingIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#94a3b8',
        borderTopColor: '#475569',
        transform: [{ rotate: '45deg' }],
    },
    templateName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2d3748',
    },
    errorContainer: {
        backgroundColor: '#fee2e2',
        padding: 16,
        borderRadius: 8,
        margin: 16,
        alignItems: 'center',
    },
    errorText: {
        color: '#dc2626',
        fontSize: 16,
        textAlign: 'center',
    },
});