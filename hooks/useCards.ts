import { useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { MyCardData } from '@/types';

export function useCards() {
    const { user } = useAuth();
    const [card, setCard] = useState(Array<MyCardData>());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchCards = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const cardsRef = doc(db, 'cards', user.uid);
            const cardsDoc = await getDoc(cardsRef);

            if (cardsDoc.exists()) {
                const cardData = cardsDoc.data();
                const cardArray = cardData.card ? [cardData.card] : [];
                setCard(cardArray);
            } else {
                setCard([]);
            }
            setError('');
        } catch (err) {
            console.error('Error fetching cards:', err);
            setError("something went wrong");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchCards();
    };

    return {
        card,
        loading,
        error,
        refreshing,
        fetchCards,
        handleRefresh
    };
}