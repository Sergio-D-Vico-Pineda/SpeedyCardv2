import { useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { MyCardData } from '@/types';

export function useCards() {
    const { user } = useAuth();
    const [cards, setCards] = useState(Array<MyCardData>());
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
                // console.log(cardData.cards);
                const cardArray = cardData.cards || [];
                /* const cardArray: MyCardData[] = [
                    { "align": "center", "bgcolor": "black", "color": "gray", "font": "Inter-Regular", "ilogo": "", "iprofile": "", "size": 15, "tbusiness": "SpeedyCard", "temail": "a@a.c", "tjob": "Developer", "tname": "Scarpy", "tphone": "123456789", "twebsite": "page.com" },
                    { "align": "center", "bgcolor": "black", "color": "gray", "font": "Inter-Regular", "ilogo": "", "iprofile": "", "size": 15, "tbusiness": "SpeedyCard", "temail": "a@a.c", "tjob": "Developer", "tname": "Scarpy", "tphone": "123456789", "twebsite": "page.com" },
                    { "align": "center", "bgcolor": "black", "color": "gray", "font": "Inter-Regular", "ilogo": "", "iprofile": "", "size": 15, "tbusiness": "SpeedyCard", "temail": "a@a.c", "tjob": "Developer", "tname": "Scarpy", "tphone": "123456789", "twebsite": "page.com" },
                    { "align": "center", "bgcolor": "black", "color": "gray", "font": "Inter-Regular", "ilogo": "", "iprofile": "", "size": 15, "tbusiness": "SpeedyCard", "temail": "a@a.c", "tjob": "Developer", "tname": "Scarpy", "tphone": "123456789", "twebsite": "page.com" },
                    { "align": "center", "bgcolor": "black", "color": "gray", "font": "Inter-Regular", "ilogo": "", "iprofile": "", "size": 15, "tbusiness": "SpeedyCard", "temail": "a@a.c", "tjob": "Developer", "tname": "Scarpy", "tphone": "123456789", "twebsite": "page.com" },
                ] */
                setCards(cardArray);
            } else {
                setCards([]);
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
        card: cards,
        loading,
        error,
        refreshing,
        fetchCards,
        handleRefresh
    };
}