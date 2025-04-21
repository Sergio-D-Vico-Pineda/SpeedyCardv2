import { useState, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { defaultCardData, type MyCardData } from '@/types';
import { useCardContext, } from '@/contexts/CardContext';

function useCards() {
    const { user } = useAuth();
    const { updateCardData, cards, setCards } = useCardContext();
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
            updateCardData(defaultCardData);
        } catch (err) {
            console.error('Error removing card:', err);
        }
    };

    const saveCardToFirestore = async (data: MyCardData) => {
        if (!user) {
            return;
        }
        const cardsRef = doc(db, 'cards', user.uid);
        try {
            // Remove index before storing
            let { index, ...cardToStore } = data;
            const newCards = [...cards];
            if (index === undefined) {
                newCards.push(cardToStore as MyCardData);
                updateCardData({ ...cardToStore, index: newCards.length - 1 } as MyCardData);
            } else {
                newCards[index] = cardToStore as MyCardData;
            }
            await updateDoc(cardsRef, { cards: newCards });
            setCards(newCards);
        } catch (err) {
            console.error('Error saving card useCards:', err);
        }
    };

    return {
        cards,
        loading,
        error,
        refreshing,
        fetchCards,
        handleRefresh,
        removeCard,
        saveCardToFirestore,
    };
}

export { useCards }