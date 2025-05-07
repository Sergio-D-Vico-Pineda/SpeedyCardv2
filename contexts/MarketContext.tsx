import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Template } from '@/types';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaselogic';
import { useAuth } from '@/contexts/AuthContext';

interface MarketContextType {
    ownedTemplates: string[];
    setOwnedTemplates: (otemplates: string[]) => void;
    templates: Template[];
    loading: boolean;
    searchQuery: string;
    selectedCategory: string;
    setTemplates: (templates: Template[]) => void;
    setSearchQuery: (query: string) => void;
    setSelectedCategory: (category: string) => void;
    fetchProducts: () => Promise<void>;
    filteredTemplates: Template[];
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [ownedTemplates, setOwnedTemplates] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productsRef = collection(db, 'categories');
            const productsSnapshot = await getDocs(productsRef);
            const productList = productsSnapshot.docs.flatMap(doc =>
                doc.data().items.map((item: any) => ({
                    id: item.name.toLowerCase().replace(/\s+/g, '-'),
                    ...item,
                    category: doc.id
                }))
            );
            setTemplates(productList);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOwnedProducts = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const cardsRef = doc(db, 'cards', user.uid);
            const cardsDoc = await getDoc(cardsRef);

            if (cardsDoc.exists()) {
                const cardData = cardsDoc.data();
                const cardArray = cardData.owned || [];
                setOwnedTemplates(cardArray);
            } else {
                setOwnedTemplates([]);
            }
        } catch (err) {
            console.error('Error fetching cards:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchOwnedProducts();
    }, [user]);
    
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const exports = {
        ownedTemplates,
        setOwnedTemplates,
        templates,
        setTemplates,
        loading,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        fetchProducts,
        filteredTemplates,
    };

    return (
        <MarketContext.Provider value={exports}>
            {children}
        </MarketContext.Provider>
    );
}

export function useMarketContext() {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarketContext must be used within a MarketProvider');
    }
    return context;
}