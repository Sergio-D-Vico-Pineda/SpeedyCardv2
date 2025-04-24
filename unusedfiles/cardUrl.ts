import { MyCardData } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Parameter mappings
const STYLE_MAPPINGS = {
    fonts: {
        '0': 'Inter-Regular',
        '1': 'Inter-Bold',
        '2': 'Roboto-Regular',
        '3': 'PlayfairDisplay-Regular',
        // Add more fonts as needed
    },
    colors: {
        '0': '#1a365d',
        '1': '#2d3748',
        '2': '#744210',
        '3': '#007AFF',
        // Add more colors as needed
    },
    textAlign: {
        '0': 'left',
        '1': 'center',
        '2': 'right',
    },
};

// Generate a random hex ID for text storage
function generateTextId(): string {
    return Math.floor(Math.random() * Math.pow(16, 4))
        .toString(16)
        .padStart(4, '0');
}

// Save card data and return URL
async function generateCardUrl(cardData: MyCardData): Promise<string> {
    try {
        // Generate style parameters (example mapping)
        const fontParam = Object.keys(STYLE_MAPPINGS.fonts)
            .find(key => STYLE_MAPPINGS.fonts[key as keyof typeof STYLE_MAPPINGS.fonts] === cardData.font) || '0';
        const colorParam = Object.keys(STYLE_MAPPINGS.colors)
            .find(key => STYLE_MAPPINGS.colors[key as keyof typeof STYLE_MAPPINGS.colors] === cardData.bgcolor) || '0';
        const alignParam = Object.keys(STYLE_MAPPINGS.textAlign)
            .find(key => STYLE_MAPPINGS.textAlign[key as keyof typeof STYLE_MAPPINGS.textAlign] === cardData.align) || '0';

        // Generate hex parameters (5 characters)
        const hexParams = `${fontParam}${colorParam}${alignParam}00`;

        // Generate and save text data
        const textId = generateTextId();
        const textData = JSON.stringify({
            tname: cardData.tname,
            tjob: cardData.tjob,
            tbusiness: cardData.tbusiness,
            temail: cardData.temail,
            tphone: cardData.tphone,
            twebsite: cardData.twebsite,
            color: cardData.color,
            bgcolor: cardData.bgcolor,
            ilogo: cardData.ilogo,
            iprofile: cardData.iprofile,
            align: cardData.align,
            size: cardData.size,
            font: cardData.font,
        });

        await AsyncStorage.setItem(`card_${textId}`, textData);

        return `speedycard://card/${hexParams}${textId}`;
    } catch (error) {
        console.error('Error generating card URL:', error);
        throw error;
    }
}

// Decode URL and return card data
async function decodeCardUrl(url: string): Promise<MyCardData | null> {
    try {
        const urlRegex = /speedycard:\/\/card\/([0-9A-Fa-f]{9})/;
        const match = url.match(urlRegex);

        if (!match) return null;

        const hex = match[1];
        const params = hex.slice(0, 5);
        const textId = hex.slice(5, 9);

        // Decode style parameters
        const font = STYLE_MAPPINGS.fonts[params[0] as keyof typeof STYLE_MAPPINGS.fonts] || STYLE_MAPPINGS.fonts['0'];
        const primaryColor = STYLE_MAPPINGS.colors[params[1] as keyof typeof STYLE_MAPPINGS.colors] || STYLE_MAPPINGS.colors['0'];
        const textAlignment = STYLE_MAPPINGS.textAlign[params[2] as keyof typeof STYLE_MAPPINGS.textAlign] || STYLE_MAPPINGS.textAlign['0'];

        // Retrieve text data
        const textData = await AsyncStorage.getItem(`card_${textId}`);
        if (!textData) return null;

        const cardText = JSON.parse(textData);

        return {
            ...cardText,
            font,
            primaryColor,
            textAlignment,
        };
    } catch (error) {
        console.error('Error decoding card URL:', error);
        return null;
    }
}