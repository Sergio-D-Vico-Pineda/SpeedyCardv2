import { createContext, useContext, useState } from 'react';
import { BusinessCardData, CardContextType } from './types';

const CardContext = createContext<CardContextType | undefined>(undefined);

const defaultCardData: BusinessCardData = {
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  primaryColor: '#1a365d',
  font: 'Inter-Regular',
  textAlignment: 'center',
};

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cardData, setCardData] = useState<BusinessCardData>(defaultCardData);
  const [isFlipped, setIsFlipped] = useState(false);

  const updateCardData = (newData: Partial<BusinessCardData> | ((prev: BusinessCardData) => BusinessCardData)) => {
    if (typeof newData === 'function') {
      setCardData(newData);
    } else {
      setCardData(prevData => ({ ...prevData, ...newData }));
    }
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