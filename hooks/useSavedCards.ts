import { useState, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaselogic';
import { useAuth } from '@/contexts/AuthContext';
import { useCardContext } from '@/contexts/CardContext';
import { SavedCard, type MyCardData } from '@/types';

function useSavedCards() {
    const { savedCards, setSavedCards } = useCardContext();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchSavedCards = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const cardsRef = doc(db, 'cards', user.uid);
            const cardsDoc = await getDoc(cardsRef);

            if (cardsDoc.exists()) {
                const cardData = cardsDoc.data();
                const savedCardArray = cardData.savedcards || [];
                setSavedCards(savedCardArray);
            } else {
                setSavedCards([]);
            }
        } catch (err) {
            console.error('Error fetching saved cards:', err);
            setError("something went wrong. saved cards");
        } finally {
            setLoading(false);
        }
    }, [user]);

    // this doesn't work, it just saves the last one, it doesn't save all the cards, idk now it just works
    const saveToSavedCards = async (data: MyCardData, url: SavedCard): Promise<void> => {
        console.log('saving to savedcards');
        if (!user) {
            return;
        }
        await fetchSavedCards();
        const cardsRef = doc(db, 'cards', user.uid);
        try {
            let newOne = url;
            const newSavedCards = [...savedCards];
            newSavedCards.push(newOne);
            await updateDoc(cardsRef, { savedcards: newSavedCards });
            setSavedCards(newSavedCards);
        } catch (err) {
            console.error('Error saving to saved cards:', err);
        }
    };

    // esto va bien
    const removeSavedCard = async (index: number): Promise<void> => {
        if (!user) {
            return;
        }
        const cardsRef = doc(db, 'cards', user.uid);
        try {
            const newSavedCards = [...savedCards];
            newSavedCards.splice(index, 1);
            await updateDoc(cardsRef, { savedcards: newSavedCards });
            setSavedCards(newSavedCards);
        } catch (err) {
            console.error('Error removing saved card:', err);
        }
    };

    const handleRefresh = () => {
        console.log('refreshing savedcard');
        setLoading(true);
        fetchSavedCards();
    };

    async function fetchDataCard(savedCard: SavedCard): Promise<MyCardData | null> {
        try {
            const cardsRef = doc(db, 'cards', savedCard.userid);
            const cardsDoc = await getDoc(cardsRef);

            if (cardsDoc.exists()) {
                const cardData = cardsDoc.data();
                const card = cardData.cards[savedCard.card] as MyCardData;
                return card;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.error('Error fetching cards:', err);
            return null;
        }
    }

    return {
        savedCards,
        loading,
        error,
        handleRefresh,
        fetchSavedCards,
        saveToSavedCards,
        removeSavedCard,
        fetchDataCard
    };
}

export { useSavedCards }