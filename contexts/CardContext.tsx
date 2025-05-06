import { createContext, useContext, useState } from 'react';
import { MyCardData, defaultCardData, SavedCard } from '@/types';

interface CardContextType {
  cardData: MyCardData;
  cards: MyCardData[];
  savedCards: SavedCard[];
  setCards: (cards: MyCardData[]) => void;
  setSavedCards: (savedCards: SavedCard[]) => void;
  updateCardData: (data: Partial<MyCardData>) => void;
  isFlipped: boolean;
  toggleFlip: () => void;
  changeDatainCard: (field: keyof MyCardData, value: string | undefined) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cardData, setCardData] = useState<MyCardData>(defaultCardData);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<MyCardData[]>([]);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

  const changeDatainCard = (field: keyof MyCardData, value: string | undefined) => {
    updateCardData({ [field]: value });
  };

  const updateCardData = (newData: Partial<MyCardData>) => {
    setCardData(prev =>
      Object.keys(newData).length === Object.keys(prev).length
        ? (newData as MyCardData)
        : { ...prev, ...newData }
    );
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContext.Provider value={{ cardData, updateCardData, isFlipped, toggleFlip, cards, setCards, savedCards, setSavedCards, changeDatainCard }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
}