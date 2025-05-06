import { createContext, useContext, useState, ReactNode } from 'react';
import { Template } from '@/types';
import { useMarketHook } from '@/hooks/useMarket';

interface MarketContextType {
    templates: Template[];
    loading: boolean;
    searchQuery: string;
    selectedCategory: string;
    setSearchQuery: (query: string) => void;
    setSelectedCategory: (category: string) => void;
    refreshProducts: () => Promise<void>;
    filteredTemplates: Template[];
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
    const { templates, loading, refreshProducts } = useMarketHook();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const value = {
        templates,
        loading,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        refreshProducts,
        filteredTemplates,
    };

    return (
        <MarketContext.Provider value={value}>
            {children}
        </MarketContext.Provider>
    );
}

export function useMarket() {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
}