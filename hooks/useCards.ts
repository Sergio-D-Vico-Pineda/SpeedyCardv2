import { useState, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

    const removeCard = async (index: number) => {
        if (!user) {
            return;
        }
        const cardsRef = doc(db, 'cards', user.uid);
        try {
            const newCards = [...cards];
            newCards.splice(index, 1);
            await updateDoc(cardsRef, { cards: newCards });
            setCards(newCards);
        } catch (err) {
            console.error('Error removing card:', err);
        }
    };

    // Save or update a card in Firestore and local state
    const saveCard = async (data: MyCardData) => {
        if (!user) {
            return;
        }
        const cardsRef = doc(db, 'cards', user.uid);
        try {
            // Remove index before storing
            const { index, ...cardToStore } = data;
            const newCards = [...cards];
            if (index === undefined || index === null) {
                newCards.push(cardToStore as MyCardData);
            } else {
                newCards[index] = cardToStore as MyCardData;
            }
            // Persist updated list
            await updateDoc(cardsRef, { cards: newCards });
            setCards(newCards);
        } catch (err) {
            console.error('Error saving card:', err);
        }
    };

    return {
        card: cards,
        loading,
        error,
        refreshing,
        fetchCards,
        handleRefresh,
        removeCard,
        saveCard,
    };
}