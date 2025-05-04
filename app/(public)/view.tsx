import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import BusinessCardPreview from '@/components/business-card/BusinessCardPreview';
import { useCards } from '@/hooks/useCards';
import { defaultCardData, MyCardData } from '@/types';
import { Save } from 'lucide-react-native';

const isColorDark = (hex: string): boolean => {
    let c = hex.charAt(0) === '#' ? hex.substring(1) : hex;
    if (c.length === 3) {
        c = c.split('').map(ch => ch + ch).join('');
    }
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness < 186;
};

export default function ViewScreen() {
    const { userid, card = 0 } = useLocalSearchParams();
    const { fetchSingleCard, saveToSavedCards } = useCards();
    const [localCardData, setlocalCardData] = useState<MyCardData>();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchCardData = async () => {
            if (!userid) return;

            try {
                console.log('Fetching card data...');
                const cardtoview = await fetchSingleCard(userid as string, card as number);
                console.log('Fetched card data:', cardtoview);
                if (cardtoview) {
                    setlocalCardData(cardtoview);
                } else {
                    console.error('Card data is undefined or null.');
                    setlocalCardData(defaultCardData);
                }
            } catch (error) {
                console.error('Error fetching card data:', error);
            } finally {
                console.log('Card data fetched.');
            }
        };

        fetchCardData();
    }, []);

    const toggleFullscreen = async (): Promise<void> => {
        if (isFullscreen) {
            await lockAsync(OrientationLock.PORTRAIT_UP);
            setIsFullscreen(false);
        } else {
            await lockAsync(OrientationLock.LANDSCAPE);
            setIsFullscreen(true);
        }
    };

    const handleSave = async () => {
        if (!localCardData) return;
        try {
            setSaving(true);
            await saveToSavedCards(localCardData);
            router.replace('/');
        } catch (error) {
            console.error('Error saving card:', error);
        } finally {
            setSaving(false);
        }
    };

    const previewBgColor = localCardData?.bgcolor
        ? isColorDark(localCardData.bgcolor) ? '' : '#000'
        : '';

    return (
        <SafeAreaView style={[
            styles.topcontainer,
            isFullscreen && styles.fullscreenContainer
        ]}>
            {!isFullscreen && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            )}
            <View style={[
                styles.container,
                isFullscreen && styles.fullscreenContent
            ]}>
                <View style={[
                    styles.cardpreview,
                    { backgroundColor: previewBgColor },
                    isFullscreen && styles.fullscreenCard
                ]}>
                    <BusinessCardPreview localCardData={localCardData} />
                </View>
                <TouchableOpacity
                    style={styles.fullscreenButton}
                    onPress={toggleFullscreen}
                >
                    <Text style={styles.fullscreenButtonText}>
                        {isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                    </Text>
                </TouchableOpacity>
                {!isFullscreen && (
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        <Save color="#fff" size={24} />
                        <Text style={styles.saveButtonText}>
                            {saving ? 'Saving...' : 'Save Card'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    saveButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#4299e1',
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    topcontainer: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardpreview: {
        width: '100%',
        borderRadius: 12,
    },
    fullscreenContainer: {
        backgroundColor: '#000',
    },
    fullscreenContent: {
        padding: 0,
    },
    fullscreenCard: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
    },
    fullscreenButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 8,
    },
    fullscreenButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    }
});