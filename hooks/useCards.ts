import { useState, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaselogic';
import { useAuth } from '@/contexts/AuthContext';
import { defaultCardData, type MyCardData } from '@/types';
import { useCardContext } from '@/contexts/CardContext';

interface Effects {
    id: string;
    layout: {
        bgcolor: string;
    };
}

function useCards() {
    const { user } = useAuth();
    const { updateCardData, cards, setCards } = useCardContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [effects, setEffects] = useState<string[]>([]);
    const [cstyles, setCstyles] = useState<Effects[]>([]);

    const fetchStyles = useCallback(async () => {
        try {
            const stylesRef = doc(db, 'styles', 'styles');
            const stylesDoc = await getDoc(stylesRef);

            if (stylesDoc.exists()) {
                const stylesData = stylesDoc.data();
                setCstyles(stylesData.items);
            }

        } catch (err) {
            console.error('Error fetching styles:', err);
        }
    }, []);

    const fetchEffects = useCallback(async () => {
        console.log('fetching effects');
        if (!user) {
            return;
        }

        try {
            const effectsRef = doc(db, 'cards', user.uid);
            const effectsDoc = await getDoc(effectsRef);

            if (effectsDoc.exists()) {
                const effectData = effectsDoc.data();
                const effectArray = effectData.owned || [];
                setEffects(effectArray);
            } else {
                setEffects([]);
            }
            setError('');
        } catch (err) {
            console.error('Error fetching cards:', err);
            setError("something went wrong, effects");
        }
    }, []);

    const fetchCards = useCallback(async () => {
        console.log('fetching cards');
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
        }
    }, [user]);

    const handleRefresh = (): void => {
        console.log("refreshing");
        setLoading(true);
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

    const saveCardToFirestore = async (data: MyCardData): Promise<void> => {
        if (!user) {
            return;
        }
        const cardsRef = doc(db, 'cards', user.uid);
        try {
            // Remove index before storing
            let { index, effect, style, ...cardToStore } = data;
            const newCards = [...cards];
            if (effect !== undefined) {
                cardToStore = { ...cardToStore, effect } as MyCardData;
            }
            if (style !== undefined) {
                cardToStore = { ...cardToStore, style } as MyCardData;
            }
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
        loading,
        error,
        effects,
        cstyles,
        fetchStyles,
        fetchEffects,
        fetchCards,
        handleRefresh,
        removeCard,
        saveCardToFirestore,
        fetchSingleCard,
    };
}

export { useCards }