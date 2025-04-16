import { createContext, useContext, useState } from 'react';
import { MyCardData, bgcolors } from '@/types';

interface CardContextType {
  cardData: MyCardData;
  updateCardData: (data: Partial<MyCardData>) => void; // <-- Change here
  isFlipped: boolean;
  toggleFlip: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

const defaultCardData: MyCardData = {
  font: 'Inter-Regular',
  size: 15,
  color: '#ffffff',
  bgcolor: bgcolors[1],
  align: 'center',
  tname: '',
  tjob: '',
  temail: '',
  tbusiness: '',
  tphone: '',
  twebsite: '',
  iprofile: '',
  ilogo: '',
};

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cardData, setCardData] = useState<MyCardData>(defaultCardData);
  const [isFlipped, setIsFlipped] = useState(false);

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
    <CardContext.Provider value={{ cardData, updateCardData, isFlipped, toggleFlip }}>
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