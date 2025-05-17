interface MyCardData {
  font: typeof fonts[number];
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
  style?: typeof styles[number] | undefined;
}

interface SavedCard {
  userid: string;
  card: number;
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
  plan: Plans;
}

const categories = ['effects', 'professional', 'creative', 'business'];

const fonts = [
  'Inter-Regular', // 0
  'Inter-Medium', // 1
  'Inter-Bold', // 2
  'Roboto-Regular', // 3
  'Roboto-Medium', // 4
  'Roboto-Bold', // 5
  'PlayfairDisplay-Regular', // 6
  'PlayfairDisplay-Bold', // 7
  'Montserrat-Regular', // 8
  'Montserrat-Medium', // 9
  'Montserrat-Bold', // 10
  'OpenSans-Regular', // 11
  'OpenSans-SemiBold', // 12
  'OpenSans-Bold', // 13
];

const bgcolors = [
  '#ffffff', // White 0
  '#000000', // Black 1
  '#1a202c', // Dark Gray 2
  '#4a5568', // Gray 3
  '#2b6cb0', // Blue 4
  '#3182ce', // Medium Blue 5
  '#38a169', // Green 6
  '#48bb78', // Light Green 7
  '#c53030', // Red 8
  '#e53e3e', // Light Red 9
  '#6b46c1', // Purple 10
  '#805ad5', // Medium Purple 11
  '#d53f8c', // Pink 12
  '#b7791f', // Amber 13
  '#744210', // Brown 14
  '#975a16', // Dark Amber 15
];

const colors = [
  '#ffffff', // White 0
  '#000000', // Black 1
  '#ff9800', // Orange 2
  '#ff69b4', // Pastel Pink 3
  '#ff5252', // Pastel Red 4
  '#e53935', // Warm Red 5
  '#d81b60', // Warm Pink 6
  '#8e44ad', // Warm Purple 7
  '#9c27b0', // Deep Purple 8
  '#673ab7', // Deep Blue 9
  '#4dd0e1', // Pastel Teal 10
  '#009688', // Teal 11
  '#64b5f6', // Light Blue 12
  '#455a64', // Dark Blue 13
  '#37474f', // Dark Gray Blue 14
  '#666666', // Dark Gray 15
]

const effects = [
  'stars',
  'rainbow',
  'glow',
  'fire',
  'sparkle',
  'rain',
]

const styles = [
  'modern',
  'minimalist',
]

type PaymentMethod = 'bank_card' | 'paypal';

type Plans = 'Free' | 'Pro' | 'Premium' | 'Ultimate';

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
  style: 'default',
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
  SavedCard,
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
  PaymentMethod,
  Plans
}