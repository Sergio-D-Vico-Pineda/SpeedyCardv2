export interface BusinessCardData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  primaryColor: string;
  font: string;
  logo?: string;
  profileImage?: string;
  textAlignment: 'left' | 'right' | 'center';
}

export interface CardContextType {
  cardData: BusinessCardData;
  updateCardData: (data: BusinessCardData) => void;
  isFlipped: boolean;
  toggleFlip: () => void;
}