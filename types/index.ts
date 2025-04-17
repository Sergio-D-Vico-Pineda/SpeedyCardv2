interface BusinessCardData {
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

interface MyCardData {
  font: typeof fonts[number];
  size: number;
  color: string;
  bgcolor: typeof bgcolors[number];
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

interface Template {
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

const fonts = [
  'Inter-Regular',
  'Inter-Medium',
  'Inter-Bold',
  'Roboto-Regular',
  'Roboto-Medium',
  'Roboto-Bold',
  'PlayfairDisplay-Regular',
  'PlayfairDisplay-Bold',
  'Montserrat-Regular',
  'Montserrat-Medium',
  'Montserrat-Bold',
  'OpenSans-Regular',
  'OpenSans-SemiBold',
  'OpenSans-Bold',
];

const bgcolors = [
  '#ffffff', // White
  '#000000', // Black
  '#1a202c', // Dark Gray b
  '#4a5568', // Gray
  '#2b6cb0', // Blue c
  '#3182ce', // Medium Blue
  '#38a169', // Green
  '#48bb78', // Light Green
  '#c53030', // Red
  '#e53e3e', // Light Red
  '#6b46c1', // Purple
  '#805ad5', // Medium Purple
  '#d53f8c', // Pink
  '#b7791f', // Amber
  '#744210', // Brown a
  '#975a16', // Dark Amber
];

const colors = [

]

interface UserData {
  email: string;
  username: string;
  balance: number;
}

export {
  BusinessCardData,
  MyCardData,
  Template,
  fonts,
  bgcolors,
  colors,
  UserData,
}