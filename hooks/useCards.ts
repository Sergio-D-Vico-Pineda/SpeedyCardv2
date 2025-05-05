import { useState, useCallback } from 'react';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaselogic';
import { useAuth } from '@/contexts/AuthContext';
import { defaultCardData, type MyCardData } from '@/types';
import { useCardContext, } from '@/contexts/CardContext';

function useCards() {
    const { user } = useAuth();
    const { updateCardData, cards, setCards } = useCardContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [effects, setEffects] = useState<string[]>([]);
    const [savedCards, setSavedCards] = useState<MyCardData[]>([]);

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
                const savedCardArray = cardData.savedCards || [];
                console.log(savedCardArray);
                setSavedCards(savedCardArray);
            } else {
                setSavedCards([]);
            }
        } catch (err) {
            console.error('Error fetching saved cards:', err);
            setError("something went wrong. saved cards");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user]);

    const fetchEffects = useCallback(async () => {
        try {
            const snapshot = await getDocs(collection(db, 'effects'));
            setEffects(snapshot.docs.map(doc => doc.data().name as string));
        } catch (err) {
            console.error('Error fetching effects:', err);
        }
    }, []);

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

    const handleRefresh = (): void => {
        setRefreshing(true);
        fetchCards();
    };

    const removeCard = async (index: number): Promise<void> => {
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

    const saveToSavedCards = async (data: MyCardData): Promise<void> => {
        if (!user) {
            return;
        }
        const cardsRef = doc(db, 'cards', user.uid);
        try {
            // Remove index before storing
            let { index, ...cardToStore } = data;
            const newSavedCards = [...savedCards];
            newSavedCards.push(cardToStore as MyCardData);
            await updateDoc(cardsRef, { savedCards: newSavedCards });
            setSavedCards(newSavedCards);
        } catch (err) {
            console.error('Error saving to saved cards:', err);
        }
    };

    const saveCardToFirestore = async (data: MyCardData): Promise<void> => {
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

    const fetchSingleCard = async (userid: string, index: number): Promise<MyCardData | null> => {
        try {
            const cardsRef = doc(db, 'cards', userid);
            const cardsDoc = await getDoc(cardsRef);

            if (cardsDoc.exists()) {
                const cardData = cardsDoc.data();
                const cardArray = cardData.cards || [];

                if (index >= 0 && index < cardArray.length) {
                    return cardArray[index];
                }
            }
            return null;
        } catch (err) {
            console.error('Error fetching single card:', err);
            return null;
        }
    };

    return {
        cards,
        savedCards,
        loading,
        error,
        refreshing,
        effects,
        fetchEffects,
        fetchCards,
        fetchSavedCards,
        handleRefresh,
        removeCard,
        saveCardToFirestore,
        saveToSavedCards,
        fetchSingleCard,
    };
}

export { useCards }