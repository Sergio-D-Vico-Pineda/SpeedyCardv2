import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import BusinessCardPreview from '@/components/business-card/BusinessCardPreview';
import { useCards } from '@/hooks/useCards';
import { MyCardData } from '@/types';

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
    const { fetchSingleCard } = useCards();
    const [localCardData, setlocalCardData] = useState<MyCardData>();

    useEffect(() => {
        const fetchCardData = async () => {
            if (!userid) return;

            try {
                console.log('Fetching card data...');
                const cardtoview = await fetchSingleCard(userid as string, card as number);
                console.log('Fetched card data:', cardtoview);
                if (cardtoview) {
                    setlocalCardData(cardtoview);
                }
            } catch (error) {
                console.error('Error fetching card data:', error);
            } finally {
                console.log('Card data fetched.');
            }
        };

        fetchCardData();
    }, [userid]);

    // const previewBgColor = isColorDark(localCardData?.bgcolor) ? '' : '#000';
    let previewBgColor = '';
    if (localCardData?.bgcolor) {
        previewBgColor = isColorDark(localCardData.bgcolor) ? '' : '#000';
    }

    return (
        <SafeAreaView style={styles.topcontainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{localCardData?.index === undefined ? 'New' : `Editing ${localCardData?.index}`}</Text>
            </View>
            <View style={styles.container}>
                {
                    localCardData?.tname ? (
                        <>
                            <View style={[styles.cardpreview, { backgroundColor: previewBgColor }]}>
                                <BusinessCardPreview localCardData={localCardData} />
                            </View>
                        </>
                    ) : (
                        <Text>
                            Please type your name at least
                        </Text>
                    )
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    cardpreview: {
        width: '100%',
        borderRadius: 12,
    }
});