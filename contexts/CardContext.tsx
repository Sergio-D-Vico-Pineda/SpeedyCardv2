import { createContext, useContext, useState } from 'react';
import { MyCardData, defaultCardData } from '@/types';

interface CardContextType {
  cardData: MyCardData;
  cards: MyCardData[];
  setCards: (cards: MyCardData[]) => void;
  updateCardData: (data: Partial<MyCardData>) => void;
  isFlipped: boolean;
  toggleFlip: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cardData, setCardData] = useState<MyCardData>(defaultCardData);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<MyCardData[]>([]);

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
    <CardContext.Provider value={{ cardData, updateCardData, isFlipped, toggleFlip, cards, setCards }}>
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