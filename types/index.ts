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
  font: string;
  size: number;
  color: string;
  bgcolor: string;
  align: 'left' | 'right' | 'center';
  tname: string;
  tjob: string;
  temail: string;
  tbusiness: string;
  tphone: string;
  twebsite: string;
  iprofile: string;
  ilogo: string;
}

export interface CardContextType {
  cardData: BusinessCardData;
  // updateCardData: (data: BusinessCardData | ((prev: BusinessCardData) => BusinessCardData)) => void;
  updateCardData: (data: Partial<BusinessCardData> | ((prev: BusinessCardData) => BusinessCardData)) => void;
  isFlipped: boolean;
  toggleFlip: () => void;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  style: string;
  imageUrl?: string;
  isavailable: boolean;
  features?: Array<string>;
};
