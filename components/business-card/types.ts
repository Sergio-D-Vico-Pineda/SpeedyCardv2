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

export interface MyCardData {
  fuente: string;
  size: number;
  color: string;
  bgcolor: string;
  align: 'left' | 'right' | 'center';
  tnombre: string;
  tpuesto: string;
  temail: string;
  tempresa: string;
  tphone: string;
  twebsite: string;
  turlimg: string;
}

export interface CardContextType {
  cardData: BusinessCardData;
  // updateCardData: (data: BusinessCardData | ((prev: BusinessCardData) => BusinessCardData)) => void;
  updateCardData: (data: Partial<BusinessCardData> | ((prev: BusinessCardData) => BusinessCardData)) => void;
  isFlipped: boolean;
  toggleFlip: () => void;
}