/* interface BusinessCardData {
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
} */

interface MyCardData {
  font: typeof fonts[number];
  size: number;
  color: typeof colors[number];
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
  effect?: typeof effects[number] | undefined;
  index?: number | undefined;
  style?: string | undefined;
}

interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  category: typeof categories[number];
  imageUrl?: string;
  isavailable: boolean;
  features?: Array<string>;
};

interface UserData {
  uid: string;
  email: string;
  username: string;
  balance: number;
}

const categories = ['professional', 'creative', 'business', 'effects'];

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
  '#1a202c', // Dark Gray
  '#4a5568', // Gray
  '#2b6cb0', // Blue
  '#3182ce', // Medium Blue
  '#38a169', // Green
  '#48bb78', // Light Green
  '#c53030', // Red
  '#e53e3e', // Light Red
  '#6b46c1', // Purple
  '#805ad5', // Medium Purple
  '#d53f8c', // Pink
  '#b7791f', // Amber
  '#744210', // Brown
  '#975a16', // Dark Amber
];

const colors = [
  '#ffffff', // White
  '#000000', // Black
  '#ff9800', // Orange
  '#ff69b4', // Pastel Pink
  '#ff5252', // Pastel Red
  '#e53935', // Warm Red
  '#d81b60', // Warm Pink
  '#8e44ad', // Warm Purple
  '#9c27b0', // Deep Purple
  '#673ab7', // Deep Blue
  '#4dd0e1', // Pastel Teal
  '#009688', // Teal
  '#64b5f6', // Light Blue
  '#455a64', // Dark Blue
  '#37474f', // Dark Gray Blue
  '#666666', // Dark Gray
]

const effects = [
  'stars',
  'rainbow',
  'glow',
  'fire',
  'sparkle',
  'rain',
]

const templates: Template[] = [
  {
    id: '1',
    name: 'Modern Minimalist',
    description: 'Clean and professional design with emphasis on typography',
    price: 10.99,
    category: 'Professional',
    isavailable: true,
    features: [
      'Clean typography',
      'Professional layout',
      'Minimalist design',
      'Easy customization'
    ]
  },
  {
    id: '2',
    name: 'Creative Portfolio',
    description: 'Bold and artistic layout perfect for creative professionals',
    price: 15.99,
    category: 'Creative',
    isavailable: true,
    features: [
      'Bold typography',
      'Artistic elements',
      'Modern layout',
      'Creative freedom'
    ]
  },
  {
    id: '3',
    name: 'Corporate Executive',
    description: 'Traditional business card design with a contemporary twist',
    price: 20.99,
    category: 'Business',
    isavailable: true,
    features: [
      'Professional design',
      'Traditional elements',
      'Contemporary style',
      'Business-focused'
    ]
  },
  {
    id: '4',
    name: 'Dynamic Fade',
    description: 'Elegant fade-in animations and transitions between elements',
    price: 24.99,
    category: 'Effects',
    isavailable: true,
    features: [
      'Smooth animations',
      'Elegant transitions',
      'Dynamic elements',
      'Modern effects'
    ]
  }
]

const defaultCardData: MyCardData = {
  font: fonts[0],
  size: 15,
  color: colors[0],
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
  effect: undefined,
  index: undefined,
  style: undefined,
};

const fontMap: Record<string, string> = {
  'Roboto-Regular': 'Roboto_400Regular',
  'Roboto-Medium': 'Roboto_500Medium',
  'Roboto-Bold': 'Roboto_700Bold',
  'Montserrat-Regular': 'Montserrat_400Regular',
  'Montserrat-Medium': 'Montserrat_500Medium',
  'Montserrat-Bold': 'Montserrat_700Bold',
  'OpenSans-Regular': 'OpenSans_400Regular',
  'OpenSans-SemiBold': 'OpenSans_600SemiBold',
  'OpenSans-Bold': 'OpenSans_700Bold',
  'PlayfairDisplay-Regular': 'PlayfairDisplay_400Regular',
  'PlayfairDisplay-Bold': 'PlayfairDisplay_700Bold',
};

export {
  MyCardData,
  Template,
  UserData,
  categories,
  fonts,
  bgcolors,
  colors,
  defaultCardData,
  fontMap,
  effects,
  templates,
}